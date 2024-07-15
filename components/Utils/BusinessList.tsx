import { View, ScrollView, Text, FlatList } from 'react-native'
import React from 'react'
import { BusinessType } from '@/types/types'
import BusinessBox from './BusinessBox'

interface BusinessListProps {
  businessList: BusinessType[],
  refreshing?: boolean,
  onRefresh?: () => void
}

export default function BusinessList({
  businessList,
  refreshing,
  onRefresh
}: BusinessListProps ) {
  return (
    <View>
      {/* {businessList.length > 0 && businessList.map((item, index) => (
        <BusinessBox key={index} business={item} />
      ))} */}
      <FlatList 
        data={businessList}
        onRefresh={onRefresh}
        refreshing={refreshing}
        renderItem={({item, index}) => (
          <BusinessBox key={index} business={item} />
        )}
      />
      <View style={{height: 300}} />
    </View>
  )
}