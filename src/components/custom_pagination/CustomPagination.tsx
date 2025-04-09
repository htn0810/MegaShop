import { type ReactNode } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export interface CustomPaginationProps {
  totalPages: number
  pageSize: number
  page: number
  onPageChange: React.Dispatch<React.SetStateAction<{ page: number; pageSize: number; totalPages: number }>>
}

export function CustomPagination({ pageSize = 12, totalPages = 1, page = 1, onPageChange }: CustomPaginationProps) {
  const renderPageNumbers = () => {
    const items: ReactNode[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              className='cursor-pointer'
              isActive={page === i}
              onClick={() => onPageChange((prev) => ({ ...prev, page: i }))}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        )
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            className='cursor-pointer'
            isActive={page === 1}
            onClick={() => onPageChange((prev) => ({ ...prev, page: 1 }))}
          >
            1
          </PaginationLink>
        </PaginationItem>,
      )

      if (page > 3) {
        items.push(
          <PaginationItem key='ellipsis-start'>
            <PaginationEllipsis />
          </PaginationItem>,
        )
      }

      const start = Math.max(2, page - 1)
      const end = Math.min(totalPages - 1, page + 1)

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              className='cursor-pointer'
              isActive={page === i}
              onClick={() => onPageChange((prev) => ({ ...prev, page: i }))}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        )
      }

      if (page < totalPages - 2) {
        items.push(
          <PaginationItem key='ellipsis-end'>
            <PaginationEllipsis />
          </PaginationItem>,
        )
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            className='cursor-pointer'
            isActive={page === totalPages}
            onClick={() => onPageChange((prev) => ({ ...prev, page: totalPages }))}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    return items
  }

  return (
    <div className='flex flex-col md:flex-row items-center gap-3 w-full'>
      <Pagination>
        <PaginationContent className='gap-x-1'>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange({ page: Math.max(page - 1, 1), pageSize, totalPages })}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : undefined}
              className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange({ page: Math.min(page + 1, totalPages), pageSize, totalPages })}
              aria-disabled={page === totalPages}
              tabIndex={page === totalPages ? -1 : undefined}
              className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
