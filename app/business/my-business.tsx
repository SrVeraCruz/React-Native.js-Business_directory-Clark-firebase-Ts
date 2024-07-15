import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import { BusinessType } from '@/types/types'
import BusinessList from '@/components/Utils/BusinessList'
import { Colors } from '@/constants/Colors'
import { useNavigation } from 'expo-router'

export default function MyBusiness() {
  const navigation = useNavigation()
  const { user } = useUser()
  const [businessList, setBusinessList] = useState<BusinessType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getUserBusiness = useCallback(async () => {
    setIsLoading(true)
    setBusinessList([])
    const q = query(
      collection(db, 'BusinessList'), 
      where('userEmail', '==', user?.primaryEmailAddress?.emailAddress)
    )

    const querySnapShot = await getDocs(q)
    querySnapShot.forEach((doc) => {
      setBusinessList((prev) => (
        [...prev,  {id: doc.id, ...doc.data()} as BusinessType]
      ))
    })
    setIsLoading(false)
  }, [user?.primaryEmailAddress?.emailAddress])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Business',
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.PRIMARY
      },
      headerTintColor: '#fff'
    })

    user && getUserBusiness()
  }, [user])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        My Business
      </Text>
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          color={Colors.PRIMARY}
          style={{
            marginTop: '90%'
          }}  
        />
      ): businessList.length > 0
        ? <BusinessList 
            onRefresh={() => getUserBusiness()}
            refreshing={isLoading} 
            businessList={businessList} 
          />
        : (<Text
            style={{
              fontSize: 20,
              fontFamily: 'outfit-bold',
              color: Colors.GRAY,
              textAlign: 'center',
              marginTop: '90%'
            }}  
          >
            No Business Found
          </Text>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 25
  },
})