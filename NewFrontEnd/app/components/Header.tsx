import React, { useState } from 'react'
import {StyleSheet, View, Text, Image, Pressable, TextInput, TouchableOpacity} from 'react-native';
import SideBar from './SideBar';
import { Link } from 'expo-router';
import  Entypo from '@expo/vector-icons/Entypo';


const Header = ({title,toggleSidebar,isSidebarOpen}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.sideBar} onPress={toggleSidebar}>
            <Entypo name='menu' size={24} color={'black'}/>
        </TouchableOpacity>
        <View>
            <Text style={styles.Title}>{title}</Text>
        </View>
        <Link href="/SetProfile" asChild>
        <TouchableOpacity style={styles.profile}>
            <Image
            source={require('../../assets/images/Profile.png')}
            />
        </TouchableOpacity>
        </Link>
        <SideBar visible={isSidebarOpen}/>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'row',
        backgroundColor:'#FF7D00',
        height:"10%",
        position:'absolute',
        top:"5%",
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    sideBar:{
        display:'flex',
        marginRight:"20%",
        transform:[{scale:1.5}],
    },
    Title:{
         fontSize:20,
         fontWeight:"bold",   
    },
    profile:{
        marginLeft:"20%",
        transform:[{scale:1.5}]
    },

})