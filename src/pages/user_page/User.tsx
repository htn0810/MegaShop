import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User as UserIcon, MapPin, ShoppingBag } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'
import UserProfile from '@/modules/user/user_profile'
import UserAddress from '@/modules/user/user_address'
import UserOrder from '@/modules/user/user_order'

// Mock data for demo purposes
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

const User = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname.split('/user/')[1] ?? 'profile'
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Sidebar - Desktop */}
        <div className='hidden lg:block w-64 shrink-0'>
          <div className='sticky'>
            <div className='flex items-center space-x-4 mb-8'>
              <Avatar className='h-12 w-12'>
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback>{mockUser.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className='font-medium'>{mockUser.name}</p>
                <p className='text-sm text-gray-500'>{mockUser.email}</p>
              </div>
            </div>
            <nav className='space-y-2'>
              <Button
                variant={activeTab === 'profile' ? 'default' : 'ghost'}
                className='w-full justify-start'
                onClick={() => setActiveTab('profile')}
              >
                <UserIcon className='mr-2 h-5 w-5' />
                Profile
              </Button>
              <Button
                variant={activeTab === 'addresses' ? 'default' : 'ghost'}
                className='w-full justify-start'
                onClick={() => setActiveTab('address')}
              >
                <MapPin className='mr-2 h-5 w-5' />
                Addresses
              </Button>
              <Button
                variant={activeTab === 'orders' ? 'default' : 'ghost'}
                className='w-full justify-start'
                onClick={() => setActiveTab('order')}
              >
                <ShoppingBag className='mr-2 h-5 w-5' />
                Orders
              </Button>
            </nav>
          </div>
        </div>

        {/* Sidebar - Mobile */}
        <Tabs value={path} className='w-full  block lg:hidden'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger
              value='profile'
              className='text-xs sm:text-sm'
              onClick={() => navigate('/user', { replace: true })}
            >
              <UserIcon className='mr-2 h-5 w-5' />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value='address'
              className='text-xs sm:text-sm'
              onClick={() => navigate('/user/address', { replace: true })}
            >
              <MapPin className='mr-2 h-5 w-5' />
              Addresses
            </TabsTrigger>
            <TabsTrigger
              value='order'
              className='text-xs sm:text-sm'
              onClick={() => navigate('/user/order', { replace: true })}
            >
              <ShoppingBag className='mr-2 h-5 w-5' />
              Orders
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value='profile'
            className='md:border md:border-gray-300 md:dark:border-none md:px-4 py-2 rounded-md mt-4 bg-none  md:bg-gray-50 md:dark:bg-gray-800'
          >
            <UserProfile />
          </TabsContent>
          <TabsContent
            value='address'
            className='md:border md:border-gray-300 md:dark:border-none md:px-4 py-2 rounded-md mt-4 bg-none  md:bg-gray-50 md:dark:bg-gray-800'
          >
            <UserAddress />
          </TabsContent>
          <TabsContent
            value='order'
            className='md:border md:border-gray-300 md:dark:border-none md:px-4 py-2 rounded-md mt-4 bg-none  md:bg-gray-50 md:dark:bg-gray-800'
          >
            <UserOrder />
          </TabsContent>
        </Tabs>

        {/* Main content */}
        <div className='flex-1 hidden lg:block'>
          {/* Profile Section */}
          {activeTab === 'profile' && <UserProfile />}

          {/* Addresses Section */}
          {activeTab === 'address' && <UserAddress />}

          {/* Orders Section */}
          {activeTab === 'order' && <UserOrder />}
        </div>
      </div>
    </div>
  )
}

export default User
