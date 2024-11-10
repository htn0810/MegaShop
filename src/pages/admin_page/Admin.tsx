import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Product from '@/modules/admin/product'
import AdminProfile from '@/modules/admin/admin_profile'
import Dashboard from '@/modules/admin/dashboard'
import Orders from '@/modules/admin/orders'
import Revenue from '@/modules/admin/revenue'
import Discount from '@/modules/admin/discount'
import { useLocation, useNavigate } from 'react-router-dom'

const Admin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname.split('/admin/')[1] ?? 'dashboard'

  return (
    <div className='py-6'>
      <Tabs value={path} className='w-full'>
        <TabsList className='grid w-full grid-cols-3 md:grid-cols-6 h-auto'>
          <TabsTrigger
            className=' text-xs sm:text-sm'
            value='dashboard'
            onClick={() => navigate('/admin', { replace: true })}
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            value='products'
            className='data-[state] text-xs sm:text-sm'
            onClick={() => navigate('/admin/products', { replace: true })}
          >
            Products
          </TabsTrigger>
          <TabsTrigger
            className='text-xs sm:text-sm'
            value='orders'
            onClick={() => navigate('/admin/orders', { replace: true })}
          >
            Orders
          </TabsTrigger>
          <TabsTrigger
            className='text-xs sm:text-sm'
            value='revenue'
            onClick={() => navigate('/admin/revenue', { replace: true })}
          >
            Revenue
          </TabsTrigger>
          <TabsTrigger
            className='text-xs sm:text-sm'
            value='discount'
            onClick={() => navigate('/admin/discount', { replace: true })}
          >
            Discount
          </TabsTrigger>
          <TabsTrigger
            className='text-xs sm:text-sm'
            value='profile'
            onClick={() => navigate('/admin/profile', { replace: true })}
          >
            Profile
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value='dashboard'
          className='md:border md:border-gray-300 md:dark:border-none md:px-4 py-2 rounded-md mt-4 bg-none  md:bg-gray-50 md:dark:bg-gray-800'
        >
          <Dashboard />
        </TabsContent>
        <TabsContent
          value='products'
          className='md:border md:border-gray-300 md:dark:border-none md:px-4 py-2 rounded-md mt-4 bg-none  md:bg-gray-50 md:dark:bg-gray-800'
        >
          <Product />
        </TabsContent>
        <TabsContent
          value='orders'
          className='md:border md:border-gray-300 md:dark:border-none md:px-4 py-2 rounded-md mt-4 bg-none  md:bg-gray-50 md:dark:bg-gray-800'
        >
          <Orders />
        </TabsContent>
        <TabsContent
          value='revenue'
          className='md:border md:border-gray-300 md:dark:border-none md:px-4 py-2 rounded-md mt-4 bg-none  md:bg-gray-50 md:dark:bg-gray-800'
        >
          <Revenue />
        </TabsContent>
        <TabsContent
          value='discount'
          className='md:border md:border-gray-300 md:dark:border-none md:px-4 py-2 rounded-md mt-4 bg-none  md:bg-gray-50 md:dark:bg-gray-800'
        >
          <Discount />
        </TabsContent>
        <TabsContent value='profile'>
          <AdminProfile />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Admin
