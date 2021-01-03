<template>
  <v-layout row wrap v-if="isUser">
      <v-flex xs12>
          <div v-if="!isShow" >
              <upload-img v-if="!isPhoto"></upload-img>
              <upload-img v-if="imgClick"></upload-img>
          <v-card class="profile__div"> 
             <img :src="userProfile.Image" @click="imgClick = !imgClick" height="150px" style="border-radius: 50%" alt="hey">
              <v-card-title primary-title>
                  Профіль:  {{userProfile.name}}
              </v-card-title>
              <v-card-text class="posada">
                  Посада: {{userProfile.title}} 
              </v-card-text>
              
              <!-- <button @click="imgClick = !imgClick" class=" blue btn-width white--text mb-3 ml-3 mt-3">{{photoText}}</button> -->
              <button @click="logout" class="red btn-width white--text mb-3 ml-3 mt-3">Вийти</button>
              <button @click="resetPass" class="blue darken-2 btn-width white--text mb-3 ml-3 mt-3">Скинути пароль</button>
          </v-card>
          </div>
        <!-- <button @click="isShow = !isShow" class="pa-2 blue darken-2 white--text mt-3 mb-4 btn-width2">{{showText}}</button>
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
      </section> -->
      <section v-if="isAdmin">
          <div class="users-div">
            <div class="user-options">
              <span class="options-option main">Ім'я</span>
              <span class="options-option main">Посада</span>
              <span class="options-option main">E-mail</span>
            </div>
            <div class="user-options" v-for="user in usersArray" :key="user.id">
              <span class="options-option">{{user.name}}</span>
              <span class="options-option">{{user.title}}</span>
              <span  class="options-option">{{user.email}}</span>
            </div>
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
        isPhoto() {
            if(this.userProfile.filename && this.userProfile.Image){
                return true
            } else {
                return false
            }
        },
        currentUser(){
            return this.$store.getters.currentUser
        },
        isAdmin(){  
            if(this.currentUser === this.$store.getters.isAdmin){
                return true
            } else {
                return false
            }
            
        },
        usersArray(){
            return this.$store.state.users
        }
    },
    data(){
        return {
            isShow: false,
            imgClick: false,
            photoText: 'Установити нове фото',
            showText: 'Показати мої операції'
        }
    },
    watch: {
        isUser(){
            this.$destroy()
        },
        isShow(){
            if(this.isShow){
                this.showText = 'Закрити мої операції'
            } else {
                this.showText = 'Показати мої операції'
            }
        },
        imgClick(){
            if(this.imgClick){
                this.photoText = 'Скасувати'
            } else {
                this.photoText = 'Установити нове фото'
            }
        }
    },
    methods: {
        onOpenSingle(id){
            this.$router.push('/appointment/' + id)
        },
        logout() {
            this.$store.dispatch('logout').catch(()=>{});
            this.$router.push('/auth').catch(()=>{});
      
        },
        resetPass(){
            var auth = firebase.auth()
            console.log(auth)
            const userEmail = firebase.auth().currentUser.email;
            console.log(userEmail)
            // var emailAddress = "user@example.com";

            auth.sendPasswordResetEmail(userEmail).then(function() {

            }).catch(function(error) {
            });
        
    }
    },
    created(){
        this.$store.dispatch('loadUsers').catch(() => {})
    }
}
</script>

<style scoped>
    .btn-width{
        width: 200px;
        text-align: center;
        padding: 8px;
        border-radius: 6px;
    }
    /* .btn-width:last-child{
        width: 110px;
    } */
    .btn-width2{
        width: 185px;
        text-align: center;
        border-radius: 6px;
    }
    .profile__div{
        padding: 25px
    }
    .posada{
        color: black!important;
        font-size: 16px;
    }
    .users-div{
        border: 3px solid #4285f4;
        border-bottom: none;
        border-radius: 5px;
        margin-bottom: 30px;
        margin-top: 30px;
    }
    .user-options{
        display: flex;
        flex-wrap: wrap;
    }
    .options-option{
        flex: 33%;
        border-left: 3px solid #4285f4;
        border-bottom: 3px solid #4285f4;
        padding: 7px;
        padding-left: 20px;
        font-size: 16px;
        font-weight: 400;
    }
    .options-option:first-child{
        border-left: none;
    }
    .options-option.main{
        font-weight: 500;
        font-size: 18px;
    }
</style>>


