import { twMerge } from 'tailwind-merge'
import { ResizablePanels } from './ResizablePanels'

export const PDFContainer = ({ className, children, ...props }) => {
  return (
    <div className={twMerge('overflow-x-scroll overflow-y-auto h-screen', className)} {...props}>
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
    <div className={twMerge('background-color', className)} {...props}>
      <ResizablePanels>{children}</ResizablePanels>
    </div>
  )
}
