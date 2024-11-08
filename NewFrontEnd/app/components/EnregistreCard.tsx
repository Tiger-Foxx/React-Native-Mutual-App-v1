import React from 'react'
import { StyleSheet, View, Text, Image, Pressable, TextInput } from 'react-native';
import {Link} from "expo-router";

const EnregistreCard = ({ type}) => {
  return (
    <View style={styles.exercice}>
      <View style={styles.exercicetitle}>
        <Text style={styles.exercicetitleText}>EXERCICE DE L'ANNEE 2024</Text>
      </View>
      <View style={styles.exerciceContent1}>
        <Text style={styles.exerciceContentText2}>SESSION DE JUILLET</Text>
        <Text style={styles.exerciceContentText}>Date: 05 JUILLET 2024</Text>
      </View>
      <View style={styles.exerciceContent2}>
        <View style={styles.nommembreContainer}>

            <Text style={styles.exerciceContentText1}>NOM DU MEMBRE</Text>


        </View>
        <View style={styles.divider} />
        <View style={styles.contentContainer}>
          <View style={styles.aideContent}>
            <Text style={styles.exerciceContentType}>{type}</Text>
          </View>

          <Pressable style={styles.addButton1}>
            <Text style={styles.addButtonText1}>Désactiver</Text>
          </Pressable>
        </View>
      </View>

      <Link href="/Affiche" asChild>
      <Pressable style={styles.addButton}>
        <Text style={styles.addButtonText}>AJOUTER UN MEMBRE DANS LA MUTUELLE</Text>
      </Pressable>
      </Link>
    </View>
  )
}

export default EnregistreCard

const styles = StyleSheet.create({
  exercice: {
    marginTop: -40,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

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
    height: 210,
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
  exerciceContentText2: {
    marginBottom: 10,
    fontWeight: 'bold',


  },


 nommembreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal:30,
  },


  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
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

  exerciceContentType: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  exerciceContentPrice: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  addButton1: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButtonText1: {
    color: 'white',
    fontSize:8,
  },

});