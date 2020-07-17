<template>
     <v-layout row wrap>
       <div v-for="appointment in appointments" :key="appointment.id" @click="onOpenSingle(appointment.id)">
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
     </v-layout>
</template>

<script>
  export default {
    name: 'list',
    computed: {
      appointments(){
        return this.$store.getters.sortedAppointments
      },
    },
    methods: {
      onOpenSingle(id){
        this.$router.push('/' + id)
      }
    },

    data: () => ({
      
    })
      
  }
</script>
