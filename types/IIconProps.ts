import { ImageProps, ImageSourcePropType } from 'react-native'

export interface IIconProps extends Omit<ImageProps, 'source'> {
  src: ImageSourcePropType
}
