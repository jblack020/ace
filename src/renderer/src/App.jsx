import PDFPath from '@/assets/pdf/pdf-sample.pdf'
import { NoteContainer, PDFContainer, PDFView, RootLayout } from '@/components'

function App() {
  return (
    <RootLayout>
      <PDFContainer className="flex justify-center p-2 mt-10">
        <PDFView pdfURL={PDFPath} />
      </PDFContainer>
      <NoteContainer className="">Notes</NoteContainer>
    </RootLayout>
  )
}

export default App
