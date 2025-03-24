import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTrigger } from '@/components/ui/sheet'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import Sidebar from '@/modules/sidebar'
import { Layout } from '@/types/common.type'
import { Funnel, List, SquaresFour } from '@phosphor-icons/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  layout: Layout
  changeLayout: (val: Layout | ((prev: Layout) => Layout)) => void
}

const ProductHeader = (props: Props) => {
  const { layout, changeLayout } = props
  const { t } = useTranslation()
  const [sortPrice, setSortPrice] = useState<string>('none')

  const handleChangeLayout = (e: Layout | '') => {
    changeLayout((prev) => (e !== '' ? e : prev))
  }

  return (
    <div className='md:bg-gray-100 w-full rounded-md flex justify-between md:px-4 md:py-2 gap-x-1 md:dark:bg-gray-700'>
      <div className='flex md:gap-x-6 gap-x-1'>
        <Select value={sortPrice === 'none' ? undefined : sortPrice} onValueChange={setSortPrice}>
          <SelectTrigger
            className={`w-20 md:w-28 focus:ring-0 focus:ring-offset-0 border-gray-400 bg-gray-200 font-semibold pl-2 md:pl-3 dark:bg-gray-800 dark:border-black dark:text-white ${sortPrice !== 'none' ? 'bg-gray-900 dark:bg-gray-500 text-white dark:text-black' : undefined}`}
          >
            <SelectValue placeholder={t('products.product_header.price')} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className='font-bold'>{t('products.product_header.price')}</SelectLabel>
              <SelectItem value='asc' className='font-semibold'>
                {t('products.product_header.asc')}
              </SelectItem>
              <SelectItem value='des' className='font-semibold'>
                {t('products.product_header.des')}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <ToggleGroup type='multiple' className='md:gap-x-6 gap-x-1'>
          <ToggleGroupItem
            value='a'
            className='bg-gray-200 border border-gray-400 data-[state=on]:bg-gray-900 data-[state=on]:text-white px-2 md:px-3 dark:bg-gray-800 dark:border-black dark:text-white dark:data-[state=on]:bg-gray-500 dark:data-[state=on]:text-black'
          >
            {t('products.product_header.newest')}
          </ToggleGroupItem>
          <ToggleGroupItem
            value='b'
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
          <SheetContent className='bg-gray-100 dark:bg-gray-700'>
            <ScrollArea className='h-[90%] w-full rounded-md'>
              <Sidebar></Sidebar>
            </ScrollArea>
            <SheetFooter>
              <div className='flex gap-x-2 justify-center'>
                <SheetClose asChild>
                  <Button type='submit'>{t('products.product_header.reset_btn')}</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button type='submit'>{t('products.product_header.apply_btn')}</Button>
                </SheetClose>
              </div>
            </SheetFooter>
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
