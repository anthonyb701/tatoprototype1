<template>
  <v-container row wrap>
      <ValidationObserver ref="observer" v-slot="{ validate, reset }">
    <form v-on:submit.prevent="submit" >
      <ValidationProvider v-slot="{ errors }" name="Name" rules="required|max:18">
        <v-text-field
          v-model="firstName"
          :counter="10"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </ValidationProvider>
       <ValidationProvider v-slot="{ errors }" name="Name" rules="required|max:18">
        <v-text-field
          v-model="lastName"
          :counter="10"
          :error-messages="errors"
          label="Last Name"
          required
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" name="Name" rules="required">
        <v-text-field
          v-model="title"
          :counter="10"
          :error-messages="errors"
          label="Title"
          required
        ></v-text-field>
      </ValidationProvider>
      <v-textarea
          name="textarea"
          v-model="description"
          label="Description"
          hint="Hint text"
          required
        ></v-textarea>
      <ValidationProvider v-slot="{ errors }" name="select" rules="required">
        <v-select
          v-model="surgeon"
          :items="items"
          :error-messages="errors"
          label="Surgeon"
          data-vv-name="select"
          required
        ></v-select>
      </ValidationProvider>
      <v-menu
        ref="menu"
        v-model="modal"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in menu"
            prepend-icon="event"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
      <!-- <v-date-picker v-model="date"></v-date-picker> -->
      <!-- <v-time-picker v-model="time" format="24hr"></v-time-picker> -->
      <v-dialog
        ref="dialog"
        v-model="modal2"
        :return-value.sync="time"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            label="Picker in dialog"
            prepend-icon="access_time"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          format="24hr"
          v-if="modal2"
          v-model="time"
          full-width
        >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(time)" >OK</v-btn>
        </v-time-picker>
      </v-dialog>
      <ValidationProvider v-slot="{ errors, valid }" rules="required" name="checkbox">
        <v-checkbox
          v-model="checkbox"
          :error-messages="errors"
          value="1"
          label="Confirm"
          type="checkbox"
          required
        ></v-checkbox>
      </ValidationProvider>

      <v-btn type="submit" class="mr-4" >submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </ValidationObserver>
  </v-container>
</template>

<script>
import { required, email, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  // extend('email', {
  //   ...email,
  //   message: 'Email must be valid',
  // })

export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      modal: false,
      modal2: false,
      firstName: '',
      lastName: '',
      surgeon: null,
      title: '',
      date: new Date().toISOString().substr(0, 10),
      time: new Date(),
      items: [
        'Bitner Vasyl Antonovych',
        'Durach',
        'Leskiv',
        'Michael Jordan',
      ],
      checkbox: null,
      description: ''
    }),
    computed: {
      submittableDateTime(){
        const date = new Date(this.date)
        if(typeof this.time === 'string'){
          const hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        
        return date
      }
    },

    methods: {
      submit () {
        this.$refs.observer.validate()
        // this.$store.commit('setAppointment', {
        //     surgeon: this.surgeon,
        //     title: this.title,
        //     date: this.submittableDateTime,
        //     id: '12xd47384',
        //     description: this.description,
        //     user: {
        //         firstName: this.firstName,
        //         lastName: this.lastName
        //     },
            
        // }),
        this.$store.dispatch('setAppointment', {
            surgeon: this.surgeon,
            title: this.title,
            date: this.submittableDateTime,
            description: this.description,
            user: {
                firstName: this.firstName,
                lastName: this.lastName
            },
            
        } )
        this.$router.push('/')
        console.log('sended') 
        this.$destroy();
      },
      
      clear () {
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$refs.observer.reset()
      },
    }
}
</script>

<style>

</style>