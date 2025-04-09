import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Minus, Plus } from '@phosphor-icons/react'
import styles from '@/modules/products/product_counter/ProductCounter.module.scss'
import { ChangeEvent, useState } from 'react'
import { InputCounterType } from '@/types/common.type'
import { InputCounter } from '@/constants/common.constant'

type Props = {
  productId: number
  productQuantity?: number
  className?: string
  type: InputCounterType
}

const ProductCounter = (props: Props) => {
  const { productId, productQuantity, className, type } = props
  const [quantity, setQuantity] = useState<number>(productQuantity ?? 0)
  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value))
  }

  const handleDecreaseQuantity = () => {
    console.log(productId)
    setQuantity((prev) => (prev ? prev - 1 : prev))
  }

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }
  return (
    <div className={`flex gap-x-1 ${className}`}>
      <Button
        variant='outline'
        className='bg-black text-white hover:bg-gray-700 hover:text-white dark:bg-gray-300 dark:text-black dark:hover:text-black dark:hover:bg-gray-500'
        size='icon'
        disabled={quantity === 0}
        onClick={handleDecreaseQuantity}
      >
        <Minus size={14} weight='bold' />
      </Button>
      <Input
        type='number'
        className={`w-16 lg:w-20 text-center outline-none focus-visible:ring-0 dark:bg-white dark:text-black font-bold ${styles.removeArrows}`}
        value={quantity.toString()}
        disabled={type === InputCounter.CART}
        onChange={handleChangeValue}
      />
      <Button
        variant='outline'
        className='bg-black text-white hover:bg-gray-700 hover:text-white dark:bg-gray-300 dark:text-black dark:hover:text-black dark:hover:bg-gray-500'
        size='icon'
        onClick={handleIncreaseQuantity}
      >
        <Plus size={14} weight='bold' />
      </Button>
    </div>
  )
}

export default ProductCounter
