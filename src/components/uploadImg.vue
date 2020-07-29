<template>
  <v-layout row wrap v-if="!ifImg">
     <v-flex xs12>
              <v-btn 
                class="blue white--text darken-3 btn-width mt-3" 
                raised
                @click="onPickFile"
                >Вибрати фото</v-btn>
              <input 
                type="file" 
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onInput">
         </v-flex>
         <v-flex xs12>
            <v-btn @click="uploadImage"
            class="blue white--text darken-3 pa-2 my-4 raised btn-width">Завантажити фото</v-btn>
         </v-flex>
  </v-layout>
</template>

<script>
export default {
   data(){
      return {
         file: '',
         ifImg: false

      }
   },
   methods: {
      uploadImage(){
         if(this.file !== ''){
            console.log(this.file)
            this.$store.dispatch('uploadNewImg', this.file)
            this.ifImg = true
         }
      },
      onInput(event){
         const file = event.target.files[0]
         console.log(file)
         this.file = file
      },
      onPickFile(){
         this.$refs.fileInput.click()
    },
   }
}
</script>

<style scoped>
.btn-width{
   width: 180px;
   text-align: center;
   margin-left: 13px;
}
</style>