import { View, FlatList, ActivityIndicator, StyleProp, ViewStyle } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import CategoryItem from '../Home/CategoryItem'
import { CategoryType } from '@/types/types'
import Headline from './Headline'
import { useRouter } from 'expo-router'
import { CategoryFilterContext } from '@/contexts/CategorySelectedContext'

interface CategoryProps {
  style?: StyleProp<ViewStyle>,
  headline?: boolean,
  explore?: boolean,
}

export default function Category({
  style,
  explore,
  headline=true,
}: CategoryProps ) {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const context = useContext(CategoryFilterContext)
  const router = useRouter()

  if (!context) {
    throw new Error('useContext must be used within a CategoryFilterProvider')
  }
  const { setCategoryFilter } = context

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
  
  const handlerOnCategoryPress = useCallback((category: CategoryType) => {
    if(explore) {
      setCategoryFilter(category.name)
    } else {
      router.push(`/businesslist/${category.name}`)
    }
  }, [router, explore])

  useEffect(() => {
    getCategoryList()
  }, [])

  return (
    <View
      style={[
        {
          gap: 5
        },
        style
      ]}
    >
      {headline && (
        <Headline title='Category' allOption />
      )}
      
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
            renderItem={({item, index}) => (
              <CategoryItem
                key={index}
                category={item}
                onCategoryPress={() => handlerOnCategoryPress(item)}
              />
            )}
          />
        )
      }
    </View>
  )
}