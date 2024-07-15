import { View, FlatList } from 'react-native'
import React from 'react'
import MenuBox from './MenuBox'

export default function MenuList() {
  const menuList = [
    {
      id: 1,
      name: 'Add Business',
      icon: require('../../assets/images/add.png'),
      path: '/business/add-business'
    },
    {
      id: 2,
      name: 'My Business',
      icon: require('../../assets/images/business-and-trade.png'),
      path: '/business/my-business'
    },
    {
      id: 3,
      name: 'Share App',
      icon: require('../../assets/images/share_1.png'),
      path: ''
    },
    {
      id: 4,
      name: 'Logout ',
      icon: require('../../assets/images/logout.png'),
      path: ''
    },
  ]

  return (
    <View style={{marginTop: 50}}>
      <FlatList 
        data={menuList}
        numColumns={2}
        renderItem={({item, index}) => (
          <MenuBox key={index} item={item} />
        )}
      />
    </View>
  )
}