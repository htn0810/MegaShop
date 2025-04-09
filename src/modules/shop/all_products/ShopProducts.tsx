import { IProduct } from '@/apis/product/productInterface'
import ShopAPI from '@/apis/shop/shop'
import { CustomPagination } from '@/components/custom_pagination/CustomPagination'
import ProductItem from '@/modules/products/product_item'
import ProductItemSkeleton from '@/modules/products/product_item/ProductItemSkeleton'
import { Pagination } from '@/types/common.type'
import { Basket } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'

type Props = {
  shopId: number
  pagination: Pagination
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>
}

const ShopProducts = ({ shopId, pagination, setPagination }: Props) => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)

  const handleGetProductsByShopId = async () => {
    try {
      setIsLoadingProducts(true)
      const response = await ShopAPI.getProductsByShopId(Number(shopId), pagination.page, pagination.pageSize)
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
    handleGetProductsByShopId()
  }, [pagination.page, pagination.pageSize])
  return (
    <div>
      {/* Products Grid */}
      {isLoadingProducts && (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8'>
          {Array.from({ length: 12 }).map((_, index) => (
            <ProductItemSkeleton key={index} showType='grid' />
          ))}
        </div>
      )}
      {!isLoadingProducts && products.length > 0 && (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8'>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} showType='grid' />
          ))}
        </div>
      )}
      {!isLoadingProducts && products.length === 0 && (
        <div className='flex flex-col items-center justify-center py-12 px-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900/50'>
          <div className='mb-4 p-3 rounded-full bg-gray-100 dark:bg-gray-800'>
            <Basket size={24} />
          </div>
          <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-1'>No Products Found</h3>
          <p className='text-sm text-gray-500 dark:text-gray-400 text-center max-w-md'>
            There are currently no products available in this shop. Please try selecting a different shop or check back
            later.
          </p>
        </div>
      )}
      {!isLoadingProducts && products.length > 0 && (
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
  )
}

export default ShopProducts
