import React, { useEffect, useState } from 'react'; 
import {StyleSheet, View, Text, Image, Pressable, TextInput, TouchableWithoutFeedback} from 'react-native';
import RemboursementCard from "../components/RemboursementCard";
import Header from '../components/Header'
import Navbar from '../components/Navbar';
import axios from "axios";
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
    //   //SIDEBAR
    //   const BASE_URL = "http://127.0.0.1:8000/api/";
    //   const MEMBERS= BASE_URL+"members/";
    //   const REFUNDS= BASE_URL+"refunds/";

    //   interface Refunds{
    //     amount:number;
    //     administrator_id:number;
    //     member_id:number;
    //     session_id:number;
    //     borrowing_id:number;
    //     id:number;
    //   }

    //   interface Members{
    //     user_id:number;
    //     username:string;
    //     member_id:number;
    //     active:boolean;
    //     social_crown:number;
    //     inscription:number;
    //     administrator_id:number;
    //   }

    //   const [refundsData, setRefundsData] = useState<
    //       {
    //         name: string;
    //         amount: number;
    //       }[]
    //     >([]);

    //     const getEmpruntsData = async (memberId:number,refundId:number) => {
    //       try{
    //         const membersResponse = await axios.get<Members[]>(
    //           `${MEMBERS}?member_id=${memberId}`
    //          );
    //          const members = membersResponse.data || [];
    //          let my_member=""
    //          for (const member of members) {
    //           my_member += member.username;
    //         }

    //         const refundsResponse= await axios.get<Refunds[]>(
    //             `${REFUNDS}?id=${refundId}`
    //         )

    //         const refunds = refundsResponse.data || []
    //         let amount=0
    //         for(const refund of refunds){
    //           amount += refund.amount;
    //         }
    //         setRefundsData((prevExercisesData) => [
    //           ...prevExercisesData,
    //           {
    //             name:my_member,
    //             amount:amount,
    //           },
    //         ]);
    //       }catch(error){
    //         console.error("Erreur lors de la récupération des données de l'exercice:", error);
    //       }
    //   }

    //   const fetchRefunds = async () => {
    //     try {
    //       // Récupérer les données des exercices depuis l'API
    //       const refundsResponse = await axios.get<Refunds[]>(REFUNDS);
    //       const refunds = refundsResponse.data || [];
    
    //       // Appeler getExerciseData pour chaque exercice
    //       for (const refund of refunds) {
    //         await getEmpruntsData(refund.member_id,refund.id);
    //       }
    //     } catch (error) {
    //       console.error("Erreur lors de la récupération des données des exercices:", error);
    //     }
    //   };

    //   useEffect(() => {
    //     fetchRefunds();
    //   }, []);
    // //SIDEBAR
    const {user}=useUser();
    return (
      <TouchableWithoutFeedback onPress={handleClickOutsideSidebar} accessible={false}>
        <View style={styles.container}>
          <Header title="REMBOURSEMENT" toggleSidebar={handleToggleSidebar} isSidebarOpen={isSiderbarVisible}/>
          <View style={styles.tabs}>
          
          </View>
          <View style={styles.cards}>
              <RemboursementCard/>
          </View>
          <View style={styles.navbar}></View>
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