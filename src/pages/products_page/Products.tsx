import ProductHeader from '@/modules/products-shop-header'
import Sidebar from '@/modules/sidebar'

const Products = () => {
  return (
    <div className='grid grid-cols-12 gap-x-4 py-10'>
      <div className='col-span-3 lg:block hidden'>
        <Sidebar />
      </div>
      <div className='col-span-full lg:col-span-9'>
        <ProductHeader />
      </div>
    </div>
  )
}

export default Products
