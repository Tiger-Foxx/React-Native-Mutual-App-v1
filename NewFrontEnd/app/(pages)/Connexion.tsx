import React, {useEffect, useState,useContext} from 'react';
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import CheckBox from 'expo-checkbox';
import { Link } from 'expo-router';
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useUser } from '../(tabs)/UserContext';
import { getSession, saveSession } from '../(tabs)/UserSession';
import {BACKEND_URL} from "@/utils/URL";
import SERVER_BASE_URL from '@/config/config';


interface IProps {
  checked?: boolean;
  value?: boolean | undefined;
  onValueChange?: ((value: boolean) => void) | undefined

}

export default function Connexion() {
  const [userName, setUserName] = useState('');
  const [Message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [redirect, setredirect] = useState(false);
  const [admin, setAdmin]=useState(false)
  const url=SERVER_BASE_URL;
  const {setUser}=useUser();


  const getAdmin = async() => {
    await axios.get(url+"/api/administrators/")
        .then(async (response) =>{
          console.log(response.data);
          const admins = response.data;
          const admin = admins.find((admin:any) => admin.username === userName);
          if (admin) {
            const userid=admin.user_id;
            console.log('Success', 'You are logged in as an administrator');
           await axios.get(url+"/api/users/")
            .then(async (response) =>{
              console.log("OK");
              const users=response.data;
             

              const userID=users.find(user => user.id === userid);
             // console.log("LES ATTRIBUTS DU USER : " ,users);
              //console.log("LE USER ET PASSWORD RECHERCHE : ",userID,password)
              if (userID) {
                if (userID.password===password) {
                  console.log('TOUT EST OK')
                  const sessionData={userName,token:userName+password,status:"admin",URL:url,ID:userID.id}
                  await saveSession(sessionData);
                  setUser(sessionData);
                  setredirect(true)
                }
                else{
                  setredirect(false)
                  setMessage("Nom d'utilisateur ou mot de passe incorrect");
                }
              }
            })
        } else {
            setredirect(false)
            setMessage('Nom d\'utilisateur ou mot de passe incorrect');
          }
        }).catch((error) =>{
          console.log("Erreur : ",error)
    })

  }
  const getMember=async()=>{
    await axios.get(url+"/api/members/")
    .then( async (response) =>{
      console.log(response.data);
      const members = response.data;
      const member = members.find(member => member.username === userName);      
      //Recupération de l'état du membre
      if (member) {
        const userid=member.user_id;
        const state=member.active;
        console.log(userid);
        if(state==0){
          console.log("Membre inactive");
          setMessage("Membre inactif"); 
        }
        if (state==1) {
          await axios.get(url+"/api/users/")
          .then(async (response) =>{
            console.log("OK");
            const users=response.data;
            const userID=users.find(user => user.id === userid);
            if (userID) {
              if (userID.password===password) {
                const sessionData={userName,token:userName+password,status:"member",URL:url,ID:userID.id}
                await saveSession(sessionData);
                setUser(sessionData);
                setredirect(true)
              }
              else{
                setredirect(false)
                setMessage("Nom d'utilisateur ou mot de passe incorrect");
              }
            }
          }).catch((error)=>{console.log(error);} 
          )
          
        }
      }else{
        setredirect(false)
        console.log('Error', 'Invalid username or password');
        setMessage("Nom d'utilisateur ou mot de passe incorrect");
      }
      // Redirection vers la page Home ou une autre action
    }).catch((error) =>{
      console.log(error)
})

  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(()=>{
    setredirect
  },[getAdmin,getMember])

  return (
    <View style={styles.container}>
      <View style={styles.titlelogo}>
        <Image
          source={require('../../assets/images/logo.png')}
        />
        <Text style={styles.title}>Connectez Vous!</Text>
        <View style={styles.Verif}>
          <CheckBox
            disabled={false}
            value={admin}
            onValueChange={(newValue) => setAdmin(newValue)}
            style={styles.checkbox}
          />
          <Text style={styles.checktext}>Je suis un administrateur</Text>
        </View>
        
        {admin && (
          <View>
          <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur Admin"
          value={userName}
          onChangeText={text => setUserName(text)}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Mot de passe"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
            <FontAwesome
              name={passwordVisible ? 'eye-slash' : 'eye'}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View >
          <Text >{Message}</Text>
        </View>
        {redirect?(
          <Link href="/Home" asChild >
            <TouchableOpacity style={styles.button} onPress={getAdmin}>
              <Text style={styles.buttonText}>Connexion</Text>
            </TouchableOpacity>
          </Link>

        ):(
          <TouchableOpacity style={styles.button} onPress={getAdmin}>
            <Text style={styles.buttonText}>Connexion</Text>
          </TouchableOpacity>
        )}
          </View>
        )}
        {!admin && (
          <View>
          <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur  Membre"
          value={userName}
          onChangeText={text => setUserName(text)}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Mot de passe"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!passwordVisible}
          />
          
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
            <FontAwesome
              name={passwordVisible ? 'eye-slash' : 'eye'}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View >
          <Text >{Message}</Text>
        </View>
        {redirect?(
            <Link href="/Home" asChild>
              <TouchableOpacity style={styles.button} onPress={getMember}>
                <Text style={styles.buttonText}>Connexion</Text>
              </TouchableOpacity>
            </Link>

        ):(
          <TouchableOpacity style={styles.button} onPress={getMember}>
            <Text style={styles.buttonText}>Connexion</Text>
          </TouchableOpacity>
        )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF7D00',
    width: '100%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titlelogo: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#FFFDFD',
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#FFFFFF',
    marginTop: 40,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: '#FF7D00',
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    marginTop: 20,
    width: 295,
    textAlign: 'center',
    fontSize: 20,
    color: '#828282',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    marginTop: 20,
    width: 295,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 20,
    color: '#828282',
  },
  eyeIconContainer: {
    padding: 10,
  },
  Verif:{
    display:"flex",
    flexDirection:"row",
    marginTop:20,
    marginBottom:20,
    alignItems:"center",
    justifyContent:"center",
    width:"100%",
  },
  checktext:{
    fontSize:18,
    fontWeight:"bold",
    margin:"2%"
  },
  checkbox:{

  }
});