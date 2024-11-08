import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';


import { Link } from 'expo-router';
import { useUser } from '../(tabs)/UserContext';
import axios from 'axios';



const TypeAideCard = () => {
  const [title,setTitle]=useState([])
  const[amount,setAmount]=useState([])


  const{user}=useUser();
  useEffect(()=>{
    const getHelpType=async()=>{
      await axios.get(user.URL+"/api/help_types")
      .then((response)=>{
        console.log(response.data);
        setAmount(response.data)
        setTitle(response.data)
      })
      .catch((error)=>{
        console.log(error);
        
      })
    }

    getHelpType()
  },[])
  return (

    <View style={styles.exercice}>
      <View style={styles.exercicetitle}>
        <Text style={styles.exercicetitleText}>EXERCICE DE L'ANNEE 2024</Text>
      </View>
      <View style={styles.exerciceContent1}>
        <Text style={styles.exerciceContentText}>SESSION DE JUILLET</Text>
        <Text style={styles.exerciceContentText}>Date: {new Date().toLocaleDateString()}</Text>
      </View>
      
        <View style={styles.exerciceContent2}>
          <View style={styles.aideAndMontantContainer}>
            <View style={styles.aideContainer}>
              <Text style={styles.exerciceContentText1}>TYPE AIDE</Text>
            </View>
            <View style={styles.montantContainer}>
              <Text style={styles.exerciceContentText1}>MONTANT </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <ScrollView style={styles.scrollview}>
            <View style={styles.contentContainer}>
              <View style={styles.aideContent}>
              {title.map((title)=>(
                  <Text key={title.id} style={styles.exerciceContentType}>{title.title}</Text>
              ))}
              </View>
              <View style={styles.montantContent}>
              {amount.map((amount)=>(
                  <Text key={amount.id} style={styles.exerciceContentPrice}>{amount.amount} FCFA</Text>
              ))}
              </View>
            </View>
          </ScrollView>
          <Link href="/AddTypeAide" asChild>
            <Pressable style={styles.addButton}>
              <Text style={styles.addButtonText}>AJOUTER TYPE AIDE</Text>
            </Pressable>
          </Link>
        </View>
    </View>
  )
}

export default TypeAideCard

const styles = StyleSheet.create({
  exercice:{
    marginTop:5,
    width:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    transform:'scale(0.9)',
  },
  scrollview:{
    width:"100%",
    marginTop:"7%"
  },
exercicetitle:{
  margin:10,
  marginBottom:0,
  width:350,
  borderWidth:1,
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  height:60,
},
exercicetitleText:{
  color:'#FF7D00',
  fontSize:20,
},
exerciceContent1:{
  width:350,
  borderWidth:1,
  display:'flex',
  alignItems:'center',
  height:150,
  paddingTop:40,
},
  exerciceContent2: {
    width: 350,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    height: 450,
    paddingTop: 5,
  },
  exerciceContentText:{
    marginBottom:20,
    fontSize:20,
},
exerciceContentText1:{
  marginBottom:20,
  fontSize:20,
  color:"gray",
},

  aideAndMontantContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal:30,
  },
  aideContainer: {
  flex: 1,
  alignItems: 'flex-start',
  },
  montantContainer: {
  flex: 1,
  marginLeft:"15%",
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
  aideContent: {
    flex: 1,
    alignItems: 'flex-start',
  },
  montantContent: {
   flex: 1,
   alignItems: 'flex-end',
  },
  exerciceContentType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical:"5%"
  },
  exerciceContentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical:"5%"
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginTop: 70,
    marginBottom:"5%"
  },
  addButton1: {
    backgroundColor: 'red',
    padding: 4,
    borderRadius: 8,
    marginTop: -2,
    width:50,
    height:30,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButtonText1: {
    color: 'white',
    fontSize:9,
    fontWeight: 'bold',
  },

});