import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { getSession } from './(tabs)/UserSession';
import { useColorScheme } from '@/hooks/useColorScheme';
import { UserProvider } from './(tabs)/UserContext';
import React from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  
  useEffect(()=>{
    const checkSession=async()=>{
        const session=await getSession();
        if (session) {
          console.log(session);
          setIsLoggedIn(true);
        }
        
    };

    checkSession();
  },[])

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(pages)/StartScreen"/>
          <Stack.Screen name="(pages)/Connexion" options={{headerShown:false}}/>
        {/* {isLoggedIn? (
          <> */}
          <Stack.Screen name="(pages)/Home" options={{headerShown:false}}/>
          <Stack.Screen name="(pages)/Sessions" options={{headerShown:false}}/>
          <Stack.Screen name="(pages)/Exercice" options={{headerShown:false}}/>
          <Stack.Screen name="(pages)/Epargne"  options={{headerShown:false}}/>
          <Stack.Screen name="(pages)/Contribution"  options={{headerShown:false}}/>
          <Stack.Screen name="(pages)/Dettes" options={{headerShown:false}}/>
          <Stack.Screen name="(pages)/Chatbot" options={{headerShown:false}}/>
          <Stack.Screen name="(pages)/Aide" options={{headerShown:false}}/>
          <Stack.Screen name="(pages)/AjoutAide" options={{headerShown:false}}/>
          <Stack.Screen name="(pages)/Remboursement" options={{headerShown:false}}/>
          <Stack.Screen name="(pages)/Emprunt"options={{headerShown:false}}/>
          <Stack.Screen name="(pages)/ChatbatRasa"options={{headerShown:false}}/>
          <Stack.Screen name="(pages)/AfficheMembre"options={{headerShown:false}}/>
          <Stack.Screen name="(pages)/EnreMem"options={{headerShown:false}}/>
          <Stack.Screen name="(pages)/SetProfile"options={{headerShown:false}}/>
          <Stack.Screen name="(pages)/Configuration"options={{headerShown:false}}/>
          <Stack.Screen name="(pages)/AjoutContri"options={{headerShown:false}}/>
          <Stack.Screen name="(pages)/AddTypeAide"options={{headerShown:false}}/>
          <Stack.Screen name="(pages)/TypeAide"options={{headerShown:false}}/>
          {/* </> 
        // ):(*/}
          <Stack.Screen name="+not-found" />
        {/*)}*/}
          
        </Stack>
      </ThemeProvider>
    </UserProvider>
  );
}
