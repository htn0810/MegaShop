import { Button } from '@/components/ui/button'
import { CaretDown, CaretUp, CaretUpDown, Eye, EyeSlash, NotePencil, Plus, Trash } from '@phosphor-icons/react'
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
import { useEffect, useState } from 'react'
import { DataTablePagination } from '@/components/ui/data-table-pagination'
import ModalAddEditProduct from '@/modules/admin/product/modal_add_edit_product'
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
import { useSearchParams } from 'react-router-dom'
import { IProduct } from '@/apis/product/productInterface'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import ShopAPI from '@/apis/shop/shop'
import { toast } from 'sonner'
import { ProductApi } from '@/apis/product/product'

type ConfirmDialog = {
  data: IProduct | null
  isShow: boolean
}

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageIndex = searchParams.get('page')
  const pageSize = searchParams.get('limit')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [confirmDisableDialog, setConfirmDisableDialog] = useState<ConfirmDialog>({ data: null, isShow: false })
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState<ConfirmDialog>({ data: null, isShow: false })
  const [isRerender, setIsRerender] = useState(false)
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const [pagination, setPagination] = useState({
    pageIndex: pageIndex ? parseInt(pageIndex) - 1 : 0,
    pageSize: pageSize ? parseInt(pageSize) : 5,
  })

  const handleGetProducts = async () => {
    try {
      setIsLoading(true)
      const response = await ShopAPI.getAllProductsByShopId_Admin(2, pagination.pageIndex + 1, pagination.pageSize)
      setProducts(response.data.data.products)
      setPageCount(response.data.data.pagination.totalPages)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEnableProduct = async (productId: number) => {
    toast.promise(ProductApi.enableProduct(productId), {
      loading: 'Enabling product...',
      success: (_response) => {
        handleGetProducts()
        return 'Product enabled successfully!'
      },
    })
  }

  const handleDisableProduct = async (productId: number) => {
    toast.promise(ProductApi.disableProduct(productId), {
      loading: 'Disabling product...',
      success: (_response) => {
        handleGetProducts()
        return 'Product disabled successfully!'
      },
    })
  }

  const handleDeleteProduct = async (productId: number) => {
    toast.promise(ProductApi.deleteProduct(productId), {
      loading: 'Deleting product...',
      success: (_response) => {
        handleGetProducts()
        return 'Product deleted successfully!'
      },
    })
  }

  useEffect(() => {
    setSearchParams({
      page: (pagination.pageIndex + 1).toString(),
      limit: pagination.pageSize.toString(),
    })
    handleGetProducts()
  }, [pagination.pageIndex, pagination.pageSize, isRerender])

  const columns: ColumnDef<IProduct>[] = [
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
            <img src={row.original.imageUrls.split(',')[0]} alt='ProductImg' className='w-full h-full bg-cover' />
          </div>
          <span className='truncate text-xs md:text-sm'>{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'quantity',
      header: () => (
        <div className='font-semibold text-center text-black text-xs md:text-sm dark:text-white'>Quantity</div>
      ),
      cell: ({ row }) => <div className='text-center text-xs md:text-sm'>{row.original.stock}</div>,
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
          currency: 'USD',
        }).format(price)

        return <div className='text-center text-xs md:text-sm'>{formatted}</div>
      },
    },
    {
      id: 'actions',
      header: () => (
        <div className='font-semibold text-center text-black text-xs md:text-sm dark:text-white'>Actions</div>
      ),
      cell: ({ row }) => {
        return (
          <div className='flex gap-x-1 items-center justify-center'>
            <ModalAddEditProduct type='edit' product={row.original} onRerender={() => setIsRerender(!isRerender)}>
              <NotePencil size={20} className='cursor-pointer hover:opacity-80' />
            </ModalAddEditProduct>
            {!row.original.isActive && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Eye size={20} className='cursor-pointer hover:opacity-80' />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='text-sm md:text-base'>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className='text-xs md:text-sm'>
                      This action cannot be undone. This will enable your product and customer will see it.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className='flex flex-row gap-x-2 justify-end items-center'>
                    <AlertDialogCancel className='mt-0 dark:bg-gray-800 dark:text-white'>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleEnableProduct(row.original.id)}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            {row.original.isActive && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <EyeSlash size={20} className='cursor-pointer hover:opacity-80' />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='text-sm md:text-base'>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className='text-xs md:text-sm'>
                      This action cannot be undone. This will disable your product and customer will not see it.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className='flex flex-row gap-x-2 justify-end items-center'>
                    <AlertDialogCancel className='mt-0 dark:bg-gray-800 dark:text-white'>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDisableProduct(row.original.id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Trash
                    size={20}
                    className='cursor-pointer hover:opacity-80'
                    onClick={() => handleDeleteProduct(row.original.id)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Product</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: products,
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
    onPaginationChange: setPagination,
    pageCount: pageCount,
  })
  return (
    <div>
      <p className='text-end'>
        <ModalAddEditProduct type='add' onRerender={() => setIsRerender(!isRerender)}>
          <Button className='py-2 px-3'>
            <Plus className='md:size-6 size-4' weight='bold' />
          </Button>
        </ModalAddEditProduct>
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
          <div className='rounded-md border overflow-hidden dark:border-gray-700'>
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
                      className={`dark:border-gray-700 ${row.original.isActive ? '' : 'bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] opacity-70 dark:opacity-50'}`}
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
                          <div className='flex w-[30%] gap-x-4 items-center'>
                            <Skeleton className='h-10 md:h-14 w-16   lg:h-20 lg:w-24 bg-gray-200' />
                            <Skeleton className='h-4 md:h-8 w-full bg-gray-200' />
                          </div>
                          <div className='grid grid-cols-3 w-[70%] gap-x-1 items-center place-items-center'>
                            <Skeleton className='h-6 md:h-12 md:w-20 w-12 bg-gray-200 rounded-md' />
                            <Skeleton className='h-6 md:h-12 md:w-20 w-12 bg-gray-200 rounded-md' />
                            <Skeleton className='h-6 md:h-12 md:w-20 w-12 bg-gray-200 rounded-md' />
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
