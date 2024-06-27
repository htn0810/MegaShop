import { Button } from '@/components/ui/button'
import ProductCounter from '@/modules/products/product_counter'
import { Trash } from '@phosphor-icons/react'
const Cart = () => {
  return (
    <section className='py-6'>
      <ul className='hidden md:grid grid-cols-8 p-4 shadow-gray-200 shadow-sm rounded-md font-semibold'>
        <li className='col-span-3'>Product</li>
        <li className='text-center'>Price</li>
        <li className='text-center col-span-2'>Quantity</li>
        <li className='text-center'>Subtotal</li>
        <li className='text-center'>Action</li>
      </ul>
      <div className='grid grid-cols-8 p-2 md:p-4 shadow-gray-200 shadow-sm rounded-md mt-4 items-center'>
        <div className='hidden md:flex col-span-3 gap-x-2 md:gap-x-4 items-center'>
          <img
            src='https://images.unsplash.com/photo-1718871395011-32cafdd68d4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8'
            alt='ProductImg'
            className='w-20 h-20'
          />
          <span className='truncate font-semibold'>LCD Monitor</span>
        </div>
        <div className='hidden md:block text-center'>$650</div>
        <ProductCounter value={5} className='hidden md:flex justify-center col-span-2' />
        <div className='hidden md:block text-center'>$650</div>
        <div className='hidden md:block text-center'>
          <Button className='bg-red-500 px-3 py-1 hover:bg-red-300'>
            <Trash size={18} weight='bold' />
          </Button>
        </div>

        {/* Screen tablet -> mobile */}
        <div className='flex md:hidden col-span-8 gap-x-2'>
          <img
            src='https://images.unsplash.com/photo-1718871395011-32cafdd68d4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8'
            alt='ProductImg'
            className='w-16 h-16'
          />
          <div className='flex flex-col gap-y-2 w-full'>
            <div className='grid grid-cols-8 gap-x-2 items-center'>
              <span className='font-semibold col-span-7 truncate'>
                LCD Monitorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
              </span>
              <div className='flex justify-end'>
                <Trash size={18} weight='bold' className='col-span-1  hover:text-red-500' />
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-sm font-semibold text-gray-600'>$650</span>
              <ProductCounter value={5} className='justify-center' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
