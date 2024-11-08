import React, { useState } from 'react'; 
import {StyleSheet, View, Text, Image, Pressable, TextInput, TouchableWithoutFeedback} from 'react-native';
import AideCard from "../components/AideCard";
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import NavbarAdmin from '../components/NavbarAdmin';
import { useUser } from '../(tabs)/UserContext';


const Ex = () => {
      //SIDEBAR
      const[isSiderbarVisible,setSiderbarVisible]=useState(false)
      const handleToggleSidebar=()=>{
          setSiderbarVisible(!isSiderbarVisible);
      }
      const handleClickOutsideSidebar = () => {
          if (isSiderbarVisible) {
            setSiderbarVisible(false);
          }
        };
        const {user}=useUser();

      //SIDEBAR
    return (
      <TouchableWithoutFeedback onPress={handleClickOutsideSidebar} accessible={false}>
        <View style={styles.container}>
          <Header title="AIDES"  toggleSidebar={handleToggleSidebar} isSidebarOpen={isSiderbarVisible}/>

          <View style={styles.cards}>
            <AideCard
            />
          </View>
          <View style={styles.navbar}>
            
          </View>
          {user.status === "admin" ? (
                <Navbar />
            ) : (
                <NavbarAdmin />
            )}
                </View>
      </TouchableWithoutFeedback>
    );
  };
  
  export default Ex

  const styles = StyleSheet.create({
    container:{
      backgroundColor:'#FFFFFF',
      width:'100%',
      flex:1,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop:-1
    },
    toggle:{
        margin:10,
        width:85,
        height:32,
        backgroundColor:'#F6F6F6',
        borderRadius:15,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    activetoggle:{
        backgroundColor:'#FF7D00'
    },
    toggleText:{
        fontSize:10,
    },
    cards:{
        position:'absolute',
        top:100,
        width:"100%"
    }

})