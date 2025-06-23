// Configuración de Firebase para la aplicación React
// Este archivo proporciona acceso a los servicios de Firebase, especialmente Firestore

// Importamos las funciones necesarias de los SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDldkebUj7s2-Ej8sOauImGD837IedrW8s",
  authDomain: "digitalizacionpyme-fae73.firebaseapp.com",
  projectId: "digitalizacionpyme-fae73",
  storageBucket: "digitalizacionpyme-fae73.firebasestorage.app",
  messagingSenderId: "271434112035",
  appId: "1:271434112035:web:76885970c48baa5d226596"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener instancia de Firestore
const db = getFirestore(app);

// Exportamos la instancia de Firestore para usarla en los componentes
export { db };

// Función de utilidad para agregar un documento a una colección
export const addDocument = async (collectionName, data) => {
  try {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, {
      ...data,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Error al agregar documento:", error);
    throw error;
  }
};

// Función de utilidad para obtener documentos de una colección
export const getDocuments = async (collectionName) => {
  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error al obtener documentos:", error);
    throw error;
  }
};

// Función de utilidad para actualizar un documento
export const updateDocument = async (collectionName, id, data) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { id, ...data };
  } catch (error) {
    console.error("Error al actualizar documento:", error);
    throw error;
  }
};

// Función de utilidad para eliminar un documento
export const deleteDocument = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return id;
  } catch (error) {
    console.error("Error al eliminar documento:", error);
    throw error;
  }
};
