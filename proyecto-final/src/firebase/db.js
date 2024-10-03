import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

export const getProducts = async (setItems, category) => {
  const productsCollection = collection(db, "products");
  let querySnapshot;
  try {
    if (category) {
      const q = query(productsCollection, where("category", "==", category));
      querySnapshot = await getDocs(q);
    } else {
      querySnapshot = await getDocs(productsCollection);
    }
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    setItems(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const getSingleProduct = async (id, setDetail) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    setDetail(docSnap.data());
  } else {
    console.log("No such document!");
  }
};

export const createOrder = async (order) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), order);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }  
};
