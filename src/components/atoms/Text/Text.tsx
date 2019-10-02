import React from 'react'
import cx from 'classnames'
import styles from './Text.module.scss'

interface Props {
  small?: boolean
  large?: boolean
  largeAF?: boolean
  shadow?: boolean
  light?: boolean
  bold?: boolean
  italic?: boolean
  warning?: boolean
  inline?: boolean
  ellipsis?: boolean
  uppercase?: boolean
  strikethrough?: boolean
  white?: boolean
  noMargin?: boolean
  underline?: boolean
}

const Text: React.FunctionComponent<Props> = ({
  children,
  small,
  large,
  largeAF,
  shadow,
  light,
  bold,
  italic,
  warning,
  inline,
  ellipsis,
  uppercase,
  strikethrough,
  white,
  noMargin,
  underline,
}) => {
  const classNames: string = cx(styles.text, {
    [styles.textSmall]: small,
    [styles.textLarge]: large,
    [styles.textLargeAF]: largeAF,
    [styles.textShadow]: shadow,
    [styles.textLight]: light,
    [styles.textBold]: bold,
    [styles.textItalic]: italic,
    [styles.textWarning]: warning,
    [styles.textEllipsis]: ellipsis,
    [styles.textUppercase]: uppercase,
    [styles.textStrikethrough]: strikethrough,
    [styles.textWhite]: white,
    [styles.textNoMargin]: noMargin,
    [styles.textUnderline]: underline,
  })
  return inline ? (
    <span className={classNames}>{children}</span>
  ) : (
    <p className={classNames}>{children}</p>
  )
}

export default Text
