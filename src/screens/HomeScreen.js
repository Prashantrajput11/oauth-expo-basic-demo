import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
// 1. Import the modular functions, including getFirestore
import {
	collection,
	getDocs,
	query,
	getFirestore,
} from "@react-native-firebase/firestore";

// It's good practice to get the instance once
const db = getFirestore();

const HomeScreen = ({ navigation }) => {
	const [todos, setTodos] = React.useState([]);
	const fetchTodos = async () => {
		try {
			const todosCollectionRef = query(collection(db, "todos"));
			const querySnapshot = await getDocs(todosCollectionRef);

			const todosData = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			console.log("todos -->", todosData);
			setTodos(todosData);
		} catch (error) {
			console.error("Error fetching todos:", error);
		}
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	return (
		<View>
			<Text>Home hello Screen</Text>
			<Pressable onPress={() => navigation.navigate("Create")}>
				<Text>Create Todo</Text>

				{todos.map((todo) => {
					return <Text>{todo.title}</Text>;
				})}
			</Pressable>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
