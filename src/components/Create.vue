<template>
<v-layout row wrap class="main-wrap-main">
   <ValidationObserver ref="observer" v-slot="{  }">
      <!-- v-slot {validate, reset} -->
      <form v-on:submit.prevent="submit">

         <div class="form_section">
            <ValidationProvider class="form-comp" v-slot="{ errors }" name="Name" rules="required">
               <v-text-field v-model="firstName" :error-messages="errors" class="create__component" label="Прізвище" required></v-text-field>
            </ValidationProvider>
            <ValidationProvider class="form-comp" v-slot="{ errors }" name="Name" rules="required">
               <v-text-field v-model="lastName" :error-messages="errors" class="create__component" label="Імя" required></v-text-field>
            </ValidationProvider>
            <ValidationProvider class="form-comp" v-slot="{ errors }" name="Name" rules="required">
               <v-text-field v-model="title" :error-messages="errors" class="create__component" label="Назва Операції" required></v-text-field>
            </ValidationProvider>
            <ValidationProvider class="form-comp" v-slot="{ errors }" name="Name" rules="required">
               <v-text-field v-model="op_code" :error-messages="errors" class="create__component" label="Код Операції" required></v-text-field>
            </ValidationProvider>
            <ValidationProvider class="form-comp" v-slot="{ errors }" name="Name" rules="required">
               <v-text-field v-model="nozologia" :error-messages="errors" class="create__component" label="Нозологія" required></v-text-field>
            </ValidationProvider>
            <ValidationProvider class="form-comp" v-slot="{ errors }" name="Name" rules="required">
               <v-text-field v-model="op_number" :error-messages="errors" class="create__component" label="Номер Операції" required></v-text-field>
            </ValidationProvider>

            <ValidationProvider class="form-comp" v-slot="{ errors }" name="select" rules="required">
               <v-select v-model="surgeon" :items="items" :error-messages="errors" class="create__component" label="Хірург" data-vv-name="select" required></v-select>
            </ValidationProvider>
            <ValidationProvider class="form-comp" v-slot="{ errors }" name="select" rules="required">
               <v-select v-model="assistant" :items="items" :error-messages="errors" class="create__component" label="Асистент" data-vv-name="select" required></v-select>
            </ValidationProvider>
            <ValidationProvider class="form-comp" v-slot="{ errors }" name="select" rules="required">
               <v-select v-model="anesthesiologist" :items="anesthesiologistItems" :error-messages="errors" class="create__component" label="Анестезіолог" data-vv-name="select" required></v-select>
            </ValidationProvider>
            <ValidationProvider class="form-comp" v-slot="{ errors }" name="select" rules="required">
               <v-select v-model="medsister" :items="medsisterItems" :error-messages="errors" class="create__component" label="Операційна Сестра" data-vv-name="select" required></v-select>
            </ValidationProvider>
            <ValidationProvider class="form-comp" v-slot="{ errors }" name="select" rules="required">
               <v-select v-model="rank" :items="rankItems" :error-messages="errors" class="create__component" label="Звання" data-vv-name="select" required></v-select>
            </ValidationProvider>
            <ValidationProvider class="form-comp" v-slot="{ errors }" name="select" rules="required">
               <v-select v-model="timeType" :items="timeTypeItems" :error-messages="errors" class="create__component" label="Первинна/ Повторна" data-vv-name="select" required></v-select>
            </ValidationProvider>
            <ValidationProvider class="form-comp" v-slot="{ errors }" name="select" rules="required">
               <v-select v-model="urgencyType" :items="urgencyTypeItems" :error-messages="errors" class="create__component" label="Планова / Ургентна" data-vv-name="select" required></v-select>
            </ValidationProvider>
            <ValidationProvider class="form-comp" v-slot="{ errors }" name="select" rules="required">
               <v-select v-model="operationType" :items="operationTypeItems" :error-messages="errors" class="create__component" label="Тип операції" data-vv-name="select" required></v-select>
            </ValidationProvider>
            <ValidationProvider class="form-comp" v-slot="{ errors }" name="select" rules="required">
               <v-select v-model="anesthesiaType" :items="anesthesiaTypeItems" :error-messages="errors" class="create__component" label="Тип анестезії" data-vv-name="select" required></v-select>
            </ValidationProvider>
            <ValidationProvider class="form-comp" v-slot="{ errors }" name="select" rules="required">
               <v-select v-model="spotType" :items="spotTypeItems" :error-messages="errors" class="create__component" label="Стаціонарна/ Амбулаторна" data-vv-name="select" required></v-select>
            </ValidationProvider>
            <ValidationProvider class="form-comp" v-slot="{ errors }" name="select" rules="required">
               <v-select v-model="ultimateType" :items="ultimateTypeItems" :error-messages="errors" class="create__component" label="Виписаний / Помер" data-vv-name="select" required></v-select>
            </ValidationProvider>

            <!-- <v-date-picker v-model="date"></v-date-picker> -->
            <!-- <v-time-picker v-model="time" format="24hr"></v-time-picker> -->

            <!-- <v-dialog
        ref="dialog"
        v-model="modal2"
        :return-value.sync="time"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            class="create__component" label="Picker in dialog"
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
      </v-dialog> -->
            <div class="form-comp">
               <v-menu ref="menu1" v-model="modalEntry" :close-on-content-click="false" :return-value.sync="dateEntry" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                     <v-text-field v-model="dateEntry" class="create__component date__component" label="Дата поступлення" prepend-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="dateEntry" no-title scrollable locale="uk-UA"> 
                     <v-spacer></v-spacer>
                     <v-btn text color="primary" @click="modalEntry = false">Cancel</v-btn>
                     <v-btn text color="primary" @click="$refs.menu1.save(dateEntry)">OK</v-btn>
                  </v-date-picker>
               </v-menu>
            </div>
            <div class="form-comp">
               <v-menu ref="menu2" v-model="modalLeft" :close-on-content-click="false" :return-value.sync="dateLeft" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                     <v-text-field v-model="dateLeft" class="create__component date__component" label="Дата виписки" prepend-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="dateLeft" no-title scrollable locale="uk-UA">
                     <v-spacer></v-spacer>
                     <v-btn text color="primary" @click="modalLeft = false">Cancel</v-btn>
                     <v-btn text color="primary" @click="$refs.menu2.save(dateLeft)">OK</v-btn>
                  </v-date-picker>
               </v-menu>
            </div>
            <div class="form-comp">
               <v-menu ref="menu" v-model="modal" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                     <v-text-field v-model="date" class="create__component date__component" label="Дата операції" prepend-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable locale="uk-UA">
                     <v-spacer></v-spacer>
                     <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                     <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                  </v-date-picker>
               </v-menu>
            </div>
            <div class="form-comp">
               <v-menu ref="menu4" v-model="modalAge" :close-on-content-click="false" :return-value.sync="dateAge" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                     <v-text-field v-model="dateAge" class="create__component date__component" label="Дата народження" prepend-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="dateAge" no-title scrollable locale="uk-UA">
                     <v-spacer></v-spacer>
                     <v-btn text color="primary" @click="modalAge = false">Cancel</v-btn>
                     <v-btn text color="primary" @click="$refs.menu4.save(dateAge)">OK</v-btn>
                  </v-date-picker>
               </v-menu>
            </div>
            <div class="form-comp">
               <v-menu ref="menuStart" v-model="menuStart" :close-on-content-click="false" :nudge-right="40" :return-value.sync="timeStart" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                     <v-text-field v-model="timeStart" class="create__component date__component" label="Початок операції" prepend-icon="access_time" readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-time-picker v-if="menuStart" format="24hr" v-model="timeStart" full-width :max="timeEnd" @click:minute="$refs.menuStart.save(timeStart)"></v-time-picker>
               </v-menu>
            </div>
            <div class="form-comp">
               <v-menu ref="menuEnd" v-model="menuEnd" :close-on-content-click="false" :nudge-right="40" :return-value.sync="timeEnd" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                     <v-text-field v-model="timeEnd" class="create__component date__component" label="Кінець операції" prepend-icon="access_time" readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-time-picker v-if="menuEnd" format="24hr" v-model="timeEnd" :min="timeStart" full-width @click:minute="$refs.menuEnd.save(timeEnd)"></v-time-picker>
               </v-menu>
            </div>

            <div class="form-comp">
               <v-textarea name="textarea" v-model="description" class="create__component" label="Опис Операції" hint="Введіть текст" required></v-textarea>
            </div>
            <div class="form-comp">
               <v-textarea name="textarea" v-model="complexity" class="create__component" label="Ускладнення" hint="Введіть текст" required></v-textarea>
            </div>
            <div class="form-comp">
               <v-textarea name="textarea" v-model="gisto" class="create__component" label="Гістологічне Заключення" hint="Введіть текст" required></v-textarea>
            </div>
         </div>
         <div class="section__action">
            <div>
               <div class="section__confirm">
                  <v-checkbox v-model="checkbox" value="1" label="Підтвердити" type="checkbox" required></v-checkbox>
               </div>
               <div class="section__buttons">
                  <v-btn @click="clear" class="pa-2 mr-2 white--text red darken-2 btn-width1">Стерти <v-icon class="ml-2">mdi-delete-sweep-outline</v-icon>
                  </v-btn>
                  <v-btn type="submit" class=" pa-2 white--text blue darken-2 btn-width1">Відправити <v-icon class="ml-2">mdi-playlist-check</v-icon>
                  </v-btn>
               </div>
            </div>
         </div>
      </form>
   </ValidationObserver>
