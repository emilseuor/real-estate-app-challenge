import React from 'react'
import { Image } from 'react-native'
import { IIconProps } from '../../types/IIconProps'

const Icon: React.FC<IIconProps> = ({ src, ...props }) => {
  return <Image {...props} source={src} />
}

export default Icon
