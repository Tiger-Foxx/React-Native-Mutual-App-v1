import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Link } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { clearSession } from '../(tabs)/UserSession';

const tabs = [
    { id: 1, label: 'Accueil', isSelected: true, icon: 'home', linked: '/Home' },
    { id: 2, label: 'Session', isSelected: false, icon: 'calendar', linked: '/Sessions' },
    { id: 3, label: 'Exercice', isSelected: false, icon: 'bar-graph', linked: '/Exercice' },
    { id: 4, label: 'Aide Mutuelle', isSelected: false, icon: 'awareness-ribbon', linked: '/Aide' },
    { id: 5, label: "Type d'aide", isSelected: false, icon: 'clipboard', linked: '/TypeAide' },
    { id: 6, label: 'Dette', isSelected: false, icon: 'credit', linked: '/Dettes' },
    { id: 7, label: 'Configuration', isSelected: false, icon: 'cog', linked: '/Configuration' },
    { id: 8, label: 'Membres', isSelected: false, icon: 'creative-commons-attribution', linked: '/AfficheMembre' },
    { id: 10, label: 'Assistant Virtuel', isSelected: false, icon: 'chat', linked: '/ChatbatRasa' },

];

const handleDisconnect= async()=>{
    await clearSession();
    console.log("session cleared");
}


const SidebarTab = ({ tab, onPress }) => (
    <TouchableOpacity onPress={() => onPress(tab.id)}>
        <Link href={tab.linked}>
            <View style={styles.tabContainer}>
                <Entypo name={tab.icon} color="black" size={30} style={styles.tabIcon} />
                <Text style={styles.tabText}>
                    {tab.label}
                </Text>
            </View>
        </Link>
    </TouchableOpacity>
);

const DiconnectTab = () => (
    <TouchableOpacity onPress={() => handleDisconnect()}>
        <Link href='/Connexion'>
            <View style={styles.tabContainer}>
                <Entypo name='log-out' color="black" size={30} style={styles.tabIcon} />
                <Text style={styles.tabText}>
                    Déconnexion
                </Text>
            </View>
        </Link>
    </TouchableOpacity>
);

const SideBar = ({ visible }) => {
    const [selectedTabId, setSelectedTabId] = useState(1);

    const handleTabPress = (id) => {
        setSelectedTabId(id);
    };

    return (
        <Modal visible={visible} animationType='slide' transparent>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Image style={styles.titleImg} source={require('../../assets/images/logo.png')} />
                    <Text style={styles.titleText}>Mutuelle ENSPY</Text>
                </View>
                <View style={styles.tabsContainer}>
                    {tabs.map((tab) => (
                        <SidebarTab
                            key={tab.id}
                            tab={{ ...tab, isSelected: tab.id === selectedTabId }}
                            onPress={handleTabPress}
                        />
                    ))}
                    <DiconnectTab/>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '50%', // Reduced width
        flex: 1,
        alignItems: 'flex-start', // Align items to the left
        backgroundColor: "white",
    },
    title: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        flexDirection: 'row',
        marginBottom: '10%',
        borderBottomWidth: 1,
        backgroundColor: "white",
    },
    titleImg: {
        width: 45,
        height: 45,
        margin: "1%",
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 18,
        margin: "1%",
        color: '#FF7D00',
    },
    tabsContainer: {
        width: '100%',
        paddingLeft: 10, // Adjust padding to the left
    },
    tabContainer: {
        flexDirection: 'row', // Align icons and text horizontally
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 15,
        width: '100%',
    },
    tabIcon: {
        marginRight: 15,
    },
    tabText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
    },
});

export default SideBar;

