import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import { BusinessType } from '@/types/types'
import { Colors } from '@/constants/Colors'
import Intro from '@/components/BusinessDetail/Intro'
import ActionButton from '@/components/BusinessDetail/ActionButton'
import About from '@/components/BusinessDetail/About'
import Review from '@/components/BusinessDetail/Review'

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams()
  const [businessDetail, setBusinessDetail] = useState<BusinessType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getBusinessDetailById = useCallback(async () => {
    setIsLoading(true)
    const docRef = doc(db, 'BusinessList', businessid as string)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setBusinessDetail(
        {id:docSnap.id, ...docSnap.data()} as BusinessType
      )
    } else {
      console.log('No such document')
    }

    setIsLoading(false)
  }, [businessid])

  useEffect(() => {
    getBusinessDetailById()
  }, [businessid, getBusinessDetailById])

  return (
    <ScrollView
      style={{
        backgroundColor: '#fff'
      }}
    >
      {businessDetail && !isLoading 
      ? <View>
          <Intro business={businessDetail} />
          <ActionButton business={businessDetail} />
          <About business={businessDetail} />
          <Review business={businessDetail} />
        </View>
      : isLoading 
        ? <ActivityIndicator 
            size={'large'}
            color={Colors.PRIMARY}
            style={{
              marginTop: '70%'
            }}
          />
        : <Text
            style={{
              fontSize: 20,
              fontFamily: 'outfit-bold',
              color: Colors.GRAY,
              textAlign: 'center',
              marginTop: '70%'
            }}  
          >
            No Business Found
          </Text>
      }
    </ScrollView>
  )
}