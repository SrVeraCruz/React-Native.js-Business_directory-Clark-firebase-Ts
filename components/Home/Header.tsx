import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Colors } from '@/constants/Colors'
import Avatar from '../Utils/Avatar'
import SearchBar from '../Utils/SearchBar'

export default function Header() {
  const { user } = useUser()

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        paddingBottom: 25,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginBottom: 15,
        }}
      >
        <Avatar src={user?.imageUrl} />

        <View>
          <Text style={{ color: '#fff' }}>
            Welcome,
          </Text>
          <Text
            style={{
              fontSize: 19,
              color: '#fff',
              fontFamily: 'outfit-medium'
            }}
          >
            {user?.fullName}
          </Text>
        </View>
      </View>
      
      <SearchBar />
    </View>
  )
}