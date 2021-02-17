<template>
<div :class="{ 'signup-form': !showLoginForm, 'login-form' : showLoginForm}" class="layout">
   <form v-if="showLoginForm && !showPasswordReset" @submit.prevent>
   <section class="form__login">
      <h2 class="form__component">Авторизація</h2>
      <p class="err__text" v-if="errorMSG">{{errorMSG}}</p>
      <!-- <label for="email1">Email</label> -->
      <input v-model.trim="loginForm.email" type="email" class="form__component" placeholder="E-mail" id="email1" />
      <!-- <label for="password1">Password</label> -->
      <input v-model.trim="loginForm.password" type="password" class="form__component" placeholder="Пароль" id="password1" />
      <button class="button form__component" @click="login()">УВІЙТИ</button>
      <div class="aButton-wrapper">
         <!-- <a @click.prevent="toggleForm()" class="aButton">Створити Аккаунт</a> -->
         <a @click.prevent="togglePasswordReset()" class="aButton">Забув пароль</a>
      </div>
      
   </section>
   <div class="extras">
      <!-- <a @click="togglePasswordReset()">Forgot Password</a> -->
      
   </div>
</form>
<form  v-if="!showPasswordReset && !showLoginForm" @submit.prevent>
   <section class="form__login">
   <h2 class="form__component">Реєстрація</h2>
      <input v-model.trim="signupForm.name" type="text" placeholder="Імя" class="form__component" id="name" />
      <input v-model.trim="signupForm.title" type="text" placeholder="Посада" class="form__component" id="title" />
      <input v-model.trim="signupForm.email" type="email" placeholder="E-mail" class="form__component" id="email2" />
      <input v-model.trim="signupForm.password" type="password" class="form__component" placeholder="Пароль" id="password2" />
   <button @click="signup()" class="button form__component">ЗАРЕЄЕСТРУВАТИСЯ</button>
   <div class="aButton-wrapper">
      <a @click.prevent="toggleForm()" class="aButton">Перейти до входу</a>
      <a @click.prevent="togglePasswordReset()" class="aButton">Забув пароль</a>
   </div>
   
    </section>
</form>
<form v-if="showPasswordReset" @submit.prevent>
   <section class="form__login">
      <div v-if="!emailSent">
         <h2 class="form__component">Скидання паролю</h2>
         <input v-model.trim="resetForm" type="email" placeholder="E-mail" class="form__component" required id="emailReset" />
         <button @click="reset()" class="button form__component">Скинути пароль</button>
      </div>
      <h2 v-else class="form__component">Інструкцією з відновлення паролю успішно відправлено на E-mail: {{resetForm}}</h2>
   <a v-if="showLoginForm" @click.prevent="toggleFormFromReset()" class="aButton">Перейти до входу</a>
   <a v-else @click.prevent="toggleFormFromReset()" class="aButton">Перейти до реєстарції</a>
    </section>
</form>
</div>
</template>

<script>
const firebase = require("firebase")
    require("firebase/firestore");
export default {
   data() {
      return {
         loginForm: {
            email: '',
            password: ''
         },
         showLoginForm: true,
         showPasswordReset: false,
         signupForm: {
            name: '',
            title: '',
            email: '',
            password: ''
         },
         resetForm: '',
         errorMSG: false,
         emailSent: false,
      }
   },
   methods: {
      login() {
         this.$store.dispatch('login', {
            email: this.loginForm.email,
            password: this.loginForm.password
         }).then(() => {
            this.errorMSG = false
         })
         .catch(err => {
            console.log(err.message)
            if(err){
               this.errorMSG = err.message
            }
         })
      },
      // signup() {
      //    this.$store.dispatch('signup', {
      //       email: this.signupForm.email,
      //       password: this.signupForm.password,
      //       name: this.signupForm.name,
      //       title: this.signupForm.title
      //    }).then(() => {
      //       this.errorMSG = false
      //    })
      //    .catch(err => {
      //       console.log(err.message)
      //       if(err){
      //          this.errorMSG = err.message
      //       }
      //    })
      // },
      reset(){
         if(this.resetForm !== ''){
            var auth = firebase.auth()
            console.log(auth)
            console.log(this.resetForm)
            // var emailAddress = "user@example.com";

            auth.sendPasswordResetEmail(this.resetForm).then(function() {

            }).then(() => {
               this.emailSent = true
            })
            .catch(function(error) {
            });
         }
      },
      toggleForm() {
         this.showLoginForm = !this.showLoginForm
      },
      togglePasswordReset() {
       this.showPasswordReset = !this.showPasswordReset
      },
      toggleFormFromReset(){
         this.showPasswordReset = false
         if(this.emailSent){
            this.resetForm = ''
         }
         this.emailSent = false
      }
   }
}
</script>

<style scoped lang="scss">
.layout{
   justify-content: center;
}
.form__login{
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      width: 320px;
      margin-top: 16vh;
      }
.form__component{
   width: 320px;
}
h2.form__component{
   font-weight: 500;
   margin-bottom: 20px;
   font-size: 24px;
}
input.form__component{
   background: #ffffff;
   height: 40px;
   padding: 0 10px;
   margin-bottom: 15px;
   border-radius: 4px;
   box-shadow: 0px 0px 24px 0px rgba(0,0,0,0.17);
}
.button{
   height: 45px;
   border-radius: 5px;
   background: #5161be;
   color: #ffffff;
   letter-spacing: 1.4px;
}
.aButton-wrapper{
   display: flex;
   justify-content: space-around;
}
.aButton{
   display: block;
   color: #5161be;
   margin-top: 10px;
}
.err__text{
   color: red;
}
</style>
