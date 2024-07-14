import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Avatar from '../Utils/Avatar'

export default function UserIntro() {
  const { user } = useUser()

  return (
    <View style={style.container}>
      <Avatar big src={user?.imageUrl} />
      <Text style={style.userName}>
        {user?.fullName}
      </Text>
      <Text style={style.userEmail}>
        {user?.primaryEmailAddress?.emailAddress}
      </Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  userName: {
    fontFamily: 'outfit-bold',
    fontSize: 20
  },
  userEmail: {
    fontFamily: 'outfit',
    fontSize: 16
  }
})