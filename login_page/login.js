
 // Replace this with your Firebase config object

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore(); // Use this if you're using Firestore
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Sign in the user
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // After login, check the user's role
            return db.collection('users').doc(user.uid).get();
        })
        .then((doc) => {
            if (doc.exists) {
                const role = doc.data().role; // Assuming you have a field 'role'

                // Redirect based on the role
                if (role === 'customer') {
                    window.location.href = 'customerPage.html'; // Redirect to customer page
                } else if (role === 'serviceProvider') {
                    window.location.href = 'serviceProviderPage.html'; // Redirect to service provider page
                } else {
                    document.getElementById('error-message').textContent = 'Invalid role.';
                }
            } else {
                document.getElementById('error-message').textContent = 'No user document found.';
            }
        })
        .catch((error) => {
            document.getElementById('error-message').textContent = error.message;
        });
});