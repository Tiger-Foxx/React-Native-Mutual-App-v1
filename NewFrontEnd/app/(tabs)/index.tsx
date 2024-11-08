import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createDrawerNavigator} from "@react-navigation/drawer"
import StartScreen from '../(pages)/StartScreen'
import Home from '../(pages)/Home';
import { Entypo } from '@expo/vector-icons';
import NotFoundScreen from '../+not-found';
import { Redirect } from 'expo-router';
import { clearSession, getSession } from './UserSession';

type RootStackParamList={
  StartScreen:undefined;
  Connexion:undefined;
  Home:undefined;
  Contribution:undefined;
  Epargne:undefined;
  AjoutContri:undefined;
  AjoutEpargn:undefined;
  SetProfile:undefined;
}
const Stack = createNativeStackNavigator<RootStackParamList>();
const AppNavigator = () => {
  return (
    <Redirect href="/StartScreen"/>
    // 
  );
};

export default AppNavigator;
