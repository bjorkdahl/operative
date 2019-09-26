import React, { useState } from 'react'
import Modal from 'components/Modal'

const IndexScreen: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [clicked, setClicked] = useState(false)
  const toggleModal = (): void => setIsOpen(!isOpen)
  const onClick = (): void => {
    setClicked(!clicked)
  }

  return (
    <>
      <Modal
        title={'Are you sure?'}
        bodyText={'This is the body.'}
        actions={[{ label: 'OK', onClick: onClick }]}
      />
      {clicked ? 'ITS CLICKED' : 'STILL NOT WORKING'}
      <button onClick={toggleModal}>Log in</button>
    </>
  )
}

export default IndexScreen
