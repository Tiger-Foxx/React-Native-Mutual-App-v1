// SessionCard.js
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ExerciceCard = ({ date, emprunts, epargnes, remboursement }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <Text style={styles.cardText}>{date}</Text>
        <Text style={styles.cardText}>{emprunts}</Text>
        <Text style={styles.cardText}>{epargnes}</Text>
        <Text style={styles.cardText}>{remboursement}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  cardText: {
    flex: 1,
    fontSize: 11,
    textAlign: 'center',
  },
});

export default ExerciceCard;