<template>
     <main>
       <button v-if="!isArchive" @click.prevent="onArchive">Open Archive</button>
       <button v-else @click.prevent="onArchive">Close Archive</button>
       <v-layout row wrap>
      <section >
         <div  v-for="appointment in allAppointments" :key="appointment.id" @click="onOpenSingle(appointment.id)">
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
       <!-- <section>
         <div  v-for="appointment in appointments" :key="appointment.id" @click="onOpenSingle(appointment.id)">
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
      </section> -->
     </v-layout>
     </main>
</template>

<script>
  export default {
    name: 'list',
    computed: {
      appointments(){
        return this.$store.getters.sortedAppointments
      },
      featuredAppointments(){
        return this.$store.getters.featuredAppointments
      },
      allAppointments: {
        // if(this.isArchive != true){
        //   return this.$store.getters.featuredAppointments
        // } else {
        //   return this.$store.getters.sortedAppointments
        // }
        get(){
          if(this.isArchive != true){
           return this.$store.getters.featuredAppointments
          } else {
          return this.$store.getters.sortedAppointments
          }
        }, 
        set(){

        }
      }
      
    },
    methods: {
      onOpenSingle(id){
        this.$router.push('/appointment/' + id)
      },
      onArchive(){
        this.isArchive = !this.isArchive
      }
    },

    data: () => ({
      isArchive: false,
    }),
    // watch: {
    //   // isArchive(){
    //   //   if(this.isArchive){
    //   //     this.allAppointments = this.appointments
    //   //   } else {
    //   //     this.allAppointments = this.featuredAppointments
    //   //   }
    //   // }
    // },
    created(){
      this.$store.dispatch('loadAppointments')
    } 
  }
</script>
