import React, { useState } from 'react';
import {StyleSheet, View, Text, Image, Pressable, TextInput, TouchableWithoutFeedback} from 'react-native';
import AfficheCard from "../components/AfficheCard";
import Header from '../components/Header'
import Navbar from '../components/Navbar';
import { useUser } from '../(tabs)/UserContext';
import NavbarAdmin from '../components/NavbarAdmin';


const Affiche = () => {
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
      //SIDEBAR
      const {user}=useUser();

    return (
      <TouchableWithoutFeedback onPress={handleClickOutsideSidebar} accessible={false}>
        <View style={styles.container}>
          <Header
              title='MEMBRES' toggleSidebar={handleToggleSidebar} isSidebarOpen={isSiderbarVisible}
              />
            <AfficheCard/>
            {user.status === "admin" ? (
                <Navbar />
            ) : (
                <NavbarAdmin />
            )}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  export default Affiche

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

})