import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  createdAt: '2023-01-01',
  addresses: [
    {
      id: '1',
      title: 'Home',
      fullName: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
      phone: '+1 234 567 8901',
      isDefault: true,
    },
    {
      id: '2',
      title: 'Work',
      fullName: 'John Doe',
      street: '456 Office Ave',
      city: 'Boston',
      state: 'MA',
      postalCode: '02108',
      country: 'USA',
      phone: '+1 234 567 8902',
      isDefault: false,
    },
  ],
  orders: [
    {
      id: 'ORD-001',
      date: '2023-05-15',
      status: 'delivered',
      total: 159.99,
      items: [
        {
          id: '1',
          name: 'Wireless Headphones',
          price: 99.99,
          quantity: 1,
          image: 'https://placehold.co/60x60',
        },
        {
          id: '2',
          name: 'Smart Watch',
          price: 60.0,
          quantity: 1,
          image: 'https://placehold.co/60x60',
        },
      ],
    },
    {
      id: 'ORD-002',
      date: '2023-06-20',
      status: 'processing',
      total: 249.99,
      items: [
        {
          id: '3',
          name: 'Bluetooth Speaker',
          price: 79.99,
          quantity: 1,
          image: 'https://placehold.co/60x60',
        },
        {
          id: '4',
          name: 'Wireless Charger',
          price: 35.0,
          quantity: 2,
          image: 'https://placehold.co/60x60',
        },
        {
          id: '5',
          name: 'Phone Case',
          price: 25.0,
          quantity: 4,
          image: 'https://placehold.co/60x60',
        },
      ],
    },
  ],
}

const UserOrder = () => {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className='bg-green-500'>Delivered</Badge>
      case 'processing':
        return <Badge className='bg-blue-500'>Processing</Badge>
      case 'shipped':
        return <Badge className='bg-yellow-500'>Shipped</Badge>
      case 'cancelled':
        return <Badge className='bg-red-500'>Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div>
      <h2 className='text-2xl font-bold mb-6'>My Orders</h2>

      {mockUser.orders.length === 0 ? (
        <Alert>
          <AlertDescription>You haven't placed any orders yet.</AlertDescription>
        </Alert>
      ) : (
        <div className='space-y-6'>
          {mockUser.orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className='pb-2'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                  <div>
                    <CardTitle className='text-lg'>Order #{order.id}</CardTitle>
                    <CardDescription>Placed on {new Date(order.date).toLocaleDateString()}</CardDescription>
                  </div>
                  <div className='flex items-center space-x-4 mt-2 sm:mt-0'>
                    {getStatusBadge(order.status)}
                    <p className='font-medium'>{formatCurrency(order.total)}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className='h-[220px] w-full rounded-md border p-4'>
                  {order.items.map((item) => (
                    <div key={item.id} className='flex items-center py-3 first:pt-0 last:pb-0'>
                      <div className='h-16 w-16 rounded-md overflow-hidden shrink-0'>
                        <img src={item.image} alt={item.name} className='h-full w-full object-cover' />
                      </div>
                      <div className='ml-4 flex-1'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-2'>
                          <div>
                            <h4 className='font-medium'>{item.name}</h4>
                            <p className='text-sm text-gray-500'>Qty: {item.quantity}</p>
                          </div>
                          <div className='text-right sm:text-right'>
                            <p className='font-medium'>{formatCurrency(item.price)}</p>
                            <p className='text-sm text-gray-500'>{formatCurrency(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <div>
                  <p className='text-sm text-gray-500'>{order.items.length} items</p>
                </div>
                <Button variant='outline' className='flex items-center'>
                  View Details <ChevronRight className='ml-2 h-4 w-4' />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserOrder
