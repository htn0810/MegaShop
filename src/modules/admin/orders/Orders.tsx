import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar, CheckSquareOffset, FileX, Scroll, Spinner, Truck, UserCheck } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { CaretDown, CaretUpDown } from '@phosphor-icons/react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState } from 'react'
import { DataTablePagination } from '@/components/ui/data-table-pagination'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import ModalOrder from '@/modules/admin/modal-order'

const dummyData: Product[] = [
  {
    id: 'm5gr84i9',
    quantity: 316,
    saleOff: 20,
    isDisabled: false,
    price: 100,
    status: 'in stock',
    description: '',
    name: 'ken99@yahoo.com',
    order: 'order',
    image:
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3u1reuv4',
    quantity: 242,
    saleOff: 20,
    isDisabled: false,
    price: 100,
    status: 'in stock',
    description: '',
    name: 'Abe45@gmail.com',
    order: 'confirm',
    image:
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'derv1ws0',
    quantity: 837,
    saleOff: 20,
    isDisabled: true,
    price: 100,
    status: 'in stock',
    description: '',
    name: 'Monserrat44@gmail.com',
    order: 'delivery',
    image:
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '5kma53ae',
    quantity: 874,
    saleOff: 20,
    isDisabled: false,
    price: 100,
    status: 'out of stock',
    description: '',
    name: 'Silas22@gmail.com',
    order: 'success',
    image:
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'bhqecj4p',
    quantity: 721,
    saleOff: 20,
    isDisabled: false,
    price: 100,
    status: 'in stock',
    description: '',
    name: 'carmella@hotmail.com',
    order: 'order',
    image:
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]

type Product = {
  id: string
  quantity: number
  name: string
  description: string
  status: 'in stock' | 'out of stock'
  isDisabled: boolean
  saleOff: number
  image: string
  price: number
  order: 'order' | 'confirm' | 'delivery' | 'success' | 'cancel'
}

const Orders = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [data, setData] = useState<Product[]>(dummyData)

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            <span className='font-bold text-black text-base dark:text-white'>Name</span>
            <CaretUpDown size={18} weight='bold' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='flex gap-x-2 md:gap-x-4 items-center'>
          <div className='w-20 h-20'>
            <img src={row.original.image} alt='ProductImg' className='w-full h-full bg-cover' />
          </div>
          <div className='flex flex-col'>
            <span className='truncate'>{row.original.name}</span>
            <span className='text-gray-500 font-semibold text-sm'>x2</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'order',
      header: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex gap-x-2 items-center cursor-pointer'>
              <span className='font-bold text-black text-base dark:text-white'>Status</span>
              <CaretDown size={20} weight='bold' />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuRadioGroup
              value={'all'}
              // onValueChange={(value: string) => setStatus(value as Product['order'] | 'all')}
            >
              <DropdownMenuRadioItem value='all'>All</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='order'>Order</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='confirm'>Confirm</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='delivery'>Delivery</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='success'>Success</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='cancel'>Cancel</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      cell: ({ row }) => <div className='capitalize'>{row.getValue('order')}</div>,
    },
    {
      accessorKey: 'paymentMethod',
      header: () => <div className='text-center font-bold text-black text-base dark:text-white'>Payment method</div>,
      cell: () => <div className='text-center font-medium'>{'Ship cod'}</div>,
    },
    {
      accessorKey: 'price',
      header: () => <div className='text-center font-bold text-black text-base dark:text-white'>Price</div>,
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'))

        // Format the price as a dollar price
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(price)

        return <div className='text-center font-medium'>{formatted}</div>
      },
    },
    {
      accessorKey: 'action',
      header: () => <div className='text-center font-bold text-black text-base dark:text-white'>Action</div>,
      cell: ({ row }) => {
        let content
        switch (row.original.order) {
          case 'order':
            content = (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <span className='text-blue-600 cursor-pointer hover:text-blue-800'>Xác nhận</span>
                  </DialogTrigger>
                  <DialogContent className='w-[360px] sm:min-w-[400px] md:w-[600px] xl:w-[700px] max-w-2xl'>
                    <DialogTitle className='hidden' />
                    <DialogDescription className='hidden' />
                    <ModalOrder order={row.original} updateData={setData} />
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <span className='text-red-600 cursor-pointer hover:text-red-800'>Hủy đơn</span>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently cancel your customer's order remove data
                        from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel asChild>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          setData((prev) =>
                            prev.map((prevOrder) => {
                              if (prevOrder.id === row.original.id) return { ...row.original, order: 'cancel' }
                              return prevOrder
                            }),
                          )
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )
            break
          case 'confirm':
            content = (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <span className='text-blue-600 cursor-pointer hover:text-blue-800'>Chuyển giao</span>
                  </DialogTrigger>
                  <DialogContent className='w-[360px] sm:min-w-[400px] md:w-[600px] xl:w-[700px] max-w-2xl'>
                    <DialogTitle className='hidden' />
                    <DialogDescription className='hidden' />
                    <ModalOrder order={row.original} updateData={setData} />
                  </DialogContent>
                </Dialog>
                <span className='text-red-600 cursor-pointer hover:text-red-800'>Hủy đơn</span>
              </>
            )
            break
          case 'delivery':
          case 'success':
          case 'cancel':
            content = (
              <Dialog>
                <DialogTrigger asChild>
                  <span className='text-blue-600 cursor-pointer hover:text-blue-800'>Xem chi tiết</span>
                </DialogTrigger>
                <DialogContent className='w-[360px] sm:min-w-[400px] md:w-[600px] xl:w-[700px] max-w-2xl'>
                  <DialogTitle className='hidden' />
                  <DialogDescription className='hidden' />
                  <ModalOrder order={row.original} updateData={setData} />
                </DialogContent>
              </Dialog>
            )
            break
          default:
            content = <span className='text-blue-600 cursor-pointer hover:text-blue-800'>Xem chi tiết</span>
        }
        return (
          <div className='flex gap-x-2 justify-center' key={row.id}>
            {content}
          </div>
        )
      },
    },
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
      rowSelection,
    },
  })

  return (
    <>
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h5 className='font-bold 2xl:text-lg md:text-base text-sm'>Tổng quan</h5>
          <Select>
            <SelectTrigger className='w-[160px] focus:ring-0 focus:ring-offset-0'>
              <div className='flex items-center gap-x-2'>
                <Calendar size={22} />
                <SelectValue placeholder='Select a fruit' />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Thời gian</SelectLabel>
                <SelectItem value='apple'>Apple</SelectItem>
                <SelectItem value='banana'>Banana</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-6 gap-4'>
          <div className='md:p-4 p-2 bg-blue-200 rounded-md'>
            <span>Tổng đơn hàng</span>
            <div className='flex items-center justify-between text-blue-900'>
              <span className='font-bold md:text-xl text-base'>340</span>
              <Scroll size={28} />
            </div>
          </div>
          <div className='md:p-4 p-2  bg-cyan-100 rounded-md'>
            <span>Đơn hàng cần xác nhận</span>
            <div className='flex items-center justify-between text-cyan-900'>
              <span className='font-bold md:text-xl text-base'>15</span>
              <Spinner size={28} />
            </div>
          </div>
          <div className='md:p-4 p-2  bg-yellow-100 rounded-md'>
            <span>Đơn hàng đã chuyển giao</span>
            <div className='flex items-center justify-between text-yellow-900'>
              <span className='font-bold md:text-xl text-base'>50</span>
              <UserCheck size={28} />
            </div>
          </div>
          <div className='md:p-4 p-2  bg-violet-200 rounded-md'>
            <span>Đơn hàng đang giao</span>
            <div className='flex items-center justify-between text-violet-900'>
              <span className='font-bold md:text-xl text-base'>89</span>
              <Truck size={28} />
            </div>
          </div>
          <div className='md:p-4 p-2 bg-green-200 rounded-md'>
            <span>Đơn hàng hoàn thành</span>
            <div className='flex items-center justify-between text-green-900'>
              <span className='font-bold md:text-xl text-base'>150</span>
              <CheckSquareOffset size={28} />
            </div>
          </div>
          <div className='md:p-4 p-2 bg-red-200 rounded-md'>
            <span>Đơn hàng bị hủy</span>
            <div className='flex items-center justify-between text-red-900'>
              <span className='font-bold md:text-xl text-base'>51</span>
              <FileX size={28} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='w-full'>
          <div className='flex items-center py-4 gap-x-2'>
            <Input
              placeholder='Filter products...'
              value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
              className='w-full focus-visible:ring-0 focus-visible:ring-offset-0'
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='ml-auto'>
                  Columns <CaretDown size={20} weight='bold' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className='capitalize'
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
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
              <TableBody className='w-full'>
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

export default Orders
