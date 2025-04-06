import ProductHeader from '@/modules/products_shop_header'
import ProductItem from '@/modules/products/product_item'
import Sidebar from '@/modules/sidebar'
import { useEffect, useState } from 'react'
import { FiltersProduct, Layout } from '@/types/common.type'
import { ProductApi } from '@/apis/product/product'
import { IProduct } from '@/apis/product/productInterface'
import { CustomPagination } from '@/components/custom_pagination/CustomPagination'
import { useSearchParams } from 'react-router-dom'
import ProductItemSkeleton from '@/modules/products/product_item/ProductItemSkeleton'
import { Button } from '@/components/ui/button'
import { Bag } from '@phosphor-icons/react'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || 1
  const pageSize = searchParams.get('limit') || 12
  const sort = searchParams.get('sortPrice') as 'asc' | 'desc' | null
  const bestSelling = searchParams.get('bestSelling') || false
  const newest = searchParams.get('newest') || false
  const categoryIds = searchParams.get('categoryIds') || []
  const minPrice = searchParams.get('minPrice') || 0
  const maxPrice = searchParams.get('maxPrice') || 0
  const rating = searchParams.get('rating') || 0
  const storedLayout = localStorage.getItem('layout') || 'grid'

  const [layout, setLayout] = useState<Layout>(storedLayout as Layout)
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<IProduct[]>([])
  const [pagination, setPagination] = useState({
    page: Number(page),
    pageSize: Number(pageSize),
    totalPages: 0,
  })

  const [filters, setFilters] = useState<FiltersProduct>({
    categoryIds: categoryIds && categoryIds.length > 0 ? (categoryIds as string).split(',').map(Number) : [],
    minPrice: minPrice ? Number(minPrice) : 0,
    maxPrice: maxPrice ? Number(maxPrice) : 0,
    rating: rating ? Number(rating) : 0,
    bestSelling: bestSelling ? bestSelling === 'true' : false,
    newest: newest ? newest === 'true' : false,
  })

  const [sortPrice, setSortPrice] = useState<'asc' | 'desc' | null>(sort)

  const handleGetProducts = async () => {
    setIsLoading(true)
    try {
      const response = await ProductApi.getProducts({
        page: pagination.page,
        limit: pagination.pageSize,
        categoryIds: filters.categoryIds,
        rating: filters.rating,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        bestSelling: filters.bestSelling,
        newest: filters.newest,
        sortPrice: sortPrice,
      })
      setProducts(response.data.data.products)
      setPagination({
        ...pagination,
        totalPages: response.data.data.pagination.totalPages,
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log(filters.categoryIds)
    handleChangeSearchParams()
    handleGetProducts()
  }, [
    pagination.page,
    pagination.pageSize,
    sortPrice,
    filters.bestSelling,
    filters.newest,
    filters.categoryIds.length,
    filters.minPrice,
    filters.maxPrice,
    filters.rating,
  ])

  const handleChangeSearchParams = () => {
    const params: {
      page: string
      limit: string
      sortPrice?: string
      bestSelling?: string
      newest?: string
      categoryIds?: string
      minPrice?: string
      maxPrice?: string
      rating?: string
    } = {
      page: pagination.page.toString(),
      limit: pagination.pageSize.toString(),
    }
    if (sortPrice) {
      params.sortPrice = sortPrice
    }
    if (filters.bestSelling) {
      params.bestSelling = filters.bestSelling.toString()
    }
    if (filters.newest) {
      params.newest = filters.newest.toString()
    }
    if (filters.categoryIds.length > 0) {
      console.log('🚀 ~ handleChangeSearchParams ~ filters.categoryIds:', filters.categoryIds)
      params.categoryIds = filters.categoryIds.join(',')
    }
    if (filters.minPrice > 0) {
      params.minPrice = filters.minPrice.toString()
    }
    if (filters.maxPrice > 0) {
      params.maxPrice = filters.maxPrice.toString()
    }
    if (filters.rating > 0) {
      params.rating = filters.rating.toString()
    }
    setSearchParams(params)
  }

  return (
    <div className='grid grid-cols-12 gap-x-4 py-6 md:py-10'>
      <div className='col-span-3 lg:block hidden'>
        <Sidebar filters={filters} setFilters={setFilters} />
      </div>
      <div className='col-span-full lg:col-span-9'>
        <ProductHeader
          layout={layout}
          changeLayout={setLayout}
          sort={sortPrice}
          setSort={setSortPrice}
          filters={filters}
          setFilters={setFilters}
        />
        <div
          className={`mt-4 grid gap-y-8 ${layout === 'grid' ? ' grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-x-4' : 'grid-cols-1'}`}
        >
          {!isLoading &&
            products.length > 0 &&
            products.map((product) => <ProductItem product={product} showType={layout} key={product.id} />)}
          {!isLoading && products.length === 0 && (
            <div className='col-span-full flex flex-col items-center justify-center py-16 px-4'>
              <div className='w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-6 animate-bounce shadow-lg'>
                <Bag size={64} className='text-gray-400 dark:text-gray-300' />
              </div>
              <h3 className='text-xl md:text-2xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500'>
                No Products Found
              </h3>
              <p className='text-gray-500 dark:text-gray-400 text-center mb-6 max-w-md'>
                We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
              </p>
              <div className='flex gap-4'>
                <Button
                  variant='outline'
                  className='px-6 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  onClick={() => {
                    window.history.back()
                  }}
                >
                  Go Back
                </Button>
                <Button
                  variant='default'
                  className='px-6 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-md'
                  onClick={() => {
                    setPagination({
                      page: 1,
                      pageSize: Number(pageSize),
                      totalPages: 0,
                    })
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
          {isLoading &&
            Array.from({ length: 12 }).map((_, index) => <ProductItemSkeleton key={index} showType={layout} />)}
        </div>
        <div className='mt-12'>
          {products && products.length > 0 && (
            <CustomPagination
              page={pagination.page}
              pageSize={pagination.pageSize}
              totalPages={pagination.totalPages}
              onPageChange={setPagination}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Products
