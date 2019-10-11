import React, { useState } from 'react'

interface ModalContext {
  modal: string
  openModal: { (args: any): void }
  isOpen: boolean
}

interface ModalState {
  modal: string
  isOpen: boolean
}

export const ModalContextInstance = React.createContext<ModalContext>({
  modal: '',
  openModal: () => {},
  isOpen: false,
})

const ModalProvider: React.FunctionComponent<{}> = ({ children }) => {
  const [state, setState] = useState<ModalState>({
    modal: '',
    isOpen: false,
  })

  const openModal = (title: string) => {
    if (state.isOpen) {
      return
    }
    setState({ ...state, isOpen: true, modal: title })
  }

  const modalValues: ModalContext = {
    modal: state.modal,
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
