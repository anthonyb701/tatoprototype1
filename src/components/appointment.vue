<template>
  <v-container>
      <v-layout row wrap>
          <v-flex xs12>
              <v-card>
                  <v-card-title primary-title>
                      <h3 class="primary--text">{{singleAppointment.title}}</h3>
                  </v-card-title>
                  <v-card-text>
                      <h2>Date and time</h2>
                      <span>{{singleAppointment.date | dateF}}</span>
                      <h3>Description</h3>
                      <p>{{singleAppointment.description}}</p>
                      <h3>Patiennt: {{singleAppointment.user.firstName}} {{singleAppointment.user.lastName}}</h3>
                      <h3>Doctor:</h3>
                      <span>{{singleAppointment.surgeon}}</span>
                  </v-card-text>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
    props: ['id'],
    data(){
        return {
            
        }
    },
    computed: {
        singleAppointment(){
            return this.$store.getters.appointment(this.id)
        }
    }
}
</script>

<style>

</style>