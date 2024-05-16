import { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString()

export const PDFView = ({ pdfURL }) => {
  const [numPages, setNumPages] = useState(null)
  const [scale, setScale] = useState(1.0) // Initialize scale state
  const initialWidth = 405
  const minWidth = initialWidth / 4
  const maxWidth = initialWidth * 4

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  useEffect(() => {
    window.electronAPI.onMenuAction((event, action) => {
      console.log(`Received action: ${action}`) // Add this line
      switch (action) {
        case 'zoom-in':
          scaleUp()
          break
        case 'zoom-out':
          scaleDown()
          break
        case 'zoom-reset':
          scaleReset()
          break
      }
    })
  }, [])

  const scaleUp = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, maxWidth / initialWidth)) // Increase scale with a maximum limit
  }

  const scaleDown = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, minWidth / initialWidth)) // Decrease scale with a minimum limit
  }

  const scaleReset = () => {
    const windowWidth = window.innerWidth
    setScale((windowWidth * 0.45) / initialWidth)
  }

  useEffect(() => {
    scaleReset()
  }, [])

  return (
    <Document file={pdfURL} onLoadSuccess={onDocumentLoadSuccess}>
      {numPages &&
        Array.from(new Array(numPages), (_el, index) => (
          <Page
            className="mb-2"
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            scale={scale}
            width={initialWidth}
          />
        ))}
    </Document>
  )
}
