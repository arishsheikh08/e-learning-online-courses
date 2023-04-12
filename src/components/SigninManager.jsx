import React from 'react';
import  firebase from 'firebase/app';
import 'firebase/auth';
// import firebaseConfig from '../firebase.config';

// export const initializeLoginFramework = () => {
// 	if(firebase.apps.length === 0){
//         firebase.initializeApp(firebaseConfig);
//     }
// };

export const handleGoogleSignIn = async () => {
	const googleProvider = new firebase.auth.GoogleAuthProvider();
	try {
		const res = await firebase
			.auth()
			.signInWithPopup(googleProvider);
		const { displayName, photoURL, email } = res.user;
		const signedInUser = {
			isSignedIn: true,
			name: displayName,
			email: email,
			photo: photoURL,
			success: true
		};
		console.log(res.user);
		return signedInUser;
	} catch (err) {
		console.log(err);
		console.log(err.message);
	}
};

export const handleFbSignIn = async () => {
	const fbProvider = new firebase.auth.FacebookAuthProvider();
	try {
		const res = await firebase
			.auth()
			.signInWithPopup(fbProvider);
		var token = res.credential.accessToken;

		const { displayName, photoURL, email } = res.user;
		const signedInUser = {
			isSignedIn: true,
			name: displayName,
			email: email,
			photo: photoURL,
			success: true
		};
		console.log(res.user);
		return signedInUser;
	} catch (error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode, errorMessage);
	}
};

export const handleSignOut = async () => {
	try {
		const res = await firebase
			.auth()
			.signOut();
		const signedOutUser = {
			isSignedIn: false,
			name: '',
			email: '',
			photo: '',
			error: '',
			success: false
		};
		return signedOutUser;
	} catch (err) {
		console.log(err);
	}
};

export const createUserWithEmailAndPassword = async (name, email, password) => {
	try {
		const res = await firebase
			.auth()
			.createUserWithEmailAndPassword(email, password);
		const newUserInfo = res.user;
		newUserInfo.error = '';
		newUserInfo.success = true;
		updateUserName(name);
		return newUserInfo;
	} catch (error) {
		const newUserInfo_1 = {};
		newUserInfo_1.error = error.message;
		newUserInfo_1.success = false;
		return newUserInfo_1;
	}
};

export const signInWithEmailAndPassword = async (email, password) => {
	try {
		const res = await firebase
			.auth()
			.signInWithEmailAndPassword(email, password);
		const newUserInfo = res.user;
		newUserInfo.error = '';
		newUserInfo.success = true;
		return newUserInfo;
	} catch (error) {
		const newUserInfo_1 = {};
		newUserInfo_1.error = error.message;
		newUserInfo_1.success = false;
		return newUserInfo_1;
	}
};

const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
        .updateProfile({
            displayName: name
        })
        .then(function() {
            console.log('user name updated successfully');
        })
        .catch(function(error) {
            console.log(error);
        });
};

const SigninManager = () => {
	return <div />;
};

export default SigninManager;
