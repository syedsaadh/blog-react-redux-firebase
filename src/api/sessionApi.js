import * as firebase from 'firebase';
let provider = new firebase.auth.GoogleAuthProvider();

class SessionApi {
    static login() {
        return firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // var token = result.credential.accessToken;
            // // The signed-in user info.
            // var user = result.user;
            return result;
        }).catch(function (error) {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // The email of the user's account used.
            // var email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            throw error;
        });
    }
    static logout() {
       return firebase.auth().signOut().then(function () {
            // Sign-out successful.
            return true;
        }).catch(function (error) {
            // An error happened.
            throw error;
        });
    }
}
export default SessionApi;