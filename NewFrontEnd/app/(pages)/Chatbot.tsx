import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, Pressable, SafeAreaView } from 'react-native';
import axios from 'axios';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import SERVER_BASE_URL from '@/config/config';

const Chatbot = () => {
  //recupération des réponses
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [icon, seticon] = useState(true);
  const [icon2, seticon2] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleFormSubmit = async (question) => {
    console.log(question);
    
    try {
      const res = await axios.get(`${SERVER_BASE_URL}/api/chatbot/`, {
        params: { question }
      });
      setResponse(res.data.response);
      console.log(res.data.response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleItemPress = (index) => {
    const selectedQuestion = Questions[index].Q;
    setQuestion(selectedQuestion);
    setExpandedIndex(index);
  };

  useEffect(() => {
    if (question) {
      handleFormSubmit(question);
    }
  }, [question]);

  const Questions = [
    { Q:"Qu'est-ce que la trésorerie ?" },
    { Q: "Qu'est-ce que le fond social ?" },
    { Q: "Quelle est la différence entre un exercice et une session ?" },
    { Q: "Comment fonctionne l'inscription à la mutuelle ?" },
    { Q: "Quelles sont les types de contributions ?" },
    { Q: "Comment fonctionnent les aides dans la mutuelle ?" },
    { Q: "Comment les emprunts fonctionnent-ils dans la mutuelle ?" },
    { Q: "Comment fonctionne l'épargne dans la mutuelle ?" },
    { Q: "Comment se fait le remboursement des emprunts ?" },
    { Q: "Quel est le rôle de l'administrateur principal ?" },
    { Q: "Quel est le rôle du responsable des opérations ?" },
    { Q: "Quels sont les privilèges d'un membre ?" }
  ];

  useEffect(() => {
    handleFormSubmit
  }, [TouchableOpacity]);

  //SIDEBAR
  const [isSiderbarVisible, setSiderbarVisible] = useState(false)
  const handleToggleSidebar = () => {
    setSiderbarVisible(!isSiderbarVisible);
  }
  const handleClickOutsideSidebar = () => {
    if (isSiderbarVisible) {
      setSiderbarVisible(false);
    }
  };
  //SIDEBAR

  return (
    <TouchableWithoutFeedback onPress={handleClickOutsideSidebar} accessible={false}>
          <View style={styles.container}>
          <Header title="Assistant Virtuel" toggleSidebar={handleToggleSidebar} isSidebarOpen={isSiderbarVisible} />
          <View style={styles.title}>
            <Text style={styles.text}>Bienvenue dans l'Assistant Virtuel !</Text>
            <Text style={styles.text2}>Comment puis-je vous aidez?</Text>
            <Text style={styles.text3}>Top Questions</Text>
          </View>
          <ScrollView style={styles.scrollview}>
          <View style={styles.content}>
          <View>
            
            {Questions.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.rubrique}
                  onPress={() => handleItemPress(index)}
                >
                  <View style={styles.questionContainer}>
                    <Text style={styles.question}>{item.Q}</Text>
                    {icon && (    
                    <FontAwesome name="plus" size={24} color="black" style={styles.icons} />
                  )}
                  {icon2 && (    
                    <Entypo name="minus" size={24} color="black" />
                  )}
                    
                  </View>
                  {expandedIndex === index && (
                    <View>
                      <Text style={styles.response}>{response}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            ))}

          </View>
          <Link href="/ChatbatRasa" asChild>
            <Pressable style={styles.chatbatView}>
              <View >
                <Text style={styles.chatbat}>Posez Votre Question</Text>
              </View>
            </Pressable>
          </Link>
          </View>
          </ScrollView>
        </View>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor:'#FFFFFF',
    width:'100%',
    flex:1,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:-1
  },
  content: {
    display:"flex",
    alignItems:"center",
    flexDirection:"column",
    justifyContent:"center",
    paddingVertical: 12,
  },
  rubrique: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '95%',
    marginTop: "5%",
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius:10,
    borderColor: '#c5c5c5',
  },
  chatbat: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize:15,
    fontWeight:"bold",

  },
  chatbatView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    borderRadius: 10,
    marginTop: "5%",
    marginBottom: "5%",
    height:"5%",
    backgroundColor: '#FF7D00',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight:"bold",
  },
  text2: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom:"15%",
  },
  text3: {
    fontSize: 18,
    marginBottom:"10%",
    fontWeight:"bold",
  },
  title:{
    display:"flex",
    flexDirection:"column",
    marginTop:"30%",
  },
  response:{
    color:"#7e3d00",
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:"5%",
  },
  icons:{
    transform:[{scale:0.5}]
  },
  scrollview:{
  },
  questionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 2,
    width:"100%",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  question: {
    fontSize: 15,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
  },
});

export default Chatbot;