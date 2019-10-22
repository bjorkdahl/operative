import cx from 'classnames'
import React from 'react'
import styles from './Heading.module.scss'

interface Props {
  small?: boolean
  large?: boolean
  light?: boolean
  bold?: boolean
  center?: boolean
  italic?: boolean
  warning?: boolean
  ellipsis?: boolean
  uppercase?: boolean
  strikethrough?: boolean
  white?: boolean
  className?: string
}

const Heading: React.FunctionComponent<Props> = ({
  children,
  small,
  large,
  light,
  bold,
  center,
  italic,
  warning,
  ellipsis,
  uppercase,
  strikethrough,
  white,
  className,
}) => {
  const classNames: string = cx(styles.heading, className, {
    [styles.headingLight]: light,
    [styles.headingBold]: bold,
    [styles.headingItalic]: italic,
    [styles.headingWarning]: warning,
    [styles.headingCenter]: center,
    [styles.headingEllipsis]: ellipsis,
    [styles.headingUppercase]: uppercase,
    [styles.headingStrikethrough]: strikethrough,
    [styles.headingWhite]: white,
  })
  if (small) {
    return <h5 className={classNames}>{children}</h5>
  }
  if (large) {
    return <h1 className={classNames}>{children}</h1>
  }
  return <h3 className={classNames}>{children}</h3>
}

export default Heading
