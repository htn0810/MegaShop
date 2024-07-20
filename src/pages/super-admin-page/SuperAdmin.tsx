import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AdminProfile from '@/modules/admin/admin-profile'
import Product from '@/modules/admin/product'

const SuperAdmin = () => {
  return (
    <div className='py-6'>
      <Tabs defaultValue='product' className='w-full'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='product' className='data-[state]'>
            Tenants
          </TabsTrigger>
          <TabsTrigger value='revenue'>Users</TabsTrigger>
          <TabsTrigger value='profile'>Categories</TabsTrigger>
        </TabsList>
        <TabsContent value='product' className='border border-gray-300 px-4 py-2 rounded-md mt-4'>
          <Product />
        </TabsContent>
        <TabsContent value='revenue'>
          <Card>ok</Card>
        </TabsContent>
        <TabsContent value='profile'>
          <AdminProfile />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SuperAdmin
