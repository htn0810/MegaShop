import { Link, useNavigate } from 'react-router-dom'
import MetaLogo from '@/assets/images/mega-logo.png'
import { Bell, House, List, ShoppingBag, ShoppingCart, SignOut, UserCircle, UserGear } from '@phosphor-icons/react'
import { GlobeSimple } from '@phosphor-icons/react/dist/ssr'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { languages } from '@/i18n'
import { useTranslation } from 'react-i18next'
import ThemeToggle from '@/modules/home/theme_toggle'
import { useMegaStore } from '@/store/store'
import AuthAPI from '@/apis/auth/auth'
import { toast } from 'sonner'
import { HeaderNav } from '@/constants/header.constant'

const HEADER_NAV: HeaderNav[] = [
  { id: 1, icon: <House size={24} />, name: 'home_nav', path: '/' },
  { id: 2, icon: <ShoppingBag size={24} />, name: 'products_nav', path: '/products' },
  { id: 3, icon: <UserGear size={24} />, name: 'admin_nav', path: '/admin' },
  { id: 4, icon: <UserGear size={24} />, name: 'super_admin_nav', path: '/super-admin' },
]

const Header = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const handleChangeLanguage = (lng: keyof typeof languages) => {
    i18n.changeLanguage(lng)
  }

  const isLoggedIn = useMegaStore((state) => state.user)
  const logoutUser = useMegaStore((state) => state.logoutUser)

  const handleLogout = async () => {
    await AuthAPI.logout()
    toast.success('Logout successfully!', {
      description: 'Please login again to shop with us!',
    })
    logoutUser()
  }
  return (
    <section className='fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800'>
      <div className='hidden py-3 text-center text-white bg-black dark:bg-gray-900 md:block'>
        {t('home.header.sale')}
        <Link to='products' className='font-bold underline'>
          {t('home.header.shop_now')}
        </Link>
      </div>
      <div className='flex items-center justify-between px-4 py-4 border-b-2 shadow-sm sm:px-10 xl:px-40 md:px-20 md:gap-x-0 gap-x-2 dark:shadow-gray-600 dark:shadow-md'>
        <div className='hidden w-40 cursor-pointer md:block' onClick={() => navigate('/')}>
          <img src={MetaLogo} loading='lazy' />
        </div>
        <ul className='hidden font-bold xl:flex gap-x-10'>
          {HEADER_NAV.map((item) => (
            <li className='cursor-pointer hover:text-gray-500' key={item.id}>
              <Link to={item.path}>{t(`home.header.${item.name}`)}</Link>
            </li>
          ))}
        </ul>
        <Input
          type='text'
          className='flex-1 outline-none md:min-w-80 md:flex-grow-0'
          placeholder={t('home.header.search_placeholder')}
        />

        <div className='flex items-center md:gap-x-4 gap-x-1'>
          <div className='hidden md:gap-x-4 gap-x-2 xl:flex'>
            <span className='hidden xl:inline'>{languages[i18n.language as keyof typeof languages]}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <GlobeSimple size={24} className='cursor-pointer hover:text-gray-500' />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-20'>
                <DropdownMenuItem
                  className='cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700'
                  onClick={() => handleChangeLanguage('en')}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700'
                  onClick={() => handleChangeLanguage('vn')}
                >
                  VietNam
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Link to='/cart'>
            <ShoppingCart size={24} className='cursor-pointer hover:text-gray-500' />
          </Link>
          <Bell size={24} className='cursor-pointer hover:text-gray-500' />
          <span className='hidden xl:inline'>
            <ThemeToggle />
          </span>
          <Sheet>
            <SheetTrigger asChild>
              <List size={24} className='cursor-pointer xl:hidden hover:text-gray-500' />
            </SheetTrigger>
            <SheetContent className='flex flex-col md:px-10 px-6 py-10 justify-between gap-y-2 dark:bg-gray-700'>
              <SheetTitle className='hidden' />
              <SheetDescription className='hidden' />
              <div className='flex flex-col gap-y-2'>
                {HEADER_NAV.map((item) => (
                  <Link
                    to={item.path}
                    className='flex items-center gap-x-2 font-bold p-2 rounded-md hover:bg-gray-200 cursor-pointer'
                    key={item.id}
                  >
                    {item.icon}
                    <span>{t(`home.header.${item.name}`)}</span>
                  </Link>
                ))}
                {isLoggedIn ? (
                  <>
                    <Link
                      to='/user'
                      className='flex items-center gap-x-2 font-bold p-2 rounded-md hover:bg-gray-200 cursor-pointer'
                    >
                      <UserCircle size={24} className='cursor-pointer hover:text-gray-500' />
                      <span>Profile</span>
                    </Link>
                  </>
                ) : (
                  <Link
                    to='/login'
                    className='flex items-center gap-x-2 font-bold p-2 rounded-md hover:bg-gray-200 cursor-pointer'
                  >
                    <UserCircle size={24} className='cursor-pointer hover:text-gray-500' />
                    <span>Login</span>
                  </Link>
                )}
                {isLoggedIn && (
                  <div className='flex items-center gap-x-2 font-bold p-2 rounded-md hover:bg-red-200 cursor-pointer'>
                    <SignOut size={24} className='cursor-pointer hover:text-gray-500' onClick={handleLogout} />
                    <span className='font-bold'>Logout</span>
                  </div>
                )}
              </div>

              <div className='flex items-center justify-between gap-x-2'>
                <div className='text-sm text-gray-400'>{new Date().toLocaleString()}</div>
                <div className='flex items-center gap-x-2'>
                  <div className='flex md:gap-x-4 gap-x-2'>
                    <span className='hidden xl:inline'>{languages[i18n.language as keyof typeof languages]}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <GlobeSimple size={24} className='cursor-pointer hover:text-gray-500' />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='w-20'>
                        <DropdownMenuItem
                          className='cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700'
                          onClick={() => handleChangeLanguage('en')}
                        >
                          English
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700'
                          onClick={() => handleChangeLanguage('vn')}
                        >
                          VietNam
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  )
}

export default Header
