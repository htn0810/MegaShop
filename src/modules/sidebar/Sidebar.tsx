import { DUMMY_CATEGORY } from '@/assets/dummyDatas/category'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'

const Sidebar = () => {
  return (
    <section className='w-full bg-gray-100 py-4 px-2 md:px-4 rounded-md'>
      <div className='border-b-gray-300 border-b'>
        <h4 className='font-bold text-lg mb-4'>CATEGORY</h4>
        {DUMMY_CATEGORY.map((cate) => (
          <div className='flex items-center space-x-2 md:space-x-4 md:mb-4 mb-2'>
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
        <h4 className='font-bold text-lg mb-4'>PRICES</h4>
        <Slider defaultValue={[33]} max={100} step={1} />
        <div className='grid md:grid-cols-2 gap-2 mt-4'>
          <Input
            placeholder='Min'
            className='focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-black focus-visible:border-2'
          />
          <Input
            placeholder='Max'
            className='focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-black focus-visible:border-2'
          />
        </div>
      </div>
      <div className='mt-4'>
        <h4 className='font-bold text-lg mb-4'>POPULAR BRANDS</h4>
        {DUMMY_CATEGORY.map((cate) => (
          <div className='flex items-center space-x-2 md:space-x-4 md:mb-4 mb-2'>
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
