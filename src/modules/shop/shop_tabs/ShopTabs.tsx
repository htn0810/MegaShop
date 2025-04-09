import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DEFAULT_PAGINATION } from '@/constants/common.constant'
import ShopProducts from '@/modules/shop/all_products'
import CategoriesProducts from '@/modules/shop/categories_products'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type Props = {
  shopId: number
}

enum TABS {
  PRODUCTS = 'products',
  CATEGORIES = 'categories',
}

const ShopTabs = ({ shopId }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const page = searchParams.get('page') || 1
  const limit = searchParams.get('limit') || 12
  const defaultTab = location.pathname.includes('categories') ? 'categories' : 'products'
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [pagination, setPagination] = useState({
    page: Number(page),
    pageSize: Number(limit),
    totalPages: 0,
  })

  useEffect(() => {
    setSearchParams({
      page: pagination.page.toString(),
      limit: pagination.pageSize.toString(),
    })
  }, [pagination.page, pagination.pageSize])

  const handleChangeTab = (val: string) => {
    if (val === TABS.PRODUCTS) {
      navigate(`/shop/${shopId}`)
    } else {
      navigate(`/shop/${shopId}/categories`)
    }
    setActiveTab(val)
    setPagination(DEFAULT_PAGINATION)
  }

  return (
    <div>
      {/* Tabs */}
      <Tabs defaultValue={defaultTab} value={activeTab} onValueChange={(val) => handleChangeTab(val)} className='mb-8'>
        <TabsList className='grid w-full max-w-md mx-auto grid-cols-2'>
          <TabsTrigger value={TABS.PRODUCTS}>All Products</TabsTrigger>
          <TabsTrigger value={TABS.CATEGORIES}>Categories</TabsTrigger>
        </TabsList>

        <TabsContent value='products' className='mt-6'>
          <ShopProducts shopId={shopId} pagination={pagination} setPagination={setPagination} />
        </TabsContent>

        <TabsContent value='categories' className='mt-6'>
          <CategoriesProducts shopId={shopId} pagination={pagination} setPagination={setPagination} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ShopTabs
