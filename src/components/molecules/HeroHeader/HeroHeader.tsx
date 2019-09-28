import React, { useState, useEffect } from 'react'
import styles from './HeroHeader.module.scss'
import debounce from 'lodash/debounce'
import Text from 'components/atoms/Text/Text'
import Heading from 'components/atoms/Heading/Heading'
import {
  fullsizeImage,
  desktopImage,
  desktopMediumImage,
  desktopLargeImage,
  tabletImage,
} from 'images'

interface Props {
  heading: string
  text: string
}

const getHeroImage = (): string => {
  switch (true) {
    case window.innerWidth > 1600:
      return fullsizeImage
    case window.innerWidth > 1366:
      return desktopLargeImage
    case window.innerWidth > 1024:
      return desktopMediumImage
    case window.innerWidth > 768:
      return desktopImage
    default:
      return tabletImage
  }
}

const HeroHeader: React.FunctionComponent<Props> = ({ heading, text }) => {
  const [image, setImage] = useState(getHeroImage())
  const handleResize = (): void => setImage(getHeroImage())

  useEffect(() => {
    const eventCallback = debounce(handleResize, 1000)
    window.addEventListener('resize', eventCallback)
    return (): void => window.removeEventListener('resize', eventCallback)
  }, [])

  return (
    <div className={styles.container}>
      <img src={image} className={styles.image} alt="whatever" />
      <div className={styles.innerContainer}>
        <div className={styles.content}>
          <Heading large white bold uppercase>
            {heading}
          </Heading>
          <Text large white light>
            {text}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default HeroHeader
