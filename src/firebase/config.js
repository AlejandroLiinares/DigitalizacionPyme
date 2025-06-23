// Configuración de Firebase para la aplicación React
// Este archivo proporciona acceso a los servicios de Firebase, especialmente Firestore

// Accedemos a la instancia de Firebase ya inicializada en index.html
const firebaseApp = window.firebase;
const db = firebaseApp.firestore();

// Exportamos la instancia de Firestore para usarla en los componentes
export { db };

// Función de utilidad para agregar un documento a una colección
export const addDocument = async (collection, data) => {
  try {
    const docRef = await db.collection(collection).add({
      ...data,
      createdAt: firebaseApp.firestore.FieldValue.serverTimestamp()
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Error al agregar documento:", error);
    throw error;
  }
};

// Función de utilidad para obtener documentos de una colección
export const getDocuments = async (collection) => {
  try {
    const snapshot = await db.collection(collection).get();
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
export const updateDocument = async (collection, id, data) => {
  try {
    await db.collection(collection).doc(id).update({
      ...data,
      updatedAt: firebaseApp.firestore.FieldValue.serverTimestamp()
    });
    return { id, ...data };
  } catch (error) {
    console.error("Error al actualizar documento:", error);
    throw error;
  }
};

// Función de utilidad para eliminar un documento
export const deleteDocument = async (collection, id) => {
  try {
    await db.collection(collection).doc(id).delete();
    return id;
  } catch (error) {
    console.error("Error al eliminar documento:", error);
    throw error;
  }
};
