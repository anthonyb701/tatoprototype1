<template>
<div :class="{ 'signup-form': !showLoginForm, 'login-form' : showLoginForm}" class="layout">
   <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>
   <form v-if="showLoginForm && !showPasswordReset" @submit.prevent>
   <section class="form__login">
      <h2 class="form__component">Авторизація</h2>
      <p class="err__text" v-if="errorMSG">{{errorMSG}}</p>
      <!-- <label for="email1">Email</label> -->
      <input v-model.trim="loginForm.email" type="text" class="form__component" placeholder="E-mail" id="email1" />
      <!-- <label for="password1">Password</label> -->
      <input v-model.trim="loginForm.password" type="password" class="form__component" placeholder="Пароль" id="password1" />
      <button class="button form__component" @click="login()">УВІЙТИ</button>
      <a @click.prevent="toggleForm()" class="aButton">Створити Аккаунт</a>
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
      <input v-model.trim="signupForm.email" type="text" placeholder="E-mail" class="form__component" id="email2" />
      <input v-model.trim="signupForm.password" type="password" class="form__component" placeholder="Пароль" id="password2" />
   <button @click="signup()" class="button form__component">ЗАРЕЄЕСТРУВАТИСЯ</button>
   <a @click.prevent="toggleForm()" class="aButton">Перейти до входу</a>
    </section>
</form>
</div>
</template>

<script>
import PasswordReset from '../views/PasswordReset'

export default {
   components: {
      'PasswordReset' : PasswordReset
   },
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
         errorMSG: false
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
      signup() {
         this.$store.dispatch('signup', {
            email: this.signupForm.email,
            password: this.signupForm.password,
            name: this.signupForm.name,
            title: this.signupForm.title
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
      toggleForm() {
         this.showLoginForm = !this.showLoginForm
      },
      togglePasswordReset() {
       this.showPasswordReset = !this.showPasswordReset
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
.aButton{
   display: block;
   color: #5161be;
   margin-top: 10px;
}
.err__text{
   color: red;
}
</style>
