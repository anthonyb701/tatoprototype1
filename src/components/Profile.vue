<template>
  <v-layout row wrap v-if="isUser">
      <v-flex xs12>
          <v-card>
              <v-card-title primary-title>
                  Profile:  {{userProfile.name}}
              </v-card-title>
              <v-card-text>
                  {{userProfile.title}} 
              </v-card-text>
          </v-card>
        <button @click="isShow = !isShow">Show my appointments</button>
        <section v-if="isShow">
         <div  v-for="appointment in creatorAppointments" :key="appointment.id" @click="onOpenSingle(appointment.id)">
         <v-card >
           <v-card-title primary-title>
             {{ appointment.title}} - {{ appointment.date | dateF }}
           </v-card-title>
           <v-card-text>
             <h2>Patient:  {{appointment.user.firstName}} {{appointment.user.lastName}}</h2>
             {{appointment.description}}
            <h2>Doctor: {{appointment.surgeon}}</h2>

           </v-card-text>

         </v-card>
       </div>
      </section>
      </v-flex>
  </v-layout>
</template>

<script>
    const firebase = require("firebase")
    require("firebase/firestore");
export default {
    computed: {
        userProfile(){
            return this.$store.getters.userProfile
        },
        sortedAppointments(){
        return this.$store.getters.sortedAppointments
        },
        creatorAppointments(){
            return this.$store.getters.creatorAppointments
        },
        isUser(){
            return this.$store.getters.user
        },
    },
    data(){
        return {
            isShow: false
        }
    },
    watch: {
        isUser(){
            this.$destroy()
        }
    },
    methods: {
        onOpenSingle(id){
            this.$router.push('/appointment/' + id)
        },
    },
}
</script>

<style>

</style>
