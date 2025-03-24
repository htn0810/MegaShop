import { Button } from '@/components/ui/button'
import { DataTablePagination } from '@/components/ui/data-table-pagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Calendar, Coin, Coins, DownloadSimple, Money } from '@phosphor-icons/react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table'
import { useState } from 'react'

type Revenue = {
  id: string
  date: string
  ordersQuantity: number
  totalBill: number
  totalDiscount: number
  income: number
}

const dummyRevenue: Revenue[] = [
  {
    id: 'm5gr84i9',
    date: '08/03/2024',
    ordersQuantity: 10,
    totalBill: 2000000,
    totalDiscount: 10000,
    income: 1990000
  },
  {
    id: '3u1reuv4',
    date: '10/06/2024',
    ordersQuantity: 2,
    totalBill: 450000,
    totalDiscount: 22000,
    income: 428000
  }
]

const Revenue = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [data, _setData] = useState<Revenue[]>(dummyRevenue)

  const columns: ColumnDef<Revenue>[] = [
    {
      accessorKey: 'date',
      header: () => {
        return <span className='font-semibold text-black text-xs md:text-sm dark:text-white'>Date</span>
      },
      cell: ({ row }) => <span className='text-xs md:text-sm'>{row.original.date}</span>
    },
    {
      accessorKey: 'ordersQuantity',
      header: () => (
        <div className='text-xs md:text-sm text-center text-black font-semibold dark:text-white'>Order Quantity</div>
      ),
      cell: ({ row }) => <div className='text-xs md:text-sm text-center'>{row.original.ordersQuantity}</div>
    },
    {
      accessorKey: 'totalBill',
      header: () => (
        <div className='text-xs md:text-sm text-center text-black font-semibold dark:text-white'>Total bill</div>
      ),
      cell: ({ row }) => <div className='text-xs md:text-sm text-center'>{row.original.totalBill}</div>
    },
    {
      accessorKey: 'totalDiscount',
      header: () => (
        <div className='text-xs md:text-sm text-center text-black font-semibold dark:text-white'>Total discount</div>
      ),
      cell: ({ row }) => {
        // Format the price as a dollar price
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(row.original.totalDiscount)

        return <div className='text-xs md:text-sm text-center'>{formatted}</div>
      }
    },
    {
      accessorKey: 'income',
      header: () => (
        <div className='text-xs md:text-sm text-center text-black font-semibold dark:text-white'>Income</div>
      ),
      cell: ({ row }) => {
        // Format the price as a dollar price
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(row.original.income)
        return <div className='text-xs md:text-sm text-center'>{formatted}</div>
      }
    }
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <>
      <div className='mb-6'>
        <h5 className='font-bold 2xl:text-lg md:text-base text-sm mb-4'>Tổng quan</h5>
        <div className='grid grid-cols-3 gap-x-1 md:gap-x-4'>
          <div className='flex items-center justify-between md:p-4 p-2 rounded-md bg-blue-100'>
            <div className='flex flex-col gap-y-2'>
              <span className='text-black text-xs md:text-base'>Tổng doanh thu</span>
              <span className='font-bold text-base md:text-xl text-blue-900'>340</span>
            </div>
            <Money className='text-blue-900 md:size-7 size-5' />
          </div>
          <div className='flex items-center justify-between md:p-4 p-2 rounded-md bg-pink-100'>
            <div className='flex flex-col gap-y-2'>
              <span className='text-black text-xs md:text-base'>Doanh thu tháng này</span>
              <span className='font-bold text-base md:text-xl text-pink-900'>34.5 Tr</span>
            </div>
            <Coins className='text-pink-900 md:size-7 size-5' />
          </div>
          <div className='flex items-center justify-between md:p-4 p-2 rounded-md bg-yellow-100'>
            <div className='flex flex-col gap-y-2'>
              <span className='text-black text-xs md:text-base'>Doanh thu tuần</span>
              <span className='font-bold text-base md:text-xl text-yellow-900'>14 Tr</span>
            </div>
            <Coin className='text-yellow-900 md:size-7 size-5' />
          </div>
        </div>
      </div>
      <div>
        <div className='flex items-center justify-between'>
          <h5 className='font-bold 2xl:text-lg md:text-base text-sm'>Chi tiết doanh thu</h5>
          <div className='flex gap-x-2'>
            <Button size={'sm'} className='text-xs md:text-base'>
              <DownloadSimple size={20} /> <span>Tải xuống</span>
            </Button>
            <Select>
              <SelectTrigger className='w-[140px] md:w-[160px] focus:ring-0 focus:ring-offset-0'>
                <div className='flex items-center gap-x-2 text-xs md:text-base'>
                  <Calendar size={20} />
                  <SelectValue placeholder='Select a fruit' />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Thời gian</SelectLabel>
                  <SelectItem value='apple' className='text-xs md:text-base'>
                    Apple
                  </SelectItem>
                  <SelectItem value='banana' className='text-xs md:text-base'>
                    Banana
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='mt-4'>
          <div className='rounded-md border'>
            <Table>
              <TableHeader className='bg-blue-100'>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className='w-full bg-white'>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className='h-24 text-center'>
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className='flex items-center justify-end space-x-2 py-4'>
            <DataTablePagination table={table} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Revenue
