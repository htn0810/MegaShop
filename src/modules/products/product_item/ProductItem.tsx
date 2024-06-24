import { IProduct } from '@/assets/dummyDatas/dummyModels'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import Rating from '@/components/ui/rating'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type Props = {
  product: IProduct
  isShowAtCarousel?: boolean
}

const ProductItem = (props: Props) => {
  const { product, isShowAtCarousel } = props
  return (
    <Card className='overflow-hidden border-none shadow-none cursor-pointer'>
      <div className='relative w-full group'>
        <img
          src={product.image}
          alt='productImg'
          className={`w-full sm:h-[250px] xl:h-[280px] bg-cover ${isShowAtCarousel ? 'h-[320px]' : 'h-[220px]'}`}
        />
        <Button className='absolute bottom-0 left-0 right-0 w-full py-4 transition-all duration-500 ease-in-out rounded-none opacity-0 group-hover:opacity-100'>
          Add to cart
        </Button>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <CardTitle className='my-2 text-lg font-semibold truncate'>{product.name}</CardTitle>
          </TooltipTrigger>
          <TooltipContent>
            <p>{product.name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CardDescription className='flex items-center justify-between '>
        <span className='font-bold text-red-500'>${product.price}</span>
        <Rating val={product.rating} />
      </CardDescription>
    </Card>
  )
}

export default ProductItem
