import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Product from '@/modules/admin/product'
import AdminProfile from '@/modules/admin/admin-profile'
import Dashboard from '@/modules/admin/dashboard'
import Orders from '@/modules/admin/orders'
import Revenue from '@/modules/admin/revenue'
import Discount from '@/modules/admin/discount'

const Admin = () => {
  return (
    <div className='py-6'>
      <Tabs defaultValue='dashboard' className='w-full'>
        <TabsList className='grid w-full grid-cols-3 md:grid-cols-6 h-auto'>
          <TabsTrigger value='dashboard'>Dashboard</TabsTrigger>
          <TabsTrigger value='products' className='data-[state]'>
            Products
          </TabsTrigger>
          <TabsTrigger value='orders'>Orders</TabsTrigger>
          <TabsTrigger value='revenue'>Revenue</TabsTrigger>
          <TabsTrigger value='discount'>Discount</TabsTrigger>
          <TabsTrigger value='profile'>Profile</TabsTrigger>
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
