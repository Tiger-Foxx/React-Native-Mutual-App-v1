import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5005', // Assurez-vous que l'URL correspond à votre serveur Rasa
    timeout: 10000, // Temps d'attente en millisecondes
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Autorise toutes les origines (à utiliser avec prudence en production)
    },
});

export default instance;