import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString()

export const PDFView = ({ pdfURL }) => {
  const [numPages, setNumPages] = useState(null)
  const [loading, setLoading] = useState(true)
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)
  const defaultWidth = 2400
  const maxScale = 0.4
  const maxWidth = defaultWidth * maxScale

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const newScale = containerWidth / defaultWidth
        setScale(newScale > maxScale ? maxScale : newScale)
      }
    }

    const resizeObserver = new ResizeObserver(updateScale)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
    setLoading(false)
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: `${maxWidth}px`,
        overflow: 'hidden', // Ensure no scrollbars
        position: 'relative'
      }}
    >
      {loading && <div className="loading-indicator">Loading...</div>}
      <Document file={pdfURL} onLoadSuccess={onDocumentLoadSuccess} renderMode="svg">
        {Array.from(new Array(numPages), (_el, index) => (
          <div
            key={`page_wrapper_${index + 1}`}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              width: `${defaultWidth}px`, // This keeps the scale based on defaultWidth
              marginBottom: `${8 / scale}px`, // Adjust margin based on scale
              transition: 'transform 0.2s linear' // Smooth scaling
            }}
          >
            <Page
              className="pdf-page"
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={defaultWidth} // Fixed width, scaling will handle the size
            />
          </div>
        ))}
      </Document>
    </div>
  )
}
