import React from 'react'
import { StyleSheet, View, Text, Image, Pressable, TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddRemboursementCardAdm = () => {

  const emojisWithIcons = [
    {title: 'happy', icon: 'emoticon-happy-outline'},
    {title: 'cool', icon: 'emoticon-cool-outline'},
    {title: 'lol', icon: 'emoticon-lol-outline'},
    {title: 'sad', icon: 'emoticon-sad-outline'},
    {title: 'cry', icon: 'emoticon-cry-outline'},
    {title: 'angry', icon: 'emoticon-angry-outline'},
    {title: 'confused', icon: 'emoticon-confused-outline'},
    {title: 'excited', icon: 'emoticon-excited-outline'},
    {title: 'kiss', icon: 'emoticon-kiss-outline'},
    {title: 'devil', icon: 'emoticon-devil-outline'},
    {title: 'dead', icon: 'emoticon-dead-outline'},
    {title: 'wink', icon: 'emoticon-wink-outline'},
    {title: 'sick', icon: 'emoticon-sick-outline'},
    {title: 'frown', icon: 'emoticon-frown-outline'},
  ]; 

//http://127.0.0.1:8000/api/users/

  return (
    <View style={styles.exercice}>
      <View style={styles.exercicetitle}>
        <Text style={styles.exercicetitleText}>AJOUTER REMBOURSEMENT</Text>
      </View>
      <View style={styles.exerciceContent1}>
        <Text style={styles.exerciceContentText}>Date: 05 JUILLET 2024</Text>
      </View>
      <View style={styles.exerciceContent2}>
        <View style={styles.membres}> 
            <Text style={styles.exerciceContentText1}>Membre</Text>
            <SelectDropdown
    data={[]}
    onSelect={(selectedItem, index) => {
      console.log(selectedItem, index);
    }}
    renderButton={(selectedItem, isOpened) => {
      return (
        <View style={styles.dropdownButtonStyle}>
          {selectedItem && (
            <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
          )}
          <Text style={styles.dropdownButtonTxtStyle}>
            {(selectedItem && selectedItem.title) || 'Faire Votre Choix'}
          </Text>
          <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
      return (
        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
          <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
          <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
  />
        </View>

        <View style={styles.montant}> 
            <Text style={styles.exerciceContentText1}>Montant</Text>
            <SelectDropdown
    data={emojisWithIcons}
    onSelect={(selectedItem, index) => {
      console.log(selectedItem, index);
    }}
    renderButton={(selectedItem, isOpened) => {
      return (
        <View style={styles.dropdownButtonStyle}>
          {selectedItem && (
            <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
          )}
          <Text style={styles.dropdownButtonTxtStyle}>
            {(selectedItem && selectedItem.title) || 'Faire Votre Choix'}
          </Text>
          <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
      return (
        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
          <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
          <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
  />
        </View>
        <View style={styles.Orderbouton}>
        <View style={styles.bouton1}>
            <Pressable  style={styles.addButton}>
                  <Text style={styles.addButtonText }>ANNULER</Text>
            </Pressable>
        </View>
        <View style={styles.bouton2}>
            <Pressable  style={styles.addButton1}>
                  <Text style={styles.addButtonText }>VALIDER</Text>
            </Pressable>
        </View>
        </View>
          
        </View>
        
        
      </View>

      
    
  )
}

export default AddRemboursementCardAdm


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
    marginTop: 100,
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
    height: 260,
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
  exerciceContentText2: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    
  },
  membres:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
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
    borderRadius:8,
    marginTop:100,

  },
  addButton1:{
    backgroundColor:'#4CAF50',
    padding: 10,
    borderRadius:8,
    marginTop:100,

  },
  addButtonText:{
    color:'white',
    fontWeight:'bold',
  },
  bouton1:{
    flex:1,
    alignItems:'flex-start',
  },
  bouton2:{
    flex:1,
    alignItems:'flex-end',
  
  },
  Orderbouton:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingHorizontal: 5,
    marginTop:"-15%",
    height: 5,
  }
  
});