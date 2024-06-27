import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Minus, Plus } from '@phosphor-icons/react'
import styles from '@/modules/products/product_counter/ProductCounter.module.scss'
import { ChangeEvent, useState } from 'react'

type Props = {
  value?: number
  className?: string
}

const ProductCounter = (props: Props) => {
  const { value, className } = props
  const [quantity, setQuantity] = useState<number>(value ?? 0)
  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value))
  }
  return (
    <div className={`flex gap-x-1 ${className}`}>
      <Button
        variant='outline'
        className='bg-black text-white hover:bg-gray-700 hover:text-white dark:bg-gray-300 dark:text-black dark:hover:text-black dark:hover:bg-gray-500'
        size='icon'
        disabled={quantity === 0}
        onClick={() => setQuantity((prev) => (prev ? prev - 1 : prev))}
      >
        <Minus size={14} weight='bold' />
      </Button>
      <Input
        type='number'
        className={`md:w-24 w-16 text-center outline-none focus-visible:ring-0 dark:bg-white dark:text-black font-bold ${styles.removeArrows}`}
        // min={0}
        value={quantity.toString()}
        onChange={handleChangeValue}
      />
      <Button
        variant='outline'
        className='bg-black text-white hover:bg-gray-700 hover:text-white dark:bg-gray-300 dark:text-black dark:hover:text-black dark:hover:bg-gray-500'
        size='icon'
        onClick={() => setQuantity((prev) => prev + 1)}
      >
        <Plus size={14} weight='bold' />
      </Button>
    </div>
  )
}

export default ProductCounter
