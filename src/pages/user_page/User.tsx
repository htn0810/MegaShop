import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User as UserIcon, MapPin, ShoppingBag } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import UserProfile from '@/modules/user/user_profile'
import UserAddress from '@/modules/user/user_address'
import UserOrder from '@/modules/user/user_order'
import { useMegaStore } from '@/store/store'

const User = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useMegaStore((state) => state.user)
  const path = location.pathname.split('/user/')[1] ?? 'profile'
  const [activeTab, setActiveTab] = useState(path || 'profile')

  // Sync URL path with active tab state
  useEffect(() => {
    setActiveTab(path || 'profile')
  }, [path])

  if (!user) {
    return <Navigate to='/login' replace />
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Sidebar - Desktop */}
        <div className='hidden lg:block w-64 shrink-0'>
          <div className='sticky'>
            <div className='flex items-center space-x-4 mb-8'>
              <Avatar className='h-12 w-12'>
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className='font-medium'>{user?.name}</p>
                <p className='text-sm text-gray-500'>{user?.email}</p>
              </div>
            </div>
            <nav className='space-y-2'>
              <Button
                variant={activeTab === 'profile' ? 'default' : 'ghost'}
                className='w-full justify-start'
                onClick={() => {
                  setActiveTab('profile')
                  navigate('/user', { replace: true })
                }}
              >
                <UserIcon className='mr-2 h-5 w-5' />
                Profile
              </Button>
              <Button
                variant={activeTab === 'address' ? 'default' : 'ghost'}
                className='w-full justify-start'
                onClick={() => {
                  setActiveTab('address')
                  navigate('/user/address', { replace: true })
                }}
              >
                <MapPin className='mr-2 h-5 w-5' />
                Addresses
              </Button>
              <Button
                variant={activeTab === 'order' ? 'default' : 'ghost'}
                className='w-full justify-start'
                onClick={() => {
                  setActiveTab('order')
                  navigate('/user/order', { replace: true })
                }}
              >
                <ShoppingBag className='mr-2 h-5 w-5' />
                Orders
              </Button>
            </nav>
          </div>
        </div>

        {/* Sidebar - Mobile */}
        <Tabs value={path} className='w-full block lg:hidden'>
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
            <UserProfile user={user} />
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
          {activeTab === 'profile' && <UserProfile user={user} />}

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
