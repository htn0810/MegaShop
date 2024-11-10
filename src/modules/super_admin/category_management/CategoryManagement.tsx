import { Button } from '@/components/ui/button'
import { CaretDown, CaretUp, CaretUpDown, Plus } from '@phosphor-icons/react'
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
} from '@/components/ui/alert-dialog'
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import ModalCategory from '@/modules/super_admin/modal_category'

type Category = {
  id: string
  name: string
  image: string
}

const data: Category[] = [
  {
    id: 'm5gr84i9',
    name: 'ken99@yahoo.com',
    image:
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3u1reuv4',
    name: 'Abe45@gmail.com',
    image:
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'derv1ws0',
    name: 'Monserrat44@gmail.com',
    image:
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '5kma53ae',
    name: 'Silas22@gmail.com',
    image:
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'bhqecj4p',
    name: 'carmella@hotmail.com',
    image:
      'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]

const CategoryManagement = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const columns: ColumnDef<Category>[] = [
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
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      header: () => (
        <div className='font-semibold text-black text-center text-xs md:text-sm dark:text-white'>Actions</div>
      ),
      cell: ({ row }) => {
        return (
          <div className='flex gap-x-2 justify-center items-center'>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className='text-center text-xs md:text-sm text-red-500 cursor-pointer hover:text-red-700'>
                  Delete
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className='text-sm md:text-base'>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className='text-xs md:text-sm'>
                    This action cannot be undone. This will permanently delete your product and remove your data from
                    our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='flex flex-row gap-x-2 justify-end'>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <ModalCategory type='edit' category={{ name: row.original.name, image: row.original.image }}>
              <div className='text-center text-xs md:text-sm text-blue-500 cursor-pointer hover:text-blue-700'>
                Edit
              </div>
            </ModalCategory>
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
      <h2 className='font-bold text-sm md:text-base'>Categories Management</h2>
      <p className='text-end'>
        <ModalCategory type='add'>
          <Button className='py-2 px-3'>
            <Plus className='md:size-6 size-4' weight='bold' />
          </Button>
        </ModalCategory>
      </p>
      <div>
        <div className='w-full'>
          <div className='flex items-center py-4 gap-x-2'>
            <Input
              placeholder='Filter names...'
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
    </div>
  )
}

export default CategoryManagement