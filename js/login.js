
	// Import the functions you need from the SDKs you need
	import  {initializeApp}  from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
	import  {getAnalytics}  from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
	import  {getDatabase, set, ref, update, get, child, remove} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
	import  {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
	const firebaseConfig = {
		apiKey: "AIzaSyBIfNsuFdq3Cc4A_gEhGKbsJDui_uKMfqE",
		authDomain: "test-23904.firebaseapp.com",
		databaseURL: "https://test-23904-default-rtdb.asia-southeast1.firebasedatabase.app",
		projectId: "test-23904",
		storageBucket: "test-23904.appspot.com",
		messagingSenderId: "682703292885",
		appId: "1:682703292885:web:50b4cf455bce40e2dad55c",
		measurementId: "G-1B8QM7ZMPH"
	};

  // Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const analytics = getAnalytics(app);
	const database = getDatabase(app);
	const auth = getAuth();
	function OpenModal() {
        let element = document.getElementById('overlay')
        element.style.display = 'block'
      }
      function CloseModal() {
        let element = document.getElementById('overlay')
        element.style.display = 'none'
      }

login.addEventListener('click',(e) => {
	
	var email = document.getElementById("lemail").value + '@gmail.com';
	var password = document.getElementById("lpassword").value;
	
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
		// Signed in 
		const user = userCredential.user;
		const dt = new Date();
		update(ref(database, 'users/' + user.uid),{
			last_login: dt,
		
		})
		alert("User loged in");
    // ...
	})
	.catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		alert(errorMessage);
	});


});

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    function smoney() {
            const dbref = ref(database);
            get(child(dbref, "users/" + uid))
            .then((snapshot)=>{
                if(snapshot.exists()){
					console.log(parseFloat(snapshot.val().mony));
					
                } else {
                    alert("No data found");
                }
            })
            .catch((error)=>{
                alert(error)
            })

        }
    CloseModal()
    console.log("he is signed in...") 
  } else {
    // User is signed out
	OpenModal()
  }
});
