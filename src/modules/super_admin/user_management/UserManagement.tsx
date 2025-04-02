import { Button } from '@/components/ui/button'
import { CaretDown, CaretUp, CaretUpDown } from '@phosphor-icons/react'
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
import { IUser } from '@/types/user.type'
import AuthAPI from '@/apis/auth/auth'
import { useSearchParams } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'
import { DEFAULT_USER_AVATAR } from '@/constants/common.constant'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { UserStatus } from '@/apis/auth/authInterfaces'

const UserManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageIndex = searchParams.get('page')
  const pageSize = searchParams.get('limit')
  const statusParam = searchParams.get('status')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [users, setUsers] = useState<IUser[]>([])
  const [pagination, setPagination] = useState({
    pageIndex: pageIndex ? parseInt(pageIndex) - 1 : 0,
    pageSize: pageSize ? parseInt(pageSize) : 5,
  })
  const [status, setStatus] = useState<UserStatus | 'all'>(statusParam ? (statusParam as UserStatus) : 'all')
  const [pageCount, setPageCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleGetUsers = async () => {
    setIsLoading(true)
    AuthAPI.getUsers(pagination.pageIndex + 1, pagination.pageSize, status)
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data.data.users)
          setPageCount(res.data.data.pagination.totalPages)
          if (res.data.data.users.length === 0 && res.data.data.pagination.total > 0) {
            setPagination({
              pageIndex: 0,
              pageSize: pagination.pageSize,
            })
          }
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setSearchParams({
      page: (pagination.pageIndex + 1).toString(),
      limit: pagination.pageSize.toString(),
      status: status,
    })
    handleGetUsers()
  }, [pagination.pageIndex, pagination.pageSize, status])

  const handleDisableUser = async (userId: number) => {
    toast.promise(AuthAPI.disableUser(userId), {
      loading: 'Disabling user...',
      success: (_response) => {
        handleGetUsers()
        return 'User disabled successfully'
      },
    })
  }

  const handleEnableUser = async (userId: number) => {
    toast.promise(AuthAPI.enableUser(userId), {
      loading: 'Disabling user...',
      success: (_response) => {
        handleGetUsers()
        return 'User disabled successfully'
      },
    })
  }

  const columns: ColumnDef<IUser>[] = [
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
            <img
              src={row.original.avatarUrl ?? DEFAULT_USER_AVATAR}
              alt='ProductImg'
              className='w-full h-full bg-cover'
            />
          </div>
          <span className='truncate text-xs md:text-sm'>{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'mail',
      header: () => <div className='font-semibold text-black text-xs md:text-sm dark:text-white'>Email</div>,
      cell: ({ row }) => <div className='text-xs md:text-sm'>{row.original.email}</div>,
    },
    {
      accessorKey: 'tenant',
      header: () => (
        <div className='font-semibold text-black text-xs md:text-sm dark:text-white text-center'>Tenant</div>
      ),
      cell: ({ row }) => <div className='text-xs md:text-sm text-center'>{row.original?.shop?.name ?? '/___'}</div>,
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
              onValueChange={(value: string) => setStatus(value as UserStatus | 'all')}
            >
              <DropdownMenuRadioItem value='all' className='text-xs md:text-sm'>
                All
              </DropdownMenuRadioItem>
              {Object.values(UserStatus).map((status) => (
                <DropdownMenuRadioItem key={status} value={status} className='text-xs md:text-sm'>
                  {status}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      cell: ({ row }) => (
        <div className='flex items-center justify-center'>
          <Badge className={`${row.original.isDeleted ? 'bg-gray-500' : 'bg-green-500'}`}>
            {row.original.isDeleted ? 'Disabled' : 'Active'}
          </Badge>
        </div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      header: () => (
        <div className='font-semibold text-black text-center text-xs md:text-sm dark:text-white'>Actions</div>
      ),
      cell: ({ row }) => (
        <>
          {row.original.isDeleted && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className='text-center text-xs md:text-sm text-green-500 cursor-pointer hover:text-green-700'>
                  Activate
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className='text-sm md:text-base'>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className='text-xs md:text-sm'>
                    This action cannot be undone. This will permanently activate your user and remove your data from our
                    servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='flex flex-row gap-x-2 justify-end items-center'>
                  <AlertDialogCancel className='mt-0 dark:bg-gray-800 dark:text-white'>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleEnableUser(row.original.id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {!row.original.isDeleted && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className='text-center text-xs md:text-sm text-red-500 cursor-pointer hover:text-red-700'>
                  Disable
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className='text-sm md:text-base'>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className='text-xs md:text-sm'>
                    This action cannot be undone. This will permanently delete your user and remove your data from our
                    servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='flex flex-row gap-x-2 justify-end items-center'>
                  <AlertDialogCancel className='mt-0 dark:bg-gray-800 dark:text-white'>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDisableUser(row.original.id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </>
      ),
    },
  ]

  const table = useReactTable({
    data: users,
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
    pageCount: pageCount,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onPaginationChange: setPagination,
  })
  return (
    <div>
      <h2 className='font-bold text-sm md:text-base'>User Management</h2>
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
                  <TableRow key={headerGroup.id} className='dark:border-gray-600'>
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
                        <div className='flex justify-between gap-x-4 md:gap-x-8 lg:gap-x-12 xl:gap-x-14'>
                          <div className='flex w-[40%] gap-x-4 items-center'>
                            <Skeleton className='h-14 w-16   lg:h-20 lg:w-24 bg-gray-200' />
                            <Skeleton className='h-8 w-full bg-gray-200' />
                          </div>
                          <div className='flex w-[60%] lg:px-8 md:px-6 px-2 items-center justify-between'>
                            <Skeleton className='h-12 w-20 bg-gray-200 rounded-md' />
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

export default UserManagement
