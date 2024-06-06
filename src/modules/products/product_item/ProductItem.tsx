import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import Rating from '@/components/ui/rating'

type Props = {
  star: number
}

const ProductItem = (props: Props) => {
  const { star } = props
  return (
    <Card className='overflow-hidden border-none'>
      <div className='relative w-full group'>
        <img
          src='https://images.unsplash.com/photo-1717677737586-99affb851595?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D'
          alt='productImg'
          className='w-full max-h-[250px] xl:max-h-[280px] bg-cover'
        />
        <Button className='absolute bottom-0 left-0 right-0 w-full py-4 transition-all duration-500 ease-in-out rounded-none opacity-0 group-hover:opacity-100'>
          Add to cart
        </Button>
      </div>
      <CardTitle className='mt-2 text-lg font-semibold'>Breed Dry Dog Food</CardTitle>
      <CardDescription className='flex items-center justify-between'>
        <span className='font-bold text-red-500'>$100</span>
        <Rating val={star} />
      </CardDescription>
    </Card>
  )
}

export default ProductItem
