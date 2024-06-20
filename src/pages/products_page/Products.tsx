import Sidebar from '@/modules/sidebar'

const Products = () => {
  return (
    <div className='grid grid-cols-12 gap-x-4 py-10'>
      <div className='col-span-3'>
        <Sidebar />
      </div>
      <div className='col-span-9 bg-blue-500'>Product nè</div>
    </div>
  )
}

export default Products
