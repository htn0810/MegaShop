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
      header: () => {
        return <div className='text-xs md:text-sm text-left text-black font-semibold dark:text-white'>Name</div>
      },
      cell: ({ row }) => (
        <div className='flex gap-x-2 md:gap-x-4 items-center'>
          <div className='size-12 md:size-16'>
            <img src={row.original.image} alt='ProductImg' className='w-full h-full bg-cover' />
          </div>
          <div className='flex flex-col text-xs md:text-sm'>
            <span className='truncate'>{row.original.name}</span>
            <span className='text-gray-500 font-semibold'>x2</span>
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
              <span className='text-xs md:text-sm text-left text-black font-semibold dark:text-white'>Status</span>
              <CaretDown className='text-sm md:text-xl' />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='md:w-40'>
            <DropdownMenuRadioGroup
              value={'all'}
              // onValueChange={(value: string) => setStatus(value as Product['order'] | 'all')}
            >
              <DropdownMenuRadioItem className='text-xs md:text-sm' value='all'>
                All
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem className='text-xs md:text-sm' value='order'>
                Order
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem className='text-xs md:text-sm' value='confirm'>
                Confirm
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem className='text-xs md:text-sm' value='delivery'>
                Delivery
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem className='text-xs md:text-sm' value='success'>
                Success
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem className='text-xs md:text-sm' value='cancel'>
                Cancel
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      cell: ({ row }) => <div className='text-xs md:text-sm'>{row.getValue('order')}</div>,
    },
    {
      accessorKey: 'paymentMethod',
      header: () => (
        <div className='text-xs md:text-sm text-center text-black font-semibold dark:text-white'>Payment method</div>
      ),
      cell: () => <div className='text-xs text-center md:text-sm'>{'Ship cod'}</div>,
    },
    {
      accessorKey: 'price',
      header: () => (
        <div className='text-xs md:text-sm text-center text-black font-semibold dark:text-white'>Price</div>
      ),
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'))

        // Format the price as a dollar price
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(price)

        return <div className='text-xs md:text-sm text-center'>{formatted}</div>
      },
    },
    {
      accessorKey: 'action',
      header: () => (
        <div className='text-xs md:text-sm text-center text-black font-semibold dark:text-white'>Action</div>
      ),
      cell: ({ row }) => {
        let content
        switch (row.original.order) {
          case 'order':
            content = (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <span className='text-blue-600 cursor-pointer hover:text-blue-800 text-xs md:text-sm'>
                      Xác nhận
                    </span>
                  </DialogTrigger>
                  <DialogContent className='w-[360px] sm:min-w-[400px] md:w-[600px] xl:w-[700px] max-w-2xl'>
                    <DialogTitle className='hidden' />
                    <DialogDescription className='hidden' />
                    <ModalOrder order={row.original} updateData={setData} />
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <span className='text-red-600 cursor-pointer hover:text-red-800 text-xs md:text-sm'>Hủy đơn</span>
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
                    <span className='text-blue-600 cursor-pointer hover:text-blue-800 text-xs md:text-sm'>
                      Chuyển giao
                    </span>
                  </DialogTrigger>
                  <DialogContent className='w-[360px] sm:min-w-[400px] md:w-[600px] xl:w-[700px] max-w-2xl'>
                    <DialogTitle className='hidden' />
                    <DialogDescription className='hidden' />
                    <ModalOrder order={row.original} updateData={setData} />
                  </DialogContent>
                </Dialog>
                <span className='text-red-600 cursor-pointer hover:text-red-800 text-xs md:text-sm'>Hủy đơn</span>
              </>
            )
            break
          case 'delivery':
          case 'success':
          case 'cancel':
            content = (
              <Dialog>
                <DialogTrigger asChild>
                  <span className='text-blue-600 cursor-pointer hover:text-blue-800 text-xs md:text-sm'>
                    Xem chi tiết
                  </span>
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
            content = (
              <span className='text-blue-600 cursor-pointer hover:text-blue-800 text-xs md:text-sm'>Xem chi tiết</span>
            )
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
            <SelectTrigger className='w-[140px] md:w-[160px] focus:ring-0 focus:ring-offset-0'>
              <div className='flex items-center gap-x-2 text-xs md:text-sm'>
                <Calendar className='text-sm md:text-xl' />
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
        <div className='grid grid-cols-2 lg:grid-cols-6 gap-4'>
          <div className='md:p-4 p-2 bg-blue-200 rounded-md flex items-center justify-between'>
            <div className='flex flex-col gap-y-1 text-blue-900'>
              <span className='text-black text-xs md:text-base'>Tổng đơn hàng</span>
              <span className='font-bold md:text-xl text-base'>340</span>
            </div>
            <Scroll className='md:size-7 size-5' />
          </div>
          <div className='md:p-4 p-2  bg-cyan-100 rounded-md  flex items-center justify-between'>
            <div className='flex flex-col gap-y-1 text-cyan-900'>
              <span className='text-black text-xs md:text-base'>Đơn hàng cần xác nhận</span>
              <span className='font-bold md:text-xl text-base'>15</span>
            </div>
            <Spinner className='md:size-7 size-5' />
          </div>
          <div className='md:p-4 p-2  bg-yellow-100 rounded-md  flex items-center justify-between'>
            <div className='flex flex-col gap-y-1 text-yellow-900'>
              <span className='text-black text-xs md:text-base'>Đơn hàng đã chuyển giao</span>
              <span className='font-bold md:text-xl text-base'>50</span>
            </div>
            <UserCheck className='md:size-7 size-5' />
          </div>
          <div className='md:p-4 p-2  bg-violet-200 rounded-md  flex items-center justify-between'>
            <div className='flex flex-col gap-y-1 text-violet-900'>
              <span className='text-black text-xs md:text-base'>Đơn hàng đang giao</span>
              <span className='font-bold md:text-xl text-base'>89</span>
            </div>
            <Truck className='md:size-7 size-5' />
          </div>
          <div className='md:p-4 p-2 bg-green-200 rounded-md  flex items-center justify-between'>
            <div className='flex flex-col gap-y-1 text-green-900'>
              <span className='text-black text-xs md:text-base'>Đơn hàng hoàn thành</span>
              <span className='font-bold md:text-xl text-base'>150</span>
            </div>
            <CheckSquareOffset className='md:size-7 size-5' />
          </div>
          <div className='md:p-4 p-2 bg-red-200 rounded-md  flex items-center justify-between'>
            <div className='flex flex-col gap-y-1 text-red-900'>
              <span className='text-black text-xs md:text-base'>Đơn hàng bị hủy</span>
              <span className='font-bold md:text-xl text-base'>51</span>
            </div>
            <FileX className='md:size-7 size-5' />
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
              className='w-full focus-visible:ring-0 focus-visible:ring-offset-0 text-xs md:text-sm'
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='ml-auto text-xs md:text-sm'>
                  Columns <CaretDown className='text-xs md:text-xl ml-1 md:ml-2' weight='bold' />
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
                        className='capitalize text-xs md:text-sm'
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
