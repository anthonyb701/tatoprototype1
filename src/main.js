import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import moment from 'moment'
import dateFilter from './filters/date'
import dateRelease from './filters/dateRelease'
import uploadNewImg from './components/uploadImg.vue'
import editDate from './components/edit/editdate.vue'
import editTime from './components/edit/edittime.vue'
import editDetails from './components/edit/editdetails.vue'
import editdateEntry from './components/edit/editdateEntry.vue'
import editdateLeft from './components/edit/editdateLeft.vue'
import editdateAge from './components/edit/editdateAge.vue'
import editDuration from './components/edit/editDuration.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { auth } from '../firebase'

Vue.filter('dateF', dateFilter)
Vue.filter('dateR', dateRelease)
Vue.component('upload-img', uploadNewImg)
Vue.component('edit-date', editDate)
Vue.component('edit-time', editTime)
Vue.component('edit-details', editDetails)
Vue.component('edit-dateentry', editdateEntry)
Vue.component('edit-dateleft', editdateLeft)
Vue.component('edit-dateage', editdateAge)
Vue.component('edit-duration', editDuration)


Vue.config.productionTip = false

let app
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
  if (user) {
    store.dispatch('fetchUserProfile', user)
    store.commit('setCurrentUser', user.uid)
  }
})



