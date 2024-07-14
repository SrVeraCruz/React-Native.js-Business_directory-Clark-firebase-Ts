import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import Header from '@/components/Home/Header'
import Slider from '@/components/Home/Slider'
import Category from '@/components/Utils/Category'
import PopularBusiness from '@/components/Home/PopularBusiness'

export default function home() {
  return (
    <ScrollView>
      <Header />
      <View style={styles.container} >
        <Slider />
        <Category />
        <PopularBusiness />
        <View style={{height: 50}} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 40
  }
})