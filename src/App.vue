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
          <router-view class="mx-3"></router-view>
    </v-main>
    
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
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
    }
  },
  methods: {
    toMain(){
      this.$router.push('/')
    },
    logout() {
      this.$store.dispatch('logout').catch(()=>{});
      this.$router.push('/auth').catch(()=>{});
    }
  },

  data: () => ({
    drawer: false
  }),
};
</script>
