import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CategoryManagement from '@/modules/super_admin/category_management'
import TenantManagement from '@/modules/super_admin/tenant_management'
import UserManagement from '@/modules/super_admin/user_management'
import { useLocation, useNavigate } from 'react-router-dom'

const SuperAdmin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname.split('/super-admin/')[1] ?? 'tenants'
  return (
    <div className='py-6'>
      <Tabs value={path} className='w-full'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger
            value='tenants'
            className='text-xs sm:text-sm'
            onClick={() => navigate('/super-admin', { replace: true })}
          >
            Tenants
          </TabsTrigger>
          <TabsTrigger
            value='users'
            className='text-xs sm:text-sm'
            onClick={() => navigate('/super-admin/users', { replace: true })}
          >
            Users
          </TabsTrigger>
          <TabsTrigger
            value='categories'
            className='text-xs sm:text-sm'
            onClick={() => navigate('/super-admin/categories', { replace: true })}
          >
            Categories
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value='tenants'
          className='md:border md:border-gray-300 md:dark:border-none md:px-4 py-2 rounded-md mt-4 bg-none  md:bg-gray-50 md:dark:bg-gray-800'
        >
          <TenantManagement />
        </TabsContent>
        <TabsContent
          value='users'
          className='md:border md:border-gray-300 md:dark:border-none md:px-4 py-2 rounded-md mt-4 bg-none  md:bg-gray-50 md:dark:bg-gray-800'
        >
          <UserManagement />
        </TabsContent>
        <TabsContent
          value='categories'
          className='md:border md:border-gray-300 md:dark:border-none md:px-4 py-2 rounded-md mt-4 bg-none  md:bg-gray-50 md:dark:bg-gray-800'
        >
          <CategoryManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SuperAdmin
