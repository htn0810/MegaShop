import { CartAPI } from '@/apis/cart/cart'
import { ICartProduct } from '@/apis/cart/cartInterface'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import CartProductItem from '@/modules/cart/cart_product_item'
import { useCartStore } from '@/store/cartStore'
import { Trash } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

type ProductsGroup = {
  shopId: number
  shopName: string
  products: ICartProduct[]
}

type Props = {
  shop: ProductsGroup
}

const CartProductsGroup = (props: Props) => {
  const { shop } = props
  const { t } = useTranslation()
  const { addAllProductsOfShopToReview, removeAllProductsOfShopFromReview, cart, removeAllProductsOfShopFromCart } =
    useCartStore()
  const [isAllProductsChecked, setIsAllProductsChecked] = useState(false)
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteProduct = (productId: number) => {
    return CartAPI.removeFromCart(productId)
  }

  const handleCheckAllProducts = (checked: boolean) => {
    if (checked) {
      addAllProductsOfShopToReview(shop.shopId, shop.products)
    } else {
      removeAllProductsOfShopFromReview(shop.shopId)
    }
  }

  const handleDeleteAllProductsOfShop = (shopId: number) => {
    setIsLoading(true)
    toast.promise(CartAPI.removeAllProductsOfShopFromCart(shopId), {
      loading: 'Removing products...',
      success: (_response) => {
        removeAllProductsOfShopFromCart(shopId)
        return 'Products removed successfully'
      },
      finally: () => {
        setIsLoading(false)
        setIsOpenAlertDialog(false)
      },
    })
  }

  useEffect(() => {
    const groupProductsOfShop = cart?.cartProductsGroupByShop.find((item) => item.shopId === shop.shopId)
    const isCheckedAllProducts = groupProductsOfShop?.products.every((product) => product.isChecked)
    if (isCheckedAllProducts) {
      setIsAllProductsChecked(true)
    } else {
      setIsAllProductsChecked(false)
    }
  }, [cart?.cartProductsGroupByShop])

  return (
    <>
      <ul className='hidden md:grid grid-cols-8 p-4 shadow-gray-200 shadow-sm rounded-md font-semibold'>
        <li className='col-span-3'>{t('cart.product')}</li>
        <li className='text-center'>{t('cart.price')}</li>
        <li className='text-center col-span-2'>{t('cart.quantity')}</li>
        <li className='text-center'>{t('cart.subtotal')}</li>
        <li className='text-right'>{t('cart.action')}</li>
      </ul>
      <div className='mt-6 px-2 md:px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md font-bold flex justify-between items-center'>
        <div className='flex items-center gap-x-2 md:gap-x-4'>
          <Checkbox id='terms' checked={isAllProductsChecked} onCheckedChange={handleCheckAllProducts} />
          <Link to={'/cart'}>{shop.shopName}</Link>
        </div>
        <AlertDialog open={isOpenAlertDialog}>
          <AlertDialogTrigger asChild>
            <Button className='bg-red-500 px-2 lg:px-3 hover:bg-red-300' onClick={() => setIsOpenAlertDialog(true)}>
              <Trash size={14} md:size-16 lg:size-18 weight='bold' />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-sm md:text-base'>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className='text-xs md:text-sm'>
                This action cannot be undone. This will remove all products of <b>{shop.shopName}</b> from your cart.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className='flex flex-row gap-x-2 justify-end items-center'>
              <AlertDialogCancel
                className={`mt-0 dark:bg-gray-800 dark:text-white ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
                onClick={() => setIsOpenAlertDialog(false)}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteAllProductsOfShop(shop.shopId)}
                className={`${isLoading ? 'pointer-events-none opacity-50' : ''}`}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {shop.products.map((product) => (
        <CartProductItem key={product.id} product={product} onDeleteProduct={handleDeleteProduct} />
      ))}
    </>
  )
}

export default CartProductsGroup
