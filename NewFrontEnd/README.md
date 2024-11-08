# Bienvenue dans votre application Expo 👋

Ceci est un projet [Expo](https://expo.dev) créé avec [create-expo-app](https://www.npmjs.com/package/create-expo-app).

## Pour commencer

1. Installez les dépendances :

   ```bash
   npm install
   ```

2. Démarrez l'application :

   ```bash
   npx expo start
   ```

Une fois le projet démarré, vous verrez différentes options pour ouvrir l'application dans :

- une [build de développement](https://docs.expo.dev/develop/development-builds/introduction/)
- un [émulateur Android](https://docs.expo.dev/workflow/android-studio-emulator/)
- un [simulateur iOS](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), une application qui permet de tester des projets Expo sur votre appareil mobile.

### **Lancer l'application sur un émulateur ou via Expo Go**

Si vous utilisez **Expo Go**, téléchargez l'application depuis le [Play Store](https://play.google.com) ou l'[App Store](https://www.apple.com/app-store/). Scannez le QR code affiché dans le terminal avec Expo Go pour charger l'application sur votre téléphone.

Si vous préférez utiliser un **émulateur** :

- Pour Android : Assurez-vous que [Android Studio](https://developer.android.com/studio) est installé et configurez un appareil virtuel.
- Pour iOS : Utilisez le simulateur intégré à Xcode.

## Initialiser un nouveau projet

Quand vous êtes prêt, lancez :

```bash
npm run reset-project
```

Cette commande déplace le code de démarrage dans le répertoire **app-example** et crée un répertoire vierge **app** où vous pouvez commencer à développer votre propre application.

## À propos du fichier `fox.py`

Le fichier `fox.py` (anciennement `update_ip`) est un script Python essentiel au projet. Il est utilisé pour mettre à jour dynamiquement l'adresse IP de l'application, permettant ainsi un bon fonctionnement lors des tests sur différents appareils en réseau. Ce script est important car il garantit que votre application communique efficacement avec le serveur Django.

```bash
python fox.py
```

> **Note** : Assurez-vous que le serveur Django est en cours d'exécution avec la commande suivante avant de lancer Expo :

```bash
python manage.py runserver 0.0.0.0:8000
```

Cela permet à Expo et aux autres appareils sur le même réseau d'accéder à votre application.

## Pour en savoir plus

Explorez la documentation d'Expo et d'autres ressources pour en apprendre davantage sur le développement d'applications universelles :

- [Documentation Expo](https://docs.expo.dev/): Consultez les bases ou plongez dans les sujets avancés avec des [guides](https://docs.expo.dev/guides).
- [Tutoriel Expo](https://docs.expo.dev/tutorial/introduction/): Suivez un tutoriel pas-à-pas pour créer un projet fonctionnant sur Android, iOS et le web.

## Rejoindre la communauté

Rejoignez notre communauté de développeurs créant des applications universelles.

- [Expo sur GitHub](https://github.com/expo/expo) : Découvrez notre plateforme open-source et contribuez.
- [Communauté Discord](https://chat.expo.dev) : Discutez avec des utilisateurs d'Expo et posez vos questions.

---

> **Fun fact** : Pourquoi le script s’appelle-t-il `fox.py` ? Parce qu’il est aussi rusé qu’un renard pour vous aider dans vos déploiements réseau ! 🦊