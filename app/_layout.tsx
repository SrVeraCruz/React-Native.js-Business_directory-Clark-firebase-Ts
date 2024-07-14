import LoginSrcreen from "@/components/LoginSrcreen";
import { Colors } from "@/constants/Colors";
import CategoryFilterContextProvider from "@/contexts/CategorySelectedContext";
import { 
  ClerkProvider, 
  SignedIn, 
  SignedOut 
} from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator, View } from "react-native";

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  const [ fontsLoaded ] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf')
  })

  if(!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center', 
          alignItems: 'center'
        }}
      >
        <ActivityIndicator 
          size={'large'}
          color={Colors.PRIMARY}
        />
      </View>
    )
  }

  return (
    <ClerkProvider 
      tokenCache={tokenCache}
      publishableKey={
        process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
      }
    >
      <SignedIn>
        <CategoryFilterContextProvider>
          <Stack screenOptions={{ headerShown: false}}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </CategoryFilterContextProvider>
      </SignedIn>
      <SignedOut>
        <LoginSrcreen />
      </SignedOut>
    </ClerkProvider> 
  );
}