import { View, Text, FlatList, Image, TouchableOpacity, Linking, Share } from 'react-native'
import React from 'react'
import { BusinessType } from '@/types/types'

  interface ActionButtonProps {
    business: BusinessType
  }

  interface ButtonMenuType {
    id: number,
    name: string,
    icon: string,
    url: string,
  }

export default function ActionButton({
  business
}: ActionButtonProps ) {
  const actionButtonMenu = [
    {
      id: 1,
      name: 'Call',
      icon: require('../../assets/images/call.png'),
      url: `tel:${business?.contact}`
    },
    {
      id: 2,
      name: 'Location',
      icon: require('../../assets/images/pin.png'),
      url: `https://www.google.com/maps/search/?api=1&query=${business?.address}`
    },
    {
      id: 3,
      name: 'Web',
      icon: require('../../assets/images/web.png'),
      url: business.website
    },
    {
      id: 4,
      name: 'Share',
      icon: require('../../assets/images/share.png'),
      url: business.website
    },
  ]

  const handleOnPress = (item: ButtonMenuType) => {
    if(item.name === 'Share') {
      Share.share({
        message: `${business.name} \n Address:https://www.google.com/maps/search/?api=1&query=${business.address} \n Find more details on Business Directory App by Vera Cruz !`
      })

      return
    } 

    Linking.openURL(item.url)
  }

  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      {actionButtonMenu.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleOnPress(item)}
          style={{
            alignItems: 'center',
            gap: 3
          }}
        >
          <Image 
            source={item?.icon}
            style={{
              width: 50,
              height: 50
            }}
          />
          <Text
            style={{
              fontFamily: 'outline-medium'
            }}
          >
            {item?.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}