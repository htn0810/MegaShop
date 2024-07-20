import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Product from '@/modules/admin/product'
import AdminProfile from '@/modules/admin/admin-profile'
import Dashboard from '@/modules/admin/dashboard'

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
        <TabsContent value='products' className='border border-gray-300 px-4 py-2 rounded-md mt-4'>
          <Product />
        </TabsContent>
        <TabsContent value='revenue'>
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='current'>Current password</Label>
                <Input id='current' type='password' />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='new'>New password</Label>
                <Input id='new' type='password' />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value='profile'>
          <AdminProfile />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Admin
