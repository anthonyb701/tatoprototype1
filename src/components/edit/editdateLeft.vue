<template>
  <v-dialog
     
     max-width="350px"
     transition="dialog-transition"
     v-model="editDialog"
  ><template v-slot:activator="{ on }">
        <v-btn
          accent
          v-on="on"
          class="blue darken-2 white--text mt-3 btn-appo-edit"
          style="font-size: 15px; height: 45px; margin: 0 20px"
        >
        Редаугвати дату виписки
        </v-btn>
      </template>
      <v-card>
         <v-container>
            <v-layout row wrap>
               <v-flex xs12>
                  <v-card-title >
                     Відредагувати дату виписки
                  </v-card-title>
               </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
               <v-flex xs12>
                  <v-date-picker v-model="editableDate" style="width: 100%" actions locale="uk-UA">
                     <template>
                        <v-btn text class="blue--text darken-1" @click="onClose">Скасувати</v-btn>
                        <v-btn text class="blue--text darken-1" @click="onSaveChanges">Зберегти</v-btn>
                     </template>
                  </v-date-picker>
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
         editableDate: null,
         nowDate: null
      }
   },
   methods: {
      onSaveChanges() {
         const newDate = new Date(this.post.dateLeft.toDate())
         const newDay = new Date(this.editableDate).getUTCDate()
         const newMonth = new Date(this.editableDate).getUTCMonth()
         const newYear = new Date(this.editableDate).getUTCFullYear()
         newDate.setUTCDate(newDay - 1)
         newDate.setUTCMonth(newMonth)
         newDate.setUTCFullYear(newYear)
         this.$store.dispatch('updatePost', {
            id: this.post.id,
            dateLeft: newDate
         })
      },
      onClose(){
         this.editDialog = false
         this.editableDate = this.nowDate
      }
   },
   created(){
            let date = new Date(this.post.dateLeft.toDate())
            let day = date.getUTCDate() + 1
            if (day.toString().length == 1) {
                day = "0"+day
            }
            let month = date.getUTCMonth() + 1
                if (month.toString().length == 1) {
                    month = "0"+month
                }
            let year = date.getUTCFullYear()
            this.editableDate = year+"-"+month+"-"+day
            this.nowDate = year+"-"+month+"-"+day
   }
}
</script>

<style>

</style>