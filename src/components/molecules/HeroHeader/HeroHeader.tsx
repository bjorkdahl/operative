import React, { useState, useEffect } from 'react'
import styles from './HeroHeader.module.scss'
import debounce from 'lodash/debounce'
import {
  fullsizeImage,
  desktopImage,
  desktopMediumImage,
  desktopLargeImage,
  tabletImage,
} from 'images'

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

const HeroHeader: React.FunctionComponent = () => {
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
        <h1 className={styles.heading}>WOW IT WORKS!</h1>
      </div>
    </div>
  )
}

export default HeroHeader
