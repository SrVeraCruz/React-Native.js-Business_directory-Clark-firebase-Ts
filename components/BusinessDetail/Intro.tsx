import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React, { useMemo } from 'react'
import { BusinessType } from '@/types/types'
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

interface IntroProps {
  business: BusinessType
}

export default function Intro({
  business
}: IntroProps ) {
  const router = useRouter()
  const { user } = useUser()

  const iOwnPost = useMemo(() => {
    return user?.primaryEmailAddress?.emailAddress === business.userEmail
  }, [])

  const handleDelete = () => {
    Alert.alert('Do you want to delete?', 'Do you really want to delete this business?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteBusiness()
      }
    ])
  }
  
  const deleteBusiness = async () => {
    await deleteDoc(doc(db, 'BusinessList', business?.id))
    .then(() => {
      router.push('/business/my-business')
      ToastAndroid.show('Business deleted sucessfully', ToastAndroid.BOTTOM)
    })
    .catch(() => {
      ToastAndroid.show('Something went wrong', ToastAndroid.BOTTOM)
    })
  }

  return (
    <View>
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          padding: 20,
          marginTop: 25,
          zIndex: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Ionicons 
            name="arrow-back-circle" 
            size={40} 
            color="white" 
          />
        </TouchableOpacity>
        <Ionicons 
          name="heart-outline" 
          size={40} 
          color="white" 
        />
      </View>
      <Image 
        source={{uri: business?.imageUrl}}
        style={{
          width: '100%',
          height: 340
        }}
      />
      <View
        style={{
          padding: 20,
          marginTop: -20,
          backgroundColor: '#fff',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
        <View 
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 26,
                fontFamily: 'outfit-bold'
              }}
            >
              {business?.name}
            </Text>
            <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 18
              }}
            >
              {business?.address}
            </Text>
          </View>
          {iOwnPost && (
            <TouchableOpacity onPress={handleDelete}>
              <EvilIcons name="trash" size={38} color="red" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}