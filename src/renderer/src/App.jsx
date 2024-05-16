import PDFPath from '@/assets/pdf/report.pdf'
import { NoteContainer, PDFContainer, PDFView, RootLayout } from '@/components'

function App() {
  return (
    <RootLayout>
      <PDFContainer className="flex justify-center mt-10">
        <PDFView pdfURL={PDFPath} />
      </PDFContainer>
      <NoteContainer className=""></NoteContainer>
    </RootLayout>
  )
}

export default App
