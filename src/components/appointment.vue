<template>
  <v-container v-if="!toDelete">
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
              <div v-if="isAuthor">
                  <button v-if="!onDelete" @click.prevent="onDelete = !onDelete" class="white--text red pa-2 mt-3">Delete this Appointment</button>
                    <form v-else @submit.prevent="onSubmit">
                  <v-checkbox
                    v-model="checkbox"
                    value="1"
                    label="Confirm"
                    type="checkbox"
                    required
                  ></v-checkbox>
                  <button @click="onDelete = !onDelete" class="white--text green pa-2 mr-3" >Cancel</button>
                  <button type="submit" class="white--text red pa-2">Delete It!</button>
              </form>
              </div>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>

export default {
    props: ['id'],
    data(){
        return {
            checkbox: '',
            onDelete: false,
            toDelete: false,
        }
    },
    computed: {
        singleAppointment(){
            return this.$store.getters.appointment(this.id)
        },
        currentUser(){
            return this.$store.getters.currentUser
        },
        isAuthor(){
            if(this.singleAppointment.creatorId === this.currentUser){
                return true
            } else {
                return false
            }
        }

    },
    methods: {
        onSubmit(){
            this.toDelete = true
            this.$store.dispatch('deleteAppointment', this.id)
        }
    },
    
}
</script>

<style>

</style>