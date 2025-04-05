import ProductHeader from '@/modules/products_shop_header'
import ProductItem from '@/modules/products/product_item'
import Sidebar from '@/modules/sidebar'
import { useEffect, useState } from 'react'
import { Layout } from '@/types/common.type'
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
  const [layout, setLayout] = useState<Layout>('grid')
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<IProduct[]>([])
  const [pagination, setPagination] = useState({
    page: Number(page),
    pageSize: Number(pageSize),
    totalPages: 0,
  })

  const handleGetProducts = async () => {
    setIsLoading(true)
    try {
      const response = await ProductApi.getProducts(pagination.page, pagination.pageSize)
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
    setSearchParams({
      page: pagination.page.toString(),
      limit: pagination.pageSize.toString(),
    })
    handleGetProducts()
  }, [pagination.page, pagination.pageSize])

  return (
    <div className='grid grid-cols-12 gap-x-4 py-6 md:py-10'>
      <div className='col-span-3 lg:block hidden'>
        <Sidebar />
      </div>
      <div className='col-span-full lg:col-span-9'>
        <ProductHeader layout={layout} changeLayout={setLayout} />
        <div
          className={`mt-4 grid gap-y-8 ${layout === 'grid' ? ' grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-x-4' : 'grid-cols-1'}`}
        >
          {!isLoading &&
            products.length > 0 &&
            products.map((product) => <ProductItem product={product} showType={layout}></ProductItem>)}
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
