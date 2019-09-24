import React from 'react'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  children: any
  isOpen: boolean
  onRequestClose(): any
  contentLabel: string
}

const Modal: React.FunctionComponent<Props> = ({
  children,
  isOpen,
  onRequestClose,
  contentLabel,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      style={customStyles}
    >
      {children}
    </ReactModal>
  )
}

export default Modal
