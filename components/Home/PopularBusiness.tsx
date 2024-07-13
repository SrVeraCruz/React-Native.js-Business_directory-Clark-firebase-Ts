import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import { BusinessType } from '@/types/types'
import PopularBusinessCard from './PopularBusinessCard'

export default function PopularBusiness() {
  const [businessList, setBusinessList] = useState<BusinessType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getBusinessList = useCallback(async () => {
    setIsLoading(true)
    setBusinessList([])
    const q = query(collection(db, 'BusinessList'), limit(10))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      setBusinessList(
        (prev) => [...prev, {id: doc.id, ...doc.data()} as BusinessType ]
      )
    })
    setIsLoading(false)
  }, [])

  useEffect(() => {
    getBusinessList()
  }, [])

  return (
    <View>
      <View 
        style={{
          paddingLeft: 20,
          paddingTop: 20,
          paddingRight: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10
        }}
      >
        <Text
          style={{
            marginTop: 20,
            marginBottom: 5,
            fontSize: 20,
            fontFamily: 'outfit-bold'
          }}
        >
          Popular Business
        </Text>
        <Text
          style={{
            color: Colors.PRIMARY,
            fontFamily: 'outfit-medium'
          }}
        >
          View All
        </Text>
      </View>

      {isLoading 
        ? <ActivityIndicator
            size={'large'}
            color={Colors.PRIMARY}
            style={{
              height: 150
            }}
          />
        : businessList && (
          <FlatList 
            data={businessList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <PopularBusinessCard 
                key={index}
                business={item}
              />
            )}
          />
        )
      }
    </View>
  )
}