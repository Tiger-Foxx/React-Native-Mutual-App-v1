import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import axios from 'axios'
import { useUser } from '../(tabs)/UserContext';
import { Link } from 'expo-router';

const AfficheCard = () => {
  const Months=[
    "JANVIER",
    "FEVRIER",
    "MARS",
    "AVRIL",
    "MAI",
    "JUIN",
    "JUILLET",
    "AOUT",
    "SEPTEMBRE",
    "OCTOBRE",
    "NOVEMBRE",
    "DECEMBRE",
];

  const {user}=useUser();
  const [memberTab,setMemberTab]=useState([])
  const [sesssion,setSession]=useState("")
  const [date,setDate]=useState("")
  const [sesssionID,setSessionID]=useState("")
  useEffect(()=>{ 
    const getMembers= async () => {
        console.log(user.URL);  
        await axios.get(user.URL+"/api/sessions_/")
        .then( async (response) =>{ 
            const Sessions=response.data
            const session = Sessions.find(session => session.active ==1);  
            if (session) {
                const datesplit=[];
                datesplit.push(session.create_at.split("-"));
                console.log(datesplit);
                const k=datesplit[0][1].split("0");
                const k2=datesplit[0][2].split("T");
                console.log(k2);
                setSession(Months[k[1]]+" "+datesplit[0][0])
                setSessionID(session.id);
                const jour=new Date().getDate();
                const mois=new Date().getMonth();
                const annee=new Date().getFullYear();
                setDate(jour+' '+Months[mois]+' '+annee)
            }
        })  
        .catch((error)=>{
            console.log(error);
        }) 
        await axios.get(user.URL+"/api/members/")
        .then(async (response) =>{
          setMemberTab(response.data);
          console.log(memberTab);
        })
        .catch((error)=>{
          console.log(error);
        }) 
      }
    getMembers();
    
  },[])
  

  return (
    <View style={styles.exercice}>
      <View style={styles.exercicetitle}>
        <Text style={styles.exercicetitleText}>EXERCICE DE L'ANNEE 2024</Text>
      </View>
      <View style={styles.exerciceContent1}>
        <Text style={styles.exerciceContentText}>SESSION DE {sesssion}</Text>
        <Text style={styles.exerciceContentText}>Date: {date}</Text>
      </View>
      
      <View style={styles.exerciceContent2}>
        <View style={styles.nomContainer}>
          <Text style={styles.exerciceContentText1}>NOMS & PRENOMS</Text>
        </View>
        <ScrollView>
          <View style={styles.nom}>
          {memberTab.map((member)=>(
            <Text key={member.id} style={styles.nomText}>{member.username}</Text>
          ))}
          </View>
        </ScrollView>
        {user.status==="member"?(
          <View></View>
        ):(
            <Pressable  style={styles.addButton}>
              <Link href="/EnreMem" asChild>
                <Text style={styles.addButtonText }>AJOUTER MEMBRE</Text>
              </Link>
              
            </Pressable>
        )}
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  exercice: {
    marginTop:5,
    width:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    
  },
  nom:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    color:"black"
  },
  nomText:{
    fontSize:20,
    fontWeight:"bold"
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
    height: 260,
    borderRadius: 0,
    paddingTop: 5,
  },
  exerciceContentText: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  exerciceContentText1: {
    color: 'gray',
    fontSize: 15,
    fontWeight:"bold",
    
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
    flexDirection: 'row',
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
    padding: 10,
    borderRadius:8,
    margin:"3%"
  },
  addButtonText:{
    color:'white',
    fontWeight:'bold',
  }
  
});

export default AfficheCard;
