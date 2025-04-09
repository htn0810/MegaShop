import { ICartProduct } from '@/apis/cart/cartInterface'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { InputCounter } from '@/constants/common.constant'
import ProductCounter from '@/modules/products/product_counter'
import { Trash } from '@phosphor-icons/react'

type Props = {
  product: ICartProduct
}

const CartProductItem = (props: Props) => {
  const { product } = props
  return (
    <div key={product.id}>
      <div className='grid grid-cols-8 p-2 md:p-4 shadow-gray-200 shadow-sm rounded-md mt-4 items-center'>
        <div className='hidden md:flex col-span-3 gap-x-2 md:gap-x-4 items-center'>
          <Checkbox id='product' />
          <img src={product.image} alt='ProductImg' className='w-20 h-20' />
          <span className='truncate font-semibold'>{product.name}</span>
        </div>
        <div className='hidden md:block text-center'>${product.price.toLocaleString()}</div>
        <ProductCounter
          productId={product.id}
          productQuantity={product.quantity}
          className='hidden md:flex justify-center col-span-2'
          type={InputCounter.CART}
        />
        <div className='hidden md:block text-center'>${(product.price * product.quantity).toLocaleString()}</div>
        <div className='hidden md:block text-end'>
          <Button className='bg-red-500 px-3 py-1 hover:bg-red-300'>
            <Trash size={18} weight='bold' />
          </Button>
        </div>

        {/* Screen tablet -> mobile */}
        <div className='flex md:hidden col-span-8 gap-x-2'>
          <div className='flex w-fit items-center gap-x-2'>
            <Checkbox id='product' />
            <div className='w-16 h-16'>
              <img src={product.image} alt='ProductImg' className='size-full object-cover' />
            </div>
          </div>
          <div className='flex flex-col gap-y-2 w-full'>
            <div className='grid grid-cols-8 gap-x-2 items-center'>
              <span className='font-semibold col-span-7 truncate'>{product.name}</span>
              <div className='flex justify-end'>
                <Trash size={18} weight='bold' className='col-span-1  hover:text-red-500' />
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-sm font-semibold text-gray-600'>${product.price.toLocaleString()}</span>
              <ProductCounter
                productId={product.id}
                productQuantity={product.quantity}
                className='justify-center'
                type={InputCounter.CART}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartProductItem
