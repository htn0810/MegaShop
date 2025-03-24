import { BestSellingProducts } from '@/assets/dummyDatas/products'
import ProductHeader from '@/modules/products_shop_header'
import ProductItem from '@/modules/products/product_item'
import Sidebar from '@/modules/sidebar'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { useState } from 'react'
import { Layout } from '@/types/common.type'

const products = BestSellingProducts

const Products = () => {
  const [layout, setLayout] = useState<Layout>('grid')
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
          {products.map((product) => (
            <ProductItem product={product} showType={layout}></ProductItem>
          ))}
        </div>
        <div className='mt-12'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href='#' />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#' isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}

export default Products
