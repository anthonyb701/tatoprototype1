<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/create">
          <v-list-item-action>
            <v-icon>mdi-folder-plus-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Create New</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!userIsAuthenticated" to="/auth">
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userIsAuthenticated" to="/profile">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userIsAuthenticated"  @click="logout()">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
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
      <v-toolbar-title @click="toMain">Application</v-toolbar-title>
    </v-app-bar>
    
    <v-main class="mx-5">
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
    drawer: false
  }),
};
</script>
