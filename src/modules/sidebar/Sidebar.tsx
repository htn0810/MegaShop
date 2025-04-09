import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import styles from '@/assets/styles/common.module.scss'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Rating from '@/components/ui/rating'
import { CategoryApi } from '@/apis/category/category'
import { ICategoryResponse } from '@/apis/category/categoryInterface'
import { Skeleton } from '@/components/ui/skeleton'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FiltersProduct } from '@/types/common.type'
import { MAX_PRICE_SLIDER, MIN_PRICE_SLIDER, STEP_PRICE_SLIDER } from '@/constants/common.constant'
import { toast } from 'sonner'

type PriceRange = {
  minPrice: number
  maxPrice: number
}

type Props = {
  filters: FiltersProduct
  setFilters: React.Dispatch<React.SetStateAction<FiltersProduct>>
}

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = MAX_PRICE_SLIDER

const Sidebar = (props: Props) => {
  const { filters, setFilters } = props
  const { t } = useTranslation()
  const [priceRange, setPriceRange] = useState<PriceRange>({
    minPrice: filters.minPrice || DEFAULT_MIN_PRICE,
    maxPrice: filters.maxPrice || DEFAULT_MAX_PRICE,
  })
  const [categories, setCategories] = useState<ICategoryResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const handleValueChange = (valueRange: number[]) => {
    setPriceRange({ minPrice: valueRange[0], maxPrice: valueRange[1] })
    setFilters((prev) => ({ ...prev, minPrice: valueRange[0], maxPrice: valueRange[1] }))
  }

  const handleRangeInputChange = (e: ChangeEvent<HTMLInputElement>, type: 'max' | 'min') => {
    const currentValue = Number(e.target.value.split(',').join(''))
    if (type === 'max') {
      if (currentValue <= MAX_PRICE_SLIDER) {
        setPriceRange((prev) => ({ ...prev, maxPrice: Number(e.target.value.split(',').join('')) }))
        setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value.split(',').join('')) }))
      }
    } else {
      if (currentValue >= MIN_PRICE_SLIDER) {
        setPriceRange((prev) => ({ ...prev, minPrice: Number(e.target.value.split(',').join('')) }))
        setFilters((prev) => ({ ...prev, minPrice: Number(e.target.value.split(',').join('')) }))
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

  useEffect(() => {
    handleGetAllCategories()
  }, [])

  useEffect(() => {
    if (filters.minPrice === filters.maxPrice && filters.minPrice === 0) {
      setPriceRange({ minPrice: DEFAULT_MIN_PRICE, maxPrice: DEFAULT_MAX_PRICE })
    }
  }, [filters.minPrice, filters.maxPrice])

  const handleGetAllCategories = async () => {
    try {
      setIsLoading(true)
      const res = await CategoryApi.getAllCategories()
      setCategories(res.data.data)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectRating = (ratingId: number) => {
    if (filters.rating === ratingId) {
      setFilters((prev) => ({ ...prev, rating: 0 }))
    } else {
      setFilters((prev) => ({ ...prev, rating: ratingId }))
    }
  }

  const handleSelectCategory = (val: boolean, id: number) => {
    if (val) {
      setFilters((prev) => ({ ...prev, categoryIds: [...prev.categoryIds, id] }))
    } else {
      setFilters((prev) => ({ ...prev, categoryIds: prev.categoryIds.filter((cateId) => cateId !== id) }))
    }
  }

  const handleBlurInput = (_e: ChangeEvent<HTMLInputElement>, type: 'max' | 'min') => {
    if (priceRange.minPrice > priceRange.maxPrice) {
      toast.error('Min price must be less than max price')
    }
    if (type === 'max') {
      setPriceRange((prev) => ({ ...prev, maxPrice: MAX_PRICE_SLIDER }))
    } else {
      setPriceRange((prev) => ({ ...prev, minPrice: MIN_PRICE_SLIDER }))
    }
  }

  return (
    <section className='w-full bg-gray-100 py-4 px-2 md:px-4 rounded-md dark:bg-gray-700'>
      <div className='border-b-gray-300 border-b'>
        <h4 className='font-bold text-lg mb-4'>{t('products.product_sidebar.category')}</h4>
        {isLoading && Array.from({ length: 6 }).map((_, index) => <CategorySkeleton key={`skeleton-${index}`} />)}
        {!isLoading &&
          categories &&
          categories.map((cate) => (
            <div className='flex items-center space-x-2 md:space-x-4 md:mb-4 mb-2' key={cate.id}>
              <Checkbox
                id={cate.name}
                className='w-4 h-4 md:w-5 md:h-5 hover:bg-gray-400'
                checked={filters.categoryIds.includes(cate.id)}
                onCheckedChange={(val) => handleSelectCategory(val as boolean, cate.id)}
              />
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
          minStepsBetweenThumbs={STEP_PRICE_SLIDER}
          max={MAX_PRICE_SLIDER}
          min={MIN_PRICE_SLIDER}
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
              onBlur={(e) => handleBlurInput(e, 'min')}
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
              onBlur={(e) => handleBlurInput(e, 'max')}
              value={priceRange.maxPrice.toLocaleString() || 50000000}
            />
            <span className='absolute -top-1 right-2 translate-y-1/2 font-semibold text-gray-400'>
              {t('products.product_sidebar.currency')}
            </span>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <h4 className='font-bold text-lg mb-4'>RATING</h4>
        <RadioGroup value={filters.rating === 0 ? '' : filters.rating.toString()} className='flex flex-col space-y-2'>
          {Array.from({ length: 5 }, (_, index) => (
            <div className='flex items-center space-x-2 md:space-x-4' key={index}>
              <RadioGroupItem
                id={`rating-${index}`}
                value={(index + 1).toString()}
                className='w-4 h-4 md:w-5 md:h-5 hover:bg-gray-400'
                onClick={(e) => {
                  e.preventDefault()
                  handleSelectRating(index + 1)
                }}
              />
              <label
                htmlFor={`rating-${index}`}
                className='text-sm md:text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer hover:text-gray-400'
                onClick={() => handleSelectRating(index + 1)}
              >
                <Rating val={index + 1} />
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </section>
  )
}

// Category skeleton component
const CategorySkeleton = () => {
  return (
    <div className='flex items-center space-x-2 md:space-x-4 md:mb-4 mb-2'>
      <Skeleton className='w-4 h-4 md:w-5 md:h-5 rounded-sm bg-gray-300' />
      <Skeleton className='h-4 w-28 md:h-5 md:w-36 bg-gray-300' />
    </div>
  )
}

export default Sidebar
