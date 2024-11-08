import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import ExerciceCard from '../components/ExerciceCard';
import Header from '../components/Header';
import axios from "axios";
import BASE_URL from '@/constants/URL';
import Navbar from '../components/Navbar';
import NavbarAdmin from '../components/NavbarAdmin';
import { useUser } from '../(tabs)/UserContext';

const Exercices = () => {
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
  const {user}=useUser();

  // Définition des endpoints
  const BORROWINGS = BASE_URL + "borrowings/";
  const SAVINGS = BASE_URL + "savings/";
  const REFUNDS = BASE_URL + "refunds/";
  const EXERCISES = BASE_URL + "exercises/";

  // Interface pour les données de l'exercice
  interface Exercise {
    year: number;
    active: boolean;
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

  // State pour stocker les données des exercices
  const [exercisesData, setExercisesData] = useState<
    {
      year: number;
      totalBorrowings: number;
      totalSavings: number;
      totalRefunds: number;
    }[]
  >([]);

  // Fonction pour récupérer les données d'un exercice
  const getExerciseData = async (exerciseId: number) => {
    try {
      // Récupérer les emprunts de l'exercice
      const borrowingsResponse = await axios.get<Borrowing[]>(
       `${BORROWINGS}?exercise_id=${exerciseId}`
      );
      const borrowings = borrowingsResponse.data || []; // Retourne un tableau vide si aucune donnée

      // Récupérer les épargnes de l'exercice
      const savingsResponse = await axios.get<Saving[]>(
        `${SAVINGS}?exercise_id=${exerciseId}`
      );
      const savings = savingsResponse.data || []; // Retourne un tableau vide si aucune donnée

      // Récupérer les remboursements de l'exercice
      const refundsResponse = await axios.get<Refund[]>(
        `${REFUNDS}?exercise_id=${exerciseId}`
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
      setExercisesData((prevExercisesData) => [
        ...prevExercisesData,
        {
          year: exerciseId,
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
  const fetchExercises = async () => {
    try {
      // Récupérer les données des exercices depuis l'API
      const exercisesResponse = await axios.get<Exercise[]>(EXERCISES);
      const exercises = exercisesResponse.data || [];

      // Appeler getExerciseData pour chaque exercice
      for (const exercise of exercises) {
        await getExerciseData(exercise.year);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données des exercices:", error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handleClickOutsideSidebar} accessible={false}>
      <View style={styles.container}>
        <Header title="EXERCICES" toggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarVisible} />
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>ANNEE EXERCICE</Text>
          <Text style={styles.tableHeaderText}>Emprunts</Text>
          <Text style={styles.tableHeaderText}>Epargnes</Text>
          <Text style={styles.tableHeaderText}>Remboursement</Text>
        </View>
        <ScrollView style={styles.scrollViewContent}>
        <View style={styles.cardContainer}>
          {exercisesData.map((exercice, index) => (
            <ExerciceCard
              key={index}
              date={exercice.year.toString()} // Convertir l'année en string
              emprunts={exercice.totalBorrowings.toString()} // Convertir en string
              epargnes={exercice.totalSavings.toString()} // Convertir en string
              remboursement={exercice.totalRefunds.toString()} // Convertir en string
            />
          ))}
        </View>
        </ScrollView>
        {user.status==="admin"?(
                <Navbar/>
            ):(
                <NavbarAdmin/>
            )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 80,
    // Add some spacing for the header
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: "10%",
    width: '100%',
    display: "flex",
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 10,
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

export default Exercices;