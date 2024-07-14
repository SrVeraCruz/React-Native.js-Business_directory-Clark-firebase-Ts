import { Colors } from '@/constants/Colors'
import { db } from '@/configs/FirebaseConfig'
import { BusinessType } from '@/types/types'
import PopularBusinessCard from './PopularBusinessCard'
import Headline from '../Utils/Headline'
import { 
  View, 
  FlatList, 
  ActivityIndicator
 } from 'react-native'

import React, { 
  useCallback, 
  useEffect, 
  useState 
} from 'react'

import { 
  collection, 
  getDocs, 
  limit, 
  query 
} from 'firebase/firestore'

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
    <View
      style={{
        gap: 10
      }}
    >
      <Headline title='Popular Business' allOption />

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