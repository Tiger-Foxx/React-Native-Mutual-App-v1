import React, { useState } from 'react'
import {StyleSheet, View, Text, Image, Pressable, TouchableWithoutFeedback} from 'react-native';
import HomeCard from "../../components/HomeCard";
import TreasureCard from "../../components/TreasureCard";
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import NavbarAdmin from '../../components/NavbarAdmin';


const Home = () => {
    const [isActive1,setActive1]=useState(true)
    const [isActive2,setActive2]=useState(false)
    const [isActive3,setActive3]=useState(false)
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

    const toggleStyle1 = [
        styles.toggle,
        isActive1 ? styles.activetoggle : null
      ];
      const toggleStyle2 = [
        styles.toggle,
        isActive2 ? styles.activetoggle : null
      ];
      const toggleStyle3 = [
        styles.toggle,
        isActive3 ? styles.activetoggle : null
      ];

      const handleactive=(x:number)=>{
        if (x===1) {
            setActive1(true);
            setActive2(false);
            setActive3(false);
        }
        if (x===2) {
            setActive1(false);
            setActive2(true);
            setActive3(false);
        }
        if (x===3) {
            setActive1(false);
            setActive2(false);
            setActive3(true);
        }
      }

  return (
    <TouchableWithoutFeedback onPress={handleClickOutsideSidebar} accessible={false}>
        <View style={styles.container}>
            <Header
            title='ACCUEIL' toggleSidebar={handleToggleSidebar} isSidebarOpen={isSiderbarVisible}
            />
            <View style={styles.tabs}>
                <Pressable style={toggleStyle1} onPress={()=>{handleactive(1)}} >
                    <Text style={styles.toggleText}>EN COURS</Text>
                </Pressable>
                <Pressable style={toggleStyle2} onPress={()=>{handleactive(2)}}>
                    <Text style={styles.toggleText}>TRESORERIE</Text>
                </Pressable>
                <Pressable style={toggleStyle3} onPress={()=>{handleactive(3)}}>
                    <Text style={styles.toggleText}>FOND SOCIAL</Text>
                </Pressable>
            </View>
            <View style={styles.cards}>
                {isActive1 && (
                    <HomeCard/>
                )}
                {isActive2 && (
                    <TreasureCard
                    type="TRESORERIE"
                    price={500}
                    />
                )}
                {isActive3 && (
                    <TreasureCard
                    type="FOND SOCIAL"
                    price={500}
                    />
                )}
            </View>
            <View style={styles.navbar}></View>
            <Navbar/>
    </View>

    </TouchableWithoutFeedback>
  )
}

export default Home

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
        top:"20%",
        right:0, 
    },
    navbar:{

    },
    header:{

    },
    toggle:{
        margin:10,
        width:110,
        height:40,
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
        fontSize:13,
    },
    cards:{
        position:'absolute',
        top:"30%",
    }

})