import Vue from 'vue'
import Vuex from 'vuex'



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
    ]
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
    }
    

  },
  mutations: {
    setAppointment(state, payload){
      state.appointments.push(payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
