import React, { useState } from 'react'
import Modal from 'components/Modal'

const IndexScreen: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleModal = (): void => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={toggleModal} contentLabel="Example Modal">
        <button onClick={toggleModal}>Close</button>
      </Modal>
      <button onClick={toggleModal}>Log in</button>
    </>
  )
}

export default IndexScreen
