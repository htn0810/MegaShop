import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight } from '@phosphor-icons/react'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  let pageSizes = [5, 10, 20, 50]
  if (!pageSizes.includes(table.getState().pagination.pageSize)) {
    let newPageSizeIdx = pageSizes.findIndex((size) => size >= table.getState().pagination.pageSize)
    if (newPageSizeIdx === -1) {
      newPageSizeIdx = pageSizes.length - 1
      pageSizes.push(table.getState().pagination.pageSize)
    }
    pageSizes = [
      ...pageSizes.slice(0, newPageSizeIdx),
      table.getState().pagination.pageSize,
      ...pageSizes.slice(newPageSizeIdx),
    ]
  }
  return (
    <div className='flex items-center justify-between px-2'>
      <div className='flex items-center space-x-2 md:space-x-4 lg:space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-1 md:space-x-2'>
          <p className='text-xs md:text-sm font-medium'>Rows</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              console.log(value)
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {pageSizes.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center justify-center text-xs md:text-sm font-medium'>
          Page {table.getState().pagination.pageIndex + 1}/{table.getPageCount()}
        </div>
        <div className='flex items-center space-x-1 md:space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex cursor-pointer'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to first page</span>
            <CaretDoubleLeft size={20} weight='bold' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0 cursor-pointer'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to previous page</span>
            <CaretLeft size={20} weight='bold' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0 cursor-pointer'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to next page</span>
            <CaretRight size={20} weight='bold' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex cursor-pointer'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to last page</span>
            <CaretDoubleRight size={20} weight='bold' />
          </Button>
        </div>
      </div>
    </div>
  )
}
