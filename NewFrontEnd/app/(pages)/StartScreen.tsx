import React from 'react'; 
import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import { useNavigation } from 'expo-router';
import {Link} from "expo-router";

export default function StartScreen() {
    
  const navigation = useNavigation();
  const goToHome = () => {
    //navigation.navigate('/Connexion');
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.titlelogo}>
        <Image
        source={require('../../assets/images/logo.png')}
        />
        <Text style={styles.title}>MUTUELLE DE L'ENSPY </Text>
        <Link href="/Connexion" asChild>
          <Pressable style={styles.button} >
            <Text style={styles.buttonText}>Commencer</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FF7D00',
    width:'100%',
    flex:1,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  titlelogo:{
    flex:1,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:"30%",
  },
  title:{
    fontWeight:'bold',
    fontSize:32,
    color:'#FFFDFD',
    textAlign:'center',
    marginBottom:"30%",
  },
  button:{
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:12,
    paddingHorizontal:32,
    borderRadius:6,
    elevation:3,
    backgroundColor:'#FFFFFF',
    marginTop:"30%",
  },
  buttonText:{
    fontSize:16,
    lineHeight:21,
    letterSpacing:0.25,
    color:'#FF7D00',
  },
});
