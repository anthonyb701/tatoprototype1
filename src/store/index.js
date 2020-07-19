import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../../firebase'
import router from '../router/index'
const firebase = require("firebase")
require("firebase/firestore");
var fs = firebase.firestore();



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fbAppointments: [],
    userProfile: {},
    isUser: false,

  },
  getters: {
    currentUser(state){
      return firebase.auth().currentUser.uid
    },
    fbAppointments(state){
      return state.fbAppointments
    },
    sortedAppointments(state){
      return state.fbAppointments.sort((a,b) => {
        return a.date.toDate() - b.date.toDate()
      })
    },
    creatorAppointments(state,getters){
      const creatorId = firebase.auth().currentUser.uid
      let crAppointments = []
       getters.sortedAppointments.find(appoint => {
         if(appoint.creatorId == creatorId){
           crAppointments.push(appoint)
         }
      })
      if(state.isUser == false){
        crAppointments = []
      }
      return crAppointments
    },
    userProfile(state){
      return state.userProfile
    },
    featuredAppointments(state, getters){
      let currentDate = new Date()
      let featuredAppo = []
      getters.sortedAppointments.forEach(appo => {
        if(appo.date.toDate() > currentDate ) {
          featuredAppo.push(appo)
          
        }
      })
      return featuredAppo
    },
    appointment(state){
      return id => {
        return state.fbAppointments.find(appoint => {
          return appoint.id === id
        })
      }
    },
    user(state){
      return state.isUser
    },
    

  },
  mutations: {
    setUserProfile(state, payload) {
      state.userProfile = payload
      state.isUser = true
      router.push('/').catch(()=>{});
    },
    loadAppointments(state, payload){
      state.fbAppointments = payload
    }
  },
  actions: {
      async deleteAppointment({commit}, payload){
        fs.collection('posts').doc(payload).delete()
        .then(() => {
          console.log('Deleted')
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
      },
      async login({ dispatch }, form) {
        // sign user in
        const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
    
        // fetch user profile and set in state
        dispatch('fetchUserProfile', user)
      },
      async fetchUserProfile({ commit }, user) {
        // fetch user profile
        const userProfile = await fb.usersCollection.doc(user.uid).get()
    
        // set user profile in state
        commit('setUserProfile', userProfile.data())
        
        // change route to dashboard
      },
      async signup({ dispatch }, form) {
        // sign user up
        const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      
        // create user profile object in userCollections
        await fb.usersCollection.doc(user.uid).set({
          name: form.name,
          title: form.title
        })
      
        // fetch user profile and set in state
        dispatch('fetchUserProfile', user)
      },
      async logout({ commit }) {
        await fb.auth.signOut()
      
        // clear userProfile and redirect to /login
        commit('setUserProfile', {})
        this.state.isUser = false
        router.push('/auth').catch(()=>{});
      },
      async setAppointment({commit}, payload){
          let appoObj = {
            surgeon: payload.surgeon,
            description: payload.description,
            creatorId: fb.auth.currentUser.uid,
            title: payload.title,
            user: payload.user,
            date: payload.date,
            }
          await fs.collection('posts').add(appoObj)
          .then(data => {
            const id = data.id
            fs.collection('posts').doc(id).update({
              id: id
            })
          })
          router.go(0);
      },
      loadAppointments({commit}){
        fs.collection('posts').onSnapshot(querySnapshot => {
          let appoArray = []
          querySnapshot.forEach(post => {
            appoArray.push(post.data())
          })
          commit('loadAppointments', appoArray)
        }, error => {
          console.log(error)
        })
      }
      
  },
  modules: {
  }
})