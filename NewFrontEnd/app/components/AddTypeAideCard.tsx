import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, Pressable, TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUser } from '../(tabs)/UserContext';



const AddTypeAideCard = () => {
  const{user}=useUser()

  const [type, setType]=useState("")
  const [montant, setmontant]=useState("")
  const [message, setmessage]=useState("")

  const handleAddHelp=async()=>{
    const data={
      title:type,
      amount:montant,
      active:1
    }
    await axios.post(user.URL+"/api/help_types/",data)
    .then((response)=>{
      if (response.status==201) {
        setmessage("Enregistré avec succès")
      }
      else{
        setmessage("Erreur durant l'enregitrement");
      }
    })
    .catch((error)=>{
      console.log(error);
      setmessage("Erreur durant l'enregitrement");
    })

  }
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

       <View style={styles.aides}>
          <Text style={styles.exerciceContentText}>Type Aide</Text>
          <TextInput
            style={styles.montantInput}
            onChangeText={(text) => setType(text)}
            value={type}
            placeholder="Entrez Type Aide"
          />
        </View>
        <View style={styles.montant}>
          <Text style={styles.exerciceContentText}>Montant</Text>
          <TextInput
            style={styles.montantInput}
            onChangeText={(text) => setmontant(text)}
            value={montant}
            placeholder="Entrez le montant"
          />
        </View>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.bouton}>
          
       <View style={styles.button1}>
      <Pressable style={styles.addButton1} onPress={()=>{
        setType("")
        setmontant("")
        setmessage("")
      }}>
        <Text style={styles.addButtonText}>ANNULER</Text>
      </Pressable>
      </View>
      <View style={styles.button2}>
      <Pressable style={styles.addButton} onPress={handleAddHelp}>
        <Text style={styles.addButtonText}>VALIDER</Text>
      </Pressable>
      </View>
      </View>
      </View>


    </View>
  )
}

export default AddTypeAideCard

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
  message:{
    fontSize:16,
    fontStyle:"italic",
    width:"100%",
    textAlign:'center',
    marginTop:"10%",
    marginBottom:"-15%",
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
    height: 260,
    paddingTop: 5,
  },
  exerciceContentText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  exerciceContentText1: {
    color: 'gray',
    fontSize: 10,

  },


  bouton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop:"25%",
    height:5,
  },
  aidesetmembres:{

  },
  montant: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems:"center",
    paddingHorizontal: 20,
    marginTop:"5%",

  },
  aides: {
    display: "flex",
    marginTop:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"center",
    width: '100%',
    paddingHorizontal: 20,
  },

  button1: {
    flex: 1,
    alignItems: 'flex-start',
  },
  button2: {
    flex: 1,
    alignItems: 'flex-end',
  },

  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginTop:"-15%",
  },
  addButton1: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    marginTop: "-15%",
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "200",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  montantInput: {
    width: 200,
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },

});