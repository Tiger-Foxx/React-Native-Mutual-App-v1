import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import axios from "axios";
import { Link } from 'expo-router';
import BASE_URL from '@/constants/URL';

const RemboursementCardAdm = () => {
      const MEMBERS= BASE_URL+"members/";
      const REFUNDS= BASE_URL+"refunds/";

      interface Refunds{
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

      const [refundsData, setRefundsData] = useState<
          {
            name: string;
            amount: number;
          }[]
        >([]);

        const getEmpruntsData = async (memberId:number,refundId:number) => {
          try{
            const membersResponse = await axios.get<Members[]>(
              `${MEMBERS}?member_id=${memberId}`
             );
             const members = membersResponse.data || [];
             let my_member=""
             for (const member of members) {
              my_member += member.username;
            }

            const refundsResponse= await axios.get<Refunds[]>(
                `${REFUNDS}?id=${refundId}`
            )

            const refunds = refundsResponse.data || []
            let amount=0
            for(const refund of refunds){
              amount += refund.amount;
            }
            setRefundsData((prevExercisesData) => [
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

      const fetchRefunds = async () => {
        try {
          // Récupérer les données des exercices depuis l'API
          const refundsResponse = await axios.get<Refunds[]>(REFUNDS);
          const refunds = refundsResponse.data || [];

          // Appeler getExerciseData pour chaque exercice
          for (const refund of refunds) {
            await getEmpruntsData(refund.member_id,refund.id);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données des exercices:", error);
        }
      };

      useEffect(() => {
        fetchRefunds();
      }, []);
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
            <Text style={styles.exerciceContentText1}>REMBOURSEMENT</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.contentContainer}>
          {refundsData.map((refund,index) =>(
              <View style={styles.con} key={index}>
                <View style={styles.nomContent}  >
                  <Text style={styles.exerciceContentType}>{refund.name.toString()}</Text>
                </View>
                <View style={styles.dettesContent}>
                  <Text style={styles.exerciceContentPrice}>{refund.amount.toString()} FCFA</Text>
                </View>
              </View>
          ))}
        </View>
      </View>
      </ScrollView>
      <View style={styles.exerciceContent3}>
        <Link href={'/AddRemboursementAdmin'} asChild>
        <Pressable  style={styles.addButton}>
            <Text style={styles.addButtonText }>AJOUTER REMBOURSEMENT</Text>
        </Pressable>
        </Link>
      </View>
    </View>
    </View>
  )
}

export default RemboursementCardAdm

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