import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, ToastAndroid } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'

import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { db, storage } from '@/configs/FirebaseConfig';
import Button from '@/components/Utils/Button';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

interface CategoryListType {
  label: string, 
  value: string
}

export default function addBusiness() {
  const navigation = useNavigation()
  const [image, setImage] = useState<string | null>(null)
  const [categoryList, setCategoryList] = useState<CategoryListType[]>([])
  const { user } = useUser()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [website, setWebsite] = useState('')
  const [about, setAbout] = useState('')
  const [category, setCategory] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const getCategoryList = useCallback(async () => {
    setCategoryList([])
    const q = query(collection(db, 'Category'))

    const querySnapShot = await getDocs(q)
    querySnapShot.forEach((doc) => {
      setCategoryList((prev) => (
        [...prev, {
          label: (doc.data()).name, 
          value: (doc.data()).name
        }]
      ))
    })
  }, [])

  const onImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const handleSubmit = async () => {
    if(!image) {
      ToastAndroid.show("Image is required", ToastAndroid.BOTTOM)
      return
    } else if(!name) {
      ToastAndroid.show("Name is required", ToastAndroid.BOTTOM)
      return
    } else if(!address) {
      ToastAndroid.show("Address is required", ToastAndroid.BOTTOM)
      return
    } else if(!contact) {
      ToastAndroid.show("Contact is required", ToastAndroid.BOTTOM)
      return
    } else if(!about) {
      ToastAndroid.show("About is required", ToastAndroid.BOTTOM)
      return
    } else if(!category) {
      ToastAndroid.show("Category is required", ToastAndroid.BOTTOM)
      return
    } else {
      setIsLoading(true)
      const fileName = Date.now().toString()+".jpg"
      const resp = await fetch(image!)
      const blob = await resp.blob()
  
      const imageRef = ref(storage, 'business-app/'+fileName)
  
      uploadBytes(imageRef, blob).then(() => {
        getDownloadURL(imageRef).then(async (downloadUrl) => {
          await saveBusinessDetails(downloadUrl)
        })
      }).finally(() => {
        setIsLoading(false)
        router.push('/profile')
      })
    }
  }

  const saveBusinessDetails = async (imageUrl: string) => {
    await setDoc(doc(db, 'BusinessList', Date.now().toString()), {
      name: name,
      address: address,
      contact: contact,
      about: about,
      website: website,
      category: category,
      username: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      imageUrl: imageUrl
    }).then(() => {
      ToastAndroid.show("Business added successfully", ToastAndroid.BOTTOM)
    }).catch(() => {
      ToastAndroid.show("Something went wrong", ToastAndroid.BOTTOM)
    })
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add new Business',
      headerShown: true
    })

    getCategoryList()
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Add new Business
      </Text>
      <Text style={styles.description}>
        Fill all details in order to add new business
      </Text>
      <TouchableOpacity 
        style={[
          styles.uploadContainer,
          {
            padding: !image ? 0 : 20
          }
        ]}
        onPress={onImagePicker}
      >
        {image && (
          <Image 
            source={{uri: image}}
            style={styles.uploadPicked}
          />
        )}
        <Image 
          source={require('../../assets/images/camera.png')}
          style={image ? styles.uploadSmall : styles.upload}
        />
      </TouchableOpacity>

      <View style={{marginBottom: 20}}>
        <TextInput 
          placeholder='Name' 
          style={styles.input} 
          onChangeText={(value) => setName(value)}
        />
        <TextInput 
          placeholder='Address' 
          style={styles.input} 
          onChangeText={(value) => setAddress(value)}
        />
        <TextInput 
          placeholder='Contact' 
          style={styles.input} 
          onChangeText={(value) => setContact(value)}
        />
        <TextInput 
          placeholder='Website' 
          style={styles.input} 
          onChangeText={(value) => setWebsite(value)}
        />
        <TextInput 
          multiline
          numberOfLines={5}
          textAlignVertical='top'
          placeholder='About' 
          style={styles.input} 
          onChangeText={(value) => setAbout(value)}
        />
        <View style={styles.select}>
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={categoryList}
          />
        </View>
      </View>
      <Button 
        disabled={isLoading} 
        onPress={() => handleSubmit()}
      >
        Add New Business
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 25
  },
  description: {
    fontFamily: 'outfit',
    color: Colors.GRAY
  },
  uploadContainer: {
    position: 'relative',
    marginTop: 30,
    backgroundColor: '#dedede',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    overflow: 'hidden'
  },
  upload: {
    position: 'absolute',
    top: 25,
    left: 25,
    width: 50,
    height: 50,
    zIndex: 10,
  },
  uploadSmall: {
    position: 'absolute',
    top: 70,
    left: 70,
    width: 25,
    height: 25,
    zIndex: 10,
  },
  uploadPicked: {
    width: 100,
    height: 100
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 5,
    fontSize: 17,
    fontFamily: 'outfit',
    marginTop: 10,
    backgroundColor: '#fff'
  },
  select: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 5,
    fontSize: 17,
    fontFamily: 'outfit',
    marginTop: 10,
    backgroundColor: '#fff'
  }
})