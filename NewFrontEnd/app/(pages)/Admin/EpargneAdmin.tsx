import React, { useEffect, useState } from 'react'; 
import {StyleSheet, View, Text, Image, Pressable, TextInput, TouchableWithoutFeedback} from 'react-native';
import EpargneCard from "../../components/EpargneCard";
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import axios from "axios";
import NavbarAdmin from '../../components/Navbar';
import EpargneCardAdm from '@/app/components/EpargneCardAdm';
import SERVER_BASE_URL from '@/config/config';


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
        const BASE_URL = `${SERVER_BASE_URL}/api/`;
        const MEMBERS= BASE_URL+"members/";
        const SAVINGS= BASE_URL+"savings/";

        interface Savings{
          amount:number;
          administrator_id:number;
          member_id:number;
          session_id:number;
          borrowing_id:number;
          id:number;
        }
  
        interface Members{
          user_id:number;
          username:string;
          member_id:number;
          active:boolean;
          social_crown:number;
          inscription:number;
          administrator_id:number;
        }
  
        const [savingsData, setSavingsData] = useState<
            {
              name: string;
              amount: number;
            }[]
          >([]);
  
          const getEmpruntsData = async (memberId:number,savingId:number) => {
            try{
              const membersResponse = await axios.get<Members[]>(
                `${MEMBERS}?member_id=${memberId}`
               );
               const members = membersResponse.data || [];
               let my_member=""
               for (const member of members) {
                my_member += member.username;
              }
  
              const savingsResponse= await axios.get<Savings[]>(
                  `${SAVINGS}?id=${savingId}`
              )
  
              const savings = savingsResponse.data || []
              let amount=0
              for(const saving of savings){
                amount += saving.amount;
              }
              setSavingsData((prevExercisesData) => [
                ...prevExercisesData,
                {
                  name:my_member,
                  amount:amount,
                },
              ]);
            }catch(error){
              console.error("Erreur lors de la récupération des données de l'exercice:", error);
            }
        }
  
        const fetchSavings = async () => {
          try {
            // Récupérer les données des exercices depuis l'API
            const savingsResponse = await axios.get<Savings[]>(SAVINGS);
            const savings = savingsResponse.data || [];
      
            // Appeler getExerciseData pour chaque exercice
            for (const saving of savings) {
              await getEmpruntsData(saving.member_id,saving.id);
            }
          } catch (error) {
            console.error("Erreur lors de la récupération des données des exercices:", error);
          }
        };
  
        useEffect(() => {
          fetchSavings();
        }, []);
      //SIDEBAR
    return (
      <TouchableWithoutFeedback onPress={handleClickOutsideSidebar} accessible={false}>
      <View style={styles.container}>
        <Header title="EPARGNES" toggleSidebar={handleToggleSidebar} isSidebarOpen={isSiderbarVisible}/>
        <View style={styles.tabs}>
         
        </View>
        <View style={styles.cards}>
            <EpargneCardAdm/>
        </View>
        <View style={styles.navbar}></View>
        <Navbar/>
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
        top:150,
    }

})