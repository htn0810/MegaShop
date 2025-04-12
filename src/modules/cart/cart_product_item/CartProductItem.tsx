import { ICartProduct } from '@/apis/cart/cartInterface'
import { Checkbox } from '@/components/ui/checkbox'
import { InputCounter } from '@/constants/common.constant'
import ProductCounter from '@/modules/products/product_counter'
import { useCartStore } from '@/store/cartStore'
import { Trash } from '@phosphor-icons/react'
import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  product: ICartProduct
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDeleteProduct: (productId: number) => Promise<AxiosResponse<any, any>>
}

const CartProductItem = (props: Props) => {
  const { product, onDeleteProduct } = props
  const { removeFromCart, cart, addProductToReview, removeProductFromReview } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const handleDeleteProduct = async () => {
    setIsLoading(true)
    toast.promise(onDeleteProduct(product.productId), {
      loading: 'Deleting product...',
      success: (_response) => {
        removeFromCart(product.productId, product.shopId)
        return 'Product deleted successfully'
      },
      finally: () => {
        setIsLoading(false)
      },
    })
  }

  const handleSelectProduct = (checkedState: boolean) => {
    if (checkedState) {
      addProductToReview(product)
    } else {
      removeProductFromReview(product)
    }
  }

  useEffect(() => {
    if (cart && cart?.cartProductsGroupByShop?.length > 0) {
      const groupedProductByShopId = cart.cartProductsGroupByShop.find((grouped) => grouped.shopId === product.shopId)
      if (groupedProductByShopId) {
        setIsChecked(
          groupedProductByShopId.products.some((item) => item.productId === product.productId && item.isChecked),
        )
      }
    }
  }, [cart?.cartProductsGroupByShop])

  return (
    <div key={product.id}>
      <div
        className={`grid grid-cols-8 p-2 md:p-4 shadow-gray-200 shadow-sm rounded-md mt-4 items-center ${isLoading ? 'animate-pulse pointer-events-none' : ''}`}
      >
        <div className='hidden md:flex col-span-3 gap-x-2 md:gap-x-4 items-center'>
          <Checkbox id='product' onCheckedChange={handleSelectProduct} checked={isChecked} />
          <img src={product.image} alt='ProductImg' className='w-12 xs:w-16 xs:h-16 md:w-20 md:h-20' />
          <span className='truncate font-semibold'>{product.name}</span>
        </div>
        <div className='hidden md:block text-center'>${product.price.toLocaleString()}</div>
        <ProductCounter
          productId={product.productId}
          shopId={product.shopId}
          productQuantity={product.quantity}
          className='hidden md:flex justify-center col-span-2'
          type={InputCounter.CART}
        />
        <div className='hidden md:block text-center'>${(product.price * product.quantity).toLocaleString()}</div>
        <div className='hidden md:flex justify-end'>
          <Trash size={18} weight='bold' className='hover:text-red-500 cursor-pointer' onClick={handleDeleteProduct} />
        </div>

        {/* Screen tablet -> mobile */}
        <div className='flex md:hidden col-span-8 gap-x-2'>
          <div className='flex w-fit items-center gap-x-2'>
            <Checkbox id='product' onCheckedChange={handleSelectProduct} checked={isChecked} />
            <div className='w-12 xs:w-16 xs:h-16 md:w-20 md:h-20'>
              <img src={product.image} alt='ProductImg' className='size-full object-cover' />
            </div>
          </div>
          <div className='flex flex-col gap-y-2 w-full'>
            <div className='grid grid-cols-8 gap-x-2 items-center'>
              <span className='text-sm md:text-base font-semibold col-span-7 truncate'>{product.name}</span>
              <div className='flex justify-end'>
                <Trash
                  size={18}
                  weight='bold'
                  className='col-span-1  hover:text-red-500'
                  onClick={handleDeleteProduct}
                />
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-[10px] md:text-sm font-semibold text-gray-600'>
                ${product.price.toLocaleString()}
              </span>
              <ProductCounter
                productId={product.productId}
                shopId={product.shopId}
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
