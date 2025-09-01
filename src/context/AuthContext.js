import React, { createContext, useState, useContext, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// Create the context
const AuthContext = createContext(null);

// Create the provider component
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	console.log("user", user);

	// This is the core of the Firebase auth system.
	// It listens for changes to the user's login state in real-time.
	useEffect(() => {
		const subscriber = auth().onAuthStateChanged((firebaseUser) => {
			setUser(firebaseUser);
			// We are no longer loading once we have a user or know there isn't one.
			if (isLoading) {
				setIsLoading(false);
			}
		});
		return subscriber; // Unsubscribe on unmount
	}, []);

	// The value that will be provided to all children components
	const value = {
		user,
		isLoading,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to easily access the context from any component
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
