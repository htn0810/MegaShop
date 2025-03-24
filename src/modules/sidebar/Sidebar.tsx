import { DUMMY_CATEGORY } from '@/assets/dummyDatas/category'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import styles from '@/assets/styles/common.module.scss'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

type PriceRange = {
  minPrice: number
  maxPrice: number
}

const Sidebar = () => {
  const { t } = useTranslation()
  const [priceRange, setPriceRange] = useState<PriceRange>({ minPrice: 1000, maxPrice: 5000000 })
  const handleValueChange = (valueRange: number[]) => {
    setPriceRange({ minPrice: valueRange[0], maxPrice: valueRange[1] })
  }

  const handleRangeInputChange = (e: ChangeEvent<HTMLInputElement>, type: 'max' | 'min') => {
    const currentValue = Number(e.target.value.split(',').join(''))
    if (type === 'max') {
      if (currentValue > priceRange.minPrice && currentValue <= 20000000) {
        setPriceRange((prev) => ({ ...prev, maxPrice: Number(e.target.value.split(',').join('')) }))
      }
    } else {
      if (currentValue < priceRange.maxPrice && currentValue >= 0) {
        setPriceRange((prev) => ({ ...prev, minPrice: Number(e.target.value.split(',').join('')) }))
      }
    }
  }

  const handlePreventCharacter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      event.code == 'ArrowLeft' ||
      event.code == 'ArrowRight' ||
      event.code == 'ArrowUp' ||
      event.code == 'ArrowDown' ||
      event.code == 'Delete' ||
      event.code == 'Backspace'
    ) {
      return
    } else if (event.key.search(/\d/) == -1) {
      event.preventDefault()
    }
  }
  return (
    <section className='w-full bg-gray-100 py-4 px-2 md:px-4 rounded-md dark:bg-gray-700'>
      <div className='border-b-gray-300 border-b'>
        <h4 className='font-bold text-lg mb-4'>{t('products.product_sidebar.category')}</h4>
        {DUMMY_CATEGORY.map((cate) => (
          <div className='flex items-center space-x-2 md:space-x-4 md:mb-4 mb-2' key={cate.id}>
            <Checkbox id={cate.name} className='w-4 h-4 md:w-5 md:h-5 hover:bg-gray-400' />
            <label
              htmlFor={cate.name}
              className='text-sm md:text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer hover:text-gray-400'
            >
              {cate.name}
            </label>
          </div>
        ))}
      </div>
      <div className='mt-4 pb-4 border-b-gray-300 border-b'>
        <h4 className='font-bold text-lg mb-4'>{t('products.product_sidebar.prices')}</h4>
        <Slider
          value={[priceRange.minPrice, priceRange.maxPrice]}
          defaultValue={[priceRange.minPrice, priceRange.maxPrice]}
          minStepsBetweenThumbs={1000000}
          max={20000000}
          min={0}
          step={1}
          onValueChange={handleValueChange}
          className='w-full'
        />
        <div className='grid md:grid-cols-2 gap-2 mt-4'>
          <div className='relative'>
            <Input
              placeholder='Min'
              className={`focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-black focus-visible:border-2 ${styles.removeArrowsInputNumber}`}
              type='text'
              value={priceRange.minPrice.toLocaleString() || 0}
              onChange={(e) => handleRangeInputChange(e, 'min')}
              onKeyDown={handlePreventCharacter}
            />
            <span className='absolute -top-1 right-2 translate-y-1/2 font-semibold text-gray-400'>
              {t('products.product_sidebar.currency')}
            </span>
          </div>
          <div className='relative'>
            <Input
              placeholder='Max'
              className={`focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-black focus-visible:border-2 ${styles.removeArrowsInputNumber}`}
              type='text'
              onChange={(e) => handleRangeInputChange(e, 'max')}
              onKeyDown={handlePreventCharacter}
              value={priceRange.maxPrice.toLocaleString() || 50000000}
            />
            <span className='absolute -top-1 right-2 translate-y-1/2 font-semibold text-gray-400'>
              {t('products.product_sidebar.currency')}
            </span>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <h4 className='font-bold text-lg mb-4'>{t('products.product_sidebar.popular_brand')}</h4>
        {DUMMY_CATEGORY.map((cate) => (
          <div className='flex items-center space-x-2 md:space-x-4 md:mb-4 mb-2' key={cate.id}>
            <Checkbox id={cate.name} className='w-4 h-4 md:w-5 md:h-5 hover:bg-gray-400' />
            <label
              htmlFor={cate.name}
              className='text-sm md:text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer hover:text-gray-400'
            >
              {cate.name}
            </label>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Sidebar
