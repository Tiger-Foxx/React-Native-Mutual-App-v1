import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, Pressable, TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import { useUser } from '../(tabs)/UserContext';

const AjoutAideCard = ({title,date,prop1,prop2}) => {

  const day=new Date().getDate();
  const moths=new Date().getMonth()+2
  const year=new Date().getFullYear()
  

  const nohelp =[
    {title:"Pas d'aide disponible"},
  ];
  const nomembre=[
    {title:"aucun membre"}
  ];
  const [aide,setAide]=useState(nohelp)
  const [membre,setMembre]=useState(nomembre)
  const [commmentaires,setcommmentaires]=useState("")
  const [montant,setmontant]=useState("")
  const [message,setmessage]=useState("")
  const {user}=useUser();

  const getmembers = () => {
    axios.get(user.URL+"/api/members").then((response)=>{
      setMembre(response.data)
      console.log(response.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  const getAide = () => {
    axios.get(user.URL+"/api/help_types").then((response)=>{
      setAide(response.data)
      console.log(response.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  const postHelp = () => {
    const data={
      limit_date: day+"-"+moths+"-"+year,
      unit_amount: montant,
      amount: 4000,
      comments: commmentaires,
      state: 1,
      help_type_id: aide,
      administrator_id: user.ID,
      member_id: membre
    }
    axios.post(user.URL+"/api/helps/", data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if (response.status) {
          setmessage("Enregistré avec succès")
        } else {
          setmessage("Echec d'enregistrement")
        }
        console.log(response);
      }).catch((err)=>{
        console.log(err)
      });
  }
  
  
  
  useEffect(()=> {
    
  
  
    getmembers
  },[])
  
  


  return (

    <View style={styles.exercice}>
      <View style={styles.exercicetitle}>
        <Text style={styles.exercicetitleText}>EXERCICE DE L'ANNEE 2024</Text>
      </View>
      <View style={styles.exerciceContent1}>
        <Text style={styles.exerciceContentText}>Date: {new Date().toLocaleDateString()}</Text>
      </View>
      <View style={styles.exerciceContent2}>

       <View style={styles.aides}>
          <Text style={styles.exerciceContentText}>{prop1}</Text>
          <SelectDropdown
            onFocus={getAide}
            data={aide}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setAide(selectedItem.id)
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  {selectedItem && (
                    <Icon
                      name={selectedItem.icon}
                      style={styles.dropdownButtonIconStyle}
                    />
                  )}
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) ||
                      "choisissez ici"}
                  </Text>
                  <Icon
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    style={styles.dropdownButtonArrowStyle}
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                  }}
                >
                  <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>
        <View style={styles.membres}>
          <Text style={styles.exerciceContentText}>{prop2}</Text>
          <SelectDropdown
            onFocus={getmembers}
            data={membre}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setMembre(selectedItem.id)
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  {selectedItem && (
                    <Icon
                      name={selectedItem.icon}
                      style={styles.dropdownButtonIconStyle}
                    />
                  )}
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.username) ||
                      "choisissez ici"}
                  </Text>
                  <Icon
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    style={styles.dropdownButtonArrowStyle}
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                  }}
                >
                  <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                  <Text style={styles.dropdownItemTxtStyle}>{item.username}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>
        <View style={styles.membres}>
          <Text style={styles.exerciceContentText}>Commentaires</Text>
          <TextInput
          value={commmentaires}
          onChangeText={(text)=>{setcommmentaires(text)}}
          placeholder='Entrez les commentaires'
          style={{backgroundColor:"#E9ECEF",width:"55%",marginLeft:"3%", height:"100%", padding:7,borderRadius:10, justifyContent:"flex-end", display:"flex"}}
          />
        </View>
        <View style={styles.membres}>
          <Text style={styles.exerciceContentText}>Montant</Text>
          <TextInput
          value={montant}
          onChangeText={(text)=>{setmontant(text)}}
          placeholder='Entrez le montant'
          style={{backgroundColor:"#E9ECEF",width:"65%",marginLeft:"3%", height:"100%", padding:7,borderRadius:10, justifyContent:"flex-end", display:"flex"}}
          />
        </View>
        
        <Text style={styles.exerciceMessage}>{message}</Text>
        <View style={styles.bouton}>
       <View style={styles.button1}>
      <Pressable style={styles.addButton1}>
      <Link href="/Aide" asChild>
        <Text style={styles.addButtonText}>ANNULER</Text>
      </Link>
      </Pressable>

      </View>
      <View style={styles.button2}>
      <Pressable style={styles.addButton} onPress={postHelp}>
        <Text style={styles.addButtonText}>VALIDER</Text>
      </Pressable>
      </View>
      </View>
      </View>


    </View>
  )
}

export default AjoutAideCard

const styles = StyleSheet.create({
  exercice: {
    marginTop:100,
    width:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',

  },
  exerciceMessage:{
    fontSize:16,
    fontWeight:"bold",
    marginTop:"10%",
    marginBottom:"-15%"
  },
  exercicetitle: {
    margin: 10,
    marginBottom: 0,
    width: 350,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 0,
  },
  exercicetitleText: {
    color: '#FF7D00',
    fontSize:20,
  },
  exerciceContent1: {
    width: 350,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    height: 45,
    borderRadius: 0,
    paddingTop: 10,
  },
  exerciceContent2: {
    width: 350,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    height: 360,
    borderRadius: 0,
    paddingTop: 10,
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
  membres: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop:"5%",

  },
  aides: {
    display: "flex",
    marginTop:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    padding: 3,
    borderRadius: 8,
    marginTop:"-15%",
  },
  addButton1: {
    backgroundColor: 'red',
    padding: 3,
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

});