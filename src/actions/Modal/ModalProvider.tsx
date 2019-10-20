import React, { useState } from 'react'

interface ModalContext {
  component?: React.FunctionComponent
  openModal: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (args: any): void
  }
  isOpen: boolean
}

interface ModalState {
  component?: React.FunctionComponent
  isOpen: boolean
}

export const ModalContextInstance = React.createContext<ModalContext>({
  component: undefined,
  openModal: () => {},
  isOpen: false,
})

const ModalProvider: React.FunctionComponent<{}> = ({ children }) => {
  const [state, setState] = useState<ModalState>({
    component: undefined,
    isOpen: false,
  })

  const openModal = (component: React.FunctionComponent): void => {
    if (state.isOpen) {
      return
    }
    setState({ ...state, isOpen: true, component: component })
  }

  const modalValues: ModalContext = {
    component: state.component,
    isOpen: state.isOpen,
    openModal,
  }

  return (
    <ModalContextInstance.Provider value={modalValues}>
      {children}
    </ModalContextInstance.Provider>
  )
}

export default ModalProvider
