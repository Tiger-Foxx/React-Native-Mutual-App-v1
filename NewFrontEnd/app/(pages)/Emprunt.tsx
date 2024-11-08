import React, { useEffect, useState } from 'react'; 
import {StyleSheet, View, Text, Image, Pressable, TextInput, TouchableWithoutFeedback} from 'react-native';
import AddEmpruntAdm from "../components/AddRemboursementCardAdm";
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import axios from "axios";
import EmpruntCard from '../components/EmpruntCard';
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

      //   const BASE_URL = "http://127.0.0.1:8000/api/";
      //   const BORROWINGS = BASE_URL + "borrowings/";
      //   const MEMBERS= BASE_URL+"members/";

      //   interface Members{
      //     user_id:number;
      //     username:string;
      //     member_id:number;
      //     active:boolean;
      //     social_crown:number;
      //     inscription:number;
      //     administrator_id:number;
      //   }

      //   interface Borrowings{
      //     interest:number;
      //     amount_borrowed:number;
      //     amount_paid:number;
      //     amount_to_pay:number;
      //     payment_date_line:string;
      //     member_id:number;
      //     administrator_id:number;
      //     session_id:number;
      //     state:number;
      //     id:number;
      //   }

      //   const [empruntsData, setEmpruntsData] = useState<
      //     {
      //       name: string;
      //       amount: number;
      //     }[]
      //   >([]);

      //   const getEmpruntsData = async (memberId:number,borrowingId:number) => {
      //       try{
      //         const membersResponse = await axios.get<Members[]>(
      //           `${MEMBERS}?member_id=${memberId}`
      //          );
      //          const members = membersResponse.data || [];
      //          let my_member=""
      //          for (const member of members) {
      //           my_member += member.username;
      //         }

      //         const empruntsResponse= await axios.get<Borrowings[]>(
      //             `${BORROWINGS}?id=${borrowingId}`
      //         )

      //         const borrowings = empruntsResponse.data || []
      //         let amount=0
      //         for(const borrowing of borrowings){
      //           amount += borrowing.amount_to_pay;
      //         }
      //         setEmpruntsData((prevExercisesData) => [
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
      //   const fetchEmprunts = async () => {
      //     try {
      //       // Récupérer les données des exercices depuis l'API
      //       const empruntsResponse = await axios.get<Borrowings[]>(BORROWINGS);
      //       const emprunts = empruntsResponse.data || [];
      
      //       // Appeler getExerciseData pour chaque exercice
      //       for (const emprunt of emprunts) {
      //         await getEmpruntsData(emprunt.member_id,emprunt.id);
      //       }
      //     } catch (error) {
      //       console.error("Erreur lors de la récupération des données des exercices:", error);
      //     }
      //   };

      //   useEffect(() => {
      //     fetchEmprunts();
      //   }, []);
      // //SIDEBAR
      const {user}=useUser();

    return (
      <TouchableWithoutFeedback onPress={handleClickOutsideSidebar} accessible={false}>
        <View style={styles.container}>
          <Header title="REMBOURSEMENT"  toggleSidebar={handleToggleSidebar} isSidebarOpen={isSiderbarVisible}/>
          <View style={styles.tabs}>

          </View>
            <View style={styles.cards}>
            <EmpruntCard/>
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