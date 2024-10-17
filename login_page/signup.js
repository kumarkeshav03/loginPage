// Firebase Config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore(); // Firestore for storing user details

// Handle signup form submission
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (role === "") {
        document.getElementById('error-message').textContent = 'Please select a role.';
        return;
    }

    // Create user with email and password
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Store additional user info (name, role) in Firestore
            return db.collection('users').doc(user.uid).set({
                name: name,
                email: email,
                role: role
            });
        })
        .then(() => {
            // Redirect user based on role
            if (role === 'customer') {
                window.location.href = 'customerPage.html'; // Redirect to customer page
            } else if (role === 'serviceProvider') {
                window.location.href = 'service.html'; // Redirect to service provider page
            }
        })
        .catch((error) => {
            document.getElementById('error-message').textContent = error.message;
        });
});
