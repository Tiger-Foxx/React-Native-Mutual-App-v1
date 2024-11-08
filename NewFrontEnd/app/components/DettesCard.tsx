import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, Pressable, TextInput } from 'react-native';
import { useUser } from '../(tabs)/UserContext';
import axios from 'axios';

const DettesCard = ({ nom, price }) => {
  const tab:any=[]
  const {user}=useUser()
  const [name,setName]=useState([])
  const [Montant,setMontant]=useState([])
  useEffect(()=>{
    const getBorrows=async()=>{
      await axios.get(user.URL+"/api/borrowings/")
      .then(async (response)=>{
        const Borrows=response.data
        setMontant(Borrows)
        for (let index = 0; index < Borrows.length; index++) {
          if (Borrows[index].state==1) {
            const det=Borrows[index].member_id
            await axios.get(user.URL+"/api/members/")
            .then((response)=>{
              const Members=response.data
              for (let index = 0; index < Members.length; index++) {
                if (Members[index].id==det) {
                  tab.push(Members[index])
                }
              }
            })
          }
        }
        setName(tab)
      })
      .catch((error)=>{
        console.log(error);
        
      })
    }

    getBorrows()
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
        <View style={styles.nomAndDettesContainer}>
          <View style={styles.nomContainer}>
            <Text style={styles.exerciceContentText1}>NOM & PRENOM</Text>
          </View>
          <View style={styles.dettesContainer}>
            <Text style={styles.exerciceContentText1}>DETTES</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.contentContainer}>
          <View style={styles.nomContent}>
            {name.map((name)=>(
              <Text key={name.id} style={styles.exerciceContentType}>{name.username}</Text>
            ))}
            
          </View>
          <View style={styles.dettesContent}>
            {Montant.map((montant)=>(
              <Text key={montant.id} style={styles.exerciceContentPrice}>{montant.amount_to_pay} FCFA</Text>
            ))}
            
          </View>
        </View>
      </View>

      
    </View>
  )
}

export default DettesCard

const styles = StyleSheet.create({
  exercice: {
    marginTop:5,
    width:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    
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
  
});