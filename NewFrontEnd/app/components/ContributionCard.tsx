import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import axios from "axios";
import { Link } from 'expo-router';
import BASE_URL from '@/constants/URL';
import { useUser } from '../(tabs)/UserContext';
import { error } from 'jquery';

const ContributionCard = () => {
  const [contribuants,setContribuants]=useState<{}>([]);
  const [amount,setamount]=useState<{}>([])
  const contrib:any[]=[]
  const montant:any[]=[]
  let Contributions:any,members:any,temp:any;
  const {user}=useUser();

  useEffect(()=>{
    const getContributions=async()=>{
      await axios.get(user.URL+"/api/obligatory_contributions/")
      .then(async (response) =>{
        Contributions=response.data;
      })
      .catch((error)=>{
        console.log(error);
      })
    }
    const getMembers=async()=>{
      console.log(Contributions);
      await axios.get(user.URL+"/api/members/")
      .then(async (response) =>{
        members=response.data
        console.log(members);
        for (let index = 0; index < members.length; index++) {
          if (Contributions.find(contrib => contrib.member_id==members[index].id)) {
            temp=Contributions.find(contrib => contrib.member_id==members[index].id)
            montant.push(temp)
            contrib.push((members.find(mem=>mem.id==temp.member_id)))
          }
        }
        console.log(contrib);
        console.log(montant);
        
        setamount(montant);
        setContribuants(contrib);
      })
      .catch((error)=>{
        console.log(error);
      })
    }
    const getcall=async()=>{
      await getContributions();
      getMembers();
    }
    getcall();
  },[])



  return (
    <View style={styles.container}>
        <View style={styles.exercice}>
          <View style={styles.exercicetitle}>
            <Text style={styles.exercicetitleText}>EXERCICE DE L'ANNEE 2024</Text>
          </View>
          <View style={styles.exerciceContent1}>
            <Text style={styles.exerciceContentText}>SESSION DE JUILLET</Text>
            <Text style={styles.exerciceContentText}>Date: {new Date().toLocaleDateString()}</Text>
          </View>
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
                <ScrollView style={styles.scrollViewContent} >
                  <View style={styles.scrollViewContent1}>
                    <View style={styles.contentContainerName}>
                      {contribuants.map((member)=>(
                        <Text key={member.id} style={styles.nomText}>{member.username}</Text>
                      ))}
                    </View>
                    <View style={styles.contentContainerPrice}>
                      {amount.map((member)=>(
                        <Text key={member.id} style={styles.nomText}>{member.contributed}</Text>
                      ))}
                    </View>
                  </View>
                </ScrollView>
            </View>
          {user.status==="member"?(
          <View></View>
        ):(
          <View style={styles.exerciceContent3}>
                <Link href={'/AjoutContri'} asChild>
                <Pressable style={styles.addButton}>
                  <Text style={styles.addButtonText}>AJOUTER CONTRIBUTION</Text>
                </Pressable>
                </Link>
          </View>
        )}
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
  scrollViewContent1: {
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    width:"100%",
  },
  scrollViewContent: {
    width:"100%",
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
  nomText:{
    fontSize:16,
    fontWeight:"bold"
  },
  exerciceContent2: {
    width: 260,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    height: 300,
    borderRadius: 0,
    paddingTop: 5,
  },
  exerciceContent3: {
    width: "100%",
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
  contentContainerName: {
    marginRight:"17%",
    flexDirection: 'column',
    justifyContent: 'center',
    display:"flex",
    alignItems:"flex-end",
    width: '100%',
  },
  contentContainerPrice: {
    marginLeft:"17%",
    flexDirection: 'column',
    justifyContent:"space-between",
    display:"flex",
    alignItems:"flex-start",
    width: '100%',
    
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