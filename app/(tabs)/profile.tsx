import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import UserIntro from '@/components/Profile/UserIntro'
import MenuList from '@/components/Profile/MenuList'
import { Colors } from '@/constants/Colors'

export default function profile() {
  return (
    <View style={style.container}>
      <Text style={style.title}>Profile</Text>
      <UserIntro />
      <MenuList />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 30,
    marginBottom: 15,
  }
})