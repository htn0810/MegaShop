import { Button } from '@/components/ui/button'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useTranslation } from 'react-i18next'

const SelectSize = () => {
  const { t } = useTranslation()
  const [selectedSize, setSelectedSize] = useState<string>('')
  return (
    <div className='flex items-center'>
      <span className='basis-1/5'>{t('product_detail.size')}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='w-32 dark:bg-white dark:text-black dark:border-gray-600'>
            {selectedSize !== '' ? selectedSize.toUpperCase() : t('product_detail.size').slice(0, -1)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-32 dark:bg-white dark:text-black dark:border-gray-600'>
          <DropdownMenuRadioGroup value={selectedSize} onValueChange={setSelectedSize}>
            <DropdownMenuRadioItem value='S'>S</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='M'>M</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='L'>L</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='XL'>XL</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default SelectSize
