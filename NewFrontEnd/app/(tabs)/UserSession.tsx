import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveSession = async (sessionData: any) => {
  try {
    await AsyncStorage.setItem('userSession', JSON.stringify(sessionData));
  } catch (error) {
    console.error('Error saving session:', error);
  }
};

export const getSession = async () => {
  try {
    const session = await AsyncStorage.getItem('userSession');
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error('Error retrieving session:', error);
    return null;
  }
};

export const clearSession = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('userSession');
  } catch (e) {
    console.error('Failed to clear session', e);
  }
};