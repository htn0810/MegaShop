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
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTrigger } from '@/components/ui/sheet'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import Sidebar from '@/modules/sidebar'
import { Funnel, List, SquaresFour } from '@phosphor-icons/react'
import { useState, useEffect } from 'react'

const ProductHeader = () => {
  const [sortPrice, setSortPrice] = useState<string>('none')
  useEffect(() => {
    console.log(sortPrice)
  }, [sortPrice])
  return (
    <div className='md:bg-gray-100 w-full rounded-md flex justify-between md:px-4 md:py-2'>
      <div className='flex md:gap-x-6 gap-x-1'>
        <Select value={sortPrice === 'none' ? undefined : sortPrice} onValueChange={setSortPrice}>
          <SelectTrigger
            className={`w-28 focus:ring-0 focus:ring-offset-0 border-gray-400 bg-gray-200 font-semibold ${sortPrice !== 'none' ? 'bg-gray-900 text-white' : undefined}`}
          >
            <SelectValue placeholder='Giá' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className='font-bold'>Giá</SelectLabel>
              <SelectItem value='asc' className='font-semibold'>
                Tăng dần
              </SelectItem>
              <SelectItem value='des' className='font-semibold' onClick={() => setSortPrice('des')}>
                Giảm dần
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <ToggleGroup type='multiple' className='md:gap-x-6 gap-x-1'>
          <ToggleGroupItem
            value='a'
            className='bg-gray-200 border border-gray-400 data-[state=on]:bg-gray-900 data-[state=on]:text-white px-2 md:px-3'
          >
            Mới nhất
          </ToggleGroupItem>
          <ToggleGroupItem
            value='b'
            className='bg-gray-200 border border-gray-400 data-[state=on]:bg-gray-900 data-[state=on]:text-white px-2 md:px-3'
          >
            Bán chạy
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className='flex gap-x-1'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' className='bg-gray-200 border border-gray-400 text-black px-2 md:px-3'>
              <Funnel size={24} weight='bold' />
            </Button>
          </SheetTrigger>
          <SheetContent className='bg-gray-100'>
            <ScrollArea className='h-[90%] w-full rounded-md'>
              <Sidebar></Sidebar>
            </ScrollArea>
            <SheetFooter>
              <div className='flex gap-x-2 justify-center'>
                <SheetClose asChild>
                  <Button type='submit'>Reset all</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button type='submit'>Save changes</Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <ToggleGroup type='single' defaultValue='grid'>
          <ToggleGroupItem
            value='grid'
            className='bg-gray-200 border border-gray-400 text-black data-[state=on]:bg-gray-900 data-[state=on]:text-white px-2 md:px-3'
          >
            <SquaresFour size={24} weight='bold' />
          </ToggleGroupItem>
          <ToggleGroupItem
            value='list'
            className='bg-gray-200 border-gray-400 border text-black data-[state=on]:bg-gray-900 data-[state=on]:text-white px-2 md:px-3'
          >
            <List size={24} weight='bold' />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}

export default ProductHeader
