import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

const Card = ({title}) => {
  return (
    <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
    </View>)
  
}

const styles = StyleSheet.create({

    card:{
        margin:10,
        width:185,
        height:80,
        backgroundColor:'transparent',
        borderStyle:"solid",
        borderWidth:2,
        borderColor:'#FF7D00',
        display:'flex',
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        elevation:2,
    },
    title:{
        fontSize:25,
        fontWeight:"bold",
    }
})

export default Card