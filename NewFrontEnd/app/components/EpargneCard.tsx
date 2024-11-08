import BASE_URL from '@/constants/URL';
import axios from 'axios';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';

const epargneCard = () => {
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
    <View style={styles.contentContainer}>
        <View style={styles.exercice}>
      <View style={styles.exercicetitle}>
        <Text style={styles.exercicetitleText}>EXERCICE DE L'ANNEE 2024</Text>
      </View>
      <View style={styles.exerciceContent1}>
        <Text style={styles.exerciceContentText}>SESSION DE JUILLET</Text>
        <Text style={styles.exerciceContentText}>Date: 05 JUILLET 2024</Text>
      </View>
      <ScrollView style={styles.scrollViewContent}>
      <View style={styles.exerciceContent2}>
        <View style={styles.nomAndDettesContainer}>
          <View style={styles.nomContainer}>
            <Text style={styles.exerciceContentText1}>NOM & PRENOM</Text>
          </View>
          <View style={styles.dettesContainer}>
            <Text style={styles.exerciceContentText1}>EPARGNES</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.contentContainer}>
          {savingsData.map((saving,index) =>(
             <View style={styles.con} key={index}>
                <View style={styles.nomContent}>
                  <Text style={styles.exerciceContentType}>{saving.name}</Text>
                </View>
                <View style={styles.dettesContent}>
                  <Text style={styles.exerciceContentPrice}>{saving.amount.toString()} FCFA</Text>
                </View>
             </View>
          ))}
        </View>
        
      </View>
      </ScrollView>
      
    </View>
    </View>
    
  )
}

export default epargneCard

const styles = StyleSheet.create({
  exercice: {
    marginTop:5,
    width:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    
  },
  scrollViewContent: {
    height:200,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  exercicetitle: {
    margin: 5,
    marginBottom: 0,
    width: 260,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 0,
  },
  exercicetitleText: {
    color: '#FF7D00'
  },
  exerciceContent1: {
    width: 260,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',   
    height: 70,
    borderRadius: 0,
    paddingTop: 10,
  },
  exerciceContent2: {
    width: 260,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    height: 'auto',
    borderRadius: 0,
    paddingTop: 5,
  },
  exerciceContent3: {
    width: 260,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    height: 80,
    borderColor:'white',
    borderRadius: 0,
    paddingTop: 5,
  },
  exerciceContentText: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  exerciceContentText1: {
    color: 'gray',
    fontSize: 10,
    
  },

  nomAndDettesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  nomContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  dettesContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  nomContent: {
    flex: 1,
    alignItems: 'flex-start',
  },
  con:{
    display: 'flex',
    flexDirection: 'row',
  },
  dettesContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  exerciceContentType: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  exerciceContentPrice: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  addButton:{
    backgroundColor:'#4CAF50',
    position: 'absolute',
    borderRadius:8,
    bottom:20,
    padding: 15,
    alignItems: 'center',
    left: 20,
    right: 20,
    marginTop:12

  },
  addButtonText:{
    color:'white',
    fontWeight:'bold',
  }
  
});