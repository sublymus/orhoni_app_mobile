import _AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key:string, value:any) => {
  try {
    await _AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting item:', error);
  }
};

const getItem = async (key:string) => {
  try {
    const value = await _AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  }
};

const removeItem = async (key:string) => {
  try {
    await _AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing item:', error);
  }
};

const mergeItem = async (key:string, value:string) => {
  try {
    await _AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error merging item:', error);
  }
};

const clear = async () => {
  try {
    await _AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing _AsyncStorage:', error);
  }
};

const getAllKeys = async () => {
  try {
    return await _AsyncStorage.getAllKeys();
  } catch (error) {
    console.error('Error getting all keys:', error);
    return [];
  }
};

const getAllItems = async () => {
  try {
    const keys = await _AsyncStorage.getAllKeys();
    const items = await _AsyncStorage.multiGet(keys);
    return items.reduce((accumulator, [key, value]) => {
      (accumulator as any)[key] = value && JSON.parse(value);
      return accumulator;
    }, {});
  } catch (error) {
    console.error('Error getting all items:', error);
    return {};
  }
};

export const AsyncStorage = {
    setItem,
    getItem,
    removeItem,
    mergeItem,
    clear,
    getAllItems
}