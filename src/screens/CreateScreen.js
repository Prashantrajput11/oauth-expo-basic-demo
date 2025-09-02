import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { collection, addDoc, getFirestore } from "firebase/firestore";
const db = getFirestore();
const CreateScreen = ({ navigation }) => {
	const { user } = useAuth();
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false); // Add a loading state for better UX

	const handleAddTodo = async () => {
		// Basic validation
		if (input.trim() === "" || !user) {
			Alert.alert(
				"Error",
				"Please enter a to-do and make sure you are logged in."
			);
			return;
		}

		setLoading(true);
		try {
			// 2. Create a complete to-do object
			const newTodo = {
				text: input.trim(),
				completed: false,
				userId: user.uid, // 3. **CRITICAL**: Add the user's ID
				createdAt: new Date(),
			};

			// Add the document to the 'todos' collection
			const docRef = await addDoc(collection(db, "todos"), newTodo);
			console.log("Document written with ID: ", docRef.id);

			setInput(""); // Clear input on success
			navigation.goBack(); // Navigate back to the previous screen on success
		} catch (e) {
			console.error("Error adding document: ", e);
			Alert.alert("Error", "Could not add your to-do. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>What do you need to do?</Text>
			<TextInput
				style={styles.input}
				value={input}
				onChangeText={setInput}
				placeholder="e.g., Learn Firebase"
			/>
			{/* Disable the button while loading */}
			<Button
				title={loading ? "Adding..." : "Add Todo"}
				onPress={handleAddTodo}
				disabled={loading}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	label: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 15,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 15,
		marginBottom: 20,
		fontSize: 16,
	},
});

export default CreateScreen;
