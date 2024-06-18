import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Color, COLORS } from '@/constants/common.constant'
import { useId } from 'react'
import { useTranslation } from 'react-i18next'

const SelectColor = () => {
  const { t } = useTranslation()
  const generateClass = (color: Color) => {
    let clx: string = 'border-[1px] border-gray-300'
    switch (color) {
      case 'red':
        clx += ' text-red-300 bg-red-500'
        break
      case 'blue':
        clx += ' text-blue-300 bg-blue-500'
        break
      case 'pink':
        clx += ' text-pink-300 bg-pink-500'
        break
      case 'black':
        clx += ' text-gray-600 bg-black'
        break
      case 'white':
        clx += ' text-gray-200 bg-white'
        break
      default:
        clx += ' text-gray-100 bg-white'
        break
    }
    return clx
  }
  return (
    <div className='flex'>
      <span className='basis-1/5'>{t('product_detail.select_color')}</span>
      <RadioGroup defaultValue='comfortable' className='flex'>
        <div className='flex items-center space-x-4'>
          {COLORS.map((color) => (
            <div className='relative flex items-center' key={useId()}>
              <RadioGroupItem
                value={color}
                id={color}
                className={generateClass(color)}
                disabled={color === 'black' ? true : false}
              />
              {color === 'black' && (
                <>
                  <span className='border-b-2 border-b-black dark:border-b-white absolute w-full stroke-black bottom-[40%] right-0 rotate-45 -translate-y-1/2'></span>
                  <span className='border-b-2 border-b-black dark:border-b-white absolute w-full stroke-black bottom-[40%] right-0 -rotate-45 -translate-y-1/2'></span>
                </>
              )}
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export default SelectColor
