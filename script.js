/*import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyAKSlsDt8Dug-5y1Q1mH3xK2kaY5NQmMvI",
    authDomain: "spa-login-400d4.firebaseapp.com",
    projectId: "spa-login-400d4",
    storageBucket: "spa-login-400d4.firebasestorage.app",
    messagingSenderId: "1029223615077",
    appId: "1:1029223615077:web:86429335ae7edb52ee548c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore(app);

// Help function to show feedback messages
function showMessage(result, divid) {
    const resultBox = document.getElementById("result-box"); // Outer container
    const resultDiv = document.getElementById(divid); // Inner content element (e.g., <h3>)
    
    resultBox.style.display = "block"; // Show the result box
    resultDiv.innerHTML = result;      // Update the text inside <h3>
    resultBox.style.opacity = 1;       // Make it visible
    
    setTimeout(() => {
        resultBox.style.opacity = 0;   // Fade out the entire box
    }, 5000);
}

// Login Event Listener
document.getElementById("login-btn").addEventListener('click',  ()=> {
    const loginEmail = document.getElementById("email-login").value;
    const loginPassword = document.getElementById("password-login").value;

    if (!loginEmail || !loginPassword) {
        alert("Please fill in both email and password fields.");
        return;
    }

    // Disable the button and provide feedback during authentication
    const loginButton = document.getElementById("login-btn");
    loginButton.disabled = true;
    document.getElementById("result").innerHTML = "Logging in...";

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            document.getElementById("result-box").style.display = "inline";
            document.getElementById("login-div").style.display = "none";
            document.getElementById("result").innerHTML = "Welcome<br>" + loginEmail;
        })
        .catch((error) => {
            const errorCode = error.code;
            let errorMessage;

            switch (errorCode) {
                case 'auth/user-not-found':
                    errorMessage = 'No user found with this email.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password. Please try again.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email format.';
                    break;
                default:
                    errorMessage = 'An unexpected error occurred. Please try again.';
            }

            document.getElementById("result-box").style.display = "inline";
            document.getElementById("login-div").style.display = "none";
            document.getElementById("result").innerHTML = "Sorry!<br>" + errorMessage;
        })
        .finally(() => {
            loginButton.disabled = false; // Re-enable the button
        });
});

// user registration using firestore database


document.getElementById('reg-Btn').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default form submission
    const Email=document.getElementById('regMail').value;
    const Password=document.getElementById('regPassword').value;
    const Username=document.getElementById('regName').value;

    if (!Email || !Password || !Username) {
        showMessage('All fields are required', 'result');
        return;
    }

    const regButton = document.getElementById('reg-Btn');
    regButton.disabled = true; // Disable button during process

    
    createUserWithEmailAndPassword(auth, Email, Password)
    .then((userCredential) => {
        const user=userCredential.user;
        const userData={
            Email, Username 
        };
        return setDoc(doc(db, "users", user.uid), userData)
                .then(() => {
                    showMessage('Account Created Successfully', 'result');
                    window.location.href = 'SPAIndex.html'; // Redirect on success
                });
    })  
    .catch((error) => {
        const errorCode=error.code;
        if(errorCode==='auth/email-already-in-use'){
            showMessage('Email Already in Use', 'result');
        }else{
            showMessage('Error Creating Account', 'result');
        }
    })
    .finally(() => {
        regButton.disabled = false; // Re-enable button
    });
});

// UI Toggles for Login/Registration
const wrapper =document.querySelector('.wrapper');
const loginLink =document.querySelector('.login-link');
const registerLink =document.querySelector('.register-link');
const btnPopup =document.querySelector('.btnLogin-popup');
const iconClose =document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=>{
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=>{
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=>{
    wrapper.classList.remove('active-popup');
});

// Toggles for home and other buttons 
const Home =document.querySelector('.home');
const About =document.querySelector('.about');
const Services =document.querySelector('.services');
const Contact =document.querySelector('.contact'); */