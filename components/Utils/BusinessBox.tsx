import { View, Image, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { BusinessType } from '@/types/types'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

interface BusinessBoxProps {
  business: BusinessType
}

export default function BusinessBox({
  business
}: BusinessBoxProps ) {
  const router = useRouter()

  const handlePress = () => {
    router.push(`/businessdetail/${business.id}`)
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        backgroundColor: '#fff',
        borderRadius: 15,
        marginTop: 15,
        overflow: 'hidden'
      }}
    >
      <Image 
        source={{uri: business?.imageUrl}}
        style={{
          width: '100%',
          height: 150,
        }}
      />
      <View style={{padding: 10}}>
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 20
          }}
        >
          {business?.name}
        </Text>
        <Text
          style={{
            fontFamily: 'outfit',
            color: Colors.GRAY
          }}
        >
          {business?.address}
        </Text>
      </View>
    </TouchableOpacity>
  )
}