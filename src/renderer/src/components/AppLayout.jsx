import { twMerge } from 'tailwind-merge'
import { ResizablePanels } from './ResizablePanels'

export const PDFContainer = ({ className, children, ...props }) => {
  return (
    <div className={twMerge('overflow-auto h-screen', className)} {...props}>
      {children}
    </div>
  )
}

export const NoteContainer = ({ className, children, ...props }) => {
  return (
    <div className={twMerge('overflow-auto h-screen', className)} {...props}>
      {children}
    </div>
  )
}

export const RootLayout = ({ className, children, ...props }) => {
  return (
    <div className={twMerge('', className)} {...props}>
      <ResizablePanels>{children}</ResizablePanels>
    </div>
  )
}
