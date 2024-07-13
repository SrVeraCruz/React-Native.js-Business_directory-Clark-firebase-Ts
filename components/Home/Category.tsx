import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import CategoryItem from './CategoryItem'
import { CategoryType } from '@/types/types'


export default function Category() {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getCategoryList = useCallback(async () => {
    setIsLoading(true)
    setCategoryList([])
    const q = query(collection(db, 'Category'))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      setCategoryList((prev) => [...prev, doc.data() as CategoryType])
    })
    setIsLoading(false)
  }, [])

  useEffect(() => {
    getCategoryList()
  }, [])

  return (
    <View>
      <View 
        style={{
          padding: 20,
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
          Category
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
              height: 104
            }}
          />
        : categoryList && (
          <FlatList 
            data={categoryList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              marginLeft: 20
            }}
            renderItem={({item, index}) => (
              <CategoryItem
                key={index}
                category={item}
              />
            )}
          />
        )
      }
    </View>
  )
}