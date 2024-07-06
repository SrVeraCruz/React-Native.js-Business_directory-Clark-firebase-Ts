import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import { BusinessType } from '@/types/types'
import BusinessListItem from '@/components/BusinessList/BusinessListItem'
import { Colors } from '@/constants/Colors'

export default function BusinessListByCategory() {
  const navigation = useNavigation()
  const { category } = useLocalSearchParams()
  const [businesslist, setBusinessList] = useState<BusinessType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getBusinessList = useCallback(async () => {
    setIsLoading(true)
    setBusinessList([])
    const q = query(
      collection(db, 'BusinessList'), 
      where('category', '==', category)
    )
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, doc.data() as BusinessType])
    })

    setIsLoading(false)
  }, [category])

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category
    })

    getBusinessList()
  }, [navigation, category, getBusinessList])

  return (
    <View>
      {businesslist.length && !isLoading
      ? <FlatList 
          data={businesslist}
          onRefresh={getBusinessList}
          refreshing={isLoading}
          renderItem={({item, index}) => (
            <BusinessListItem
              key={index}
              business={item}
            />
          )}
        />
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
    </View>
  )
}