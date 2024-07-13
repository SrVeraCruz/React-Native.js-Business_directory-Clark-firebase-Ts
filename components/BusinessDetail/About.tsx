import { View, Text } from 'react-native'
import React from 'react'
import { BusinessType } from '@/types/types'

interface AboutProps {
  business: BusinessType
}

export default function About({
  business
}: AboutProps ) {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: '#fff',
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 20
        }}
      >
        About
      </Text>
      <Text
        style={{
          fontFamily: 'outfit',
          lineHeight: 25
        }}
      >
        {business.about}
      </Text>
    </View>
  )
}