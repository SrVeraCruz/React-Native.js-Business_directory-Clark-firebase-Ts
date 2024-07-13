import { Image } from 'react-native'
import React from 'react'

interface AvatarProps {
  src?: string
}

export default function Avatar({
  src
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
        width: 45,
        height: 45,
        borderRadius: 99
      }}
    />
  )
}