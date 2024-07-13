import { View, Text } from 'react-native'
import React from 'react'
import { ReviewType } from '@/types/types'
import Avatar from '../Utils/Avatar'
import { Colors } from '@/constants/Colors'
import { Rating } from 'react-native-ratings'

interface ReviewBoxProps {
  review: ReviewType
}

export default function ReviewBox({
  review
}: ReviewBoxProps ) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: 15,
      }}
    >
      <Avatar src={review?.userImage} />
      <View
        style={{
          gap: 5
        }}
      >
        <Text
          style={{
            fontFamily: 'outfit-medium'
          }}
        >
          {review.userName}
        </Text>
        <Rating
          imageSize={20}
          ratingCount={review.rating}
          readonly
          style={{
            alignItems: 'flex-start'
          }}
        />
        <Text
          style={{
            fontFamily: 'outfit-medium'
          }}
        >
          {review.comment}
        </Text>
      </View>
    </View>
  )
}