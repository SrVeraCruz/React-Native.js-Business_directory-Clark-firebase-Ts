import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { BusinessType, ReviewType } from '@/types/types'
import { Rating } from 'react-native-ratings'
import { Colors } from '@/constants/Colors'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import ReviewBox from './ReviewBox'
import Button from '../Utils/Button'

interface ReviewProps {
  business: BusinessType,
}

export default function Review({
  business,
}: ReviewProps ) {
  const [rating, setRating] = useState(4)
  const [userInput, setUserInput] = useState('')
  const [businessReviews, setBusinessReviews] = useState<ReviewType[] | []>(
    business?.reviews?.reverse()
  )
  const { user } = useUser()

  const handleSubmit = async () => {
    const docRef = doc(db, 'BusinessList', business?.id)

    const review = {
      rating: rating,
      comment: userInput,
      userName: user?.fullName,
      userImage: user?.imageUrl,
      useEmail: user?.primaryEmailAddress?.emailAddress
    }

    await updateDoc(docRef, {
      reviews: arrayUnion(
        review
      )
    }).then(() => {
      ToastAndroid.show(
        'Comment Added Successfully !', ToastAndroid.BOTTOM
      )
      updateReviewState(review)
    }).catch(() => {
      ToastAndroid.show(
        'Something went wrong !', ToastAndroid.BOTTOM
      )
    }).finally(() => {
      setUserInput('')
    })
  }

  const updateReviewState = (review: ReviewType) => {
    setBusinessReviews(
      (prev) => ([...prev, review]).reverse()
    )
  }

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: '#fff'
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 20
        }}
      >
        Reviews-
      </Text>

      <View>
        <Rating
          showRating={false}
          startingValue={rating}
          onFinishRating={(rating: number) => setRating(rating)}
          imageSize={30}
          style={{ paddingVertical: 10 }}
        />
        <TextInput 
          placeholder='Write your comment'
          numberOfLines={4}
          textAlignVertical='top'
          multiline={true}
          value={userInput}
          onChangeText={(value) => setUserInput(value)}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.GRAY,
            marginBottom: 20
          }}
        />

        <Button 
          disabled={!userInput} 
          onPress={() => handleSubmit()}
        >
          Submit
        </Button>
      </View>

      <View
        style={{
          borderTopWidth: 1,
          borderColor: Colors.GRAY,
          marginTop: 20,
          paddingTop: 20,
          gap: 10
        }}
      >
        {businessReviews && businessReviews.map((item, index) => (
          <ReviewBox 
            key={index}
            review={item}
          />
        ))}
        {!business.reviews && (
          <Text
          style={{
            fontSize: 18,
            fontFamily: 'outfit-bold',
            color: Colors.GRAY,
          }}  
        >
          No reviews yet
        </Text>
        )}
      </View>
    </View>
  )
}