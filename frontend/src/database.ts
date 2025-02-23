import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { db } from "./firebase_config";

export async function getDocumentFromFirestore(userId: string) {
	try {
		const collectionRef = collection(db, "user-symptoms");

		// Create query for userId
		const q = query(collectionRef, where("userId", "==", userId));
		// Create a reference to the document
		const docSnap = await getDocs(q);

		// Check if the document exists
		if (!docSnap.empty) {
			// Return the document data
			return {
				id: docSnap.docs[0].id,
				...docSnap.docs[0].data(),
			};
		} else {
			console.log("No such document exists!");
			return null;
		}
	} catch (error) {
		console.error("Error getting document:", error);
		throw error;
	}
}
