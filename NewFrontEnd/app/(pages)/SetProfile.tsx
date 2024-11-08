import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker"
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import axios from "axios";
import { useUser } from "../(tabs)/UserContext";
import { Entypo } from '@expo/vector-icons';
import Navbar from "../components/Navbar";
import NavbarAdmin from "../components/NavbarAdmin";

const SetProfile = () => {

    //SIDEBAR
    const[isSiderbarVisible,setSiderbarVisible]=useState(false)
    const handleToggleSidebar=()=>{
        setSiderbarVisible(!isSiderbarVisible);
    }
    const handleClickOutsideSidebar = () => {
        if (isSiderbarVisible) {
          setSiderbarVisible(false);
        }
      };
    //SIDEBAR
    const [username,setUsername]=useState("")
    const [name,setname]=useState("")
    const [surname,setsurname]=useState("")
    const [email,setemail]=useState("")
    const [telephone,settelephone]=useState("")
    const [type,settype]=useState("")
    const [sex,setsex]=useState("")
    const [status,setstatus]=useState("")
    const {user}=useUser();
    const [Avatar,setAvatar]=useState("")
    const [Modify,setModify]=useState(false)
    const [message,setmessage]=useState("")
    useEffect(()=>{ 
      const getMembers= async () => { 
          await axios.get(user.URL+"/api/members/")
          .then(async (response) =>{
            const Members=response.data
            console.log(Members);
            console.log("OK");
            console.log(user.ID); 
            for (let index = 0; index < Members.length; index++) {
              if (Members[index].user_id==user.ID) {
                setUsername(Members[index].username)
                if (Members[index].active==1) {
                  setstatus('Actif')
                }
                else{
                  setstatus("Inactif")
                }
              }
            }
          })
          .catch((error)=>{
            console.log(error);
          })
          await axios.get(user.URL+"/api/users/")
          .then(async (response) =>{
            const Users=response.data
            console.log(Users);
            console.log(user.ID);
            
            for (let index = 0; index < Users.length; index++) {
              if (Users[index].id==user.ID) {
                setname(Users[index].name);
                setsurname(Users[index].first_name)
                setemail(Users[index].email)
                settelephone(Users[index].tel)
                settype(Users[index].type)
                setsex(Users[index].sex)
                setAvatar(Users[index].avatar)
              }
            }
          })
          .catch((error)=>{
            console.log(error);
          })
        }
        const getAdmins= async () => { 
          await axios.get(user.URL+"/api/administrators/")
          .then(async (response) =>{
            const Admin=response.data 
            for (let index = 0; index < Admin.length; index++) {
              if (Admin[index].user_id==user.ID) {
                setUsername(Admin[index].username)
                  setstatus('Actif')
              }
            }
          })
          .catch((error)=>{
            console.log(error);
          })
          await axios.get(user.URL+"/api/users/")
          .then(async (response) =>{
            const Users=response.data            
            for (let index = 0; index < Users.length; index++) {
              if (Users[index].id==user.ID) {
                setname(Users[index].name);
                setsurname(Users[index].first_name)
                setemail(Users[index].email)
                settelephone(Users[index].tel)
                settype(Users[index].type)
                setsex(Users[index].sex)
                setAvatar(Users[index].avatar)
              }
            }
          })
          .catch((error)=>{
            console.log(error);
          })
        }

        if (user.status=="admin") {
          getAdmins();
        }
        else if (user.status=="member") {
          getMembers();
        }
      
    },[])

    const handleModify=async()=>{
      const NewDataadmin={
        username:username
      }
      const NewDatauser={
        name:name,
        first_name:surname,
        type:type,
        email:email,
        tel:telephone,
        sex:sex
      }
      const NewDatamember={
        username:username
      }
      if (user.status==="admin") {
        axios.post(user.URL+"/api/users/", NewDatauser, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(async (response) =>{

        })
        .catch((error)=>{
          console.log(error);
        })
      } else {
        
      }
    }

    const handleImage=async()=>{
      const permissionResult=await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted===false) {
        console.log("Permission non accordée");
        
      } else {
        let result= await ImagePicker.launchImageLibraryAsync({
          mediaTypes:ImagePicker.MediaTypeOptions.Images,
          allowsEditing:true,
          quality:1,
        })
        if(!result.canceled){
          setAvatar(result.assets[0].uri)
        }
      }
    }

  return (    
    <TouchableWithoutFeedback onPress={handleClickOutsideSidebar} accessible={false}>
      <View style={styles.container}>
        <Header title='PROFIL' toggleSidebar={handleToggleSidebar} isSidebarOpen={isSiderbarVisible}/>
        <View style={styles.image}>
          <Image source={{uri:Avatar}} style={styles.img}/>
        </View>
        <Pressable style={styles.boutton} onPress={handleImage}>
            <Text style={styles.bouttonText}>Nouvelle photo</Text>
        </Pressable>
        <View
        >
          <View style={styles.info} >
            <Pressable style={styles.tabIconReal} onPress={()=>{setModify(true)}}>
              <Text style={styles.tabIconRealText}>Modifier</Text>
              <Entypo name="pencil"color="black" size={30}  />
            </Pressable>
            <View style={styles.lignes}>
              <Text style={styles.champs}>Nom Utilisateur</Text>
              {Modify? (
                <TextInput
                  value={username}
                  onChangeText={()=>{}}
                  placeholder="Laissez vide si aucun changement"
                />
              ):(
                <View>
                  <Text style={styles.value}>{username}</Text>
                  <Pressable style={styles.tabIcon}>
                  </Pressable>
                </View>
              )}
            </View>
            <View style={styles.lignes}>
              <Text style={styles.champs}>Nom</Text>
              {Modify? (
                <TextInput
                  value={name}
                  onChangeText={()=>{}}
                  placeholder="Laissez vide si aucun changement"
                />
              ):(
                <View>
                  <Text style={styles.value}>{name}</Text>
                  <Pressable style={styles.tabIcon}>
                  </Pressable>
                </View>
              )}
            </View>
            <View style={styles.lignes}>
              <Text style={styles.champs}>Prénom</Text>
              {Modify? (
                <TextInput
                  value={surname}
                  onChangeText={()=>{}}
                  placeholder="Laissez vide si aucun changement"
                />
              ):(
                <View>
                  <Text style={styles.value}>{surname}</Text>
                  <Pressable style={styles.tabIcon}>
                  </Pressable>
                </View>
              )}
            </View>
            <View style={styles.lignes}>
              <Text style={styles.champs}>Email</Text>
              {Modify? (
                <TextInput
                  value={email}
                  onChangeText={()=>{}}
                  placeholder="Laissez vide si aucun changement"
                />
              ):(
                <View>
                  <Text style={styles.value}>{email}</Text>
                  <Pressable style={styles.tabIcon}>
                  </Pressable>
                </View>
              )}
            </View>
            <View style={styles.lignes}>
              <Text style={styles.champs}>Telephone</Text>
              {Modify? (
                <TextInput
                  value={telephone}
                  onChangeText={()=>{}}
                  placeholder="Laissez vide si aucun changement"
                />
              ):(
                <View>
                  <Text style={styles.value}>{telephone}</Text>
                  <Pressable style={styles.tabIcon}>
                  </Pressable>
                </View>
              )}
            </View>
            <View style={styles.lignes}>
              <Text style={styles.champs}>Genre</Text>
              {Modify? (
                <TextInput
                  value={sex}
                  onChangeText={()=>{}}
                  placeholder="Laissez vide si aucun changement"
                />
              ):(
                <View>
                  <Text style={styles.value}>{sex}</Text>
                  <Pressable style={styles.tabIcon}>
                  </Pressable>
                </View>
              )}
            </View>
            <View style={styles.lignes}>
              <Text style={styles.champs}>Type</Text>
              {Modify? (
                <TextInput
                  value={type}
                  onChangeText={()=>{}}
                  placeholder="Laissez vide si aucun changement"
                />
              ):(
                <View>
                  <Text style={styles.value}>{type}</Text>
                  <Pressable style={styles.tabIcon}>
                  </Pressable>
                </View>
              )}
            </View>
            <View style={styles.lignes}>
              <Text style={styles.champs}>Statut</Text>
                <View>
                  <Text style={styles.value}>{status}</Text>
                  <Pressable style={styles.tabIcon}>
                  </Pressable>
                </View>
            </View>
          </View>
        </View>
        <Text>{message}</Text>
        <Pressable style={styles.register} onPress={handleModify}>
          <Entypo name="save"color="black" size={30}  />
          <Text style={styles.registerText}>Enregistrer</Text>
        </Pressable>

        {user.status === "admin" ? (
                <Navbar />
            ) : (
                <NavbarAdmin />
            )}
      </View>
    </TouchableWithoutFeedback>

  );
};

