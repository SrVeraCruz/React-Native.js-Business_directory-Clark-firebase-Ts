import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

interface ButtonProps {
  disabled?: boolean,
  onPress?: () => void,
  children: React.ReactNode
}

export default function Button({
  disabled,
  onPress,
  children
}: ButtonProps ) {

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        padding: 10,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 6,
        opacity: disabled ? 0.5 : 1
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-medium',
          color: '#fff',
          textAlign: 'center'
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
)
}