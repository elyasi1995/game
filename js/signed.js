import  {initializeApp}  from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import  {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import  {getDatabase, set, ref, update, get, child, remove} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
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
	const app = initializeApp(firebaseConfig);
	const auth = getAuth();
	const database = getDatabase(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    function smoney(){
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
		smoney();
    console.log("he is signed in...") 
  } else {
    // User is signed out
	
  }

})
