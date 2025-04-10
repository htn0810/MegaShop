import { Skeleton } from '@/components/ui/skeleton'
import { Checkbox } from '@/components/ui/checkbox'
import { Trash } from '@phosphor-icons/react'
import CartProductItemSkeleton from '@/modules/cart/cart_product_item/CartProductItemSkeleton'

const CartProductsGroupSkeleton = () => {
  return (
    <>
      {/* Header for Large Screen */}
      <ul className='hidden md:grid grid-cols-8 p-4 mb-2 shadow-gray-200 shadow-sm rounded-md font-semibold'>
        <li className='col-span-3'>
          <Skeleton className='h-5 w-20' />
        </li>
        <li className='text-center'>
          <Skeleton className='h-5 w-12 mx-auto' />
        </li>
        <li className='text-center col-span-2'>
          <Skeleton className='h-5 w-20 mx-auto' />
        </li>
        <li className='text-center'>
          <Skeleton className='h-5 w-20 mx-auto' />
        </li>
        <li className='text-right'>
          <Skeleton className='h-5 w-16 ml-auto' />
        </li>
      </ul>

      {/* Shop Header for Mobile */}
      <div className='px-2 md:px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md font-bold flex justify-between items-center'>
        <div className='flex items-center gap-x-2 md:gap-x-4'>
          <div className='flex items-center justify-center opacity-50'>
            <Checkbox id='terms-skeleton' disabled />
          </div>
          <Skeleton className='h-5 w-32' />
        </div>
        <div className='opacity-50'>
          <Trash size={18} weight='bold' />
        </div>
      </div>

      {/* Cart Items */}
      {Array(2)
        .fill(0)
        .map((_, index) => (
          <CartProductItemSkeleton key={index} />
        ))}
    </>
  )
}

export default CartProductsGroupSkeleton
