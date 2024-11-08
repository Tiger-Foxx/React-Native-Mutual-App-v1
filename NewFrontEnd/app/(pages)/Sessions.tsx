
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import SessionCard from '../components/SessionCard';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import axios from "axios";
import BASE_URL from '@/constants/URL';
import NavbarAdmin from '../components/NavbarAdmin';
import { useUser } from '../(tabs)/UserContext';

const Session = () => {
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

        const {user}=useUser();
      //SIDEBAR
  /*
   const sessions = [
    {
      date: '12-06-2022',
      emprunts: '50000FCFA',
      epargnes: '50000FCFA',
      remboursement: '50000FCFA',
    },
    {
      date: '12-06-2022',
      emprunts: '50000FCFA',
      epargnes: '50000FCFA',
      remboursement: '50000FCFA',
    },
    {
      date: '12-06-2022',
      emprunts: '50000FCFA',
      epargnes: '50000FCFA',
      remboursement: '50000FCFA',
    },
  ];
   */

  // Définition des endpoints
  const BASE_URL = user.URL+"/api/";
  const BORROWINGS = BASE_URL + "borrowings/";
  const SAVINGS = BASE_URL + "savings/";
  const REFUNDS = BASE_URL + "refunds/";
  const SESSIONS = BASE_URL + "sessions_/";

  // Interface pour les données de l'exercice
  interface Sessions {
    state:string;
    exercise_id:number;
    date:string;
    active: boolean;
    id:number;
    administrator_id: number;
  }

  // Interface pour les données des emprunts
  interface Borrowing {
    interest: number | null;
    amount_borrowed: number;
    amount_paid: number;
    amount_to_pay: number;
    payment_date_line: Date | null;
    state: string;
    member_id: number;
    administrator_id: number;
    session_id: number;
    exercise_id: number;
  }

  // Interface pour les données des épargnes
  interface Saving {
    amount: number;
    member_id: number;
    administrator_id: number;
    session_id: number;
    exercise_id: number;
  }

  // Interface pour les données des remboursements
  interface Refund {
    amount: number;
    administrator_id: number;
    member_id: number;
    session_id: number;
    borrowing_id: number;
    exercise_id: number;
  }

  const [sessionsData, setSessionsData] = useState<
    {
      date: string;
      totalBorrowings: number;
      totalSavings: number;
      totalRefunds: number;
    }[]
  >([]);

  const getSessionData = async (sessionId: number,date:string) => {
    try {
      // Récupérer les emprunts de l'exercice
      const borrowingsResponse = await axios.get<Borrowing[]>(
        `${BORROWINGS}?session_id=${sessionId}`
      );
      const borrowings = borrowingsResponse.data || []; // Retourne un tableau vide si aucune donnée

      // Récupérer les épargnes de l'exercice
      const savingsResponse = await axios.get<Saving[]>(
        `${SAVINGS}?session_id=${sessionId}`
      );
      const savings = savingsResponse.data || []; // Retourne un tableau vide si aucune donnée

      // Récupérer les remboursements de l'exercice
      const refundsResponse = await axios.get<Refund[]>(
        `${REFUNDS}?session_id=${sessionId}`
      );
      const refunds = refundsResponse.data || []; // Retourne un tableau vide si aucune donnée

      // Calculer les sommes totales
      let totalBorrowings = 0;
      for (const borrowing of borrowings) {
        totalBorrowings += borrowing.amount_borrowed;
      }

      let totalSavings = 0;
      for (const saving of savings) {
        totalSavings += saving.amount;
      }

      let totalRefunds = 0;
      for (const refund of refunds) {
        totalRefunds += refund.amount;
      }

      // Mettre à jour le state avec les données de l'exercice
      setSessionsData((prevSessionsData) => [
        ...prevSessionsData,
        {
          date: date,
          totalBorrowings,
          totalSavings,
          totalRefunds,
        },
      ]);
    } catch (error) {
      console.error("Erreur lors de la récupération des données de l'exercice:", error);
    }
  };

  // Fonction pour récupérer les données de tous les exercices
  const fetchSessions = async () => {
    try {
      // Récupérer les données des exercices depuis l'API
      const sessionsResponse = await axios.get<Sessions[]>(SESSIONS);
      const sessions = sessionsResponse.data || [];

      // Appeler getExerciseData pour chaque exercice
      for (const session of sessions) {
        await getSessionData(session.id,session.date);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données des exercices:", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);
  return (
    <TouchableWithoutFeedback onPress={handleClickOutsideSidebar} accessible={false}>
      <View style={styles.container}>
        <Header title="SESSIONS" toggleSidebar={handleToggleSidebar} isSidebarOpen={isSiderbarVisible}/>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>DATE SESSION</Text>
          <Text style={styles.tableHeaderText}>EMPRUNTS</Text>
          <Text style={styles.tableHeaderText}>EPARGNES</Text>
          <Text style={styles.tableHeaderText}>REMBOURSEMENTS</Text>
        </View>
        <ScrollView style={styles.scrollViewContent}>
        <View style={styles.cardContainer}>
          {sessionsData.map((session, index) => (
            <SessionCard
              key={index}
              date={session.date.toString().split('T')[0]}
              emprunts={session.totalBorrowings.toString()}
              epargnes={session.totalSavings.toString()}
              remboursement={session.totalRefunds.toString()}
            />
          ))}
        </View>
        </ScrollView>
        {user.status === "admin" ? (
                <Navbar />
            ) : (
                <NavbarAdmin />
            )}
            </View>
        
    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 80, // Add some spacing for the header
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop:"10%",
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollViewContent: {
    height:200,
  },
  cardContainer: {
    marginTop: 16, // Add some spacing between the table header and session cards
    paddingHorizontal: 16,
  },
});

export default Session;