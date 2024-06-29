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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import ModalAddEditProduct from '@/modules/admin/modal-add-edit-product'

const data: Product[] = [
  {
    id: 'm5gr84i9',
    quantity: 316,
    price: 100,
    status: 'disabled',
    name: 'ken99@yahoo.com',
    image:
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3u1reuv4',
    quantity: 242,
    price: 100,
    status: 'in stock',
    name: 'Abe45@gmail.com',
    image:
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'derv1ws0',
    quantity: 837,
    price: 100,
    status: 'in stock',
    name: 'Monserrat44@gmail.com',
    image:
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '5kma53ae',
    quantity: 874,
    price: 100,
    status: 'out of stock',
    name: 'Silas22@gmail.com',
    image:
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'bhqecj4p',
    quantity: 721,
    price: 100,
    status: 'in stock',
    name: 'carmella@hotmail.com',
    image:
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]

type Product = {
  id: string
  quantity: number
  name: string
  status: 'in stock' | 'out of stock' | 'disabled'
  image: string
  price: number
}

const Product = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [status, setStatus] = useState<Product['status'] | 'all'>('all')

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
      cell: () => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='text-end float-right'>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <DotsThree size={20} weight='bold' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Hidden</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
            <ModalAddEditProduct />
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
    </div>
  )
}

export default Product
