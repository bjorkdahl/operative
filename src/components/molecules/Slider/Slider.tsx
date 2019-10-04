import React, { useState, useEffect } from 'react'
import debounce from 'lodash/debounce'
import styles from './Slider.module.scss'
import { ISlideConfig, PageSlides, SlideParallaxType } from 'react-page-slides'
import Text from 'components/atoms/Text'
import strings from 'strings'
import {
  fullsizeImage,
  desktopImage,
  desktopMediumImage,
  desktopLargeImage,
  tabletImage,
} from 'images/index/index'

const selectImageSize = (): string => {
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

const Slider: React.FunctionComponent = () => {
  const [image, setImage] = useState(selectImageSize())
  const handleResize = (): void => setImage(selectImageSize())

  useEffect(() => {
    const eventCallback = debounce(handleResize, 1000)
    window.addEventListener('resize', eventCallback)
    return (): void => window.removeEventListener('resize', eventCallback)
  }, [])

  const slides: ISlideConfig[] = [
    {
      content: (
        <div className={styles.slide}>
          <span className={styles.firstSlide}>
            <Text bold largeAF uppercase white noMargin shadow>
              {strings.get('TAGLINE')}
            </Text>
            <Text large white noMargin shadow>
              {strings.get('TAGLINE_DESC')}
            </Text>
          </span>
        </div>
      ),
      style: {
        backgroundImage: `url(${image})`,
      },
    },
    {
      content: (
        <div className={styles.slide}>
          <span className={styles.secondSlide}>
            <Text bold largeAF uppercase white noMargin shadow>
              {strings.get('TAGLINE')}
            </Text>
            <Text large white noMargin shadow>
              {strings.get('TAGLINE_DESC')}
            </Text>
          </span>
        </div>
      ),
      style: {
        backgroundImage: `url(${image})`,
      },
    },
    {
      content: (
        <div className={styles.slide}>
          <span className={styles.thirdSlide}>
            <Text bold largeAF uppercase white noMargin shadow>
              {strings.get('TAGLINE')}
            </Text>
            <Text large white noMargin shadow>
              {strings.get('TAGLINE_DESC')}
            </Text>
          </span>
        </div>
      ),
      style: {
        backgroundImage: `url(${image})`,
      },
    },
  ]
  return (
    <PageSlides
      enableAutoScroll={true}
      transitionSpeed={1000}
      slides={slides}
      parallax={{
        offset: 0.6,
        type: SlideParallaxType.reveal,
      }}
    />
  )
}

export default Slider
