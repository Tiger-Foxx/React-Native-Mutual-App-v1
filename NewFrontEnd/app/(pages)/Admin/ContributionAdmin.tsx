import React, { useEffect, useState } from 'react'; 
import {StyleSheet, View, Text, Image, Pressable, TextInput, TouchableWithoutFeedback} from 'react-native';
import ContributionCard from "../../components/ContributionCard";
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import axios from "axios";
import { useUser } from '../../(tabs)/UserContext';
import ContributionCardAdm from '@/app/components/ContributionCardAdm';


const Ex = () => {
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
      const BASE_URL = user.URL+"/api/";
      const CONTRIBUTIONS = BASE_URL + "contributions/";
      const MEMBERS= BASE_URL+"members/";
      const HELP= BASE_URL+"helps/";
      const HELP_TYPE= BASE_URL+ "helps_types/"
      
      // interface Contributions {
      //   date: string;
      //   state: boolean;
      //   administrator_id: number;
      //   member_id:number;
      //   help_id:number;
      //   contribution_id:number;
      // }
      
      // interface Members{
      //   user_id:number;
      //   username:string;
      //   member_id:number;
      //   active:boolean;
      //   social_crown:number;
      //   inscription:number;
      //   administrator_id:number;
      // }
      
      // interface Help{
      //   help_type_id:number;
      //   limit_date:string;
      //   unit_amount:number;
      //   amount:number;
      //   comments:string;
      //   state:boolean;
      //   administrator_id:number;
      //   member_id:number;
      //   help_id:number;
      // }
      // const [contributionsData, setContributionsData] = useState<
      //     {
      //       name: string;
      //       amount: number;
      //     }[]
      //   >([]);
      
      //   const getContributionsData = async (memberId:number,helpId:number) => {
      //     try {
      //       // Récupérer les membres de la contributions
      //       const membersResponse = await axios.get<Members[]>(
      //        `${MEMBERS}?member_id=${memberId}`
      //       );
      //       const members = membersResponse.data || []; // Retourne un tableau vide si aucune donnée
      
      //       let my_member=""
      //       for (const member of members) {
      //         my_member += member.username;
      //       }
            
      //       let amount=0
      //       const helpsResponse = await axios.get<Help[]>(
      //         `${HELP}?help_id=${helpId}`
      //        );
      //        const helps = helpsResponse.data || [];
      
      //        for (const help of helps) {
      //         amount += help.amount;
      //       }
      //       // Calculer les sommes totales
            
      //       // Mettre à jour le state avec les données de l'exercice
      //       setContributionsData((prevExercisesData) => [
      //         ...prevExercisesData,
      //         {
      //           name:my_member,
      //           amount:amount,
      //         },
      //       ]);
      //     } catch (error) {
      //       console.error("Erreur lors de la récupération des données de l'exercice:", error);
      //     }
      //   };
      
      
      //   const fetchContributions = async () => {
      //     try {
      //       // Récupérer les données des exercices depuis l'API
      //       const contributionsResponse = await axios.get<Contributions[]>(CONTRIBUTIONS);
      //       const contriubtions = contributionsResponse.data || [];
      
      //       // Appeler getExerciseData pour chaque exercice
      //       for (const contribution of contriubtions) {
      //         await getContributionsData(contribution.member_id,contribution.help_id);
      //       }
      //     } catch (error) {
      //       console.error("Erreur lors de la récupération des données des exercices:", error);
      //     }
      //   };
      
      //       //SIDEBAR
      // useEffect(() => {
      //   fetchContributions();
      // }, []);
    return (
      <TouchableWithoutFeedback onPress={handleClickOutsideSidebar} accessible={false}>
      <View style={styles.container}>
        <Header title="CONTRIBUTIONS" toggleSidebar={handleToggleSidebar} isSidebarOpen={isSiderbarVisible}/>
        <View style={styles.tabs}>
         
        </View>
        <View style={styles.cards}>
          <ContributionCardAdm/>
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