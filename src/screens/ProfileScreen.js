import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "../context/AuthContext";

const ProfileScreen = () => {
	const { user } = useAuth();
	return (
		<View>
			<Text>Hello - {user.displayName}</Text>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({});
