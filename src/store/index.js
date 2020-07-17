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
    appointments: [
      {
        title: 'First Appointment',
        date: new Date(),
        id: '42747feyoogy',
        description:'This is first appointment',
        user: {
          firstName: 'Anton',
          lastName: 'Bitner'
      },
        surgeon: 'Bitner Vasyl Antonovich'
      },
      {
        title: 'Second Appointment',
        date: new Date(),
        description:'This is second appointment',
        id: 'fhd4696443',
        user: {
          firstName: 'Yulia',
          lastName: 'Bitner'
        },
        surgeon: 'Bitner Vasyl Antonovich'
      },  
    ],
    userProfile: {},
    isUser: false,

  },
  getters: {
    appointments(state){
      return state.appointments
    },
    sortedAppointments(state){
      return state.appointments.sort((a,b) => {
        return a.date - b.date
      })
    },
    appointment(state){
      return id => {
        return state.appointments.find(appoint => {
          return appoint.id === id
        })
      }
    },
    user(state){
      return state.isUser
    },
    

  },
  mutations: {
    setAppointment(state, payload){
      state.appointments.push(payload)
    },
    setUserProfile(state, payload) {
      state.userProfile = payload
      state.isUser = true
      router.push('/').catch(()=>{});
    },
  },
  actions: {
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
      }
      
  },
  modules: {
  }
})