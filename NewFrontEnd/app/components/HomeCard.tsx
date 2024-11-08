import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Pressable, Modal, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useUser } from '../(tabs)/UserContext';
import axios from 'axios';
import {CLOSED_SESSION,SESSIONS_} from "@/utils/URL";

const HomeCard = ({ session, date, active}) => {
  let identify;
  const { user } = useUser();
  if (user.status === "member") {
    identify = false;
  } else {
    identify = true;
  }
  const [ClosePressed,setClosePressed] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCreateSession = async () => {
    const exerciseId = 1;
    const administratorId = user.ID || 1;

    const sessionData = {
      exercise_id: exerciseId,
      date: selectedDate.toISOString().slice(0, 10),
      administrator_id: administratorId,
    };

    try {
      const response = await axios.post(SESSIONS_, sessionData);

      if (response.status === 201) {
        console.log('Session créée avec succès !');
        //setActive(true);
        //setSession(exerciseId);
        //setDate(selectedDate.toISOString().slice(0, 10));
        setShowDatePicker(false);
      } else {
        console.error('Erreur lors de la création de la session');
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };
  const CloseSession = () => {
    axios.get(CLOSED_SESSION).then((response) => {
      if (response.data.session_state === "off"){
        setClosePressed(true);
      }
    }).catch((error) => console.log(error));
  }
  useEffect(() => {
    //setClosePressed(true);
    console.log(ClosePressed)
  },[ClosePressed])

  return (
    <View style={styles.exercice}>
      <View style={styles.exercicetitle}>
        <Text style={styles.exercicetitleText}>EXERCICE DE L'ANNEE 2024</Text>
      </View>
      {active  ? (
        <View style={styles.exerciceContent}>
          <Text style={styles.exerciceContentText}>SESSION DE {session}</Text>
          <Text style={styles.exerciceContentText}>Date:  {date}</Text>
          {identify ? (
            <Pressable style={styles.exerciceContentButton} onPress={CloseSession}>
              <Text style={styles.exerciceContentButtonText}>FERMER LA SESSION EN COURS</Text>
            </Pressable>
          ) : (
            <View></View>
          )}
        </View>
      ) : (
        <View style={styles.exerciceContent}>
          <Text style={styles.exerciceContentText}>Pas de session active </Text>
          {identify ? (
            <>
              <Pressable style={styles.exerciceContentButtonCreate} onPress={() => setShowDatePicker(true)}>
                <Text style={styles.exerciceContentButtonText}>CREER UN SESSION</Text>
              </Pressable>
              <Modal
                animationType="slide"
                transparent={true}
                visible={showDatePicker}
                onRequestClose={() => setShowDatePicker(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={handleDateChange}
                    />
                    <View style={styles.datePickerButtons}>
                      <Button title="Valider" onPress={handleCreateSession} />
                      <Button title="Annuler" onPress={() => setShowDatePicker(false)} />
                    </View>
                  </View>
                </View>
              </Modal>
            </>
          ) : (
            <View></View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  exercice: {
    marginTop: 50,
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
    height: 60,
    borderRadius: 8,
  },
  exercicetitleText: {
    color: '#FF7D00'
  },
  exerciceContent: {
    width: 350,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    borderRadius: 8,
  },
  exerciceContentText: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 20,
    color: "grey",
  },
  exerciceContentButton: {
    marginTop: 20,
    backgroundColor: '#F92E2E',
    width: 270,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 6,
    elevation: 4,
  },
  exerciceContentButtonMember: {
    marginTop: 20,
    backgroundColor: 'grey',
    width: 270,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 6,
    elevation: 4,
  },
  exerciceContentButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  exerciceContentButtonCreate: {
    marginTop: 20,
    backgroundColor: 'green',
    width: 270,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 6,
    elevation: 4,
  },
  exerciceContentButtonCreateMember: {
    marginTop: 20,
    backgroundColor: 'grey',
    width: 270,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 6,
    elevation: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 350,
  },
  datePickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default HomeCard;