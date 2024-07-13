import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import Avatar from '../Utils/Avatar'

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
          gap: 10
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
      
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 10,
          marginHorizontal: 10,
          marginTop: 15,
          borderRadius: 8
        }}
      >
        <Ionicons 
          name="search" 
          size={24} 
          color={Colors.PRIMARY} 
        />
        <TextInput 
          placeholder='Search...' 
          style={{
            fontFamily: 'outifit',
            fontSize:16
          }}
        />
      </View>
    </View>
  )
}