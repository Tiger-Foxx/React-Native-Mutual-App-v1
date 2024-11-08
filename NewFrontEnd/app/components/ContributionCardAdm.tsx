import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import axios from "axios";
import { Link } from 'expo-router';
import BASE_URL from '@/constants/URL';

const ContributionCard = () => {
      const CONTRIBUTIONS = BASE_URL + "contributions/";
      const MEMBERS= BASE_URL+"members/";
      const HELP= BASE_URL+"helps/";
      const HELP_TYPE= BASE_URL+ "helps_types/"

      interface Contributions {
        date: string;
        state: boolean;
        administrator_id: number;
        member_id:number;
        help_id:number;
        contribution_id:number;
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

      interface Help{
        help_type_id:number;
        limit_date:string;
        unit_amount:number;
        amount:number;
        comments:string;
        state:boolean;
        administrator_id:number;
        member_id:number;
        help_id:number;
      }
      const [contributionsData, setContributionsData] = useState<
          {
            name: string;
            amount: number;
          }[]
        >([]);

        const getContributionsData = async (memberId:number,helpId:number) => {
          try {
            // Récupérer les membres de la contributions
            const membersResponse = await axios.get<Members[]>(
             `${MEMBERS}?member_id=${memberId}`
            );
            const members = membersResponse.data || []; // Retourne un tableau vide si aucune donnée

            let my_member=""
            for (const member of members) {
              my_member += member.username;
            }

            let amount=0
            const helpsResponse = await axios.get<Help[]>(
              `${HELP}?help_id=${helpId}`
             );
             const helps = helpsResponse.data || [];

             for (const help of helps) {
              amount += help.amount;
            }
            // Calculer les sommes totales

            // Mettre à jour le state avec les données de l'exercice
            setContributionsData((prevExercisesData) => [
              ...prevExercisesData,
              {
                name:my_member,
                amount:amount,
              },
            ]);
          } catch (error) {
            console.error("Erreur lors de la récupération des données de l'exercice:", error);
          }
        };


        const fetchContributions = async () => {
          try {
            // Récupérer les données des exercices depuis l'API
            const contributionsResponse = await axios.get<Contributions[]>(CONTRIBUTIONS);
            const contriubtions = contributionsResponse.data || [];

            // Appeler getExerciseData pour chaque exercice
            for (const contribution of contriubtions) {
              await getContributionsData(contribution.member_id,contribution.help_id);
            }
          } catch (error) {
            console.error("Erreur lors de la récupération des données des exercices:", error);
          }
        };

            //SIDEBAR
      useEffect(() => {
        fetchContributions();
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
                    <Text style={styles.exerciceContentText1}>CONTRIBUTION</Text>
                  </View>
                  </View>

                  <View style={styles.divider} />
                      <View style={styles.contentContainer}>
                        {contributionsData.map((contribution, index) => (
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
              <View style={styles.exerciceContent3}>
                <Link href={'/AjoutContri'} asChild>
                <Pressable style={styles.addButton}>
                  <Text style={styles.addButtonText}>AJOUTER CONTRIBUTION</Text>
                </Pressable>
                </Link>
              </View>
        </View>
    </View>
    
  )
}

export default ContributionCard

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