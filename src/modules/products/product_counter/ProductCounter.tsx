import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Minus, Plus, ShoppingCart } from '@phosphor-icons/react'
import styles from '@/modules/products/product_counter/ProductCounter.module.scss'
import { ChangeEvent, useState } from 'react'
import { InputCounterType } from '@/types/common.type'
import { InputCounter } from '@/constants/common.constant'
import { useTranslation } from 'react-i18next'
import { CartAPI } from '@/apis/cart/cart'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { ICartProduct } from '@/apis/cart/cartInterface'

type Props = {
  productId: number
  shopId: number
  productQuantity?: number
  className?: string
  type: InputCounterType
}

const ProductCounter = (props: Props) => {
  const { productId, shopId, productQuantity, className, type } = props
  const { t } = useTranslation()
  const { addToCart, decreaseQuantity, increaseQuantity } = useCartStore()
  const [quantity, setQuantity] = useState<number>(productQuantity ?? 0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value))
  }

  const handleDecreaseQuantity = async () => {
    try {
      setIsLoading(true)
      await CartAPI.decreaseQuantity(productId)
      decreaseQuantity(productId, shopId)
    } finally {
      setIsLoading(false)
    }
  }

  const handleIncreaseQuantity = async () => {
    try {
      setIsLoading(true)
      await CartAPI.increaseQuantity(productId)
      increaseQuantity(productId, shopId)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToCart = () => {
    setIsLoading(true)
    toast.promise(CartAPI.addToCart(productId, quantity), {
      loading: 'Adding to cart...',
      success: (response) => {
        const addedProduct = response.data.data.cartProducts.find(
          (product: ICartProduct) => product.productId === productId,
        )
        addToCart(addedProduct, addedProduct.shopId, quantity)
        return 'Added to cart'
      },
      finally: () => {
        setIsLoading(false)
      },
    })
  }
  return (
    <>
      <div className={`flex xs:gap-x-1 ${className}`}>
        <Button
          variant='outline'
          className='size-8 md:size-10 bg-black text-white hover:bg-gray-700 hover:text-white dark:bg-gray-300 dark:text-black dark:hover:text-black dark:hover:bg-gray-500'
          size='icon'
          disabled={quantity === 0 || isLoading}
          onClick={handleDecreaseQuantity}
        >
          <Minus size={10} md:size-14 weight='bold' />
        </Button>
        <Input
          type='number'
          className={`w-10 sm:w-12 md:w-16 lg:w-20 h-8 md:h-10 text-xs md:text-sm lg:text-base text-center outline-none focus-visible:ring-0 dark:bg-white dark:text-black font-bold ${styles.removeArrows}`}
          value={quantity.toString()}
          disabled={type === InputCounter.CART || isLoading}
          onChange={handleChangeValue}
        />
        <Button
          variant='outline'
          className='size-8 md:size-10 bg-black text-white hover:bg-gray-700 hover:text-white dark:bg-gray-300 dark:text-black dark:hover:text-black dark:hover:bg-gray-500'
          size='icon'
          disabled={isLoading}
          onClick={handleIncreaseQuantity}
        >
          <Plus size={10} md:size-14 weight='bold' />
        </Button>
      </div>
      {type === InputCounter.PRODUCT_DETAIL && (
        <Button
          variant='outline'
          className='flex gap-x-2 items-center bg-black text-white hover:bg-gray-700 hover:text-white dark:bg-gray-300 dark:text-black dark:hover:text-black dark:hover:bg-gray-500'
          disabled={quantity === 0 || isLoading}
          onClick={handleAddToCart}
        >
          <>
            {!isLoading && <ShoppingCart size={14} weight='bold' />}
            {isLoading && <Loader2 className='animate-spin' size={14} />}
            <span>{t('product_detail.add_to_cart')}</span>
          </>
        </Button>
      )}
    </>
  )
}

export default ProductCounter
