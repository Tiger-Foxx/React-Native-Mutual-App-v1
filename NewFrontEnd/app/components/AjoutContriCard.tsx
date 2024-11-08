import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, Pressable, TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUser } from '../(tabs)/UserContext';
import axios from 'axios';
import { Link } from 'expo-router';

const ContributionCard = () => {
  const Months=[
    "JANVIER",
    "FEVRIER",
    "MARS",
    "AVRIL",
    "MAI",
    "JUIN",
    "JUILLET",
    "AOUT",
    "SEPTEMBRE",
    "OCTOBRE",
    "NOVEMBRE",
    "DECEMBRE",
];
  const {user}=useUser();
  const [amount, setAmount]=useState("")
  const [SelectedMember, setSelectedMember]=useState("")
  const [Message, setMessage]=useState("")
  const [sesssion,setSession]=useState("")
  const [date,setDate]=useState("")
  const [sesssionID,setSessionID]=useState("")
  const [memberTab,setMemberTab]=useState([])
  useEffect(()=>{ 
    const getSession= async () => {
        console.log(user.URL);  
        await axios.get(user.URL+"/api/sessions_/")
        .then( async (response) =>{ 
            const Sessions=response.data
            const session = Sessions.find(session => session.active ==1);  
            if (session) {
                const datesplit=[];
                datesplit.push(session.create_at.split("-"));
                console.log(datesplit);
                const k=datesplit[0][1].split("0");
                const k2=datesplit[0][2].split("T");
                console.log(k2);
                setSession(Months[k[1]]+" "+datesplit[0][0])
                setSessionID(session.id);
                const jour=new Date().getDate();
                const mois=new Date().getMonth()+1;
                const annee=new Date().getFullYear();
                setDate(jour+' '+Months[mois]+' '+annee)
            }
            else{
              setSession("Aucune Session active")
            }
        })  
        .catch((error)=>{
            console.log(error);
        }) 
        await axios.get(user.URL+"/api/members/")
        .then(async (response) =>{
          setMemberTab(response.data);
          console.log(memberTab);
          
        })
        await axios.get(user.URL+"/api/configs/")
        .then((response)=>{
          const Configs=response.data          
          const element=Configs.find((config)=>config.id==1)
          setAmount(element.monthly_contribution_per_member)
        })
    }

    getSession();
    
  },[])

  const handleAddContrib=async()=>{
    await axios.post(user.URL+"/api/obligatory_contributions/",{
      "contributed":amount,
      "member_id":SelectedMember,
      "administrator_id":user.ID,
      "session_id":sesssionID
    })
    .then((response)=>{
      console.log(response.status);  
      if (response.status==201) {
        setMessage("Enregistrer avec succès")
      }else{
        setMessage("Erreur d'enregistrement!")
      }
    })
    .catch((error)=>{
      console.log(error);
      
    })
  }

  const handleCancel=()=>{
    setAmount("");
    setMessage("")
    setSelectedMember("")
  }


  return (
    <View style={styles.exercice}>
      <View style={styles.exercicetitle}>
        <Text style={styles.exercicetitleText}>AJOUTER CONTRIBUTION</Text>
      </View>
      <View style={styles.exerciceContent1}>
        <Text style={styles.exerciceContentText}>Date: {new Date().toLocaleDateString()}</Text>
      </View>
      <View style={styles.exerciceContent2}>
        <View style={styles.membres}> 
            <Text style={styles.exerciceContentText1}>Membre</Text>
            <SelectDropdown
                data={memberTab}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  setSelectedMember(selectedItem.id)
                  console.log("slectedMap"+selectedItem.id);
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      {selectedItem && (
                        <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                      )}
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && selectedItem.username) || 'Faire Votre Choix'}
                      </Text>
                      <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  
                  
                  return (
                    <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                      <Text style={styles.dropdownItemTxtStyle}>{item.username}</Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
            />     
        </View>
        <View style={styles.membres}>
          <Text style={styles.exerciceContentText1}></Text>
          <View 
           style={styles.input}
           />
        </View>
        <View style={styles.membres}>
          <Text style={styles.exerciceContentText1}>Session de :</Text>
          <Text style={styles.exerciceContentText3}>{sesssion}</Text>
        </View>
        <Text style={styles.exerciceContentText}>{Message}</Text>
        <View style={styles.Orderbouton}>
          <View>
              <Pressable  style={styles.addButton} onPress={handleCancel}>
              <Link href="/Contribution" asChild>
                <Text style={styles.addButtonText }>ANNULER</Text>
              </Link>
              </Pressable>
          </View>
          <View>
              <Pressable  style={styles.addButton1} onPress={handleAddContrib}>
                    <Text style={styles.addButtonText }>VALIDER</Text>
              </Pressable>
          </View>
        </View>
      </View>
          
    </View> 
  )
}

export default ContributionCard

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  }
  ,
  exercice: {
    marginTop: 70,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    
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
    color: '#FF7D00'
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
    height:300,
    borderRadius: 0,
    paddingTop: 5,
  },
  exerciceContentText: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  exerciceContentText1: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    
  },
  exerciceContentText3: {
    color: '#bdbdbd',
    fontSize: 16,
    fontStyle:"italic"
    
  },
  exerciceContentText2: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    
  },
  membres:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:"center",
    width: '100%',
    paddingHorizontal: 20,
    marginTop:"5%",
  },
  montant:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop :10
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
  addButton:{
    backgroundColor:'red',
    padding: 10,
    borderRadius:5,
    marginRight:"45%",
    width:"100%"
  },
  addButton1:{
    backgroundColor:'#4CAF50',
    padding: 10,
    borderRadius:5,
    marginLeft:"45%",
    width:"100%"
  },
  addButtonText:{
    color:'white',
    fontWeight:'bold',
  },

  Orderbouton:{
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
    paddingHorizontal: 5,
    margin:"7%",
    height: 5,
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:"23%",
    borderRadius: 6,
    width: 200,
    textAlign: 'center',
    fontSize: 20,
    color:"grey",
  },
  
});