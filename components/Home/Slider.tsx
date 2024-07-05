import { View, Text, FlatList, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import { SliderType } from '@/types/types'



export default function Slider() {
  const [sliderList, setSliderList] = useState<SliderType[]>([])

  const getSliderList = useCallback( async () => {
    setSliderList([])
    const  q = query(collection(db, 'Slider'))
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setSliderList((prev) => [...prev, doc.data() as SliderType])
    })
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
    </View>
  )
}