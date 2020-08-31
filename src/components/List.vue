<template>
<main>
   <!-- <button v-if="!isArchive" @click.prevent="onArchive" class="pa-1 btn-archive blue white--text">Open Archive</button>
   <button v-else @click.prevent="onArchive" class="pa-1 btn-archive white--text red">Close Archive</button> -->
   
   <v-layout row wrap v-if="isFilter" class="layoutTT">
      <v-flex xs12  class="layout-unit">
         <v-select :items="items" label="Хірург" v-model="pickedSurgeon"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <v-select :items="items" label="Ассистент" v-model="pickedAssistant"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <v-select :items="anesthesiologistItems" label="Анестезіолог" v-model="pickedAnesthesiologist"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <v-select :items="medsisterItems" label="Операційна Сестра" v-model="pickedMedsister"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <v-select :items="rankItems" label="Звання" v-model="pickedRank"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <v-select :items="timeTypeItems" label="Первинна / Повторна" v-model="pickedTimeType"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <v-select :items="urgencyTypeItems" label="Планова / Ургентна" v-model="pickedUrgencyType"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <v-select :items="operationTypeItems" label="Тип операції..." v-model="pickedOperationType"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <v-select :items="anesthesiaTypeItems" label="Тип анестезії..." v-model="pickedAnesthesiaType"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <v-select :items="spotTypeItems" label="Стаціонарна/ Амбулаторна" v-model="pickedSpotType"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <v-select :items="complicationItems" label="Складність..." v-model="searchComplication"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <v-select :items="ultimateTypeItems" label="Виписаний / Помер" v-model="picekdUltimateType"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <div class="search-wrapper">
            <v-text-field  v-model="searchName" label="Прізвище І. Б.." />

         </div>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <div class="search-wrapper">
            <v-text-field label="Назва операції.." v-model="searchTitle" />

         </div>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <div class="search-wrapper">
            <v-text-field  v-model="searchAge" label="Вік.." />

         </div>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <div class="search-wrapper">
            <v-text-field  v-model="searchOp_code" label="Код операції.." />
         </div>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <div class="search-wrapper">
            <v-text-field v-model="searchOp_number" label="Номер операції.." />

         </div>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <div class="search-wrapper">
            <v-text-field v-model="searchNozologia" label="Нозологія.." />
         </div>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <div class="search-wrapper">
            <v-text-field v-model="searchSicknessHistory" label="Історія Хвороби.." />
         </div>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <div class="search-wrapper">
            <v-text-field v-model="searchDiagnosisUltimate" label="Кінцевий діагноз.." />
         </div>
      </v-flex>
      
      <v-flex xs12  class="layout-unit">
         <v-menu ref="menu" v-model="editDialog" :close-on-content-click="false" :return-value.sync="pickedDate" transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on, attrs }">
               <v-text-field v-model="pickedDate" label="Дата операції" prepend-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="pickedDate" range locale="uk-UA" no-title scrollable>
               <v-spacer></v-spacer>
               <v-btn text color="primary" @click="onResetDate(); $refs.menu.save(pickedDate);">Очистити</v-btn>
               <v-btn text color="primary" @click="onClose">Скасувати</v-btn>
               <v-btn text color="primary" @click="onSaveChanges(); $refs.menu.save(pickedDate); ">OK</v-btn>
            </v-date-picker>
         </v-menu>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <v-menu ref="menuEntry" v-model="editDialog1" :close-on-content-click="false" :return-value.sync="pickedDateEntry" transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on, attrs }">
               <v-text-field v-model="pickedDateEntry" label="Дата поступлення" prepend-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="pickedDateEntry" range locale="uk-UA" no-title scrollable>
               <v-spacer></v-spacer>
               <v-btn text color="primary" @click="onResetEntry(); $refs.menuEntry.save(pickedDateEntry);">Очистити</v-btn>
               <v-btn text color="primary" @click="onClose">Скасувати</v-btn>
               <v-btn text color="primary" @click="onSaveChangesEntry(); $refs.menuEntry.save(pickedDateEntry); ">OK</v-btn>
            </v-date-picker>
         </v-menu>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <v-menu ref="menuLeft" v-model="editDialog2" :close-on-content-click="false" :return-value.sync="pickedDateLeft" transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on, attrs }">
               <v-text-field v-model="pickedDateLeft" label="Дата виписки" prepend-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="pickedDateLeft" range locale="uk-UA" no-title scrollable>
               <v-spacer></v-spacer>
               <v-btn text color="primary" @click="onResetLeft(); $refs.menuLeft.save(pickedDateLeft)">Очистити</v-btn>
               <v-btn text color="primary" @click="onClose">Скасувати</v-btn>
               <v-btn text color="primary" @click="onSaveChangesLeft(); $refs.menuLeft.save(pickedDateLeft); ">OK</v-btn>
            </v-date-picker>
         </v-menu>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <v-select :items="pickedComplexityItems" label="Тип ускладнення..." v-model="pickedComplexity"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit">
         <div class="search-wrapper">
            <v-textarea name="textarea" v-model="searchComplexity" label="Ускладнення" hint="Введіть текст" rows="2"></v-textarea>
         </div>
      </v-flex>
   </v-layout>
   <v-flex xs12 sm12>
         <!-- <button @click="clearDate" class="pa-1 red white--text darken-2">Clear Date</button> -->
         <button @click="clearFilter" class=" blue white--text darken-2 btn-archive">Очистити фільтр</button>
         <button v-if="!isFilter" @click="isFilter = !isFilter" class="btn-archive green white--text">Відкрити фільтр</button>
         <button v-else @click="closeFilter" class=" btn-archive white--text red">Закрити фільтр</button>
      </v-flex>
   <v-layout row wrap class="buttons__section">
      <p class="info__button blue darken-4 white--text">Кількість пацієнтів: {{filteredAppointments.length}}</p>
      <p @click="sumOfBeforeBeds" class="info__button blue darken-4 white--text">Передопераційне ліжко: {{showSum}}</p>
      <p @click="sumOfAfterBeds" class="info__button blue  darken-4 white--text">Післяопераційне ліжко: {{showSumAfter}}</p>
   </v-layout>
   
   <v-layout row wrap class="layoutsec">
      <section class="section">
         <div v-for="appointment in filteredAppointments" :key="appointment.id"  class="appo-div">
            <v-card>
               <v-card-title primary-title class="appo-title">
                  {{ appointment.title}}
                <div class="zvit-wrapper">
                  <v-btn text class="ml-3 blue darken-4 white--text btn-zvit" @click="onOpenSingleRelease(appointment.id)">
                     Звіт <v-icon>assignment_turned_in</v-icon>
                  </v-btn>
                </div>
                  
                  
               </v-card-title>
               <v-card-text @click="onOpenSingle(appointment.id)">
                  <h2 class="appo-unit">Операція: {{ appointment.date | dateF }}</h2>
                  <h2 class="appo-unit">Код операції: {{ appointment.op_code}}</h2>
                  <h2 class="appo-unit">Пацієнт: {{appointment.user.firstName}} {{appointment.user.lastName}}</h2>
                  <h2 class="appo-unit">Хірург: {{appointment.surgeon}}</h2>
               </v-card-text>

            </v-card>
         </div>
      </section>
   </v-layout>
