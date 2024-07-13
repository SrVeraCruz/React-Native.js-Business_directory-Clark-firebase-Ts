import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { CategoryType } from '@/types/types'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

interface CategoryItemProps {
  category: CategoryType,
}

export default function CategoryItem({
  category,
}: CategoryItemProps) {
  const router = useRouter()

  return (
    <TouchableOpacity 
      style={{
        alignItems: 'center',
        marginRight: 15
      }}
      onPress={() => router.push(
        `/businesslist/${category.name}`
      )}
    >
      <View
        style={{
          padding: 20,
          backgroundColor: Colors.ICON_BG,
          borderRadius: 99,
        }}
      >
        <Image 
          source={{uri: category.icon}}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 12,
          fontFamily: 'outfit-medium',
          marginTop: 5
        }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  )
}