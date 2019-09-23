import React from 'react'

interface Props {
  children: any
}

const Text: React.FunctionComponent<Props> = ({ children }) => {
  return <p>{children}</p>
}

export default Text
