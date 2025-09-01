import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View, Image, Button } from "react-native";
import {
	GoogleSignin,
	statusCodes,
} from "@react-native-google-signin/google-signin";
// 1. Import the new modular Firebase functions
import {
	GoogleAuthProvider,
	getAuth,
	signInWithCredential,
	signOut as firebaseSignOut, // Rename to avoid conflict
} from "@react-native-firebase/auth";

export default function App() {
	const [userInfo, setUserInfo] = useState(null);

	GoogleSignin.configure({
		webClientId: "from env",
	});

	const signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();

			// 2. Get the idToken directly from the result
			const signInResult = await GoogleSignin.signIn();

			idToken = signInResult.data?.idToken;
			if (!idToken) {
				throw new Error("Google Sign-In failed: No ID token returned.");
			}

			// Create a Google credential with the token
			const googleCredential = GoogleAuthProvider.credential(idToken);

			// 3. Await the sign-in with Firebase
			const firebaseUserCredential = await signInWithCredential(
				getAuth(),
				googleCredential
			);

			// 4. Set the user info from the *result* of the Firebase sign-in
			console.log("SIGNED IN WITH FIREBASE!", firebaseUserCredential.user);
			setUserInfo(firebaseUserCredential.user);
		} catch (error) {
			// Your existing error handling is good
			console.error("Some other error happened", error);
		}
	};

	const signOut = async () => {
		try {
			await GoogleSignin.signOut();
			// Use the modular signOut function
			await firebaseSignOut(getAuth());
			setUserInfo(null);
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
// ... your styles
