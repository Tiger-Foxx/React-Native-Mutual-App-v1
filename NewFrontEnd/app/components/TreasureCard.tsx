import React from 'react'
import {StyleSheet, View, Text, Image, Pressable, TextInput} from 'react-native';


const TreasureCard = ({type,price,date,session,Active}) => {
  return (
    // Utilisez l'opérateur ternaire correctement
    Active ? (
      <View style={styles.exercice}>
        <View style={styles.exercicetitle}>
          <Text style={styles.exercicetitleText}>EXERCICE DE L'ANNEE 2024</Text>
        </View>
        <View style={styles.exerciceContent}>
          <Text style={styles.exerciceContentText}>SESSION DE {session}</Text>
          <Text style={styles.exerciceContentText}>Date:  {date}</Text>
          <Text style={styles.exerciceContentType}>{type}</Text>
          <Text style={styles.exerciceContentPrice}>{price} FCFA</Text>
        </View>
      </View>
    ) : (
      <View style={styles.exercice}>
        <View style={styles.exercicetitle}>
          <Text style={styles.exercicetitleText}>EXERCICE DE L'ANNEE 2024</Text>
        </View>
        <View style={styles.exerciceContent}>
          <Text style={styles.exerciceContentText}>PAS DE SESSION EN COURS</Text>
        </View>
      </View>
    )
  )
}

export default TreasureCard

const styles = StyleSheet.create({
    exercice:{
        marginTop:5,
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
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
        borderRadius:8,
    },
    exercicetitleText:{
        color:'#FF7D00',
        fontSize:20,
    },
    exerciceContent:{
        width:350,
        borderWidth:1,
        display:'flex',
        alignItems:'center',
        height:280,
        borderRadius:8,
        paddingTop:40,
    },
    exerciceContentText:{
        marginBottom:20,
        fontSize:20,
    },
    exerciceContentType:{  
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        fontSize:20,
        fontWeight:'bold',
        marginTop:25,
        marginBottom:20
    },
    exerciceContentPrice:{
        fontSize:30,
    }

})