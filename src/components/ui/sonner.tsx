import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg h-auto p-4 m-4 rounded-md border flex flex-row bottom-auto',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-gray-500 group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          closeButton:
            'group-[.toast]:bg-background group-[.toast]:border-border group-[.toast]:text-foreground group-[.toast]:hover:bg-muted',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
