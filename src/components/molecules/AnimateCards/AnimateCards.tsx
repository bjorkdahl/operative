import React, { ReactNode } from 'react'
import { Spring } from 'react-spring/renderprops'

interface Props {
  delay: {
    initial: number
    trailing: number
  }
}

const AnimateCards: React.FunctionComponent<Props> = ({ children, delay }) => {
  return (
    <>
      {React.Children.map(children, (child, index: number) => (
        <Spring
          from={{ opacity: 0, marginTop: 20 }}
          to={{ opacity: 1, marginTop: 0 }}
          delay={delay.initial + delay.trailing * index}
        >
          {(props): ReactNode =>
            React.isValidElement(child) &&
            React.cloneElement(child, { style: props })
          }
        </Spring>
      ))}
    </>
  )
}

export default AnimateCards
