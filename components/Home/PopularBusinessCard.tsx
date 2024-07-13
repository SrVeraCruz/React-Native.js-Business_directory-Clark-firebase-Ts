import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { BusinessType } from '@/types/types'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

interface PopularBusinessCardProps {
  business: BusinessType
}

export default function PopularBusinessCard({
  business
}: PopularBusinessCardProps) {
  const router = useRouter()

  const handlePress = () => {
    router.push(`/businessdetail/${business.id}`)
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 15
      }}
    >
      <Image 
        source={{uri: business?.imageUrl}}
        style={{
          width: 200,
          height: 130,
          borderRadius: 15
        }}
      />

      <View
        style={{
          marginTop: 7
        }}
      >
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 17,
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 13,
            color: Colors.GRAY
          }}
        >
          {business.address}
        </Text>

        <View 
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 5
          }}
        >
          <View 
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Image 
              source={require('../../assets/images/star.png')}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text
              style={{
                fontFamily: 'outfit'
              }}
            >
              4.5
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'outfit',
              backgroundColor: Colors.PRIMARY,
              color: '#fff',
              padding: 3,
              fontSize: 10,
              borderRadius: 5
            }}
          >
            {business.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}