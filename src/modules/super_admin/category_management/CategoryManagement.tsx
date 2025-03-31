import { Button } from '@/components/ui/button'
import { CaretDown, CaretUp, CaretUpDown, Plus } from '@phosphor-icons/react'
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
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
import { useEffect, useState } from 'react'
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
import ModalCategory from '@/modules/super_admin/category_management/modal_category'
import { ICategoryResponse } from '@/apis/category/categoryInterface'
import { CategoryApi } from '@/apis/category/category'
import { Skeleton } from '@/components/ui/skeleton'
import { useSearchParams } from 'react-router-dom'
const CategoryManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageIndex = searchParams.get('page')
  const pageSize = searchParams.get('limit')
  const [categories, setCategories] = useState<ICategoryResponse[]>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: pageIndex ? parseInt(pageIndex) - 1 : 0,
    pageSize: pageSize ? parseInt(pageSize) : 5,
  })
  const [pageCount, setPageCount] = useState(0)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [isReRender, setIsReRender] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleGetCategories = async () => {
    setIsLoading(true)
    const response = await CategoryApi.getCategories(pagination.pageIndex + 1, pagination.pageSize)
    if (response.status === 200) {
      setCategories(response.data.data.categories)
      setPagination({
        pageIndex: response.data.data.pagination.page - 1,
        pageSize: response.data.data.pagination.limit,
      })
      setPageCount(response.data.data.pagination.totalPages)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    setSearchParams({ page: (pagination.pageIndex + 1).toString(), limit: pagination.pageSize.toString() })
    handleGetCategories()
  }, [isReRender, pagination.pageSize, pagination.pageIndex])

  const handleDeleteCategory = async (id: number) => {
    const response = await CategoryApi.deleteCategory(id)
    if (response.status === 200) {
      setIsReRender(!isReRender)
      setPagination({ pageIndex: 0, pageSize: 5 })
    }
  }

  const columns: ColumnDef<ICategoryResponse>[] = [
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
            <img src={row.original.imageUrl} alt='ProductImg' className='w-full h-full bg-cover' />
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
                    This action cannot be undone. This will permanently delete your category and remove your data from
                    our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='flex flex-row gap-x-2 justify-end items-center'>
                  <AlertDialogCancel className='mt-0'>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDeleteCategory(row.original.id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <ModalCategory
              type='edit'
              category={{ id: row.original.id, name: row.original.name, imageUrl: row.original.imageUrl }}
              onRerender={() => setIsReRender(!isReRender)}
            >
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
    data: categories,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    pageCount: pageCount,
    onPaginationChange: setPagination,
  })
  return (
    <div>
      <h2 className='font-bold text-sm md:text-base'>Categories Management</h2>
      <p className='text-end'>
        <ModalCategory type='add' onRerender={() => setIsReRender(!isReRender)}>
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
          <div className='rounded-md border dark:border-gray-700 overflow-hidden'>
            <Table>
              <TableHeader className='bg-blue-100 dark:bg-gray-900'>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className=' dark:border-gray-600'>
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
                {!isLoading &&
                  table.getRowModel().rows?.length > 0 &&
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className='dark:border-gray-700'
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                {!isLoading && table.getRowModel().rows?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={columns.length} className='h-24 text-center'>
                      No results.
                    </TableCell>
                  </TableRow>
                )}
                {isLoading &&
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={columns.length}>
                        <div className='flex justify-between gap-x-4'>
                          <div className='flex w-[70%] gap-x-4 items-center'>
                            <Skeleton className='h-14 w-16   lg:h-20 lg:w-24 bg-gray-200' />
                            <Skeleton className='h-8 w-full bg-gray-200' />
                          </div>
                          <div className='flex w-[30%] gap-x-2 lg:px-8 md:px-6 px-2 items-center justify-start'>
                            <Skeleton className='h-12 w-20 bg-gray-200 rounded-md' />
                            <Skeleton className='h-12 w-20 bg-gray-200 rounded-md' />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
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
