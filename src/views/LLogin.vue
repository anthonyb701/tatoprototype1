<template>
<div :class="{ 'signup-form': !showLoginForm, 'login-form' : showLoginForm}" >
   <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>
   <form v-if="showLoginForm && !showPasswordReset" @submit.prevent>
   <h1>Welcome Back</h1>
   <p v-if="errorMSG">{{errorMSG}}</p>
   <div>
      <label for="email1">Email</label>
      <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />
   </div>
   <div>
      <label for="password1">Password</label>
      <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
   </div>
   <button class="button" @click="login()">Log In</button>
   <div class="extras">
      <a @click="togglePasswordReset()">Forgot Password</a>
      <a @click.prevent="toggleForm()">Create an Account</a>
   </div>
</form>
<form  v-if="!showPasswordReset && !showLoginForm" @submit.prevent>
   <h1>Get Started</h1>
   <div>
      <label for="name">Name</label>
      <input v-model.trim="signupForm.name" type="text" placeholder="Savvy Apps" id="name" />
   </div>
   <div>
      <label for="title">Title</label>
      <input v-model.trim="signupForm.title" type="text" placeholder="Company" id="title" />
   </div>
   <div>
      <label for="email2">Email</label>
      <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />
   </div>
   <div>
      <label for="password2">Password</label>
      <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />
   </div>
   <button @click="signup()" class="button">Sign Up</button>
   <div class="extras">
      <a @click.prevent="toggleForm()">Back to Log In</a>
   </div>
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

<style></style>
