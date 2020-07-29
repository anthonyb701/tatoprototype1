<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link to="/" v-if="userIsAuthenticated">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Список</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/create" v-if="userIsAuthenticated">
          <v-list-item-action>
            <v-icon>mdi-folder-plus-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Створити Запис</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!userIsAuthenticated" to="/auth">
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Увійти</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userIsAuthenticated" to="/profile">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Профіль</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userIsAuthenticated"  @click="logout()">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Вийти</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
      
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title @click="toMain">Урологія</v-toolbar-title>
    </v-app-bar>
    <v-layout row wrap  class="setTop" v-if="isLoading">
        <v-flex xs12 class="text-center">
           <v-progress-circular
            indeterminate
            color="primary"
            :width="7"
            :size="70"
           ></v-progress-circular>
        </v-flex>
     </v-layout>
    <v-main v-if="!isLoading" class="layout">
         <keep-alive>
          <router-view class="mx-3"></router-view>
         </keep-alive>
    </v-main>
    
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
      <span class="ml-4 white--text" @click="goProfile" v-if="userIsAuthenticated">{{userProfile.name}} </span>
      <span v-else class="ml-4 white--text" @click="goLogin" style="cursor: pointer">Login</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    
  },
  computed: {
    userIsAuthenticated(){
      return this.$store.getters.user
    },
    userProfile(){
      return this.$store.getters.userProfile
    },
    isLoading(){
      return this.$store.getters.isLoading
    }
  },
  methods: {
    toMain(){
      this.$router.push('/').catch(()=>{})
    },
    logout() {
      this.$store.dispatch('logout').catch(()=>{});
      this.$router.push('/auth').catch(()=>{});
      
    },
    goLogin(){
      this.$router.push('/auth').catch(()=>{})
    },
    goProfile(){
      this.$router.push('/profile').catch(() => {})
    }
  },

  data: () => ({
    drawer: false,
    
  }),
};
</script>

<style scope lang="scss">
   .v-application--wrap{
     background-color: #f0f3f7;
   }
  .v-progress-circular {
    margin: 1rem;
  }
  .setTop{
    margin-top: 100px;
  }
  
  @media (max-width: 360px){
    * {
      font-size: 14px;
    }
  }
  @media (min-width: 361px) and ( max-width: 390px){
    * {
      font-size: 15px;
    }
  }
  @media (min-width: 320px) and (max-width: 430px){
    .btn-appo-edit > .v-btn__content{
      font-size: 12px!important;
    }
    .btn-appo-edit{
      margin: 0!important;
    }
  }
  
</style>
<style  lang="scss">
   
   * i{ font-family: 'Material Icons'; }
   
   
</style>