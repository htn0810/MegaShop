import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Product from '@/modules/admin/product'
import AdminProfile from '@/modules/admin/admin-profile'

const Admin = () => {
  return (
    <div className='py-6'>
      <Tabs defaultValue='product' className='w-full'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='product' className='data-[state]'>
            Product
          </TabsTrigger>
          <TabsTrigger value='revenue'>Revenue</TabsTrigger>
          <TabsTrigger value='profile'>Profile</TabsTrigger>
        </TabsList>
        <TabsContent value='product' className='border border-gray-300 px-4 py-2 rounded-md mt-4'>
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
