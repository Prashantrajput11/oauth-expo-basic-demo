import React from "react";

import AuthStack from "./AuthStack";

import MainStack from "./MainStack";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../context/AuthContext";

const AppNavigator = () => {
	const { user, isLoading } = useAuth();

	if (isLoading) {
		// You can return a splash screen or a loading indicator here
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator />
			</View>
		);
	}

	return user ? <MainStack /> : <AuthStack />;
};

export default AppNavigator;
