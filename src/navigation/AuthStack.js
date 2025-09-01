import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";

// Import your screen components

// Create the Stack navigator
const Stack = createNativeStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={LoginScreen} />
			{/* You could add a Signup screen here later if needed */}
			{/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
		</Stack.Navigator>
	);
};

export default AuthStack;
