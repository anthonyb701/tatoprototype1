import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
   apiKey: "AIzaSyBTOTqzawXYnKdxlEF7xCL_ZQ0ibW3OtEc",
   authDomain: "urologyproject.firebaseapp.com",
   databaseURL: "https://urologyproject.firebaseio.com",
   projectId: "urologyproject",
   storageBucket: "urologyproject.appspot.com",
   messagingSenderId: "107112216924",
   appId: "1:107112216924:web:b7d2b064f2bf147c07e999"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}