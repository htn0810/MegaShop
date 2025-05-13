import PrimaryLayout from '@/layouts/primary_layout'
import { Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './i18n'
import MegaLazyLoad from '@/components/lazy_load/MegaLazyLoad'
import ProtectedRoute from '@/configs/ProtectedRoute'
import { ROLE } from '@/constants/common.constant'
import { useChatStore } from '@/store/chatStore'
import { useUserStore } from '@/store/userStore'
import { getSocket } from '@/configs/socket'

const App = () => {
  const Home = MegaLazyLoad(import('@/pages/home_page/Home'))
  const Login = MegaLazyLoad(import('@/pages/login_page/Login'))
  const SignUp = MegaLazyLoad(import('@/pages/sign_up_page/SignUp'))
  const VerifyAccount = MegaLazyLoad(import('@/pages/verify_account_page/VerifyAccount'))
  const Products = MegaLazyLoad(import('@/pages/products_page/Products'))
  const ProductDetail = MegaLazyLoad(import('@/pages/product_detail_page/ProductDetail'))
  const Cart = MegaLazyLoad(import('@/pages/cart_page/Cart'))
  const Order = MegaLazyLoad(import('@/pages/order_page/Order'))
  const User = MegaLazyLoad(import('@/pages/user_page/User'))
  const Shop = MegaLazyLoad(import('@/pages/shop_page/Shop'))
  const AboutUs = MegaLazyLoad(import('@/pages/about_page/AboutUs'))
  const Admin = MegaLazyLoad(import('@/pages/admin_page/Admin'))
  const SuperAdmin = MegaLazyLoad(import('@/pages/super_admin_page/SuperAdmin'))
  const NotFound = MegaLazyLoad(import('@/pages/not_found_page/NotFound'))
  const ForgotPassword = MegaLazyLoad(import('@/pages/forgot_password_page/ForgotPassword'))

  const { user } = useUserStore()
  const { closeChat } = useChatStore()

  const socket = getSocket()

  useEffect(() => {
    // Gửi heartbeat mỗi 30s để báo "Tao còn sống"
    const heartbeatInterval = setInterval(() => {
      if (user?.id && socket.connected) {
        console.log('Heartbeat sent to server', user.id)
        socket.emit('heartbeat', { userId: user.id })
      }
    }, 30000)

    const handleBeforeUnload = () => {
      closeChat()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    // Cleanup
    return () => {
      clearInterval(heartbeatInterval)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [user?.id])

  return (
    <Fragment>
      <PrimaryLayout>
        <Routes>
          <Route path={'/'} element={Home} />
          <Route path={'/login'} element={Login} />
          <Route path={'/signup'} element={SignUp} />
          <Route path={'/account/verify'} element={VerifyAccount} />
          <Route path={'/account/forgot-password'} element={ForgotPassword} />
          <Route path={'/products'} element={Products} />
          <Route path={'/product_detail/:id'} element={ProductDetail} />
          <Route path={'/about'} element={AboutUs} />
          <Route path={'/shop/:id'} element={Shop} />
          <Route path={'/shop/:id/categories'} element={Shop} />
          <Route element={<ProtectedRoute requiredRole={ROLE.USER} redirectPath={'/login'} />}>
            <Route path={'/cart'} element={Cart} />
            <Route path={'/order'} element={Order} />
            <Route path={'/user/*'} element={User} />
          </Route>
          <Route element={<ProtectedRoute requiredRole={ROLE.SHOPOWNER} />}>
            <Route path={'/admin/*'} element={Admin} />
          </Route>
          <Route element={<ProtectedRoute requiredRole={ROLE.ADMIN} />}>
            <Route path={'/super-admin/*'} element={SuperAdmin} />
          </Route>
          <Route path={'*'} element={NotFound} />
        </Routes>
      </PrimaryLayout>
    </Fragment>
  )
}

export default App
