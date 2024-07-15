import { View, Text, ActivityIndicator } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import SearchBar from '@/components/Utils/SearchBar'
import { Colors } from '@/constants/Colors'
import Category from '@/components/Utils/Category'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import { BusinessType } from '@/types/types'
import { CategoryFilterContext } from '@/contexts/CategorySelectedContext'
import BusinessList from '@/components/Utils/BusinessList'

export default function explore() {
  const [businessList, setBusinessList] = useState<BusinessType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const context = useContext(CategoryFilterContext)

  if (!context) {
    throw new Error('useContext must be used within a CategoryFilterProvider')
  }
  const { categoryFilter } = context

  const getBusinessByCategory = useCallback(async (category: string) => {
    setIsLoading(true)
    setBusinessList([])
    const q = query(
      collection(db, 'BusinessList'), 
      where('category','==',category)
    )

    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => (
        [...prev, {id: doc.id, ...doc.data()} as BusinessType]
      ))
    })
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if(categoryFilter) {
      getBusinessByCategory(categoryFilter)
    } else {
      setBusinessList([])
    }
  }, [categoryFilter, getBusinessByCategory])

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 30,
          marginBottom: 15,
        }}
      >
        Explore More
      </Text>
      <SearchBar
        style={{
          borderWidth: 1,
          borderColor: Colors.PRIMARY
        }}
      />

      <Category 
        explore
        headline={false} 
        style={{
          marginTop: 15,
          paddingBottom: 15,
          borderBottomWidth: 1,
          borderColor: Colors.GRAY
        }} 
      />

      {isLoading ? (
        <ActivityIndicator 
          size={'large'}
          color={Colors.PRIMARY}
          style={{
            marginTop: 40
          }}  
        />
      ): businessList.length 
        ? <BusinessList businessList={businessList} />
        : (<Text
            style={{
              fontSize: 20,
              fontFamily: 'outfit-bold',
              color: Colors.GRAY,
              textAlign: 'center',
              marginTop: 40
            }}  
          >
            No Business Found
          </Text>
        )
      }
    </View>
  )
}