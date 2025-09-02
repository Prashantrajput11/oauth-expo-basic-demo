import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import CreateScreen from "../screens/CreateScreen";

// Create the Stack navigator
const Stack = createNativeStackNavigator();

const MainStack = () => {
	const handleSignOut = async () => {
		try {
			await GoogleSignin.signOut();
			await auth().signOut();
		} catch (error) {
			console.error("SignOut Error: ", error);
		}
	};

	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={({ navigation }) => ({
					headerRight: () => (
						<Button
							title="Profile"
							onPress={() => navigation.navigate("Profile")}
						/>
					),
				})}
			/>
			<Stack.Screen
				name="Create"
				component={CreateScreen}
				options={{
					headerRight: () => (
						<Button title="Sign Out" onPress={handleSignOut} color="red" />
					),
				}}
			/>
			<Stack.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					headerRight: () => (
						<Button title="Sign Out" onPress={handleSignOut} color="red" />
					),
				}}
			/>
		</Stack.Navigator>
	);
};

export default MainStack;
