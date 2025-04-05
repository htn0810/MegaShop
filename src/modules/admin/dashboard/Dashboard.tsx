import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowBendUpLeft, Calendar, Coin, Coins, Scroll } from '@phosphor-icons/react'
import { FlashSaleProducts } from '@/assets/dummyDatas/products'
import { Bar, Pie } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import Rating from '@/components/ui/rating'
Chart.register(...registerables)

const PRODUCTS = FlashSaleProducts

const Dashboard = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className='grid grid-cols-12 md:gap-x-8'>
      <div className='col-span-full lg:col-span-7 py-2'>
        <div className='mb-6'>
          <div className='flex items-center justify-between mb-4'>
            <h5 className='font-bold 2xl:text-lg md:text-base text-sm'>Tổng quan</h5>
            <Select>
              <SelectTrigger className='w-[140px] md:w-[160px] focus:ring-0 focus:ring-offset-0'>
                <div className='flex items-center text-xs md:text-sm'>
                  <Calendar className='size-4 md:size-6 mr-1 md:mr-2' />
                  <SelectValue placeholder='Select a fruit' />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className='text-xs md:text-sm'>Thời gian</SelectLabel>
                  <SelectItem value='apple' className='text-xs md:text-sm'>
                    Apple
                  </SelectItem>
                  <SelectItem value='banana' className='text-xs md:text-sm'>
                    Banana
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-3 gap-x-1 md:gap-x-4'>
            <div className='flex items-center justify-between md:p-4 p-2 rounded-md bg-blue-100'>
              <div className='flex flex-col gap-y-2'>
                <span className='text-black text-xs md:text-base'>Tổng đơn hàng</span>
                <span className='font-bold text-base md:text-xl text-blue-900'>340</span>
              </div>
              <Scroll className='text-blue-900 md:size-7 size-5' />
            </div>
            <div className='flex items-center justify-between md:p-4 p-2 rounded-md bg-pink-100'>
              <div className='flex flex-col gap-y-2'>
                <span className='text-black text-xs md:text-base'>Doanh thu</span>
                <span className='font-bold text-base md:text-xl text-pink-900'>34.5 Tr</span>
              </div>
              <Coins className='text-pink-900 md:size-7 size-5' />
            </div>
            <div className='flex items-center justify-between md:p-4 p-2 rounded-md bg-yellow-100'>
              <div className='flex flex-col gap-y-2'>
                <span className='text-black text-xs md:text-base'>Doanh thu tuan</span>
                <span className='font-bold text-base md:text-xl text-yellow-900'>14 Tr</span>
              </div>
              <Coin className='text-yellow-900 md:size-7 size-5' />
            </div>
          </div>
        </div>
        <div className='mb-6'>
          <div className='flex items-center justify-between mb-4'>
            <h5 className='font-bold 2xl:text-lg md:text-base text-sm'>Doanh thu</h5>
            <Select>
              <SelectTrigger className='w-[140px] md:w-[160px] focus:ring-0 focus:ring-offset-0'>
                <div className='flex items-center text-xs md:text-sm'>
                  <Calendar className='md:size-6 size-4 mr-1 md:mr-2' />
                  <SelectValue placeholder='Select time' />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className='text-xs md:text-sm'>Thời gian</SelectLabel>
                  <SelectItem value='apple' className='text-xs md:text-sm'>
                    Apple
                  </SelectItem>
                  <SelectItem value='banana' className='text-xs md:text-sm'>
                    Banana
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Bar data={data} options={options} />
          </div>
        </div>
        <div>
          <h5 className='font-bold 2xl:text-lg md:text-base text-sm mb-4'>Top 5 sản phẩm bán chạy</h5>
          <Table>
            <TableHeader className='rounded-tl-md rounded-tr-lg'>
              <TableRow className='bg-blue-100 hover:bg-blue-100 dark:bg-blue-950'>
                <TableHead className='text-black dark:text-white text-xs md:text-sm'>Name</TableHead>
                <TableHead className='text-black dark:text-white text-xs md:text-sm'>Price</TableHead>
                <TableHead className='text-black dark:text-white text-xs md:text-sm'>Quantity</TableHead>
                <TableHead className='text-black dark:text-white text-right text-xs md:text-sm'>Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PRODUCTS.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className='font-medium'>
                    <div className='flex gap-x-2 items-center'>
                      <img src={product.imageUrls} alt='ProductImg' className='size-12 md:size-16 flex-shrink-0' />
                      <span className='block truncate text-xs md:text-sm'>{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell align='center' className='text-xs md:text-sm'>
                    {product.price}
                  </TableCell>
                  <TableCell align='center' className='text-xs md:text-sm'>
                    {20}
                  </TableCell>
                  <TableCell className='text-right text-xs md:text-sm'>{(10000000).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className='col-span-full lg:col-span-5 py-4'>
        <div className='mb-6'>
          <h5 className='font-bold 2xl:text-lg md:text-base text-sm mb-4'>Doanh thu theo phân loại</h5>
          <Pie data={data} />
        </div>
        <div>
          <h5 className='font-bold 2xl:text-lg md:text-base text-sm'>Đánh giá mới nhất</h5>
          <div className='px-6 py-4 rounded-sm bg-white dark:bg-gray-900 shadow-md mt-4'>
            <div className='flex items-center justify-between '>
              <div className='flex gap-x-2 items-center'>
                <img
                  src='https://images.unsplash.com/photo-1721188092446-a66a2cef2676?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  alt=''
                  className='size-12 md:size-16 rounded-full'
                />
                <div className='flex flex-col'>
                  <span className='font-semibold text-sm md:text-base'>Dennis Nguyen</span>
                  <Rating val={4} />
                </div>
              </div>
              <span className='text-sm md:text-base'>2h</span>
            </div>
            <span className='block mt-2 text-xs md:text-sm font-semibold text-gray-400'>Giày Nike version 2</span>
            <p className='mt-1 md:mt-4 line-clamp-3 text-xs md:text-sm'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum reiciendis animi inventore eaque sed
              excepturi pariatur voluptatibus numquam quis, laudantium autem aliquam expedita. Libero accusantium sequi,
              iste illum quasi non.
            </p>
            <div className='flex mt-4 items-center gap-x-4 cursor-pointer text-blue-900 dark:text-blue-300'>
              <ArrowBendUpLeft className='size-4 md:size-6' />
              <span className='text-sm md:text-base'>Trả lời</span>
            </div>
          </div>
          <div className='px-6 py-4 rounded-sm bg-white dark:bg-gray-900 shadow-md mt-4'>
            <div className='flex items-center justify-between '>
              <div className='flex gap-x-2 items-center'>
                <img
                  src='https://images.unsplash.com/photo-1721188092446-a66a2cef2676?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  alt=''
                  className='size-12 md:size-16 rounded-full'
                />
                <div className='flex flex-col'>
                  <span className='font-semibold text-sm md:text-base'>Dennis Nguyen</span>
                  <Rating val={4} />
                </div>
              </div>
              <span className='text-sm md:text-base'>2h</span>
            </div>
            <span className='block mt-2 text-xs md:text-sm font-semibold text-gray-400'>Giày Nike version 2</span>
            <p className='mt-1 md:mt-4 line-clamp-3 text-xs md:text-sm'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum reiciendis animi inventore eaque sed
              excepturi pariatur voluptatibus numquam quis, laudantium autem aliquam expedita. Libero accusantium sequi,
              iste illum quasi non.
            </p>
            <div className='flex mt-4 items-center gap-x-4 cursor-pointer text-blue-900 dark:text-blue-300'>
              <ArrowBendUpLeft className='size-4 md:size-6' />
              <span className='text-sm md:text-base'>Trả lời</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
