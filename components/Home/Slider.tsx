import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import { SliderType } from '@/types/types'
import { Colors } from '@/constants/Colors'



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
    <View>
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 20,
          paddingLeft: 20,
          paddingTop: 20,
          marginBottom: 5
        }}
      >
        #Special for you
      </Text>

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
            style={{ paddingLeft: 20 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <Image
                key={index}
                source={{uri: item.imageUrl}}
                style={{
                  width: 300,
                  height: 150,
                  borderRadius: 15,
                  marginRight: 15
                }}
              />
            )}
          />
        )
      }
    </View>
  )
}