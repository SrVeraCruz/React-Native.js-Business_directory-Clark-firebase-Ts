import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { BusinessType } from '@/types/types'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

interface BusinessListItemProps {
  business: BusinessType
}

export default function BusinessListItem({
  business
}: BusinessListItemProps ) {
  const router = useRouter()

  return (
    <TouchableOpacity
      onPress={() => router.push(
        `/businessdetail/${business.id}`
      )}
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap: 10,
      }}
    >
      <Image 
        source={{uri: business.imageUrl}}
        style={{
          width: 120,
          height: 120,
          borderRadius: 15
        }}
      />
      <View
        style={{
          flex: 1,
          gap: 7
        }}
      >
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 20
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontFamily: 'outfit',
            color: Colors.GRAY,
            fontSize: 15
          }}
        >
          {business.address}
        </Text>

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
      </View>
    </TouchableOpacity>
  )
}