import React, { useState } from 'react'; 
import {StyleSheet, View, Text, Image, Pressable, TextInput, TouchableWithoutFeedback} from 'react-native';
import AjoutAideCard from "../../components/AjoutAideCard";
import Header from '../../components/Header'


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
      //SIDEBAR
    return (

      
      <TouchableWithoutFeedback onPress={handleClickOutsideSidebar} accessible={false}>
        <View style={styles.container}>
          <Header title="AIDE" toggleSidebar={handleToggleSidebar} isSidebarOpen={isSiderbarVisible}/>
          <View style={styles.cards}>
            <AjoutAideCard
            title="Ajouter une aide" 
            date="05 JUILLET 2024"
            prop1="Type Aide"
            prop2="Membre" />
          </View>
          <View style={styles.navbar}></View>
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
    tabs:{
        position:'absolute',
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        top:90,
        right:0, 
    },
    navbar:{

    },
    header:{

    },
   
    cards:{
        position:'absolute',
        top:150,
    }

})