export default SetProfile;

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FFFFFF',
    width:'100%',
    flex:1,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:-1
  },
  image:{
    borderWidth: 1,
    borderColor: "black",
    height: 120,
    width: 120,
    overflow: "hidden",
    borderRadius:50,
    marginTop:"45%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    borderStyle:"solid",
  },
  info:{
    width:"100%",
    padding:"3%",
    marginTop:"-15%"
  },
  champs:{
    fontSize:16,
    margin:"3%",
    fontWeight:"bold"
  },
  lignes:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginRight:"7%",
  },
  value:{
    fontStyle:"italic",
    fontWeight:"bold",
    fontSize:16,
    color:"#835830",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },
  boutton:{
    backgroundColor: "#dda877",
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:"center",
    marginLeft:"50%",
    marginTop:"-7%",
    marginBottom:"15%",
    width:"30%"
  },
  bouttonText:{
    fontSize:10,
    fontWeight:"bold"
  },
  img:{
    height: "100%",
    width: "100%",
    resizeMode:"cover",
  },
  tabIcon:{
    marginLeft:"10%",
    marginRight:"5%"
  },
  tabIconReal:{
    marginLeft:"70%",
    width:"80%",
    display:"flex",
    flexDirection:"row"
  },
  tabIconRealText:{
    fontSize:16
  },
  registerText:{
    fontSize:16
  },
  register:{
    backgroundColor: "#67ff6e",
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:"center",
    marginBottom:"20%",
    marginTop:"3%",
    display:"flex",
    flexDirection:"row",
    width:"50%"
  },
});
