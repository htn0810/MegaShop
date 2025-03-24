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
import { Button } from '@/components/ui/button'
import { DataTablePagination } from '@/components/ui/data-table-pagination'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import ModalDiscountProduct from '@/modules/admin/modal_discount_directly_product'
import { SealPercent, Tag } from '@phosphor-icons/react'
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
  VisibilityState,
} from '@tanstack/react-table'
import { useState } from 'react'

type Discount = {
  startDate: Date
  endDate: Date
  products: []
  percent: number
  kind: 'all' | 'specific'
  limit: number | undefined
}

const discountData: Discount[] = [
  {
    startDate: new Date('01/02/2024'),
    endDate: new Date('03/03/2024'),
    products: [],
    percent: 20,
    kind: 'all',
    limit: undefined,
  },
  {
    startDate: new Date('05/04/2024'),
    endDate: new Date('10/04/2024'),
    products: [],
    percent: 35,
    kind: 'specific',
    limit: 20,
  },
]

const Discount = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [data, setData] = useState<Discount[]>(discountData)

  const columns: ColumnDef<Discount>[] = [
    {
      accessorKey: 'percent',
      header: () => (
        <div className='text-xs md:text-sm text-center text-black font-semibold dark:text-white'>Mức giảm giá</div>
      ),
      cell: ({ row }) => <div className='text-center text-xs md:text-sm'>{row.original.percent}</div>,
    },
    {
      accessorKey: 'startDate',
      header: () => (
        <div className='text-xs md:text-sm text-center text-black font-semibold dark:text-white'>Thơi gian bắt đầu</div>
      ),
      cell: ({ row }) => (
        <div className='text-center text-xs md:text-sm '>{row.original.startDate.toLocaleDateString()}</div>
      ),
    },
    {
      accessorKey: 'endDate',
      header: () => (
        <div className='text-xs md:text-sm text-center text-black font-semibold dark:text-white'>
          Thơi gian kết thúc
        </div>
      ),
      cell: ({ row }) => (
        <div className='text-center text-xs md:text-sm '>{row.original.endDate.toLocaleDateString()}</div>
      ),
    },
    {
      accessorKey: 'products',
      header: () => (
        <div className='text-xs md:text-sm text-center text-black font-semibold dark:text-white'>Sản phẩm áp dụng</div>
      ),
      cell: ({ row }) => (
        <div className='text-center text-xs md:text-sm '>
          {row.original.kind === 'all' ? 'Tất cả sản phẩm' : 'Sản phẩm chỉ định'}
        </div>
      ),
    },
    {
      accessorKey: 'action',
      header: () => (
        <div className='text-xs md:text-sm text-center text-black font-semibold dark:text-white'>Action</div>
      ),
      cell: ({ row }) => (
        <div className='flex gap-x-2 justify-center items-center text-xs md:text-sm '>
          <Dialog>
            <DialogTrigger asChild>
              <span className='text-blue-600 cursor-pointer hover:text-blue-800'>Cập nhật</span>
            </DialogTrigger>
            <DialogContent className='w-[360px] sm:min-w-[400px] md:w-[600px] xl:w-[700px] max-w-2xl'>
              <DialogTitle className='hidden' />
              <DialogDescription className='hidden' />
              <ModalDiscountProduct type='edit' kind={row.original.kind} discount={row.original} />
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <span className='text-red-600 cursor-pointer hover:text-red-800'>Xóa</span>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-sm md:text-base'>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className='text-xs md:text-sm'>
                  This action cannot be undone. This will permanently delete your discount and remove data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className='flex flex-row gap-x-2 items-center justify-end'>
                <AlertDialogCancel asChild className='text-sm md:text-base'>
                  <Button className='text-black text-sm md:text-base mt-0'>Cancel</Button>
                </AlertDialogCancel>
                <AlertDialogAction className='text-sm md:text-base' onClick={() => {}}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
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
        <h5 className='font-bold 2xl:text-lg md:text-base text-sm'>Khuyến mãi</h5>
        <div className='mt-6 flex gap-x-8 gap-y-2 md:flex-row flex-col'>
          <div className='flex gap-x-2 md:gap-x-4 items-center'>
            <span className='flex shrink-0 size-12 md:size-16 rounded-full bg-blue-100 items-center justify-center text-blue-600'>
              <Tag className='md:size-7 size-5' />
            </span>
            <div>
              <h6 className='font-semibold md:text-base text-sm'>Giảm giá trực tiếp sản phẩm</h6>
              <p className='text-gray-700 text-xs md:text-sm '>
                Tăng đơn hàng bằng cách giảm giá sản phẩm trong các dịp đặc biệt
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <span className='mt-2 block text-sm md:text-base text-blue-700 cursor-pointer hover:text-blue-200'>
                    Tạo giảm giá trực tiếp
                  </span>
                </DialogTrigger>
                <DialogContent className='w-[360px] sm:min-w-[400px] md:w-[600px] xl:w-[700px] max-w-2xl'>
                  <DialogTitle className='hidden' />
                  <DialogDescription className='hidden' />
                  <ModalDiscountProduct type='add' kind='specific' />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className='flex gap-x-2 md:gap-x-4 items-center'>
            <span className='flex shrink-0 size-12 md:size-16 rounded-full bg-blue-100 items-center justify-center text-blue-600'>
              <SealPercent className='md:size-7 size-5' />
            </span>
            <div>
              <h6 className='font-semibold md:text-base text-sm'>Tạo mã giảm giá</h6>
              <p className='text-gray-700 text-xs md:text-sm '>
                Tăng đơn hàng bằng cách giảm giá toàn bộ sản phẩm cửa hàng.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <span className='mt-2 block text-sm md:text-base text-blue-700 cursor-pointer hover:text-blue-200'>
                    Tạo mã giảm giá
                  </span>
                </DialogTrigger>
                <DialogContent className='w-[360px] sm:min-w-[400px] md:w-[600px] xl:w-[700px] max-w-2xl'>
                  <DialogTitle className='hidden' />
                  <DialogDescription className='hidden' />
                  <ModalDiscountProduct type='add' kind='all' />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <h5 className='font-bold 2xl:text-lg md:text-base text-sm'>Danh sách khuyến mãi đã tạo</h5>
        <div className='w-full mt-4'>
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

export default Discount
