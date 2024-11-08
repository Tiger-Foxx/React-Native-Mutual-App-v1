import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, TouchableWithoutFeedback } from 'react-native';
import HomeCard from "../components/HomeCard";
import TreasureCard from "../components/TreasureCard";
import Header from '../components/Header';
import NavbarAdmin from '../components/NavbarAdmin';
import { useUser } from '../(tabs)/UserContext';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { TRESOR, FONDSOCIAL } from '../../utils/URL';

const Home = () => {
  const [isActive1, setActive1] = useState(true);
  const [isActive2, setActive2] = useState(false);
  const [isActive3, setActive3] = useState(false);
  const [tresor, setTresor] = useState(0);
  const [fondSocial, setFondSocial] = useState(0);

  // SIDEBAR
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const handleToggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  const handleClickOutsideSidebar = () => {
    if (isSidebarVisible) {
      setSidebarVisible(false);
    }
  };
  // SIDEBAR

  const toggleStyle1 = [styles.toggle, isActive1 ? styles.activeToggle : null];
  const toggleStyle2 = [styles.toggle, isActive2 ? styles.activeToggle : null];
  const toggleStyle3 = [styles.toggle, isActive3 ? styles.activeToggle : null];

  const handleActive = (x: number) => {
    setActive1(x === 1);
    setActive2(x === 2);
    setActive3(x === 3);
  };

  const { user } = useUser();
  const Months = [
    "JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI", "JUIN",
    "JUILLET", "AOUT", "SEPTEMBRE", "OCTOBRE", "NOVEMBRE", "DECEMBRE"
  ];

  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [active, setActive] = useState(false);

  const getSessionActivate = async () => {
    try {
      const res = await axios.get(TRESOR);
      console.log(res.data);
      if (res.data.session_state === "active") {
        setActive(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTresorerie = async () => {
    try {
      const res = await axios.get(TRESOR);
      console.log(res.data);
      setTresor(res.data.tresorerie);
    } catch (error) {
      console.log(error);
    }
  };

  const getFondSocial = async () => {
    try {
      const res = await axios.get(FONDSOCIAL);
      console.log(res.data);
      setFondSocial(res.data.fond_social);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getSession = async () => {
      try {
        console.log(user.URL);
        const response = await axios.get(user.URL + "/api/sessions_/");
        const Sessions = response.data;
        console.log(Sessions);

        const session = Sessions.find(session => session.active === 1);
        if (session) {
          setActive(true);
          const dateSplit = session.create_at.split("-");
          const day = dateSplit[2].split("T")[0];
          const monthIndex = parseInt(dateSplit[1], 10) - 1;
          const monthName = Months[monthIndex];

          setDate(`${day} ${monthName} ${dateSplit[0]}`);
          setMonth(monthName);
        } else {
          setActive(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSession();
    getSessionActivate();
  }, [user]);

  return (
    <TouchableWithoutFeedback onPress={handleClickOutsideSidebar} accessible={false}>
      <View style={styles.container}>
        <Header title='ACCUEIL' toggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarVisible} />
        <View style={styles.tabs}>
          <Pressable style={toggleStyle1} onPress={() => handleActive(1)}>
		<Text style={styles.toggleText}>EN COURS</Text>
                </Pressable>
                <Pressable style={toggleStyle2} onPress={() => {
                    handleActive(2);
                    getTresorerie();
                }}>
                    <Text style={styles.toggleText}>TRESORERIE</Text>
                </Pressable>
                <Pressable style={toggleStyle3} onPress={() => {
                    handleActive(3);
                    getFondSocial();
                }}>
                    <Text style={styles.toggleText}>FOND SOCIAL</Text>
                </Pressable>
            </View>
            <View style={styles.cards}>
                {isActive1 && (
                    <HomeCard session={month} date={date} active={active} />
                )}
                {isActive2 && (
                    <TreasureCard
                        type="TRESORERIE"
                        price={tresor}
                        session={month}
                        date={date}
                        Active={active}
                    />
                )}
                {isActive3 && (
                    <TreasureCard
                        type="FOND SOCIAL"
                        price={fondSocial}
                        session={month}
                        date={date}
                        Active={active}
                    />
                )}
            </View>
            {user.status === "admin" ? (
                <Navbar />
            ) : (
                <NavbarAdmin />
            )}
        </View>
    </TouchableWithoutFeedback>
  );
};


export default Home;

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
    tabs:{
        position:'absolute',
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        top:"20%",
        right:0, 
    },
    toggle:{
        margin:10,
        width:110,
        height:40,
        backgroundColor:'#F6F6F6',
        borderRadius:15,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    activetoggle:{
        backgroundColor:'#FF7D00'
    },
    toggleText:{
        fontSize:13,
    },
    cards:{
        position:'absolute',
        top:"30%",
    }

})