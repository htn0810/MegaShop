import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Sheet, SheetContent, SheetFooter, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import Sidebar from '@/modules/sidebar'
import { FiltersProduct, Layout } from '@/types/common.type'
import { Funnel, List, SquaresFour } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'

type Props = {
  layout: Layout
  changeLayout: (val: Layout | ((prev: Layout) => Layout)) => void
  sort: 'asc' | 'desc' | null
  setSort: React.Dispatch<React.SetStateAction<'asc' | 'desc' | null>>
  filters: FiltersProduct
  setFilters: React.Dispatch<React.SetStateAction<FiltersProduct>>
}

const ProductHeader = (props: Props) => {
  const { layout, changeLayout, sort, setSort, filters, setFilters } = props
  const { t } = useTranslation()

  const handleChangeLayout = (e: Layout | '') => {
    localStorage.setItem('layout', e)
    changeLayout((prev) => (e !== '' ? e : prev))
  }

  const getDefaultToggleGroupValues = () => {
    if (filters.newest && filters.bestSelling) {
      return ['newest', 'best_selling']
    }
    if (filters.newest) {
      return ['newest']
    }
    if (filters.bestSelling) {
      return ['best_selling']
    }
    return []
  }

  return (
    <div className='md:bg-gray-100 w-full rounded-md flex justify-between md:px-4 md:py-2 gap-x-1 md:dark:bg-gray-700'>
      <div className='flex md:gap-x-6 gap-x-1'>
        <Select value={sort ?? undefined} onValueChange={(val) => setSort(val as 'asc' | 'desc' | null)}>
          <SelectTrigger
            className={`w-20 md:w-28 focus:ring-0 focus:ring-offset-0 border-gray-400 bg-gray-200 font-semibold pl-2 md:pl-3 dark:bg-gray-800 dark:border-black dark:text-white ${sort ? 'bg-gray-900 dark:bg-gray-500 text-white dark:text-black' : undefined}`}
          >
            <SelectValue placeholder={t('products.product_header.price')} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className='font-bold'>{t('products.product_header.price')}</SelectLabel>
              <SelectItem value='asc' className='font-semibold'>
                {t('products.product_header.asc')}
              </SelectItem>
              <SelectItem value='desc' className='font-semibold'>
                {t('products.product_header.des')}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <ToggleGroup type='multiple' className='md:gap-x-6 gap-x-1' value={getDefaultToggleGroupValues()}>
          <ToggleGroupItem
            value='newest'
            onClick={() => setFilters({ ...filters, newest: !filters.newest })}
            className='bg-gray-200 border border-gray-400 data-[state=on]:bg-gray-900 data-[state=on]:text-white px-2 md:px-3 dark:bg-gray-800 dark:border-black dark:text-white dark:data-[state=on]:bg-gray-500 dark:data-[state=on]:text-black'
          >
            {t('products.product_header.newest')}
          </ToggleGroupItem>
          <ToggleGroupItem
            value='best_selling'
            onClick={() => setFilters({ ...filters, bestSelling: !filters.bestSelling })}
            className='bg-gray-200 border border-gray-400 data-[state=on]:bg-gray-900 data-[state=on]:text-white px-2 md:px-3 dark:bg-gray-800 dark:border-black dark:text-white dark:data-[state=on]:bg-gray-500 dark:data-[state=on]:text-black'
          >
            {t('products.product_header.best_seller')}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className='flex gap-x-1'>
        <Sheet>
          <SheetTrigger asChild className='lg:hidden'>
            <Button
              variant='outline'
              className='bg-gray-200 border border-gray-400 text-black px-2 md:px-3 dark:bg-gray-800 dark:border-black dark:text-white'
            >
              <Funnel size={24} weight='bold' />
            </Button>
          </SheetTrigger>
          <SheetTitle className='hidden' />
          <SheetContent className='bg-gray-100 dark:bg-gray-700'>
            <ScrollArea className='h-[90%] w-full rounded-md'>
              <Sidebar filters={filters} setFilters={setFilters} />
            </ScrollArea>
            <SheetFooter className='hidden' />
          </SheetContent>
        </Sheet>
        <ToggleGroup type='single' value={layout} onValueChange={handleChangeLayout}>
          <ToggleGroupItem
            value='grid'
            className='bg-gray-200 border border-gray-400 text-black data-[state=on]:bg-gray-900 data-[state=on]:text-white px-2 md:px-3 dark:bg-gray-800 dark:border-black dark:text-white dark:data-[state=on]:bg-gray-500 dark:data-[state=on]:text-black'
          >
            <SquaresFour size={24} weight='bold' />
          </ToggleGroupItem>
          <ToggleGroupItem
            value='list'
            className='bg-gray-200 border-gray-400 border text-black data-[state=on]:bg-gray-900 data-[state=on]:text-white px-2 md:px-3 dark:bg-gray-800 dark:border-black dark:text-white dark:data-[state=on]:bg-gray-500 dark:data-[state=on]:text-black'
          >
            <List size={24} weight='bold' />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}

export default ProductHeader
