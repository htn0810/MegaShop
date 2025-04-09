import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useParams } from 'react-router-dom'
import ShopAPI from '@/apis/shop/shop'
import { IShop } from '@/apis/shop/shopInterfaces'
import { DEFAULT_SHOP_AVATAR, DEFAULT_SHOP_COVER } from '@/constants/common.constant'
import { Skeleton } from '@/components/ui/skeleton'
import ShopTabs from '@/modules/shop/shop_tabs'

const Shop = () => {
  const { id } = useParams()
  const [shop, setShop] = useState<IShop | null>(null)
  const [isLoadingShopInfo, setIsLoadingShopInfo] = useState(false)

  const handleGetShopById = async () => {
    try {
      setIsLoadingShopInfo(true)
      const response = await ShopAPI.getShopById(Number(id))
      setShop(response.data.data)
    } finally {
      setIsLoadingShopInfo(false)
    }
  }

  useEffect(() => {
    handleGetShopById()
  }, [id])

  return (
    <div className='min-h-screen bg-background'>
      {isLoadingShopInfo && <ShopInfoSkeleton />}
      {!isLoadingShopInfo && (
        <>
          {/* Cover Image */}
          <div className='relative h-64 md:h-80 w-full overflow-hidden'>
            <img src={shop?.coverUrl || DEFAULT_SHOP_COVER} alt='Shop Cover' className='w-full h-full object-cover' />
            <div className='absolute inset-0 bg-black/30' />
          </div>

          {/* Shop Info */}
          <div className='container mx-auto px-0 -mt-16 relative z-10'>
            <div className='flex flex-col md:flex-row items-center md:items-end gap-4 mb-8'>
              <Avatar className='h-24 w-24 md:h-32 md:w-32 border-4 border-background'>
                <AvatarImage src={shop?.avatarUrl || DEFAULT_SHOP_AVATAR} alt={shop?.name || ''} />
                <AvatarFallback>{shop?.name?.charAt(0) || ''}</AvatarFallback>
              </Avatar>
              <div className='text-center md:text-left'>
                <h1 className='text-2xl md:text-3xl font-bold text-foreground'>{shop?.name}</h1>
                <p className='text-muted-foreground'>123 Products • 4.5 ★</p>
              </div>
            </div>
          </div>
        </>
      )}
      <ShopTabs shopId={Number(id)} />
    </div>
  )
}

// Shop Info Skeleton Component
const ShopInfoSkeleton = () => {
  return (
    <>
      {/* Cover Image Skeleton */}
      <div className='relative h-64 md:h-80 w-full overflow-hidden'>
        <Skeleton className='w-full h-full bg-gray-200' />
      </div>

      {/* Shop Info Skeleton */}
      <div className='container mx-auto px-0 -mt-16 relative z-10'>
        <div className='flex flex-col md:flex-row items-center md:items-end gap-4 mb-8'>
          {/* Avatar Skeleton */}
          <Skeleton className='h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-background bg-gray-200' />

          <div className='flex flex-col items-center text-center md:text-left w-full md:w-auto'>
            <Skeleton className='h-8 w-48 md:w-64 mb-2' />
            <Skeleton className='h-4 w-32 md:w-40' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Shop
