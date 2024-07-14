import { View, ScrollView } from 'react-native'
import React from 'react'
import { BusinessType } from '@/types/types'
import BusinessBox from './BusinessBox'

interface BusinessListProps {
  businessList: BusinessType[]
}

export default function BusinessList({
  businessList
}: BusinessListProps ) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} >
      {businessList.length && businessList.map((item, index) => (
        <BusinessBox key={index} business={item} />
      ))}
      <View style={{height: 300}} />
    </ScrollView>
  )
}