import { View, TextInput, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

interface SearchBarProps {
  style?: StyleProp<ViewStyle>,
}

export default function SearchBar({
  style
}: SearchBarProps ) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 10,
          borderRadius: 8,
        },
        style
      ]}
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
          fontSize:16,
          flex: 1
        }}
      />
    </View>
  )
}