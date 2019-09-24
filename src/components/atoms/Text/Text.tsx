import React from 'react'
import cx from 'classnames'
import styles from './Text.module.scss'

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  children: any
  small?: boolean
  large?: boolean
  bold?: boolean
  italic?: boolean
  warning?: boolean
  inline?: boolean
  ellipsis?: boolean
  uppercase?: boolean
  strikethrough?: boolean
}

const Text: React.FunctionComponent<Props> = ({
  children,
  small,
  large,
  bold,
  italic,
  warning,
  inline,
  ellipsis,
  uppercase,
  strikethrough,
}) => {
  const classNames: string = cx(styles.text, {
    [styles.textSmall]: small,
    [styles.textLarge]: large,
    [styles.textBold]: bold,
    [styles.textItalic]: italic,
    [styles.textWarning]: warning,
    [styles.textEllipsis]: ellipsis,
    [styles.textUppercase]: uppercase,
    [styles.textStrikethrough]: strikethrough,
  })
  return inline ? <span className={classNames}>{children}</span> : <p className={classNames}>{children}</p>
}

export default Text
