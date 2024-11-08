import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,TouchableWithoutFeedback,Image,Pressable, ScrollView } from 'react-native';
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import { useUser } from '../(tabs)/UserContext';
import NavbarAdmin from '../components/NavbarAdmin';

const ConfigurationScreen = () => {
  const [montantInscription, setMontantInscription] = useState('');
  const [montantCotisations, setMontantCotisations] = useState('');
  const [pourcentageInteret, setPourcentageInteret] = useState('');
  const [nombreMois, setNombreMois] = useState('');

  const handleSave = () => {
    // Handle save action here
    console.log('Configuration saved');
  };
  const {user}=useUser();

  const[isSiderbarVisible,setSiderbarVisible]=useState(false)
      const handleToggleSidebar=()=>{
          setSiderbarVisible(!isSiderbarVisible);
    }
      const handleClickOutsideSidebar = () => {
          if (isSiderbarVisible) {
            setSiderbarVisible(false);
        }
    };

  return (
   
    <TouchableWithoutFeedback onPress={handleClickOutsideSidebar} accessible={false}>
              <View style={styles.container}>
        <Header title="CONFIGURATIONS" toggleSidebar={handleToggleSidebar} isSidebarOpen={isSiderbarVisible}/>
        <View style={styles.tabs}>
         
        </View>
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Montant de l'inscription a payer par..."
          value={montantInscription}
          onChangeText={setMontantInscription}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Montant des cotisations obligatoires"
          value={montantCotisations}
          onChangeText={setMontantCotisations}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pourcentage interet par mois sur u..."
          value={pourcentageInteret}
          onChangeText={setPourcentageInteret}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre de mois pour rembourser le..."
          value={nombreMois}
          onChangeText={setNombreMois}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>SAUVEGARDER CONFIGURATION</Text>
      </TouchableOpacity>
        <View style={styles.navbar}></View>
        {user.status==="admin"?(
                <Navbar/>
            ):(
                <NavbarAdmin/>
            )}
      </View>
    </TouchableWithoutFeedback>
        
    

  );
};

const styles = StyleSheet.create({
  
  container:{
    backgroundColor:'#FFFFFF',
    width:'100%',
    flex:1,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:0
  },
  inputContainer: {
    width: '90%',
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    color: 'Gray',
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ConfigurationScreen;
