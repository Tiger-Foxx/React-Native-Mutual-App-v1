import BASE_URL from '@/constants/URL';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';

const EmpruntCard = () => {
        const BORROWINGS = BASE_URL + "borrowings/";
        const MEMBERS= BASE_URL+"members/";

        interface Members{
          user_id:number;
          username:string;
          member_id:number;
          active:boolean;
          social_crown:number;
          inscription:number;
          administrator_id:number;
        }

        interface Borrowings{
          interest:number;
          amount_borrowed:number;
          amount_paid:number;
          amount_to_pay:number;
          payment_date_line:string;
          member_id:number;
          administrator_id:number;
          session_id:number;
          state:number;
          id:number;
        }

        const [empruntsData, setEmpruntsData] = useState<
          {
            name: string;
            amount: number;
          }[]
        >([]);

        const getEmpruntsData = async (memberId:number,borrowingId:number) => {
            try{
              const membersResponse = await axios.get<Members[]>(
                `${MEMBERS}?member_id=${memberId}`
               );
               const members = membersResponse.data || [];
               let my_member=""
               for (const member of members) {
                my_member += member.username;
              }

              const empruntsResponse= await axios.get<Borrowings[]>(
                  `${BORROWINGS}?id=${borrowingId}`
              )

              const borrowings = empruntsResponse.data || []
              let amount=0
              for(const borrowing of borrowings){
                amount += borrowing.amount_to_pay;
              }
              setEmpruntsData((prevExercisesData) => [
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
        const fetchEmprunts = async () => {
          try {
            // Récupérer les données des exercices depuis l'API
            const empruntsResponse = await axios.get<Borrowings[]>(BORROWINGS);
            const emprunts = empruntsResponse.data || [];
      
            // Appeler getExerciseData pour chaque exercice
            for (const emprunt of emprunts) {
              await getEmpruntsData(emprunt.member_id,emprunt.id);
            }
          } catch (error) {
            console.error("Erreur lors de la récupération des données des exercices:", error);
          }
        };

        useEffect(() => {
          fetchEmprunts();
        }, []);
      //SIDEBAR
  return (
    <View style={styles.container}>
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
                    <Text style={styles.exerciceContentText1}>EMPRUNT</Text>
                  </View>
                  </View>

                  <View style={styles.divider} />
                      <View style={styles.contentContainer}>
                        {empruntsData.map((contribution, index) => (
                          <View style={styles.con} key={index}>
                            <View style={styles.nomContent}>
                              <Text style={styles.exerciceContentType}>{contribution.name}</Text>
                            </View>
                            <View style={styles.dettesContent}>
                              <Text style={styles.exerciceContentPrice}>{contribution.amount.toString()} FCFA</Text>
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

export default EmpruntCard

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