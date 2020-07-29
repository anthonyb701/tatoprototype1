<template>
  <v-dialog
     persistent
     max-width="350px"
     transition="dialog-transition"
     v-model="editDialog"
  ><template v-slot:activator="{ on }">
        <v-btn
          accent
          v-on="on"
        >
        Edit Time
        </v-btn>
      </template>
      <v-card>
         <v-container>
            <v-layout row wrap>
               <v-flex xs12>
                  <v-card-title >
                     Edit Meetup Time
                  </v-card-title>
               </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
               <v-flex xs12>
                  <v-time-picker v-model="editableTime" style="width: 100%" actions format="24hr">
                     <template>
                        <v-btn text class="blue--text darken-1" @click="onClose">Cancel</v-btn>
                        <v-btn text class="blue--text darken-1" @click="onSaveChanges">Save</v-btn>
                     </template>
                  </v-time-picker>
               </v-flex>
            </v-layout>
         </v-container>
      </v-card> 
  </v-dialog>
</template>

<script>
export default {
   props: ['post'],
   data(){
      return{
         editDialog: false,
         editableTime: null,
         oldTime: null
      }
   },
   methods: {
      onSaveChanges() {
         const newDate = new Date(this.post.date.toDate())
         let hours = this.editableTime.match(/^(\d+)/)[1]
         let minutes = this.editableTime.match(/:(\d+)/)[1]
         newDate.setHours(hours)
         newDate.setMinutes(minutes)
         this.$store.dispatch('updatePost', {
            id: this.post.id,
            date: newDate
         })
      },
      onClose(){
         this.editDialog = false
         this.editableTime = this.oldTime
      }
   },
   created(){
            let date = new Date(this.post.date.toDate());
            let hours = date.getHours();
            let minutes = date.getMinutes();
            this.editableTime = hours + ":" + minutes;
            this.oldTime = hours + ":" + minutes;
   }
}
</script>

<style>

</style>