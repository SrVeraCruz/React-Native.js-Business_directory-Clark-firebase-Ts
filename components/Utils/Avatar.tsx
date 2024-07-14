import { Image } from 'react-native'
import React from 'react'

interface AvatarProps {
  src?: string,
  big?: boolean
}

export default function Avatar({
  src,
  big
}: AvatarProps ) {

  return (
    <Image 
      source={
        src 
          ? {uri: src} 
          : require('../../assets/images/placeholder-user.jpg'
        )
      }
      style={{
        width: big ? 100 : 45,
        height: big ? 100 : 45,
        borderRadius: 99
      }}
    />
  )
}