import React from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

export const ResizablePanels = ({ children }) => {
  if (React.Children.count(children) !== 2) {
    throw new Error('ResizablePanels must have exactly 2 children')
  }

  return (
    <PanelGroup direction="horizontal">
      {/* PDF Viewer */}
      <Panel defaultSize={50} minSize={30}>
        {children[0]}
      </Panel>
      <PanelResizeHandle />
      {/* Notes Viewer */}
      <Panel defaultSize={50} minSize={30}>
        {children[1]}
      </Panel>
    </PanelGroup>
  )
}