</v-layout>
</template>

<script>
import {
   required,
   email,
   max
} from 'vee-validate/dist/rules'
import {
   extend,
   ValidationObserver,
   ValidationProvider,
   setInteractionMode
} from 'vee-validate'
setInteractionMode('eager')

extend('required', {
   ...required,
   message: 'Це поле не може бути пустим',
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
      modalEntry: false,
      modalLeft: false,
      modalAge: false,
      menuStart: false,
      menuEnd: false,
      firstName: '',
      lastName: '',
      surgeon: null,
      title: '',
      op_code: '',
      date: new Date().toISOString().substr(0, 10),
      dateEntry: new Date().toISOString().substr(0, 10),
      dateLeft: new Date().toISOString().substr(0, 10),
      dateAge: new Date().toISOString().substr(0, 10),
      time: new Date(),
      timeStart: null,
      timeEnd: null,
      // items: [
      //   'Бітнер',
      //   'Поліщук',
      //   'Леськів Я.О',
      //   'Терешенко',
      //   'Кльофа',
      //   'Леськів Д.Я',
      //   'Дурач',
      //   'Інший'
      // ],
      rank: '',
      timeType: '',
      // ranksItems: [
      //   'Строкова Служба',
      //   'Контракт',
      //   'Офіцер',
      //   'Пенсіонер',
      //   'Платний',
      //   'Договірний',
      //   'Тематичний',
      //   'Інший'
      // ],
      checkbox: null,
      description: '',
      op_number: '',
      complexity: '',
      nozologia: '',
      gisto: '',
      urgencyType: '',
      operationType: '',
      anesthesiaType: '',
      spotType: '',
      ultimateType: '',
      assistant: '',
      anesthesiologist: '',
      medsister: '',
   }),
   computed: {
      submittableDateTime() {
         const date = new Date(this.date)
         date.setHours(0)
         date.setMinutes(0)
         date.setSeconds(0)
         console.log(date)
         return date
      },
      submittableDateEntry() {
         const dateEntry = new Date(this.dateEntry)
         dateEntry.setHours(0)
         dateEntry.setMinutes(0)
         dateEntry.setSeconds(0)
         console.log(dateEntry)
         return dateEntry
      },
      submittableDateLeft() {
         const dateLeft = new Date(this.dateLeft)
         dateLeft.setHours(0)
         dateLeft.setMinutes(0)
         dateLeft.setSeconds(0)
         console.log(dateLeft)
         return dateLeft
      },
      submittableDateAge() {
         const dateAge = new Date(this.dateAge)
         dateAge.setHours(0)
         dateAge.setMinutes(0)
         dateAge.setSeconds(0)
         console.log(dateAge)
         return dateAge
      },
      sumbittableDuration() {
         let sumStart
         let sumEnd
         let ultimateHours
         let ultimateMinutes
         let ultimateTime
         if (this.timeStart !== null) {
            let startHours = parseInt(this.timeStart.substr(0, 2), 10) * 60
            let startMinutes = parseInt(this.timeStart.substr(3, 5), 10)
            sumStart = startHours + startMinutes

         }
         if (this.timeEnd !== null) {
            let endHours = parseInt(this.timeEnd.substr(0, 2), 10) * 60
            let endMinutes = parseInt(this.timeEnd.substr(3, 5), 10)

            sumEnd = endHours + endMinutes

         }
         if (this.timeStart !== null && this.timeEnd !== null) {
            let difference = (sumEnd - sumStart)

            let hours = Math.floor(difference / 60)

            let minutes = difference - (hours * 60)

            if (hours < 10) {
               ultimateHours = `0${hours}`
            } else {
               ultimateHours = hours.toString()
            }
            if (minutes < 10) {
               ultimateMinutes = `0${minutes}`
            } else {
               ultimateMinutes = minutes.toString()
            }
            ultimateTime = `${ultimateHours}год:${ultimateMinutes}хв`
         }
         if (typeof (ultimateTime) === 'string') {
            return ultimateTime
         }

      },
      ageNumber() {
         const date = new Date()
         let ageNumber = Math.floor((date.getTime() - this.submittableDateAge.getTime()) / (1000 * 3600 * 24 * 365))
         return ageNumber
      },
      items() {
         return this.$store.getters.items
      },
      rankItems() {
         return this.$store.getters.rankItems
      },
      timeTypeItems() {
         return this.$store.getters.timeTypeItems
      },
      urgencyTypeItems() {
         return this.$store.getters.urgencyTypeItems
      },
      operationTypeItems() {
         return this.$store.getters.operationTypeItems
      },
      anesthesiaTypeItems() {
         return this.$store.getters.anesthesiaTypeItems
      },
      medsisterItems() {
         return this.$store.getters.medsisterItems
      },
      spotTypeItems() {
         return this.$store.getters.spotTypeItems
      },
      ultimateTypeItems() {
         return this.$store.getters.ultimateTypeItems
      },
      anesthesiologistItems() {
         return this.$store.getters.anesthesiologistItems
      },
   },

   methods: {
      submit() {
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
            dateEntry: this.submittableDateEntry,
            dateLeft: this.submittableDateLeft,
            dateAge: this.submittableDateAge,
            description: this.description,
            user: {
               firstName: this.firstName,
               lastName: this.lastName
            },
            op_number: this.op_number,
            op_code: this.op_code,
            complexity: this.complexity,
            rank: this.rank,
            nozologia: this.nozologia,
            gisto: this.gisto,
            timeType: this.timeType,
            urgencyType: this.urgencyType,
            operationType: this.operationType,
            anesthesiaType: this.anesthesiaType,
            spotType: this.spotType,
            ultimateType: this.ultimateType,
            assistant: this.assistant,
            anesthesiologist: this.anesthesiologist,
            medsister: this.medsister,
            age: this.ageNumber,
            duration: this.sumbittableDuration
         })
         this.$router.push('/')
         console.log('sended')
         this.$destroy();
      },

      clear() {
         this.firstName = ''
         this.lastName = ''
         this.surgeon = null
         this.title = ''
         this.checkbox = null
         this.description = ''
         this.op_number = ''
         this.complexity = ''
         this.rank = ''
         this.nozologia = ''
         this.gisto = ''
         this.timeType = ''
         this.urgencyType = ''
         this.operationType = ''
         this.anesthesiaType = ''
         this.spotType = ''
         this.ultimateType = ''
         this.assistant = ''
         this.medsister = ''
         this.ageNumber = ''
         this.sumbittableDuration = ''
         this.timeStart = null
         this.timeEnd = null
         this.date = new Date().toISOString().substr(0, 10)
         this.dateEntry = new Date().toISOString().substr(0, 10)
         this.dateEntry = new Date().toISOString().substr(0, 10)
         this.dateAge = new Date().toISOString().substr(0, 10)
         this.$refs.observer.reset()
      },
   }
}
</script>

