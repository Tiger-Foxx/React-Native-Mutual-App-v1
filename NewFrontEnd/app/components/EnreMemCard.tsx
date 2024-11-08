import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Switch, Button} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import axios from 'axios';
import * as ImagePicker from "expo-image-picker"
import { useUser } from '../(tabs)/UserContext';

const EnreMemCard = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [sexe, setSex] = useState("");
  //const [avatar, setAvatar] = useState({});
  const [address, setAddress] = useState("");
  const [numéroDeTelephone, setNumeroDeTelephone] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState("");
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [success, setSuccess] = useState("");
  const {user}=useUser();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^(6[0-9]{8})$/;

  const handleSubmit =() => {
    if (motDePasse !== confirmerMotDePasse) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    if (!phoneRegex.test(numéroDeTelephone)) {
      setPhoneError(true);
      return;
    } else {
      setPhoneError(false);
    }

    if (!passwordError && !emailError && !phoneError) {
      const currentDate = new Date().toISOString(); // Format YYYY-MM-DDTHH:MM:SSZ

      const userData = {
        name: nom,
        first_name: prenom,
        sex: sexe,
        type: isChecked ? "administrator" : "member",
        address: address,
        tel: numéroDeTelephone,
        email: email,
        password: motDePasse,
        create_at: currentDate,
       // avatar:avatar
      };

      axios.post(user.URL+"/api/users/", userData, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        console.log(response.status);
        if (response.status==201) {
          const userId = response.data.id;
          const memberData = {
            username: nom,
            active: 1,
            social_crown: 0,
            inscription: 10000,
            user_id: userId,
            administrator_id: isChecked ? user.ID : 1,
          };
  
          return axios.post(user.URL+"/api/members/", memberData, {
            headers: {
              'Content-Type': 'application/json',
            }
          })
        .then(() => {
          if (response.status==201) {
            setSuccess("Enregistrement Reussi!");
          } else {
            console.log("Erreur lors de la création d'un membre");  
            setSuccess("Erreur lors de la création d'un membre");
          }
        })
      }
        else{
          setSuccess("Echec d'enregistrement!!")
          console.log("Erreur lors de la création d'un utilisateur");   
        }
        // Réinitialiser les champs du formulaire
        setNom("");
        setPrenom("");
        setEmail("");
        setSex("");
        setAddress("");
        setNumeroDeTelephone("");
        setMotDePasse("");
        setConfirmerMotDePasse("");
        setIsChecked(false);
        //setAvatar("")
      })
      .catch(error => {
        console.log("Erreur: ", error.response ? error.response.data : error.message);
      });
    }



  };

  // const handleUpload=async()=>{
  //   let result=await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing:true,
  //     quality:1,
  //   })

  //   if (!result.canceled) {
  //     console.log(result);
  //     console.log(result.assets[0].fileName);
  //     const url=user.URL+"/media/posts/"+result.assets[0].fileName
  //     console.log(url);
      
  //     setAvatar(result)
      
  //   } else {
  //     alert("Aucune image selectionnée")
  //   }
  // }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.exerciceContent1}>
          <Text style={styles.exerciceContentText2}>AJOUTER UN MEMBRE</Text>
          <Text style={styles.exerciceContentText}>Date: {new Date().toLocaleDateString()}</Text>
        </View>
        <TextInput value={nom} onChangeText={(e) => setNom(e)} style={[styles.input, error && !nom && styles.errorInput]} placeholder="Nom" />
        <TextInput style={[styles.input, error && !prenom && styles.errorInput]} value={prenom} onChangeText={(e) => setPrenom(e)} placeholder="Prénom" />
        <Picker selectedValue={sexe} onValueChange={(itemValue) => setSex(itemValue)} style={[styles.picker, error && !sexe && styles.errorInput]}>
          <Picker.Item label="sexe" value="" />
          <Picker.Item label="M" value="M" />
          <Picker.Item label="F" value="F" />
        </Picker>
        <TextInput style={[styles.input, emailError && styles.errorInput]} value={email} onChangeText={(e) => setEmail(e)} placeholder="Email" />
        {/* <View style={styles.Uploading}>
          <Text>Ajouter un Avatar</Text>
          <Pressable style={styles.buttonUpload} onPress={handleUpload}>
            <Text style={styles.buttonText}>Choisir un fichier</Text>
          </Pressable>
        </View>
        {avatar? <Text>Fichier:</Text>:null} */}
        <TextInput style={[styles.input, error && !address && styles.errorInput]} value={address} onChangeText={(e) => setAddress(e)} placeholder="Adresse" />
        <TextInput style={[styles.input, phoneError && styles.errorInput]} value={numéroDeTelephone} onChangeText={(e) => setNumeroDeTelephone(e)} placeholder="Numéro de téléphone" keyboardType="phone-pad" />
        <TextInput style={[styles.input, passwordError && styles.errorInput]} value={motDePasse} onChangeText={(e) => setMotDePasse(e)} placeholder="Mot de passe" secureTextEntry />
        <TextInput style={[styles.input, passwordError && styles.errorInput]} value={confirmerMotDePasse} onChangeText={(e) => setConfirmerMotDePasse(e)} placeholder="Confirmer Mot de passe" secureTextEntry />
        
        <View style={styles.switchContainer}>
          <Switch value={isChecked} onValueChange={setIsChecked} />
          <Text style={styles.switchLabel}>Administrateur</Text>
        </View>
      </View>
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>AJOUTER UN MEMBRE</Text>
      </Pressable>
      <Text style={styles.successMessage}>{success}</Text>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  formContainer: {
    width: 360,
    padding: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    marginTop: 0,
  },
  exerciceContent1: {
    width: 360,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    height: 70,
    paddingTop: 10,
    margin: -20,
    borderRadius: 5,
    marginBottom: 15,
  },
  exerciceContentText2: {
    color: '#FF7D00',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exerciceContentText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  Uploading:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    marginVertical:"5%"
  },
  picker: {
    height: 40,
    marginBottom: 10,
    width: '100%',
  },
  errorInput: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 50,
    marginTop: 15,
  },
  buttonUpload:{
    backgroundColor: "#75a2d6",
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal:"5%",
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    marginLeft: 8,
    fontSize: 15,
  },
  successMessage: {
    fontSize: 16,
    marginTop: 15,
  },
});

export default EnreMemCard;
