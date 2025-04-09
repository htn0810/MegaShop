import { ICartProduct } from '@/apis/cart/cartInterface'
import { Checkbox } from '@/components/ui/checkbox'
import CartProductItem from '@/modules/cart/cart_product_item'
import { Trash } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

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
          <Checkbox id='terms' />
          <Link to={'/cart'}>{shop.shopName}</Link>
        </div>
        <Trash size={18} weight='bold' className='hover:text-red-500 cursor-pointer' />
      </div>
      {shop.products.map((product) => (
        <CartProductItem key={product.id} product={product} />
      ))}
    </>
  )
}

export default CartProductsGroup
