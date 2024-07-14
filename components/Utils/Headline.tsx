import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

interface HeadlineProps {
  title: string,
  allOption?: boolean
}

export default function Headline({
  title,
  allOption
}: HeadlineProps ) {
  return (
    <View 
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'outfit-bold'
        }}
      >
        {title}
      </Text>
      {allOption && (
        <Text
          style={{
            color: Colors.PRIMARY,
            fontFamily: 'outfit-medium'
          }}
        >
          View All
        </Text>
      )}
    </View>
  )
}