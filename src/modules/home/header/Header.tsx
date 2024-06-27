import { Link, useNavigate } from 'react-router-dom'
import MetaLogo from '@/assets/images/mega-logo.png'
import { List, ShoppingCart, UserCircle } from '@phosphor-icons/react'
import { GlobeSimple } from '@phosphor-icons/react/dist/ssr'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { HEADER_NAV } from '@/constants/header.constant'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { languages } from '@/i18n'
import { useTranslation } from 'react-i18next'
import ThemeToggle from '@/modules/home/theme_toggle'

const Header = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const handleChangeLanguage = (lng: keyof typeof languages) => {
    i18n.changeLanguage(lng)
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
        <div className='flex items-center gap-x-4'>
          <div className='flex md:gap-x-4 gap-x-2'>
            <span className='hidden xl:inline'>{languages[i18n.language as keyof typeof languages]}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <GlobeSimple size={24} className='cursor-pointer hover:text-gray-500' />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-20'>
                <DropdownMenuItem className='cursor-pointer' onClick={() => handleChangeLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' onClick={() => handleChangeLanguage('vn')}>
                  VietNam
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Link to='/cart'>
            <ShoppingCart size={24} className='cursor-pointer hover:text-gray-500' />
          </Link>
          <Link to='/login'>
            <UserCircle size={24} className='cursor-pointer hover:text-gray-500' />
          </Link>
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <List size={24} className='cursor-pointer xl:hidden hover:text-gray-500' />
            </SheetTrigger>
            <SheetContent className='flex flex-col p-10 dark:bg-gray-700'>
              {HEADER_NAV.map((item) => (
                <Link to={item.path} className='font-bold hover:text-gray-500' key={item.id}>
                  {t(`home.header.${item.name}`)}
                </Link>
              ))}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  )
}

export default Header