</main>
</template>

<script>
export default {
   name: 'list',
   computed: {
      appointments() {
         return this.$store.getters.sortedAppointments
      },
      featuredAppointments() {
         return this.$store.getters.featuredAppointments
      },
      items() {
         let retArr = [
            'без фільтру',
            ...this.$store.getters.items
         ]
         return retArr
      },
      allAppointments: {
         get() {
            if (this.isArchive != true) {
               return this.$store.getters.featuredAppointments
            } else {
               return this.$store.getters.sortedAppointments
            }
         },
         set() {

         }

      },
      filteredAppointments() {
         let filteredArray = []
         if (this.pickedSurgeon === 'без фільтру' && this.searchName.trim() === '' && this.readyDate === null &&
            this.searchOp_number.trim() === '' && this.pickedRank === 'без фільтру' &&
            this.readyDateEntry === null && this.readyDateLeft === null && this.searchTitle.trim() === '' &&
            this.searchOp_code.trim() === '' && this.searchComplexity.trim() === '' && this.searchNozologia.trim() === '' &&
            this.pickedTimeType === 'без фільтру' && this.pickedUrgencyType === 'без фільтру' && this.pickedOperationType === 'без фільтру' &&
            this.pickedAnesthesiaType === 'без фільтру' && this.pickedSpotType === 'без фільтру' && this.picekdUltimateType === 'без фільтру' &&
            this.pickedAssistant === 'без фільтру' && this.pickedAnesthesiologist === 'без фільтру' && this.pickedMedsister.trim() === 'без фільтру'
            && this.searchAge.trim() === '' && this.searchSicknessHistory.trim() === '' && this.searchDiagnosisUltimate.trim() === '' && this.searchComplication === 'без фільтру' &&
            this.pickedComplexity === 'без фільтру') {
            return this.allAppointments;
         } else {

            this.allAppointments.forEach(appoint => {

               if (this.pickedSurgeon !== 'без фільтру') {
                  if (this.pickedSurgeon === appoint.surgeon) {
                     filteredArray.push(appoint)
                  }
               } else {
                  filteredArray = this.allAppointments
               }

            })
            // rank 

            if (this.pickedRank !== 'без фільтру') {
               let RankIndexes = []
               filteredArray.forEach(appoint => {
                  if (this.pickedRank !== 'без фільтру') {
                     let index = filteredArray.indexOf(appoint)
                     if (this.pickedRank !== appoint.rank) {
                        RankIndexes.push(index)
                     }
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return RankIndexes.indexOf(index) == -1;
               })
            }
            // title operation 
            if (this.searchTitle.trim() !== '') {
               let arrOfTitleIndexes = []
               filteredArray.forEach(appoint => {
                  if (this.searchTitle.trim() !== '') {

                     let index = filteredArray.indexOf(appoint)
                     if (appoint.title.toLowerCase().includes(this.searchTitle.toLowerCase()) == false) {
                        arrOfTitleIndexes.push(index)
                     }
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return arrOfTitleIndexes.indexOf(index) == -1;
               })
            }

            // Operation code 

            if (this.searchOp_code.trim() !== '') {
               let codeIndexes = []
               filteredArray.forEach(appoint => {
                  if (this.searchOp_code.trim() !== '') {
                     let index = filteredArray.indexOf(appoint)
                     if (appoint.op_code.toLowerCase().includes(this.searchOp_code.toLowerCase()) == false) {
                        codeIndexes.push(index)

                     }
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return codeIndexes.indexOf(index) == -1;
               })
            }

            // Complexity 

            if (this.searchComplexity.trim() !== '') {
               let arrOfComplexityIndexes = []
               filteredArray.forEach(appoint => {
                  if (this.searchComplexity.trim() !== '' ) {
                     let index = filteredArray.indexOf(appoint)
                     if(appoint.complexity != undefined){
                        if (appoint.complexity.toLowerCase().includes(this.searchComplexity.toLowerCase()) == false) {
                        arrOfComplexityIndexes.push(index)
                     }
                     } else {
                        arrOfComplexityIndexes.push(index)
                     }
                     
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return arrOfComplexityIndexes.indexOf(index) == -1;
               })
            }

            // nozlogia

            if (this.searchNozologia.trim() !== '') {
               let arrOfNozologiaIndexes = []
               filteredArray.forEach(appoint => {
                  if (this.searchNozologia.trim() !== '') {
                     let index = filteredArray.indexOf(appoint)
                     if (appoint.nozologia.toLowerCase().includes(this.searchNozologia.toLowerCase()) == false) {
                        arrOfNozologiaIndexes.push(index)
                     }
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return arrOfNozologiaIndexes.indexOf(index) == -1;
               })
            }

            // Assistant
            if (this.pickedAssistant.trim() !== 'без фільтру') {
               let assistantIndexes = []
               filteredArray.forEach(appoint => {
                  if (this.pickedAssistant.trim() !== 'без фільтру') {
                     let index = filteredArray.indexOf(appoint)
                     if (this.pickedAssistant !== appoint.assistant) {
                        assistantIndexes.push(index)
                     }
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return assistantIndexes.indexOf(index) == -1;
               })
            }

            // Anesthesiologist
            if (this.pickedAnesthesiologist.trim() !== 'без фільтру') {
               let anesthesiologistIndexes = []
               filteredArray.forEach(appoint => {
                  if (this.pickedAnesthesiologist.trim() !== 'без фільтру') {
                     let index = filteredArray.indexOf(appoint)
                     if (this.pickedAnesthesiologist !== appoint.anesthesiologist) {
                        anesthesiologistIndexes.push(index)
                     }
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return anesthesiologistIndexes.indexOf(index) == -1;
               })
            }

            // Medsister
            if (this.pickedMedsister.trim() !== 'без фільтру') {
               let medsisterIndexes = []
               filteredArray.forEach(appoint => {
                  if (this.pickedMedsister.trim() !== 'без фільтру') {
                     let index = filteredArray.indexOf(appoint)
                     if (this.pickedMedsister !== appoint.medsister) {
                        medsisterIndexes.push(index)
                     }
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return medsisterIndexes.indexOf(index) == -1;
               })
            }

            // time Type 

            if (this.pickedTimeType !== 'без фільтру') {
               let timeTypeIndexes = []
               filteredArray.forEach(appoint => {
                  if (this.pickedTimeType !== 'без фільтру') {
                     let index = filteredArray.indexOf(appoint)
                     if (this.pickedTimeType !== appoint.timeType) {
                        timeTypeIndexes.push(index)
                     }
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return timeTypeIndexes.indexOf(index) == -1;
               })
            }

            // urgency type

            if (this.pickedUrgencyType !== 'без фільтру') {
               let urgencyTypeIndexes = []
               filteredArray.forEach(appoint => {
                  if (this.pickedUrgencyType !== 'без фільтру') {
                     let index = filteredArray.indexOf(appoint)
                     if (this.pickedUrgencyType !== appoint.urgencyType) {
                        urgencyTypeIndexes.push(index)
                     }
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return urgencyTypeIndexes.indexOf(index) == -1;
               })
            }

            // operation type
            if (this.pickedOperationType !== 'без фільтру') {
               let operationTypeIndexes = []
               filteredArray.forEach(appoint => {
                  if (this.operationType !== 'без фільтру') {
                     let index = filteredArray.indexOf(appoint)
                     if (this.pickedOperationType !== appoint.operationType) {
                        operationTypeIndexes.push(index)
                     }
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return operationTypeIndexes.indexOf(index) == -1;
               })
            }

            // anasthesia type

            if (this.pickedAnesthesiaType !== 'без фільтру') {
               let anesthesiaTypeIndexes = []
               filteredArray.forEach(appoint => {
                  if (this.pickedAnesthesiaType !== 'без фільтру') {
                     let index = filteredArray.indexOf(appoint)
                     if (this.pickedAnesthesiaType !== appoint.anesthesiaType) {
                        anesthesiaTypeIndexes.push(index)
                     }
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return anesthesiaTypeIndexes.indexOf(index) == -1;
               })
            }
            // complication

            if (this.searchComplication !== 'без фільтру') {
               let complicationIndexes = []
               filteredArray.forEach(appoint => {
                  if (this.searchComplication !== 'без фільтру') {
                     let index = filteredArray.indexOf(appoint)
                     if (this.searchComplication !== appoint.complication) {
                        complicationIndexes.push(index)
                     }
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return complicationIndexes.indexOf(index) == -1;
               })
               
            }
            // Picked complexity
            if (this.pickedComplexity !== 'без фільтру') {
               let pickedComplexityIndexes = []
               filteredArray.forEach(appoint => {
                  if (this.pickedComplexity !== 'без фільтру') {
                     let index = filteredArray.indexOf(appoint)
                     if (this.pickedComplexity !== appoint.complexityPicked) {
                        pickedComplexityIndexes.push(index)
                     }
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return pickedComplexityIndexes.indexOf(index) == -1;
               })
               
            }
            // spot type
            if (this.pickedSpotType !== 'без фільтру') {
               let spotTypeIndexes = []
               filteredArray.forEach(appoint => {
                  if (this.pickedSpotType !== 'без фільтру') {
                     let index = filteredArray.indexOf(appoint)
                     if (this.pickedSpotType !== appoint.spotType) {
                        spotTypeIndexes.push(index)
                     }
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return spotTypeIndexes.indexOf(index) == -1;
               })
            }

            // ultimate type
            if (this.picekdUltimateType !== 'без фільтру') {
               let ultimateTypeIndexes = []
               filteredArray.forEach(appoint => {
                  if (this.picekdUltimateType !== 'без фільтру') {
                     let index = filteredArray.indexOf(appoint)
                     if(appoint.ultimateType != undefined){
                        if (this.picekdUltimateType !== appoint.ultimateType) {
                        ultimateTypeIndexes.push(index)
                        }
                     } else {
                        ultimateTypeIndexes.push(index)
                     }
                     
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return ultimateTypeIndexes.indexOf(index) == -1;
               })
            }

            // name and lastName
            if (this.searchName.trim() !== '') {
               let arrOfIndexes = []
               filteredArray.forEach(appoint => {
                  if (this.searchName.trim() !== '') {
                     let privateName = `${appoint.user.firstName} ${appoint.user.lastName}`

                     let index = filteredArray.indexOf(appoint)
                     if (privateName.toLowerCase().includes(this.searchName.toLowerCase()) == false) {
                        arrOfIndexes.push(index)

                     }
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return arrOfIndexes.indexOf(index) == -1;
               })
            }
            // age 
            if (this.searchAge.trim() !== '') {
               let arrOfAgeIndexes = []
               filteredArray.forEach(appoint => {
                  if (this.searchAge.trim() !== '') {

                     let index = filteredArray.indexOf(appoint)
                     if (appoint.age.toString().toLowerCase().includes(this.searchAge.toLowerCase()) == false) {
                        arrOfAgeIndexes.push(index)

                     }
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return arrOfAgeIndexes.indexOf(index) == -1;
               })
            }
            // op_number
            if (this.searchOp_number.trim() !== '') {
               let op_numberArray = []
               filteredArray.forEach(appoint => {
                  if (this.searchOp_number.trim() !== '') {
                     let index = filteredArray.indexOf(appoint)
                     if(appoint.op_number_of_counter != undefined){
                        if (appoint.op_number_of_counter.toString().toLowerCase().includes(this.searchOp_number.toLowerCase()) == false) {
                        op_numberArray.push(index)
                     } 
                     } else {
                        console.log(appoint.op_number)
                        console.log('pushed')
                        op_numberArray.push(index)
                     }
                     
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return op_numberArray.indexOf(index) == -1;
               })
            }
            // sickness history
            if (this.searchSicknessHistory.trim() !== '') {
               let sickArray = []
               filteredArray.forEach(appoint => {
                  if (this.searchSicknessHistory.trim() !== '') {
                     let index = filteredArray.indexOf(appoint)
                     if (appoint.sicknessHistory.toLowerCase().includes(this.searchSicknessHistory.toLowerCase()) == false) {
                        sickArray.push(index)

                     }
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return sickArray.indexOf(index) == -1;
               })
            }
            // ultimate diagnosis
            if (this.searchDiagnosisUltimate.trim() !== '') {
               let diagArray = []
               filteredArray.forEach(appoint => {
                  if (this.searchDiagnosisUltimate.trim() !== '') {
                     let index = filteredArray.indexOf(appoint)
                     if(appoint.diagnosisUltimate != undefined){
                        if (appoint.diagnosisUltimate.toLowerCase().includes(this.searchDiagnosisUltimate.toLowerCase()) == false) {
                        diagArray.push(index)
                     } 
                     } else {
                        diagArray.push(index)
                     }
                     
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return diagArray.indexOf(index) == -1;
               })
            }

            // Operation Date
            if (this.readyDate !== null) {
               let arrayOfNextIndexes = []

               filteredArray.forEach(appoint => {
                  if (this.readyDate !== null) {
                     let index = filteredArray.indexOf(appoint)
                     let newDate1
                     let newDate2

                     if (this.readyDate.length < 3 && this.readyDate[0].toString().substr(0, 15) != this.readyDate[1].toString().substr(0, 15)) {
                        const date1 = new Date(this.readyDate[0])
                        const date2 = new Date(this.readyDate[1])
                        if(date1 < date2){
                           newDate1 = date1
                           newDate2 = date2
                        } else {
                           newDate1 = date2
                           newDate2 = date1
                        }

                        if (appoint.date.toDate() < newDate1 || appoint.date.toDate() > newDate2) {
                           if(appoint.date.toDate().toString().substr(0, 15) !== newDate1.toString().substr(0, 15)){
                              console.log(appoint.date.toDate())
                              console.log(newDate1)
                              console.log(newDate2)
                              arrayOfNextIndexes.push(index)
                           }     
                        }
                     } else if(this.readyDate[1] == undefined){
                        if (appoint.date.toDate().toString().substr(0, 15) != this.readyDate.toString().substr(0, 15)) {
                           arrayOfNextIndexes.push(index)
                        }
                     } else {
                        if (appoint.date.toDate().toString().substr(0, 15) != this.readyDate[0].toString().substr(0, 15)) {
                           arrayOfNextIndexes.push(index)
                     } 
                     }

                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return arrayOfNextIndexes.indexOf(index) == -1;
               })
            }

            // Date Entry

            if (this.readyDateEntry !== null) {
               let arrayOfDateEntryIndexes = []
               filteredArray.forEach(appoint => {
                  if (this.readyDateEntry !== null) {
                     let index = filteredArray.indexOf(appoint)
                     let newDate1
                     let newDate2
                     if (this.readyDateEntry.length < 3 && this.readyDateEntry[0].toString().substr(0, 15) != this.readyDateEntry[1].toString().substr(0, 15)) {

                        const date1 = new Date(this.readyDateEntry[0])
                        const date2 = new Date(this.readyDateEntry[1])
                        if(date1 < date2){
                           newDate1 = date1
                           newDate2 = date2
                        } else {
                           newDate1 = date2
                           newDate2 = date1
                        }
                        if (appoint.dateEntry.toDate() < newDate1 || appoint.dateEntry.toDate() > newDate2) {
                           if(appoint.dateEntry.toDate().toString().substr(0, 15) !== newDate1.toString().substr(0, 15)){
                              arrayOfDateEntryIndexes.push(index)
                           }     
                           
                        }
                     } else if(this.readyDateEntry[1] == undefined){
                        if (appoint.dateEntry.toDate().toString().substr(0, 15) != this.readyDateEntry.toString().substr(0, 15)) {
                           arrayOfDateEntryIndexes.push(index)
                     } 
                     } else {
                        if (appoint.dateEntry.toDate().toString().substr(0, 15) != this.readyDateEntry[0].toString().substr(0, 15)) {
                           arrayOfDateEntryIndexes.push(index)
                     } 
                     }
                        
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return arrayOfDateEntryIndexes.indexOf(index) == -1;
               })
            }

            // date left

            if (this.readyDateLeft !== null) {
               let arrayOfDateLeftIndexes = []

               filteredArray.forEach(appoint => {
                  if (this.readyDateLeft !== null || appoint.dateLeft != undefined) {
                     let index = filteredArray.indexOf(appoint)
                     let newDate1
                     let newDate2
                     if (this.readyDateLeft.length < 3 && this.readyDateLeft[0].toString().substr(0, 15) != this.readyDateLeft[1].toString().substr(0, 15)) {
                        const date1 = new Date(this.readyDateLeft[0])
                        const date2 = new Date(this.readyDateLeft[1])
                        if(date1 < date2){
                           newDate1 = date1
                           newDate2 = date2
                        } else {
                           newDate1 = date2
                           newDate2 = date1
                        }
                        if (appoint.dateLeft.toDate() < newDate1 || appoint.dateLeft.toDate() > newDate2) {
                           if(appoint.dateLeft.toDate().toString().substr(0, 15) !== newDate1.toString().substr(0, 15)){
                              arrayOfDateLeftIndexes.push(index)
                           }
                           
                        }
                     } else if(this.readyDateLeft[1] == undefined){
                        if (appoint.dateLeft.toDate().toString().substr(0, 15) != this.readyDateLeft.toString().substr(0, 15)) {
                           arrayOfDateLeftIndexes.push(index)
                        }
                     } else{
                        if (appoint.dateLeft.toDate().toString().substr(0, 15) != this.readyDateLeft[0].toString().substr(0, 15)) {
                           arrayOfDateLeftIndexes.push(index)
                     } 
                     }

                  } else if(appoint.dateLeft == undefined){
                     let index = filteredArray.indexOf(appoint)
                      arrayOfDateLeftIndexes.push(index)
                  }
               })
               filteredArray = filteredArray.filter(function (value, index) {
                  return arrayOfDateLeftIndexes.indexOf(index) == -1;
               })
            }

            return filteredArray
         

      }
      },
      rankItems() {
         let retArr = [
            'без фільтру',
            ...this.$store.getters.rankItems
         ]
         return retArr
      },
      timeTypeItems() {
         let retArr = [
            'без фільтру',
            ...this.$store.getters.timeTypeItems
         ]
         return retArr
      },
      urgencyTypeItems() {
         let retArr = [
            'без фільтру',
            ...this.$store.getters.urgencyTypeItems
         ]
         return retArr
      },
      operationTypeItems() {
         let retArr = [
            'без фільтру',
            ...this.$store.getters.operationTypeItems
         ]
         return retArr
      },
      anesthesiaTypeItems() {
         let retArr = [
            'без фільтру',
            ...this.$store.getters.anesthesiaTypeItems
         ]
         return retArr
      },
      spotTypeItems() {
         let retArr = [
            'без фільтру',
            ...this.$store.getters.spotTypeItems
         ]
         return retArr
      },
      ultimateTypeItems() {
         let retArr = [
            'без фільтру',
            ...this.$store.getters.ultimateTypeItems
         ]
         return retArr
      },
      anesthesiologistItems() {
         let retArr = [
            'без фільтру',
            ...this.$store.getters.anesthesiologistItems
         ]
         return retArr
      },
      medsisterItems() {
         let retArr = [
            'без фільтру',
            ...this.$store.getters.medsisterItems
         ]
         return retArr
      },
      complicationItems(){
         let retArr = [
            'без фільтру',
            ...this.$store.getters.complication
         ]
         return retArr
      },
      pickedComplexityItems(){
         let retArr = [
            'без фільтру',
            ...this.$store.getters.complexityItems
         ]
         return retArr
      }

   },
   methods: {
      onOpenSingle(id) {
         this.$router.push('/appointment/' + id)
      },
      onOpenSingleRelease(id) {
         this.$router.push('/appointmentRelease/' + id)
      },
      onResetDate(){
         this.readyDate = null
         this.editDialog = false
         console.log(this.pickedDate)
         this.pickedDate = [new Date().toISOString().substr(0, 10)]
         console.log(this.pickedDate)
      },
      onResetEntry(){
         this.readyDateEntry = null
         this.editDialog1 = false
         this.pickedDateEntry = [new Date().toISOString().substr(0, 10)]
      },
      onResetLeft(){
         this.readyDateLeft = null
         this.editDialog2 = false
         this.pickedDateLeft = [new Date().toISOString().substr(0, 10)]
      },
      sumOfBeforeBeds() {
         let sumOfBeds = 0
         this.filteredAppointments.forEach(appoint => {
            let numberOfTime = appoint.date.toDate().getTime() - appoint.dateEntry.toDate().getTime()
            numberOfTime = numberOfTime / (1000 * 3600 * 24)
            console.log(numberOfTime)
            sumOfBeds += parseInt(numberOfTime, 10)
         })
         this.showSum = sumOfBeds
      },
      sumOfAfterBeds() {
         let sumOfAfterBeds = 0
         this.filteredAppointments.forEach(appoint => {
            let numberOfTime = appoint.dateLeft.toDate().getTime() - appoint.date.toDate().getTime()
            numberOfTime = numberOfTime / (1000 * 3600 * 24)
            console.log(numberOfTime)
            sumOfAfterBeds += parseInt(numberOfTime, 10)
         })
         this.showSumAfter = sumOfAfterBeds
      },
      onArchive() {
         this.isArchive = !this.isArchive
      },
      onClose() {
         if (this.editDialog) {
            this.pickedDate = [new Date().toISOString().substr(0, 10)]
            this.editDialog = false
         } else if (this.editDialog1) {
            this.pickedDateEntry = [new Date().toISOString().substr(0, 10)]
            this.editDialog1 = false
         } else if (this.editDialog2) {
            this.pickedDateLeft = [new Date().toISOString().substr(0, 10)]
            this.editDialog2 = false
         }
      },
      clearDate() {
         this.readyDate = null
         this.pickedDate = new Date().toISOString().substr(0, 10)
      },
      onSaveChanges() {
         if (this.pickedDate !== null) {
            if (this.pickedDate.length > 1) {
               this.readyDate = []
               const newDate1 = new Date(new Date())
               const newDay1 = new Date(this.pickedDate[0]).getUTCDate()
               const newMonth1 = new Date(this.pickedDate[0]).getUTCMonth()
               const newYear1 = new Date(this.pickedDate[0]).getUTCFullYear()
               newDate1.setUTCDate(newDay1)
               newDate1.setUTCMonth(newMonth1)
               newDate1.setUTCFullYear(newYear1)
               newDate1.setUTCHours(-3)
               newDate1.setUTCMinutes(0)
               newDate1.setUTCSeconds(0)
               const newDate2 = new Date(new Date())
               const newDay2 = new Date(this.pickedDate[1]).getUTCDate()
               const newMonth2 = new Date(this.pickedDate[1]).getUTCMonth()
               const newYear2 = new Date(this.pickedDate[1]).getUTCFullYear()
               newDate2.setUTCDate(newDay2)
               newDate2.setUTCMonth(newMonth2)
               newDate2.setUTCFullYear(newYear2)
               newDate2.setUTCHours(20)
               newDate2.setUTCMinutes(59)
               newDate2.setUTCSeconds(59)
               console.log(newDate1)
               console.log(newDate2)
               this.readyDate.push(newDate1, newDate2)
               // console.log(this.readyDate)
            } else {
               console.log(this.pickedDate)
               const newDate = new Date(new Date())
               const newDay = new Date(this.pickedDate).getUTCDate()
               const newMonth = new Date(this.pickedDate).getUTCMonth()
               const newYear = new Date(this.pickedDate).getUTCFullYear()
               newDate.setUTCDate(newDay)
               newDate.setUTCMonth(newMonth)
               newDate.setUTCFullYear(newYear)
               this.readyDate = newDate
               console.log(this.readyDate)
               // console.log(this.readyDate.toISOString().substr(0,10))
               // console.log(this.readyDate.toString().substr(0, 15))
            }
         }

      },
      onSaveChangesEntry() {
         if (this.pickedDateEntry !== null) {
            if (this.pickedDateEntry.length > 1) {
               this.readyDateEntry = []
               const newDate1 = new Date(new Date())
               const newDay1 = new Date(this.pickedDateEntry[0]).getUTCDate()
               const newMonth1 = new Date(this.pickedDateEntry[0]).getUTCMonth()
               const newYear1 = new Date(this.pickedDateEntry[0]).getUTCFullYear()
               newDate1.setUTCDate(newDay1)
               newDate1.setUTCMonth(newMonth1)
               newDate1.setUTCFullYear(newYear1)
               newDate1.setUTCHours(-3)
               newDate1.setUTCMinutes(0)
               newDate1.setUTCSeconds(0)
               const newDate2 = new Date(new Date())
               const newDay2 = new Date(this.pickedDateEntry[1]).getUTCDate()
               const newMonth2 = new Date(this.pickedDateEntry[1]).getUTCMonth()
               const newYear2 = new Date(this.pickedDateEntry[1]).getUTCFullYear()
               newDate2.setUTCDate(newDay2)
               newDate2.setUTCMonth(newMonth2)
               newDate2.setUTCFullYear(newYear2)
               newDate2.setUTCHours(20)
               newDate2.setUTCMinutes(59)
               newDate2.setUTCSeconds(59)
               console.log(newDate1)
               console.log(newDate2)
               this.readyDateEntry.push(newDate1, newDate2)
               // console.log(this.readyDate)
            } else {
               console.log(this.pickedDateEntry)
               const newDate = new Date(new Date())
               const newDay = new Date(this.pickedDateEntry).getUTCDate()
               const newMonth = new Date(this.pickedDateEntry).getUTCMonth()
               const newYear = new Date(this.pickedDateEntry).getUTCFullYear()
               newDate.setUTCDate(newDay)
               newDate.setUTCMonth(newMonth)
               newDate.setUTCFullYear(newYear)
               this.readyDateEntry = newDate
               console.log(this.readyDateEntry)
               // console.log(this.readyDate.toISOString().substr(0,10))
               // console.log(this.readyDate.toString().substr(0, 15))
            }
         }

      },
      onSaveChangesLeft() {
         if (this.pickedDateLeft !== null) {
            if (this.pickedDateLeft.length > 1) {
               this.readyDateLeft = []
               const newDate1 = new Date(new Date())
               const newDay1 = new Date(this.pickedDateLeft[0]).getUTCDate()
               const newMonth1 = new Date(this.pickedDateLeft[0]).getUTCMonth()
               const newYear1 = new Date(this.pickedDateLeft[0]).getUTCFullYear()
               newDate1.setUTCDate(newDay1)
               newDate1.setUTCMonth(newMonth1)
               newDate1.setUTCFullYear(newYear1)
               newDate1.setUTCHours(-3)
               newDate1.setUTCMinutes(0)
               newDate1.setUTCSeconds(0)
               const newDate2 = new Date(new Date())
               const newDay2 = new Date(this.pickedDateLeft[1]).getUTCDate()
               const newMonth2 = new Date(this.pickedDateLeft[1]).getUTCMonth()
               const newYear2 = new Date(this.pickedDateLeft[1]).getUTCFullYear()
               newDate2.setUTCDate(newDay2)
               newDate2.setUTCMonth(newMonth2)
               newDate2.setUTCFullYear(newYear2)
               newDate2.setUTCHours(20)
               newDate2.setUTCMinutes(59)
               newDate2.setUTCSeconds(59)
               console.log(newDate1)
               console.log(newDate2)
               this.readyDateLeft.push(newDate1, newDate2)
               // console.log(this.readyDate)
            } else {
               console.log(this.pickedDateLeft)
               const newDate = new Date(new Date())
               const newDay = new Date(this.pickedDateLeft).getUTCDate()
               const newMonth = new Date(this.pickedDateLeft).getUTCMonth()
               const newYear = new Date(this.pickedDateLeft).getUTCFullYear()
               newDate.setUTCDate(newDay)
               newDate.setUTCMonth(newMonth)
               newDate.setUTCFullYear(newYear)
               this.readyDateLeft = newDate
               console.log(this.readyDateLeft)
               // console.log(this.readyDate.toISOString().substr(0,10))
               // console.log(this.readyDate.toString().substr(0, 15))
            }
         }

      },
      closeFilter() {
         this.readyDate = null
         this.isFilter = !this.isFilter
         this.pickedDate = [new Date().toISOString().substr(0, 10)]
         this.readyDateEntry = null
         this.pickedDateEntry = [new Date().toISOString().substr(0, 10)]
         this.readyDateLeft = null
         this.pickedDateLeft = [new Date().toISOString().substr(0, 10)]
         this.searchName = ''
         this.searchTitle = ''
         this.pickedSurgeon = 'без фільтру'
         this.searchOp_number = ''
         this.pickedRank = 'без фільтру'
         this.showSum = 'Показати'
         this.showSumAfter = 'Показати'
         this.searchOp_code = ''
         this.searchComplexity = ''
         this.searchNozologia = ''
         this.pickedTimeType = 'без фільтру'
         this.pickedUrgencyType = 'без фільтру'
         this.pickedOperationType = 'без фільтру'
         this.pickedAnesthesiaType = 'без фільтру'
         this.pickedSpotType = 'без фільтру'
         this.picekdUltimateType = 'без фільтру'
         this.pickedAssistant = 'без фільтру'
         this.pickedAnesthesiologist = 'без фільтру'
         this.pickedMedsister = 'без фільтру'
         this.searchAge = ''
         this.searchSicknessHistory = ''
         this.searchDiagnosisUltimate = ''
         this.searchComplication = 'без фільтру'
         this.pickedComplexity = 'без фільтру'
      },
      clearFilter() {
         this.readyDate = null
         this.pickedDate = [new Date().toISOString().substr(0, 10)]
         this.readyDateEntry = null
         this.pickedDateEntry = [new Date().toISOString().substr(0, 10)]
         this.readyDateLeft = null
         this.pickedDateLeft = [new Date().toISOString().substr(0, 10)]
         this.searchName = ''
         this.searchTitle = ''
         this.pickedSurgeon = 'без фільтру'
         this.searchOp_number = ''
         this.pickedRank = 'без фільтру'
         this.showSum = 'Показати'
         this.showSumAfter = 'Показати'
         this.searchOp_code = ''
         this.searchComplexity = ''
         this.searchNozologia = ''
         this.pickedTimeType = 'без фільтру'
         this.pickedUrgencyType = 'без фільтру'
         this.pickedOperationType = 'без фільтру'
         this.pickedAnesthesiaType = 'без фільтру'
         this.pickedSpotType = 'без фільтру'
         this.picekdUltimateType = 'без фільтру'
         this.pickedAssistant = 'без фільтру'
         this.pickedAnesthesiologist = 'без фільтру'
         this.pickedMedsister = 'без фільтру',
         this.searchAge = ''
         this.searchSicknessHistory = ''
         this.searchDiagnosisUltimate = ''
         this.searchComplication = 'без фільтру'
         this.pickedComplexity = 'без фільтру'
      }
   },
   data: () => ({
      isArchive: true,
      showSum: 'Показати',
      showSumAfter: 'Показати',
      pickedSurgeon: 'без фільтру',
      searchName: '',
      searchTitle: '',
      editDialog: false,
      editDialog1: false,
      editDialog2: false,
      pickedDate: [new Date().toISOString().substr(0, 10)],
      pickedDateEntry: [new Date().toISOString().substr(0, 10)],
      pickedDateLeft: [new Date().toISOString().substr(0, 10)],
      readyDate: null,
      readyDateEntry: null,
      readyDateLeft: null,
      isFilter: true,
      searchOp_number: '',
      searchOp_code: '',
      searchComplexity: '',
      searchNozologia: '',
      pickedRank: 'без фільтру',
      pickedTimeType: 'без фільтру',
      pickedUrgencyType: 'без фільтру',
      pickedOperationType: 'без фільтру',
      pickedAnesthesiaType: 'без фільтру',
      pickedSpotType: 'без фільтру',
      picekdUltimateType: 'без фільтру',
      pickedAssistant: 'без фільтру',
      pickedAnesthesiologist: 'без фільтру',
      pickedMedsister: 'без фільтру',
      updatedAge: false,
      searchAge: '',
      searchSicknessHistory: '',
      searchDiagnosisUltimate: '',
      searchComplication: 'без фільтру',
      pickedComplexity: 'без фільтру'

   }),
   created() {
      this.$store.dispatch('loadAppointments')
   },
   watch: {
      filteredAppointments(){
         this.showSum = 'Показати'
         this.showSumAfter = 'Показати'
      }
   }
   // mounted() {
   //    setTimeout(() => {
   //       if (this.$store.state.isUpdatedAge == false) {
   //          this.$store.commit('setUpdatedAge', true)
   //          const date = new Date()
   //          this.allAppointments.forEach(appoint => {
   //             let ageNumber = Math.floor((date.getTime() - appoint.dateAge.toDate().getTime()) / (1000 * 3600 * 24 * 365))
   //             this.$store.dispatch('updatePost', {
   //                id: appoint.id,
   //                age: ageNumber,
   //                notToLoading: 'yes'
   //             })
   //          })
   //       }
   //    }, 500)
   // }
}
</script>

<style scoped>
.btn-archive {
   text-align: center;
   font-size: 18px;
   padding: 7px;
   margin-right: 15px;
   width: 170px;
   margin-top: 13px;
}

.appo-div {
   margin-bottom: 8px;
   margin-right: 15px;
   width: 340px;
}

.section {
   display: flex;
   flex-wrap: wrap;
   padding: 5px;
   justify-content: flex-start;

}
.zvit-wrapper{
   display: flex;
   justify-content: center;
}
.btn-zvit{
   display: flex;
}
.layoutTT{
   padding: 10px;
   display: flex;
}
.layout-unit{
   padding: 7px;
   padding-bottom: 0px;
   margin-bottom: -8px!important;
   box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.17);
   background-color: #ffffff;
   margin: 3px;
   margin-bottom: -2px;
   flex: 23%;
}
.appo-title{
   color: #0D47A1;
   padding: 10px;
   font-weight: 700;
   padding-bottom: 2px;
   margin-left: 5px;
   display: block;
   text-align: center;
}
.appo-unit{
   color: #000000;
   
   display: block;
   
}
.layoutsec{
   justify-content: flex-start;
}
.info__button{
   font-size: 18px;
   padding: 7px;
   width: 305px;
   margin-left: 12px;
   margin-top: 10px;
   margin-bottom: 0;
}
.buttons__section{
   justify-content: flex-start;
   margin-bottom: 15px;
}

@media (max-width: 360px) {
   .appo-div {
      margin-bottom: 15px;
      margin-right: 0;
      width: 260px;
   }
}

@media (min-width: 361px) and (max-width: 390px) {
   .appo-div {
      margin-bottom: 15px;
      margin-right: 0;
      width: 300px;
   }
}

@media (max-width: 768px) {
   .section {
      justify-content: center;
   }
}
@media (max-width: 800px) {
   .layout-unit{
   flex: 30%;
}
}
@media (max-width: 600px) {
   .layout-unit{
   flex: 48%;
}
}
@media (max-width: 400px) {
   .layout-unit{
   flex: 100%;
   }
   .btn-archive {
   margin-bottom: 15px;
}
}
</style>