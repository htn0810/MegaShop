import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Bag, MapPinArea } from '@phosphor-icons/react'
import { useEffect } from 'react'

type Product = {
  id: string
  quantity: number
  name: string
  description: string
  status: 'in stock' | 'out of stock'
  isDisabled: boolean
  saleOff: number
  image: string
  price: number
  order: 'order' | 'confirm' | 'delivery' | 'success' | 'cancel'
}

type Props = {
  order: Product
  updateData: (value: Product[] | ((prev: Product[]) => Product[])) => void
}

const orderStep = [
  { id: 1, status: 'order', name: 'Đã đặt hàng' },
  {
    id: 2,
    status: 'confirm',
    name: 'Xác nhận',
  },
  {
    id: 3,
    status: 'delivery',
    name: 'Đang vận chuyển',
  },
  {
    id: 4,
    status: 'success',
    name: ' Thành công',
  },
]

const ModalOrder = (props: Props) => {
  const { order, updateData } = props

  const handleOrderStep = () => {
    let orderStatus: typeof order.order = order.order
    if (order.order === 'order') {
      orderStatus = 'confirm'
    } else if (order.order === 'confirm') {
      orderStatus = 'delivery'
    } else if (order.order === 'delivery') {
      orderStatus = 'success'
    }
    order = { ...order, order: orderStatus }
    updateData((prev) =>
      prev.map((prevOrder) => {
        if (prevOrder.id === order.id) return order
        return prevOrder
      }),
    )
  }

  useEffect(() => {}, [order.order])
  return (
    <div className='px-6 py-4'>
      <ul className='steps w-full'>
        {orderStep.map((step) => {
          const orderStepId = orderStep.find((step) => step.status === order.order)?.id || 0
          let clx = ''
          let stepName = step.name
          if (order.order !== 'cancel' && orderStepId >= step.id) {
            clx = ' step-neutral text-black font-semibold'
          }
          if (order.order === 'cancel' && step.id === 1) {
            clx = ' step-error text-black font-semibold'
            stepName = 'Đã hủy'
          }
          return (
            <li data-content={step.id} key={step.id} className={`step before:h-[4px_!important] ${clx}`}>
              {stepName}
            </li>
          )
        })}
      </ul>
      {order.order === 'cancel' && (
        <div className='mt-6 bg-red-100 text-center py-2'>
          Đơn hàng <span className='text-red-800'>#XSN12345</span> đã bị hủy
        </div>
      )}
      {order.order === 'order' && (
        <div className='mt-6 bg-yellow-100 text-center py-2'>
          Xác nhận đơn hàng <span className='text-yellow-800'>#XSN12345</span>
        </div>
      )}
      {order.order === 'confirm' && (
        <div className='mt-6 bg-blue-100 text-center py-2'>
          Đơn hàng <span className='text-blue-800'>#XSN12345</span> đã được xác nhận
        </div>
      )}
      {order.order === 'delivery' && (
        <div className='mt-6 bg-violet-100 text-center py-2'>
          Đơn hàng <span className='text-violet-800'>#XSN12345</span> đang được vận chuyển
        </div>
      )}

      <div className='mt-6'>
        <h5 className='flex gap-x-2 font-semibold'>
          <MapPinArea size={22} className='text-blue-800' />
          <span>Địa chỉ nhận hàng</span>
        </h5>
        <div className='mt-2'>
          <span className='mr-4 font-semibold'>Huỳnh Thành Nhân</span>
          <span className='text-sm text-gray-500 font-semibold'>0901020451</span>
          <p className='text-gray-600'>
            Kí túc xá khu A, khu phố 6, phường Linh Trung, thành phố Thủ Đức, thành phố Hồ Chí Minh
          </p>
        </div>
      </div>
      <div className='mt-2'>
        <h5 className='flex gap-x-2 font-semibold'>
          <Bag size={22} className='text-blue-800' />
          <span>Thông tin đơn hàng</span>
        </h5>
        <ScrollArea className='h-32 w-full rounded-md pr-4'>
          <div className='mt-2 flex items-center justify-between'>
            <div className='flex gap-x-2 items-center'>
              <img
                src='https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='ProductImg'
                className='size-16 shrink-0'
              />
              <div className='flex flex-col'>
                <span>Giày Nike air jordan version 1</span>
                <span className='text-sm text-gray-400'>x1</span>
              </div>
            </div>
            <span className='text-green-600'>12.190.000 đ</span>
          </div>
          <div className='mt-2 flex items-center justify-between'>
            <div className='flex gap-x-2 items-center'>
              <img
                src='https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='ProductImg'
                className='size-16 shrink-0'
              />
              <div className='flex flex-col'>
                <span>Giày Nike air jordan version 1</span>
                <span className='text-sm text-gray-400'>x1</span>
              </div>
            </div>
            <span className='text-green-600'>12.190.000 đ</span>
          </div>
          <div className='mt-2 flex items-center justify-between'>
            <div className='flex gap-x-2 items-center'>
              <img
                src='https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='ProductImg'
                className='size-16 shrink-0'
              />
              <div className='flex flex-col'>
                <span>Giày Nike air jordan version 1</span>
                <span className='text-sm text-gray-400'>x1</span>
              </div>
            </div>
            <span className='text-green-600'>12.190.000 đ</span>
          </div>
          <div className='mt-2 flex items-center justify-between'>
            <div className='flex gap-x-2 items-center'>
              <img
                src='https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='ProductImg'
                className='size-16 shrink-0'
              />
              <div className='flex flex-col'>
                <span>Giày Nike air jordan version 1</span>
                <span className='text-sm text-gray-400'>x1</span>
              </div>
            </div>
            <span className='text-green-600'>12.190.000 đ</span>
          </div>
        </ScrollArea>

        <Separator className='my-4' />
        <div className='flex flex-col justify-end gap-y-2'>
          <div className='flex gap-x-2 justify-end'>
            <span className='font-semibold'>Thành tiền:</span>
            <span className='text-blue-800'>23.880.000 đ</span>
          </div>
          <div className='flex gap-x-2 justify-end'>
            <span className='font-semibold'>Phương thức thanh toán:</span>
            <span className='text-blue-800'>Thẻ ATM/Internet Banking</span>
          </div>
        </div>
        {order.order !== 'cancel' && order.order !== 'success' && (
          <div className='flex gap-x-2 justify-end mt-4'>
            <DialogClose asChild>
              <Button variant='outline'>Hủy</Button>
            </DialogClose>
            <Button variant='default' onClick={handleOrderStep}>
              {order.order === 'confirm' ? 'Giao hàng' : 'Xác nhận'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModalOrder
