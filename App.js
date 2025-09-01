import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View, Image, Button } from "react-native";
import {
	GoogleSignin,
	statusCodes,
} from "@react-native-google-signin/google-signin";
// 1. Import Firebase auth
import auth from "@react-native-firebase/auth";

export default function App() {
	const [userInfo, setUserInfo] = useState(null);

	// Configure Google Sign-in

	GoogleSignin.configure({
		webClientId:
			"617136183526-k50ps5ck4i7kbieb1pnbutenegbp73n2.apps.googleusercontent.com",
		offlineAccess: true,
	});

	const signIn = async () => {
		try {
			// Check if your device has Google Play Services
			await GoogleSignin.hasPlayServices();
			// Get the users ID token
			const { idToken } = await GoogleSignin.signIn();
			console.log("Got Google ID Token: ", idToken);

			// 2. Create a Google credential with the token
			const googleCredential = auth.GoogleAuthProvider.credential(idToken);

			// 3. Sign-in the user with the credential
			const firebaseUserCredential = await auth().signInWithCredential(
				googleCredential
			);

			console.log("SIGNED IN WITH FIREBASE!", firebaseUserCredential.user);
			setUserInfo(firebaseUserCredential.user); // Now you have the Firebase user object
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				console.log("User cancelled the login flow");
			} else if (error.code === statusCodes.IN_PROGRESS) {
				console.log("Sign in is in progress already");
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				console.log("Play services not available or outdated");
			} else {
				console.error("Some other error happened", error.message);
			}
		}
	};

	const signOut = async () => {
		try {
			await GoogleSignin.signOut();
			await auth().signOut(); // Also sign out from Firebase
			setUserInfo(null);
		} catch (error) {
			console.error("SignOut Error: ", error);
		}
	};

	return (
		<View style={styles.container}>
			{userInfo ? (
				<View style={styles.container}>
					<Text style={styles.welcomeText}>Welcome!</Text>
					{userInfo.photoURL && (
						<Image
							source={{ uri: userInfo.photoURL }}
							style={styles.profilePic}
						/>
					)}
					<Text>{userInfo.displayName}</Text>
					<Text>{userInfo.email}</Text>
					<View style={{ marginTop: 20 }}>
						<Button title="Sign Out" onPress={signOut} color="red" />
					</View>
				</View>
			) : (
				<Pressable onPress={signIn} style={styles.button}>
					<Text style={styles.text}>Sign in with Google</Text>
				</Pressable>
			)}
			<StatusBar style="auto" />
		</View>
	);
}

// Styles remain the same
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
