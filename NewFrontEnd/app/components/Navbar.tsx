import { Link } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable,Image } from 'react-native'

const Navbar=()=>{
    return (
        <View style={styles.tabsBottom}>
                <Link href='/Admin/HomeAdmin' asChild>
                    <Pressable style={styles.tab} onPress={()=>{}}>
                        <View style={styles.tabContent}>
                            <Image
                                source={require('../../assets/images/homeN.png')}
                                style={styles.tabImage}
                            />
                            <Text style={styles.tabText}>Accueil</Text>
                        </View>
                    </Pressable>
                </Link>
                <Link href='/Contribution' asChild>
                    <Pressable style={styles.tab} onPress={(style)=>{}}>
                        <View style={styles.tabContent}>
                            <Image
                                source={require('../../assets/images/contributionN.png')}
                                style={styles.tabImage}
                            />
                            <Text style={styles.tabText}>Contributions</Text>
                        </View>
                    </Pressable>
                </Link>
                
                <Link href='Admin/EpargneAdmin' asChild>
                    <Pressable style={styles.tab} onPress={()=>{}}>
                        <View style={styles.tabContent}>
                            <Image
                                source={require('../../assets/images/epargneN.png')}
                                style={styles.tabImage}
                            />
                            <Text style={styles.tabText}>Epargne</Text>
                        </View>
                    </Pressable>
                </Link>
                <Link href='Admin/RemboursementAdmin' asChild>
                    <Pressable style={styles.tab}>
                        <View style={styles.tabContent}>
                            <Image
                                source={require('../../assets/images/rembourserN.png')}
                                style={styles.tabImage}
                            />
                            <Text style={styles.tabText}>Remboursement</Text>
                        </View>
                    </Pressable>
                </Link>
                <Link href='Admin/EmpruntAdmin' asChild>
                    <Pressable style={styles.tab} onPress={()=>{}}>
                        <View style={styles.tabContent}>
                            <Image
                                source={require('../../assets/images/emprunt.png')}
                                style={styles.tabImage}
                            />
                            <Text style={styles.tabText}>Emprunts</Text>
                        </View>
                    </Pressable>
                </Link>
                
            </View>
    )
}

export default Navbar;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        alignItems: 'center',
        marginTop: -1
    },
    tabsTop: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 90,
        right: 0,
    },
    tabsBottom: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
    },
    toggle: {
        margin: 10,
        width: 85,
        height: 32,
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activetoggle: {
        backgroundColor: '#FF7D00',
    },
    toggleText: {
        fontSize: 10,
    },
    tabContent: {
        alignItems: 'center',
    },
    cards: {
        position: 'absolute',
        top: 150,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginBottom: 5,
    },
    tabText: {
        fontSize: 9.5,
        fontWeight: 'bold',
        color: '#555555',
    },
});