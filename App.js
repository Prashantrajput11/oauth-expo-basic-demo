import React, { useState } from "react"; // 1. Import useState
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View, Image, Button } from "react-native";
// 2. Import GoogleSignin and statusCodes
import {
	GoogleSignin,
	statusCodes,
} from "@react-native-google-signin/google-signin";

export default function App() {
	// 3. Initialize state correctly
	const [userInfo, setUserInfo] = useState(null);

	// steps you need to do
	GoogleSignin.configure({
		webClientId: "USE_YOUR_OWN_WEBCLIENT_ID_HERE",

		offlineAccess: true,
	});

	const signIn = async () => {
		console.log("pressed");

		try {
			await GoogleSignin.hasPlayServices();
			// 4. The response object has the user info directly
			const response = await GoogleSignin.signIn();
			// 5. Use setUserInfo to update the state
			setUserInfo(response.data);
			console.log("SIGN IN SUCCESSFUL", response.data);
		} catch (error) {
			// 6. Use the imported statusCodes
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				console.log("User cancelled the login flow");
			} else if (error.code === statusCodes.IN_PROGRESS) {
				console.log("Sign in is in progress already");
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				console.log("Play services not available or outdated");
			} else {
				console.error("Some other error happened", error);
			}
		}
	};

	const signOut = async () => {
		try {
			await GoogleSignin.signOut();
			setUserInfo(null); // Clear user info
		} catch (error) {
			console.error("SignOut Error: ", error);
		}
	};

	return (
		<View style={styles.container}>
			{userInfo ? (
				// Show user info and a sign out button if signed in
				<View style={styles.container}>
					<Text style={styles.welcomeText}>Welcome!</Text>
					{userInfo.photo && (
						<Image source={{ uri: userInfo.photo }} style={styles.profilePic} />
					)}
					<Text>{userInfo.name}</Text>
					<Text>{userInfo.email}</Text>
					<View style={{ marginTop: 20 }}>
						<Button title="Sign Out" onPress={signOut} color="red" />
					</View>
				</View>
			) : (
				// Show the sign in button if not signed in
				<Pressable onPress={signIn} style={styles.button}>
					<Text style={styles.text}>Sign in with Google</Text>
				</Pressable>
			)}
			<StatusBar style="auto" />
		</View>
	);
}

// Add these to your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		backgroundColor: "tomato",
		padding: 16,
		borderRadius: 8,
	},
	text: {
		color: "white",
		fontWeight: "bold",
	},
	welcomeText: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	profilePic: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 10,
	},
});
