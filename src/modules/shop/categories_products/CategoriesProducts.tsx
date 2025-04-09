import { CategoryApi } from '@/apis/category/category'
import { ICategoryResponse } from '@/apis/category/categoryInterface'
import { ProductApi } from '@/apis/product/product'
import { IProduct } from '@/apis/product/productInterface'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import ProductItem from '@/modules/products/product_item'
import { useEffect, useState } from 'react'
import ProductItemSkeleton from '@/modules/products/product_item/ProductItemSkeleton'
import { CustomPagination } from '@/components/custom_pagination/CustomPagination'
import { Pagination } from '@/types/common.type'
import { DEFAULT_PAGINATION } from '@/constants/common.constant'
import { Basket, PuzzlePiece } from '@phosphor-icons/react'

type Props = {
  shopId: number
  pagination: Pagination
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>
}

const CategoriesProducts = ({ shopId, pagination, setPagination }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [categories, setCategories] = useState<ICategoryResponse[]>([])
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(false)
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId)
    setPagination(DEFAULT_PAGINATION)
  }

  const handleGetCategories = async () => {
    try {
      setIsLoadingCategories(true)
      const response = await CategoryApi.getAllCategories()
      setCategories(response.data.data)
    } finally {
      setIsLoadingCategories(false)
    }
  }

  const handleGetProductsByCategoryIdAndShopId = async (selectedCategory: number) => {
    try {
      setIsLoadingProducts(true)
      const response = await ProductApi.getProductsByCategoryIdAndShopId(
        shopId,
        selectedCategory,
        pagination.page,
        pagination.pageSize,
      )
      setProducts(response.data.data.products)
      setPagination((prev) => ({
        ...prev,
        totalPages: response.data.data.pagination.totalPages,
      }))
    } finally {
      setIsLoadingProducts(false)
    }
  }

  useEffect(() => {
    handleGetCategories()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      handleGetProductsByCategoryIdAndShopId(selectedCategory)
    }
  }, [selectedCategory, pagination.page, pagination.pageSize])

  return (
    <div className='flex flex-col justify-center gap-2 mb-6'>
      {isLoadingCategories && (
        <div className='flex flex-wrap gap-2'>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className='h-[28px] md:h-[32px] w-20 md:w-24 rounded-full' />
          ))}
        </div>
      )}
      {!isLoadingCategories && categories && (
        <div className='flex flex-wrap gap-2'>
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className={cn(
                'px-2 md:px-4 py-2 text-xs  md:text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors',
                selectedCategory === category.id && 'bg-primary text-primary-foreground hover:bg-primary/90',
              )}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      )}
      <div className='mt-6'>
        {!selectedCategory && !isLoadingCategories && (
          <div className='flex flex-col items-center justify-center py-12 px-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900/50'>
            <div className='mb-4 p-3 rounded-full bg-gray-100 dark:bg-gray-800'>
              <PuzzlePiece size={24} />
            </div>
            <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1'>Categories</h3>
            <p className='text-sm text-gray-500 dark:text-gray-400 text-center max-w-md'>
              Select a category from the options above to browse related products in this shop.
            </p>
          </div>
        )}

        {isLoadingProducts && (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8'>
            <ProductItemSkeleton />
            <ProductItemSkeleton />
            <ProductItemSkeleton />
            <ProductItemSkeleton />
          </div>
        )}

        {selectedCategory && !isLoadingProducts && products && products.length === 0 && (
          <div className='flex flex-col items-center justify-center py-12 px-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900/50'>
            <div className='mb-4 p-3 rounded-full bg-gray-100 dark:bg-gray-800'>
              <Basket size={24} />
            </div>
            <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1'>No Products Found</h3>
            <p className='text-sm text-gray-500 dark:text-gray-400 text-center max-w-md'>
              There are currently no products available in this category. Please try selecting a different category or
              check back later.
            </p>
          </div>
        )}

        {selectedCategory && !isLoadingProducts && products && products.length > 0 && (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8'>
            {products.map((product) => (
              <ProductItem key={product.id} product={product} showType='grid' />
            ))}
          </div>
        )}

        {selectedCategory && !isLoadingProducts && products && products.length > 0 && (
          <div className='flex justify-center mb-8'>
            <CustomPagination
              page={pagination.page}
              pageSize={pagination.pageSize}
              totalPages={pagination.totalPages}
              onPageChange={setPagination}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoriesProducts
