import React from 'react'
import { 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Share
} from 'react-native'

import { MenuItemType } from '@/types/types'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

interface MenuBoxProps {
  item: MenuItemType
}

export default function MenuBox({
  item
}: MenuBoxProps ) {
  const { signOut } = useAuth()
  const router = useRouter()

  const handlePress = () => {
    if(item.path === 'logout') {
      signOut()
      return
    }
    
    if(item.path === 'share') {
      Share.share({
        message: 'Download the Business Directory App by Vera Cruz, Download URL:'
      })
      return
    }

    router.push(item.path)
  }

  return (
    <TouchableOpacity 
      onPress={handlePress}
      style={style.container}
    >
      <Image 
        source={item.icon}
        style={{
          width: 50,
          height: 50
        }}
      />
      <Text style={style.title}>
        {item.name}
      </Text>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    margin: 10,
    backgroundColor: '#fff'
  },
  title: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    flex: 1
  }
})