import PrimaryLayout from '@/layouts/primary_layout'
import { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import './i18n'
import MegaLazyLoad from '@/components/lazy_load/MegaLazyLoad'

const App = () => {
  const Home = MegaLazyLoad(import('@/pages/home_page/Home'))
  const Login = MegaLazyLoad(import('@/pages/login_page/Login'))
  const SignUp = MegaLazyLoad(import('@/pages/sign_up_page/SignUp'))
  const Products = MegaLazyLoad(import('@/pages/products_page/Products'))
  const ProductDetail = MegaLazyLoad(import('@/pages/product_detail_page/ProductDetail'))
  const Cart = MegaLazyLoad(import('@/pages/cart_page/Cart'))
  const User = MegaLazyLoad(import('@/pages/user_page/User'))
  const Admin = MegaLazyLoad(import('@/pages/admin_page/Admin'))
  const SuperAdmin = MegaLazyLoad(import('@/pages/super_admin_page/SuperAdmin'))

  return (
    <Fragment>
      <PrimaryLayout>
        <Routes>
          <Route path={'/'} element={Home} />
          <Route path={'/login'} element={Login} />
          <Route path={'/signup'} element={SignUp} />
          <Route path={'/products'} element={Products} />
          <Route path={'/product_detail'} element={ProductDetail} />
          <Route path={'/cart'} element={Cart} />
          <Route path={'/user/*'} element={User} />
          <Route path={'/admin/*'} element={Admin} />
          <Route path={'/super-admin/*'} element={SuperAdmin} />
        </Routes>
      </PrimaryLayout>
    </Fragment>
  )
}

export default App
