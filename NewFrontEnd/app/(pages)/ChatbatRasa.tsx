import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableWithoutFeedback, Pressable } from 'react-native';
import axiosInstance from './axiosInstance';
import Header from '../components/Header';
import { FontAwesome } from '@expo/vector-icons';

const Chatbot = () => {
    const [messages, setMessages] = useState([{ text: "Bonjour, comment puis-je vous aider?", sender: "bot" }]);
    const [input, setInput] = useState("");

    const sendMessage = async (text) => {
        const newMessage = { text, sender: "user" };
        setMessages([...messages, newMessage]); // Ajoute d'abord le message de l'utilisateur

        try {
            const response = await axiosInstance.post('/webhooks/rest/webhook',
                { sender: "user", message: text },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*', // Correspond à l'origine autorisée dans notre serveur Rasa
                    }
                }
            );

            const botMessages = response.data.map((msg) => ({ text: msg.text, sender: "bot" }));
            setMessages((prevMessages) => [...prevMessages, ...botMessages]);
        } catch (error) {
            console.error("Erreur lors de l'envoi du message à Rasa", error);
        }
    };

    const handleSubmit = () => {
        if (input.trim()) {
            sendMessage(input);
            setInput("");
        }
    };
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
            <ScrollView style={styles.chatbotMessages}>
                {messages.map((msg, index) => (
                    <View key={index} style={styles.chatbotMessageContainer}>
                        <Text style={[styles.chatbotMessage, msg.sender === "user" ? styles.userMessage : styles.botMessage]}>
                            {msg.text}
                        </Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.chatbotForm}>
                <TextInput
                    style={styles.chatbotInput}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Tapez votre message..."
                />
                <Pressable onPress={handleSubmit}>
                    <FontAwesome name="send" size={24} color="black" />
                </Pressable>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({

    container:{
        backgroundColor: '#FFFFFF',
        width: '100%',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -1,
    },
    chatbotMessages:{
        marginTop: "35%",
    },
    chatbotForm:{

        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        backgroundColor:"#c5c5c5",
        width: '95%',
        height:"8%",
        margin:"5%",
        padding:"2%",
        paddingLeft:"5%",
        paddingRight:"5%",
        paddingTop:"2%",
        paddingBottom:"2%",
        borderRadius:20,
    },
    chatbotInput:{
        backgroundColor: '#c5c5c5',
        
    },

});

export default Chatbot;