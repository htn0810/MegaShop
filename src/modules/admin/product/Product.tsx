import { Button } from '@/components/ui/button'
import { CaretDown, CaretUpDown, DotsThree, Plus } from '@phosphor-icons/react'
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState } from 'react'
import { DataTablePagination } from '@/components/ui/data-table-pagination'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import ModalAddEditProduct from '@/modules/admin/modal-add-edit-product'
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

const data: Product[] = [
  {
    id: 'm5gr84i9',
    quantity: 316,
    saleOff: 20,
    isDisabled: false,
    price: 100,
    status: 'in stock',
    description: '',
    name: 'ken99@yahoo.com',
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
}

type ConfirmDialog = {
  data: Product | null
  isShow: boolean
}

const Product = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [status, setStatus] = useState<Product['status'] | 'all'>('all')
  const [confirmDisableDialog, setConfirmDisableDialog] = useState<ConfirmDialog>({ data: null, isShow: false })
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState<ConfirmDialog>({ data: null, isShow: false })

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
          <span className='truncate'>{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
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
              value={status}
              onValueChange={(value: string) => setStatus(value as Product['status'] | 'all')}
            >
              <DropdownMenuRadioItem value='all'>All</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='in stock'>In Stock</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='out of stock'>Out of Stock</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='disabled'>Disabled</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      cell: ({ row }) => <div className='capitalize'>{row.getValue('status')}</div>,
    },
    {
      accessorKey: 'quantity',
      header: () => <div className='text-center font-bold text-black text-base dark:text-white'>Quantity</div>,
      cell: ({ row }) => <div className='text-center font-medium'>{row.original.quantity}</div>,
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
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className='bg-white'>
            <Dialog>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild className='text-end float-right'>
                  <DotsThree size={20} weight='bold' className='cursor-pointer' />
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      <span>Edit</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuItem onClick={() => setConfirmDisableDialog({ data: row.original, isShow: true })}>
                    Disabled
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setConfirmDeleteDialog({ data: row.original, isShow: true })}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent className='w-[360px] sm:min-w-[400px] md:w-[600px] xl:w-[700px] max-w-2xl'>
                <DialogTitle className='hidden' />
                <DialogDescription className='hidden' />
                <ModalAddEditProduct type='edit' product={row.original} />
              </DialogContent>
            </Dialog>
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
    <div>
      <p className='text-end'>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='py-2 px-3'>
              <Plus size={20} weight='bold' />
            </Button>
          </DialogTrigger>
          <DialogContent className='w-[360px] sm:min-w-[400px] md:w-[600px] xl:w-[700px] max-w-2xl'>
            <DialogTitle className='hidden' />
            <DialogDescription className='hidden' />
            <ModalAddEditProduct type='add' />
          </DialogContent>
        </Dialog>
      </p>

      <div>
        <div className='w-full'>
          <div className='flex items-center py-4 gap-x-2'>
            <Input
              placeholder='Filter products...'
              value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
              className='max-w-sm'
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
              <TableBody>
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
      <AlertDialog
        open={confirmDisableDialog.isShow}
        onOpenChange={() => setConfirmDisableDialog({ data: null, isShow: false })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will disable your product and customer will not see it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConfirmDisableDialog({ data: null, isShow: false })}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => setConfirmDisableDialog({ data: null, isShow: false })}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={confirmDeleteDialog.isShow}
        onOpenChange={() => setConfirmDeleteDialog({ data: null, isShow: false })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your product and remove your data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConfirmDeleteDialog({ data: null, isShow: false })}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => setConfirmDeleteDialog({ data: null, isShow: false })}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Product
