import { Link, useNavigate } from 'react-router-dom'
import MetaLogo from '@/assets/images/mega-logo.png'
import { List, ShoppingCart, UserCircle } from '@phosphor-icons/react'
import { GlobeSimple, Heart } from '@phosphor-icons/react/dist/ssr'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { HEADER_NAV } from '@/constants/header.constant'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const Header = () => {
  const [language, setLanguage] = useState('English')
  const navigate = useNavigate()
  return (
    <section className='fixed top-0 left-0 right-0'>
      <div className='hidden py-3 text-center text-white bg-black md:block'>
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        <Link to='products' className='font-bold underline'>
          ShopNow
        </Link>
      </div>
      <div className='flex items-center justify-between px-4 py-4 border-b-2 shadow-sm sm:px-10 xl:px-40 md:px-20 md:gap-x-0 gap-x-2'>
        <div className='hidden w-40 cursor-pointer md:block' onClick={() => navigate('/')}>
          <img src={MetaLogo} loading='lazy' />
        </div>
        <ul className='hidden font-bold xl:flex gap-x-10'>
          {HEADER_NAV.map((item) => (
            <li className='cursor-pointer hover:text-gray-500' key={item.id}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <Input type='text' className='flex-1 outline-none md:min-w-80 md:flex-grow-0' placeholder='Search product...' />
        <div className='flex gap-x-4'>
          <div className='flex md:gap-x-4 gap-x-2'>
            <span className='hidden xl:inline'>{language}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <GlobeSimple size={24} className='cursor-pointer hover:text-gray-500' />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-20'>
                <DropdownMenuItem className='cursor-pointer' onClick={() => setLanguage('English')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' onClick={() => setLanguage('VietNam')}>
                  VietNam
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Heart size={24} className='hidden cursor-pointer hover:text-gray-500 xl:block' />
          <ShoppingCart size={24} className='cursor-pointer hover:text-gray-500' />
          <UserCircle size={24} className='cursor-pointer hover:text-gray-500' />
          <Sheet>
            <SheetTrigger asChild>
              <List size={24} className='cursor-pointer xl:hidden hover:text-gray-500' />
            </SheetTrigger>
            <SheetContent className='flex flex-col p-10'>
              {HEADER_NAV.map((item) => (
                <Link to={item.path} className='font-bold hover:text-gray-500' key={item.id}>
                  {item.name}
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
