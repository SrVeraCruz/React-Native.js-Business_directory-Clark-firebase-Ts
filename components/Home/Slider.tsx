import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import { SliderType } from '@/types/types'
import { Colors } from '@/constants/Colors'
import Headline from '../Utils/Headline'



export default function Slider() {
  const [sliderList, setSliderList] = useState<SliderType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getSliderList = useCallback( async () => {
    setIsLoading(true)
    setSliderList([])
    const  q = query(collection(db, 'Slider'))
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setSliderList((prev) => [...prev, doc.data() as SliderType])
    })
    setIsLoading(false)
  }, []) 

  useEffect(() => {
    getSliderList()
  }, [])

  return (
    <View
      style={{
        gap: 5
      }}
    >
      <Headline title='#Special for you' />

      {isLoading 
        ? <ActivityIndicator 
            size={'large'}
            color={Colors.PRIMARY}
            style={{
              height: 150
            }}
          />
        : sliderList && (
          <FlatList 
            data={sliderList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <Image
                key={index}
                source={{uri: item.imageUrl}}
                style={{
                  width: 300,
                  height: 150,
                  borderRadius: 15,
                  marginRight: 20
                }}
              />
            )}
          />
        )
      }
    </View>
  )
}