<style lang="scss" scoped>
.btn-width1 {
   width: 180px;
   height: 45px !important;
   text-align: center;
   font-size: 18px;
}

.create__component {
   background: #ffffff;

   padding: 2px 10px;
   padding-top: 17px;
   margin-bottom: 15px;
   border-radius: 4px;
   box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.17);
}

.date__component {
   padding: 0px 10px;
   padding-top: 25px;
}

.form_section {
   display: flex;
   flex-wrap: wrap;
   padding-top: 15px;
}

.form-comp {
   margin: 2px 15px;
   flex: 18%;
}

.section__action {
   margin: 20px;
   margin-top: -10px;
   display: flex;
   flex-direction: column;
   align-items: flex-end;
   margin-right: 80px;
}

.section__confirm {
   align-self: flex-start;
}

@media (max-width: 1100px) {
   .form-comp {
      flex: 25%;
   }
}

@media (max-width: 768px) {
   .form-comp {
      flex: 38%;
   }
}

@media (max-width: 500px) {
   .form-comp {
      flex: 100%;;
   }
   .btn-width1 {
      width: 135px;
      height: 45px !important;
      text-align: center;
      font-size: 12px;
   }

   .section__buttons {
      display: flex;
      justify-content: center;
   }

   .section__action {
      align-items: center;
      margin-right: 0px;
   }
}
.main-wrap-main{
   overflow-x: hidden;
}
</style>
<style lang="scss">
.v-input--checkbox>.v-input__control>.v-input__slot>.v-label {
   color: black !important;
   font-weight: 400;
   letter-spacing: 1.1px;
   font-size: 16px;
}

.v-application--wrap {
   background-color: #ffffff;
}

.v-text-field__slot>.v-label {
   color: #4285f4;
   font-size: 18px !important;
   font-weight: 500;
}

.v-text-field__slot>input {
   margin-top: 5px;
   margin-bottom: -5px;
   font-size: 18px !important;
}

.v-input__slot:before {
   content: none !important;
}

.create__component.v-text-field {
   margin-top: 0 !important;
}

.v-select__slot>.v-label {
   color: #4285f4 !important;
   font-size: 18px !important;
   font-weight: 500;
}

.v-select__selection--comma {
   margin-top: 14px;
   margin-bottom: 11px;
   font-size: 18px !important;
}
</style>
