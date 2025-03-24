import { Button } from '@/components/ui/button'
import { CaretDown, CaretUp, CaretUpDown, DotsThree, Plus } from '@phosphor-icons/react'
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
  useReactTable
} from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState } from 'react'
import { DataTablePagination } from '@/components/ui/data-table-pagination'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import ModalAddEditProduct from '@/modules/admin/modal_add_edit_product'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
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
    order: 'order',
    image:
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
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
        let sortedIcon
        switch (column.getIsSorted()) {
          case 'asc':
            sortedIcon = <CaretUp className='md:text-lg text-sm' />
            break
          case 'desc':
            sortedIcon = <CaretDown className='md:text-lg text-sm' />
            break
          default:
            sortedIcon = <CaretUpDown className='md:text-lg text-sm' />
        }
        return (
          <div
            className='flex gap-x-2 cursor-pointer'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <span className='font-semibold text-black text-xs md:text-sm dark:text-white'>Name</span>
            {sortedIcon}
          </div>
        )
      },
      cell: ({ row }) => (
        <div className='flex gap-x-2 md:gap-x-4 items-center'>
          <div className='md:size-16 size-12'>
            <img src={row.original.image} alt='ProductImg' className='w-full h-full bg-cover' />
          </div>
          <span className='truncate text-xs md:text-sm'>{row.original.name}</span>
        </div>
      )
    },
    {
      accessorKey: 'status',
      header: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex gap-x-2 items-center cursor-pointer'>
              <span className='font-semibold text-black text-xs md:text-sm dark:text-white'>Status</span>
              <CaretDown className='md:text-lg text-sm' />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={status}
              onValueChange={(value: string) => setStatus(value as Product['status'] | 'all')}
            >
              <DropdownMenuRadioItem value='all' className='text-xs md:text-sm'>
                All
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='in stock' className='text-xs md:text-sm'>
                In Stock
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='out of stock' className='text-xs md:text-sm'>
                Out of Stock
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='disabled' className='text-xs md:text-sm'>
                Disabled
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      cell: ({ row }) => <div className='capitalize text-xs md:text-sm'>{row.getValue('status')}</div>
    },
    {
      accessorKey: 'quantity',
      header: () => (
        <div className='font-semibold text-center text-black text-xs md:text-sm dark:text-white'>Quantity</div>
      ),
      cell: ({ row }) => <div className='text-center text-xs md:text-sm'>{row.original.quantity}</div>
    },
    {
      accessorKey: 'price',
      header: () => (
        <div className='font-semibold text-center text-black text-xs md:text-sm dark:text-white'>Price</div>
      ),
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'))

        // Format the price as a dollar price
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(price)

        return <div className='text-center text-xs md:text-sm'>{formatted}</div>
      }
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
                  <DropdownMenuLabel className='text-xs md:text-sm'>Actions</DropdownMenuLabel>
                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      <span className='text-xs md:text-sm'>Edit</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuItem
                    className='text-xs md:text-sm'
                    onClick={() => setConfirmDisableDialog({ data: row.original, isShow: true })}
                  >
                    Disabled
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className='text-xs md:text-sm'
                    onClick={() => setConfirmDeleteDialog({ data: row.original, isShow: true })}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent className='min-w-5xl max-w-5xl'>
                <DialogTitle className='hidden' />
                <DialogDescription className='hidden' />
                <ModalAddEditProduct type='edit' product={row.original} />
              </DialogContent>
            </Dialog>
          </div>
        )
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
    <div>
      <p className='text-end'>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='py-2 px-3'>
              <Plus className='md:size-6 size-4' weight='bold' />
            </Button>
          </DialogTrigger>
          <DialogContent className='min-w-5xl max-w-5xl'>
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
              className='max-w-sm  text-xs md:text-sm'
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='ml-auto text-xs md:text-sm'>
                  Columns <CaretDown className='text-sm md:text-lg ml-1 md:ml-2' weight='bold' />
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
            <AlertDialogTitle className='text-sm md:text-base'>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className='text-xs md:text-sm'>
              This action will disable your product and customer will not see it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='flex flex-row gap-x-2 justify-end'>
            <AlertDialogCancel
              className='text-sm md:text-base mt-0'
              onClick={() => setConfirmDisableDialog({ data: null, isShow: false })}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className='text-sm md:text-base'
              onClick={() => setConfirmDisableDialog({ data: null, isShow: false })}
            >
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
            <AlertDialogTitle className='text-sm md:text-base'>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className='text-xs md:text-sm'>
              This action cannot be undone. This will permanently delete your product and remove your data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='flex flex-row gap-x-2 justify-end'>
            <AlertDialogCancel
              className='text-sm md:text-base mt-0'
              onClick={() => setConfirmDeleteDialog({ data: null, isShow: false })}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className='text-sm md:text-base'
              onClick={() => setConfirmDeleteDialog({ data: null, isShow: false })}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Product
