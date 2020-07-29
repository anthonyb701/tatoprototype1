import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../../firebase'
import router from '../router/index'
const firebase = require("firebase")
import { auth } from '../../firebase'
require("firebase/firestore");
var fs = firebase.firestore();



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fbAppointments: [],
    userProfile: {},
    isUser: false,
    currentUser: '',
    isLoading: false,
    isUpdatedAge: false,
    items: [
      'Бітнер',
      'Поліщук',
      'Леськів Я.О',
      'Терешенко',
      'Кльофа',
      'Леськів Д.Я',
      'Дурач',
      'Інший',
      
    ],
    ranksItems: [
      'Строкова Служба',
      'Контракт',
      'Офіцер',
      'Пенсіонер',
      'Платний',
      'Договірний',
      'Тематичний',
      'Інший'
    ],
    timeTypeItems: [
      'Первинна',
      'Повторна'
    ],
    urgencyTypeItems: [
      'Планова',
      'Ургентна'
    ],
    operationTypeItems: [
      'Лапараскопічна',
      'Ендоскопічна',
      'Малоінвазивна',
      'Відкрита'
    ],
    anesthesiaTypeItems: [
      'Місцева',
      'Ендотрахеальний Наркоз',
      'Епідуральна',
      'Комбінована'
    ],
    spotTypeItems: [
      'Стаціонарна',
      'Амбулаторна',
    ],
    ultimateTypeItems: [
      'Виписаний',
      'Помер', 
    ],
    anesthesiologistItems: [
      'Зачепа',
      'Медвідь', 
      'Скуратівський',
      'Шонгофер',
      'Дмитришин',
      'Інший'
    ],
    medsisterItems: [
      'Пилипчук',
      'Непилипчук', 
    ]
  },
  getters: {
    currentUser(state){
      return firebase.auth().currentUser.uid
    },
    onUserChanged(state){
      return state.currentUser
    },
    items(state){
      return state.items
    },
    anesthesiologistItems(state){
      return state.anesthesiologistItems
    },
    medsisterItems(state){
      return state.medsisterItems
    },
    rankItems(state){
      return state.ranksItems
    },
    timeTypeItems(state){
      return state.timeTypeItems
    },
    urgencyTypeItems(state){
      return state.urgencyTypeItems
    },
    operationTypeItems(state){
      return state.operationTypeItems
    },
    anesthesiaTypeItems(state){
      return state.anesthesiaTypeItems
    },
    spotTypeItems(state){
      return state.spotTypeItems
    },
    ultimateTypeItems(state){
      return state.ultimateTypeItems
    },
    fbAppointments(state){
      return state.fbAppointments
    },
    sortedAppointments(state){
      return state.fbAppointments.sort((a,b) => {
        return a.date.toDate() - b.date.toDate()
      })
    },
    isLoading(state){
      return state.isLoading
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
    },
    setUpdatedAge(state, payload){
      state.isUpdatedAge = payload
    },
    setCurrentUser(state, payload){
      state.currentUser = payload
    },
    setLoading(state, payload){
      state.isLoading = payload
    }
  },
  actions: {
      async deleteAppointment({commit}, payload){
        commit('setLoading', true)
        fs.collection('posts').doc(payload).delete()
        .then(() => {
          console.log('Deleted')
          commit('setLoading', false)
          router.push('/')
        })
        .catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
      },
      async login({ dispatch, commit }, form) {
        // commit('setLoading', true)
        // sign user in
        const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password).then(()=>{
          commit('setLoading', true)
        })
    
        // fetch user profile and set in state
        dispatch('fetchUserProfile', user)
        commit('setLoading', false)
      },
      async fetchUserProfile({ commit }, user) {
        // fetch user profile
        const userProfile = await fb.usersCollection.doc(user.uid).get()

        // set user profile in state
        commit('setUserProfile', userProfile.data())
        commit('setLoading', false)
        
        // change route to dashboard
      },
      async signup({ dispatch, commit }, form) {
        commit('setLoading', true)
        // sign user up
        const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      
        // create user profile object in userCollections
        await fb.usersCollection.doc(user.uid).set({
          name: form.name,
          title: form.title
        })
        // fetch user profile and set in state
        dispatch('fetchUserProfile', user)
        commit('setLoading', false)
      },
      async logout({ commit }) {
        commit('setLoading', true)
        await fb.auth.signOut()
      
        // clear userProfile and redirect to /login
        
        commit('setUserProfile', {})
        this.state.isUser = false
        router.push('/auth').catch(()=>{});
        commit('setLoading', false)
      },
      async setAppointment({commit}, payload){
        commit('setLoading', true)
          let appoObj = {
            surgeon: payload.surgeon,
            description: payload.description,
            creatorId: fb.auth.currentUser.uid,
            title: payload.title,
            user: payload.user,
            date: payload.date,
            dateEntry: payload.dateEntry,
            dateLeft: payload.dateLeft,
            op_number: payload.op_number,
            op_code: payload.op_code,
            complexity: payload.complexity,
            rank: payload.rank,
            nozologia: payload.nozologia,
            gisto: payload.gisto,
            timeType: payload.timeType,
            urgencyType: payload.urgencyType,
            operationType: payload.operationType,
            anesthesiaType: payload.anesthesiaType,
            spotType: payload.spotType,
            ultimateType: payload.ultimateType,
            assistant:  payload.assistant,
            anesthesiologist: payload.anesthesiologist,
            medsister: payload.medsister,
            dateAge: payload.dateAge,
            age: payload.age,
            duration: payload.duration,
            }
          await fs.collection('posts').add(appoObj)
          .then(data => {
            const id = data.id
            fs.collection('posts').doc(id).update({
              id: id
            })
          })
          commit('setLoading', false)
          // router.go(0);
      },
      loadAppointments({commit}){
        commit('setLoading', true)
        fs.collection('posts').onSnapshot(querySnapshot => {
          let appoArray = []
          querySnapshot.forEach(post => {
            appoArray.push(post.data())
          })
          commit('loadAppointments', appoArray)
          
        }, error => {
          console.log(error)
          commit('setLoading', false)
        })
        commit('setLoading', false)
      },
      updatePost ({commit}, payload){
        // if(payload.notToLoading !== 'yes'){
        //   commit('setLoading', true)
        // }
        commit('setLoading', true)
        let updatedObj = {}
        if(payload.title){
          updatedObj.title = payload.title
        }
        if(payload.surgeon){
          updatedObj.surgeon = payload.surgeon
        }
        if(payload.description){
          updatedObj.description = payload.description
        }
        if(payload.op_number){
          updatedObj.op_number = payload.op_number
        }
        if(payload.rank){
          updatedObj.rank = payload.rank
        }
        if(payload.firstName){
          updatedObj = {
            "user.firstName": payload.firstName,
            ...updatedObj
          }
        }
        if(payload.lastName){
          updatedObj = {
            "user.lastName": payload.lastName,
            ...updatedObj
          }
        }
        if(payload.date) {
          updatedObj.date = payload.date
        }
        if(payload.dateEntry) {
          updatedObj.dateEntry = payload.dateEntry
        }
        if(payload.dateLeft) {
          updatedObj.dateLeft = payload.dateLeft
        }
        if(payload.op_code) {
          updatedObj.op_code = payload.op_code
        }
        if(payload.complexity) {
          updatedObj.complexity = payload.complexity
        }
        if(payload.nozologia) {
          updatedObj.nozologia = payload.nozologia
        }
        if(payload.gisto) {
          updatedObj.gisto = payload.gisto
        }
        if(payload.timeType) {
          updatedObj.timeType = payload.timeType
        }
        if(payload.urgencyType) {
          updatedObj.urgencyType = payload.urgencyType
        }
        if(payload.operationType) {
          updatedObj.operationType = payload.operationType
        }
        if(payload.anesthesiaType) {
          updatedObj.anesthesiaType = payload.anesthesiaType
        }
        if(payload.spotType) {
          updatedObj.spotType = payload.spotType
        }
        if(payload.ultimateType) {
          updatedObj.ultimateType = payload.ultimateType
        }
        if(payload.assistant) {
          updatedObj.assistant = payload.assistant
        }
        if(payload.anesthesiologist) {
          updatedObj.anesthesiologist = payload.anesthesiologist
        }
        if(payload.medsister) {
          updatedObj.medsister = payload.medsister
        }
        if(payload.dateAge) {
          updatedObj.dateAge = payload.dateAge
        }
        if(payload.age) {
          updatedObj.age = payload.age
        }
        if(payload.duration) {
          updatedObj.duration = payload.duration
        }
        // fi
        // firebase.database().ref('meetups').child(payload.id).update(updatedObj)
        // console.log(updatedObj)
        fs.collection('posts').doc(payload.id).update({
          // "user.firstName": payload.firstName,
          // "user.lastName": payload.lastName,
          ...updatedObj
        })
        .then(() => {
          commit('setLoading', false)
          // commit('updateMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
      },
      uploadNewImg({commit, getters, state}, payload) {
        commit('setLoading', true)
        var dropName = ''
        //Check If Service Exists
        firebase.firestore().collection('users').doc(state.currentUser)
        .get()
        .then(()=> {
            // let imageUrl
            // const filename = payload.Image.name
            const filename = payload.name
            const ext = filename.slice(filename.lastIndexOf('.'))
            dropName = state.currentUser +'.'+ext
            var storageRef = firebase.storage().ref('images/'+ state.currentUser +'.'+ext)
            var uploadTask = firebase.storage().ref('images/'+ state.currentUser +'.'+ext).put(payload)
            .then(function(snapshot) {
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
  
          }).then(() => {
            storageRef.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL);
              firebase.firestore().collection('users').doc(state.currentUser).update({Image: downloadURL,filename: dropName})
              .then( ()=>{
                // state.userProfile.push({
                //   Image: downloadURL,
                //   filename: dropName,
                // })
                state.userProfile.image = downloadURL
                state.userProfile.filename = dropName

                commit('setLoading', false)
                router.push('/').catch(()=>{})

              } )
            })
          })
            
        })
      }
      
  },
  modules: {
  }
})