<template>
  <v-dialog
     
     max-width="1200px"
     transition="dialog-transition"
     v-model="editDialog"
  ><template v-slot:activator="{ on }">
        <v-btn
          accent
          v-on="on"
          class="blue darken-2 white--text mt-3 btn-appo-edit"
          style="font-size: 15px; height: 45px; margin: 0 20px"
          
        >
        Редаугвати тривалість операції
        </v-btn>
      </template>
      <v-card>
         <v-container>
            <v-layout row wrap>
               <v-flex xs12>
                  <v-card-title>
                     Відредагувати тривалість операції : 
                     {{sumbittableDuration}}
                  </v-card-title>
               </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap >
               <v-flex xs12 sm6 md5 offset-md-1 >
                  <v-time-picker v-model="timeStart" format="24hr" :max="timeEnd">
                     
                  </v-time-picker>
               </v-flex>
               <v-flex xs12 sm6 md5 offset-md-1 class="layout">
                  <v-time-picker v-model="timeEnd" format="24hr" :min="timeStart">
                     
                  </v-time-picker>
               </v-flex>
               <template>
                        <v-btn text class="blue--text darken-1" @click="onClose">Скасувати</v-btn>
                        <v-btn text class="blue--text darken-1" @click="onSaveChanges">Зберегти</v-btn>
               </template>
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
         timeStart: null,
         timeEnd: null,
         nowTime: null
      }
   },
   methods: {
      onSaveChanges() {
         this.$store.dispatch('updatePost', {
            id: this.post.id,
            duration: this.sumbittableDuration,
            timeStart: this.timeStart,
            timeEnd: this.timeEnd
         })
      },
      
      onClose(){
         this.editDialog = false
         // this.timeStart = null
         // this.timeEnd = null
      }
   },
   computed: {
      sumbittableDuration: {
         get(){
            let sumStart
         let sumEnd
         let ultimateHours
         let ultimateMinutes
         let ultimateTime
         if (this.timeStart !== null) {
            let startHours = parseInt(this.timeStart.substr(0, 2), 10) * 60
            let startMinutes = parseInt(this.timeStart.substr(3, 5), 10)
            sumStart = startHours + startMinutes

         }
         if (this.timeEnd !== null) {
            let endHours = parseInt(this.timeEnd.substr(0, 2), 10) * 60
            let endMinutes = parseInt(this.timeEnd.substr(3, 5), 10)

            sumEnd = endHours + endMinutes

         }
         if (this.timeStart !== null && this.timeEnd !== null) {
            let difference = (sumEnd - sumStart)

            let hours = Math.floor(difference / 60)

            let minutes = difference - (hours * 60)

            if (hours < 10) {
               ultimateHours = `0${hours}`
            } else {
               ultimateHours = hours.toString()
            }
            if (minutes < 10) {
               ultimateMinutes = `0${minutes}`
            } else {
               ultimateMinutes = minutes.toString()
            }
            ultimateTime = `${ultimateHours} год : ${ultimateMinutes} хв`
         }
         if (typeof (ultimateTime) === 'string') {
            console.log(ultimateTime)
            return ultimateTime
         }
         },
         set(){

         }
         

      },
   },
   created(){
      this.sumbittableDuration = this.post.duration
   }
}
</script>

<style>
.layout{
   display: flex;
   justify-content:center;
}
</style>