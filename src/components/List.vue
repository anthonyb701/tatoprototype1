<template>
<main>
   <!-- <button v-if="!isArchive" @click.prevent="onArchive" class="pa-1 btn-archive blue white--text">Open Archive</button>
   <button v-else @click.prevent="onArchive" class="pa-1 btn-archive white--text red">Close Archive</button> -->
   
   <v-layout row wrap v-if="isFilter" class="layoutTT">
      <v-flex xs12  class="layout-unit unit_1">
         <v-select :items="items" label="Хірург" v-model="pickedSurgeon"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_2">
         <v-select :items="items" label="Ассистент" v-model="pickedAssistant"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_3">
         <v-select :items="anesthesiologistItems" label="Анестезіолог" v-model="pickedAnesthesiologist"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_4">
         <v-select :items="medsisterItems" label="Операційна Сестра" v-model="pickedMedsister"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_5">
         <v-select :items="rankItems" label="Звання" v-model="pickedRank"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_6">
         <v-select :items="timeTypeItems" label="Первинна / Повторна" v-model="pickedTimeType"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_7">
         <v-select :items="urgencyTypeItems" label="Планова / Ургентна" v-model="pickedUrgencyType"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_8">
         <v-select :items="operationTypeItems" label="Тип операції..." v-model="pickedOperationType"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_9">
         <v-select :items="anesthesiaTypeItems" label="Тип анестезії..." v-model="pickedAnesthesiaType"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_10">
         <v-select :items="spotTypeItems" label="Стаціонарна/ Амбулаторна" v-model="pickedSpotType"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_11">
         <v-select :items="complicationItems" label="Складність..." v-model="searchComplication"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_12">
         <v-select :items="ultimateTypeItems" label="Виписаний / Помер" v-model="picekdUltimateType"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_13">
         <div class="search-wrapper">
            <v-text-field  v-model="searchName" label="Прізвище І. Б.." />

         </div>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_14">
         <div class="search-wrapper">
            <v-text-field label="Назва операції.." v-model="searchTitle" />

         </div>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_15">
         <div class="search-wrapper">
            <v-text-field  v-model="searchAge" label="Вік.." />

         </div>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_16">
         <div class="search-wrapper">
            <v-text-field  v-model="searchOp_code" label="Код операції.." />
         </div>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_17">
         <div class="search-wrapper">
            <v-text-field v-model="searchOp_number" label="Номер операції.." />

         </div>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_18">
         <div class="search-wrapper">
            <v-text-field v-model="searchNozologia" label="Нозологія.." />
         </div>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_19">
         <div class="search-wrapper">
            <v-text-field v-model="searchSicknessHistory" label="Історія Хвороби.." />
         </div>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_20">
         <div class="search-wrapper">
            <v-text-field v-model="searchDiagnosisUltimate" label="Кінцевий діагноз.." />
         </div>
      </v-flex>
      
      <v-flex xs12  class="layout-unit unit_21">
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
      <v-flex xs12  class="layout-unit unit_22">
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
      <v-flex xs12  class="layout-unit unit_23">
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
      <v-flex xs12  class="layout-unit unit_24">
         <v-select :items="pickedComplexityItems" label="Тип ускладнення..." v-model="pickedComplexity"></v-select>
      </v-flex>
      <v-flex xs12  class="layout-unit unit_25">
         <div class="search-wrapper">
            <v-textarea name="textarea" v-model="searchComplexity" label="Ускладнення" hint="Введіть текст" rows="2"></v-textarea>
         </div>
      </v-flex>
   </v-layout>
   
   <v-layout row wrap class="buttons__section">
      <!-- <v-btn @click="weekZvit" class="info__button zvit white--text">Звіт за тиждень <v-icon class="white--text">assignment_turned_in</v-icon></v-btn> -->
      <v-dialog v-model="dialogWeek" scrollable max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="weekZvit($event); zvitFilter()"
          v-bind="attrs"
          v-on="on"
          class="info__button zvit white--text"
        >
        
          Звіт за тиждень
          <v-icon class="white--text">assignment_turned_in</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialogWeek">
        <v-card-title class="v-card-zvit">Показники роботи урологічного відділення за тиждень</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 600px;">
           <p class="p-unit-z p-unit-date"><span class="span-unit">( </span>{{pickedDate[0] | dateZvit}}р. - {{pickedDate[1] | dateZvit}}р. )</p>
           <p class="p-unit-z"><span class="span-unit">Кількість операцій: </span>{{filteredAppointments.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Кількість пацієнтів: </span>{{operationPatients.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Більшої складності: </span>{{operationsHarder.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Меншої складності: </span>{{operationsEasier.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Відкриті: </span>{{operationsOpen.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Ендоскопічні: </span>{{operationsEndo.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Лапароскопічні: </span>{{operationsLapo.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Малоінвазивні: </span>{{operationsMalo.length}}</p>
         
            

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" class="ml-auto mr-5" text @click="dialogWeek = false; clearDialog()">Закрити</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogMonth" scrollable max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="monthZvit($event); zvitFilter()"
          v-bind="attrs"
          v-on="on"
          class="info__button zvit white--text"
        >
          Звіт за місяць
          <v-icon class="white--text">assignment_turned_in</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialogMonth">
        <v-card-title class="v-card-zvit">Показники роботи урологічного відділення за місяць</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 600px;">
           <p class="p-unit-z p-unit-date"><span class="span-unit">( </span>{{pickedDate[0] | dateZvit}}р. - {{pickedDate[1] | dateZvit}}р. )</p>
           <p class="p-unit-z"><span class="span-unit">Кількість операцій: </span>{{filteredAppointments.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Кількість пацієнтів: </span>{{operationPatients.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Більшої складності: </span>{{operationsHarder.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Меншої складності: </span>{{operationsEasier.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Відкриті: </span>{{operationsOpen.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Ендоскопічні: </span>{{operationsEndo.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Лапароскопічні: </span>{{operationsLapo.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Малоінвазивні: </span>{{operationsMalo.length}}</p>

            

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" class="ml-auto mr-5" text @click="dialogMonth = false; clearDialog()">Закрити</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog1kvartal" scrollable max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="kvartalZvit($event, 0, 3); zvitFilter()"
          v-bind="attrs"
          v-on="on"
          class="info__button zvit white--text"
        >
          Звіт за &#8544; квартал
          <v-icon class="white--text">assignment_turned_in</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialog1kvartal">
        <v-card-title class="v-card-zvit">Показники роботи урологічного відділення за 1 квартал</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 600px;">
           <p class="p-unit-z p-unit-date"><span class="span-unit">( </span>{{pickedDate[0] | dateZvit}}р. - {{pickedDate[1] | dateZvit}}р. )</p>
           <p class="p-unit-z"><span class="span-unit">Кількість операцій: </span>{{filteredAppointments.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Кількість пацієнтів: </span>{{operationPatients.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Більшої складності: </span>{{operationsHarder.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Меншої складності: </span>{{operationsEasier.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Відкриті: </span>{{operationsOpen.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Ендоскопічні: </span>{{operationsEndo.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Лапароскопічні: </span>{{operationsLapo.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Малоінвазивні: </span>{{operationsMalo.length}}</p>

            

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" class="ml-auto mr-5" text @click="dialog1kvartal = false; clearDialog()">Закрити</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2kvartal" scrollable max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="kvartalZvit($event,3,6); zvitFilter()"
          v-bind="attrs"
          v-on="on"
          class="info__button zvit white--text"
        >
          Звіт за &#8545; квартал
          <v-icon class="white--text">assignment_turned_in</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialog2kvartal">   
        <v-card-title class="v-card-zvit">Показники роботи урологічного відділення за 2 квартал</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 600px;">
           <p class="p-unit-z p-unit-date"><span class="span-unit">( </span>{{pickedDate[0] | dateZvit}}р. - {{pickedDate[1] | dateZvit}}р. )</p>
           <p class="p-unit-z"><span class="span-unit">Кількість операцій: </span>{{filteredAppointments.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Кількість пацієнтів: </span>{{operationPatients.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Більшої складності: </span>{{operationsHarder.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Меншої складності: </span>{{operationsEasier.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Відкриті: </span>{{operationsOpen.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Ендоскопічні: </span>{{operationsEndo.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Лапароскопічні: </span>{{operationsLapo.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Малоінвазивні: </span>{{operationsMalo.length}}</p>

            

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" class="ml-auto mr-5" text @click="dialog2kvartal = false; clearDialog()">Закрити</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog3kvartal" scrollable max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="kvartalZvit($event, 6,9); zvitFilter()"
          v-bind="attrs"
          v-on="on"
          class="info__button zvit white--text"
        >
          Звіт за &#8546; квартал
          <v-icon class="white--text">assignment_turned_in</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialog3kvartal">
        <v-card-title class="v-card-zvit">Показники роботи урологічного відділення за 3 квартал</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 600px;">
           <p class="p-unit-z p-unit-date"><span class="span-unit">( </span>{{pickedDate[0] | dateZvit}}р. - {{pickedDate[1] | dateZvit}}р. )</p>
           <p class="p-unit-z"><span class="span-unit">Кількість операцій: </span>{{filteredAppointments.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Кількість пацієнтів: </span>{{operationPatients.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Більшої складності: </span>{{operationsHarder.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Меншої складності: </span>{{operationsEasier.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Відкриті: </span>{{operationsOpen.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Ендоскопічні: </span>{{operationsEndo.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Лапароскопічні: </span>{{operationsLapo.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Малоінвазивні: </span>{{operationsMalo.length}}</p>

            

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" class="ml-auto mr-5" text @click="dialog3kvartal = false; clearDialog()">Закрити</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog4kvartal" scrollable max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="kvartalZvit($event, 9,0,true); zvitFilter()"
          v-bind="attrs"
          v-on="on"
          class="info__button zvit white--text"
        >
          Звіт за &#8547; квартал
          <v-icon class="white--text">assignment_turned_in</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialog4kvartal">
        <v-card-title class="v-card-zvit">Показники роботи урологічного відділення за 4 квартал</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 600px;">
           <p class="p-unit-z p-unit-date"><span class="span-unit">( </span>{{pickedDate[0] | dateZvit}}р. - {{pickedDate[1] | dateZvit}}р. )</p>
           <p class="p-unit-z"><span class="span-unit">Кількість операцій: </span>{{filteredAppointments.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Кількість пацієнтів: </span>{{operationPatients.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Більшої складності: </span>{{operationsHarder.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Меншої складності: </span>{{operationsEasier.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Відкриті: </span>{{operationsOpen.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Ендоскопічні: </span>{{operationsEndo.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Лапароскопічні: </span>{{operationsLapo.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Малоінвазивні: </span>{{operationsMalo.length}}</p>

            

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" class="ml-auto mr-5" text @click="dialog4kvartal = false; clearDialog()">Закрити</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
      <!-- <v-btn @click="monthZvit" class="info__button zvit white--text">Звіт за місяць <v-icon class="white--text">assignment_turned_in</v-icon></v-btn> -->
      <!-- <v-btn @click="kvartalZvit($event, 0, 3)" class="info__button zvit white--text">Звіт за &#8544; квартал <v-icon class="white--text">assignment_turned_in</v-icon></v-btn> -->
      <!-- <v-btn @click="kvartalZvit($event,3,6)" class="info__button zvit white--text">Звіт за &#8545; квартал <v-icon class="white--text">assignment_turned_in</v-icon></v-btn> -->
      <!-- <v-btn @click="kvartalZvit($event, 6,9)" class="info__button blue zvit white--text">Звіт за 	&#8546; квартал <v-icon class="white--text">assignment_turned_in</v-icon></v-btn> -->
      <!-- <v-btn @click="kvartalZvit($event, 9,0,true); " class="info__button zvit  white--text">Звіт за &#8547; квартал <v-icon class="white--text">assignment_turned_in</v-icon></v-btn> -->
   </v-layout>
   <v-layout row wrap class="buttons__section">
      <v-dialog v-model="dialog1half" scrollable max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="halfYearZvit($event, 0, 6, false); zvitFilter()"
          v-bind="attrs"
          v-on="on"
          class="info__button zvit white--text"
        >
          Звіт за &#8544; півроку 
          <v-icon class="white--text">assignment_turned_in</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialog1half">
        <v-card-title class="v-card-zvit">Показники роботи урологічного відділення за 1 півроку</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 600px;">
           <p class="p-unit-z p-unit-date"><span class="span-unit">( </span>{{pickedDate[0] | dateZvit}}р. - {{pickedDate[1] | dateZvit}}р. )</p>
           <p class="p-unit-z"><span class="span-unit">Кількість операцій: </span>{{filteredAppointments.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Кількість пацієнтів: </span>{{operationPatients.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Більшої складності: </span>{{operationsHarder.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Меншої складності: </span>{{operationsEasier.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Відкриті: </span>{{operationsOpen.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Ендоскопічні: </span>{{operationsEndo.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Лапароскопічні: </span>{{operationsLapo.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Малоінвазивні: </span>{{operationsMalo.length}}</p>

            

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" class="ml-auto mr-5" text @click="dialog1half = false; clearDialog()">Закрити</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2half" scrollable max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="halfYearZvit($event, 6, 0, true); zvitFilter()"
          v-bind="attrs"
          v-on="on"
          class="info__button zvit white--text"
        >
          Звіт за &#8545; півроку 
          <v-icon class="white--text">assignment_turned_in</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialog2half">
        <v-card-title class="v-card-zvit">Показники роботи урологічного відділення за 2 півроку</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 600px;">
           <p class="p-unit-z p-unit-date"><span class="span-unit">( </span>{{pickedDate[0] | dateZvit}}р. - {{pickedDate[1] | dateZvit}}р. )</p>
           <p class="p-unit-z"><span class="span-unit">Кількість операцій: </span>{{filteredAppointments.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Кількість пацієнтів: </span>{{operationPatients.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Більшої складності: </span>{{operationsHarder.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Меншої складності: </span>{{operationsEasier.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Відкриті: </span>{{operationsOpen.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Ендоскопічні: </span>{{operationsEndo.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Лапароскопічні: </span>{{operationsLapo.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Малоінвазивні: </span>{{operationsMalo.length}}</p>

            

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" class="ml-auto mr-5" text @click="dialog2half = false; clearDialog()">Закрити</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogYear" scrollable max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="halfYearZvit($event, 0, 0, true); zvitFilter()"
          v-bind="attrs"
          v-on="on"
          class="info__button zvit white--text"
        >
          Звіт за рік 
          <v-icon class="white--text">assignment_turned_in</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialogYear">
        <v-card-title class="v-card-zvit">Показники роботи урологічного відділення за рік</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 600px;">
           <p class="p-unit-z p-unit-date"><span class="span-unit">( </span>{{pickedDate[0] | dateZvit}}р. - {{pickedDate[1] | dateZvit}}р. )</p>
           <p class="p-unit-z"><span class="span-unit">Кількість операцій: </span>{{filteredAppointments.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Кількість пацієнтів: </span>{{operationPatients.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Більшої складності: </span>{{operationsHarder.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Меншої складності: </span>{{operationsEasier.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Відкриті: </span>{{operationsOpen.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Ендоскопічні: </span>{{operationsEndo.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Лапароскопічні: </span>{{operationsLapo.length}}</p>
           <p class="p-unit-z"><span class="span-unit">Малоінвазивні: </span>{{operationsMalo.length}}</p>

            

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" class="ml-auto mr-5" text @click="dialogYear = false; clearDialog()">Закрити</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      <!-- <v-btn @click="halfYearZvit($event, 0, 6, false)" class="info__button zvit white--text">Звіт за &#8544; півроку <v-icon class="white--text">assignment_turned_in</v-icon></v-btn> -->
      <!-- <v-btn @click="halfYearZvit($event, 6, 0, true)" class="info__button zvit white--text">Звіт за &#8545; півроку <v-icon class="white--text">assignment_turned_in</v-icon></v-btn> -->
      <!-- <v-btn @click="halfYearZvit($event, 0, 0, true)" class="info__button zvit white--text">Звіт за рік<v-icon class="white--text">assignment_turned_in</v-icon></v-btn> -->
   </v-layout>
   <v-layout row wrap class="buttons__section">
      <p class="info__button-text blue darken-4 white--text">Кількість операцій: {{filteredAppointments.length}}</p>
      <v-btn @click="sumOfBeforeBeds" class="info__button white--text">Передопераційне ліжко: {{showSum}}</v-btn>
      <v-btn @click="sumOfAfterBeds" class="info__button white--text">Післяопераційне ліжко: {{showSumAfter}}</v-btn>
   </v-layout>
   <v-flex xs12 sm12>
         <!-- <button @click="clearDate" class="pa-1 red white--text darken-2">Clear Date</button> -->
         <v-btn @click="clearFilter" class=" blue white--text darken-2 btn-archive">Очистити фільтр</v-btn>
         <v-btn v-if="!isFilter" @click="isFilter = !isFilter" class="btn-archive green white--text">Відкрити фільтр</v-btn>
         <v-btn v-else @click="closeFilter" class=" btn-archive white--text red">Закрити фільтр</v-btn>
         <v-btn v-if="isSuperAdmin" @click="updateSortedAppointments2021" class=" btn-archive white--text black">Update Data</v-btn>
      </v-flex>
   
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
      dublicateAppointementsByInitials(){
         
      },
      sorted2020appointments(){
         return this.$store.getters.sorted2020appointments 
      },
      sorted2021appointments(){
         return this.$store.getters.sorted2021appointments
      },
      currentUser(){
         return this.$store.getters.currentUser
      },
      isSuperAdmin(){
         if(this.currentUser === this.$store.getters.isAdmin){
                return true
            } else {
                return false
            }
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
            setTimeout(() => {
               let el = document.querySelector('.unit_1')
               if(el.classList.contains('unit-color')){
                  el.classList.remove('unit-color')
               }
               document.querySelector('.unit_5').classList.remove('unit-color')
               document.querySelector('.unit_14').classList.remove('unit-color')
               document.querySelector('.unit_16').classList.remove('unit-color')
               document.querySelector('.unit_25').classList.remove('unit-color')
               document.querySelector('.unit_18').classList.remove('unit-color')
               document.querySelector('.unit_2').classList.remove('unit-color') 
               document.querySelector('.unit_3').classList.remove('unit-color')
               document.querySelector('.unit_4').classList.remove('unit-color')
               document.querySelector('.unit_6').classList.remove('unit-color')
               document.querySelector('.unit_7').classList.remove('unit-color')
               document.querySelector('.unit_21').classList.remove('unit-color')
               document.querySelector('.unit_8').classList.remove('unit-color')
               document.querySelector('.unit_9').classList.remove('unit-color')
               document.querySelector('.unit_11').classList.remove('unit-color')
               document.querySelector('.unit_24').classList.remove('unit-color')
               document.querySelector('.unit_10').classList.remove('unit-color')
               document.querySelector('.unit_12').classList.remove('unit-color')
               document.querySelector('.unit_13').classList.remove('unit-color')
               document.querySelector('.unit_15').classList.remove('unit-color')
               document.querySelector('.unit_17').classList.remove('unit-color')
               document.querySelector('.unit_19').classList.remove('unit-color')
               document.querySelector('.unit_20').classList.remove('unit-color')
               document.querySelector('.unit_22').classList.remove('unit-color')
               document.querySelector('.unit_23').classList.remove('unit-color')
            }, 10)
            
            return this.allAppointments;
         } else {
            this.allAppointments.forEach(appoint => {
               let el = document.querySelector('.unit_1')
               if (this.pickedSurgeon !== 'без фільтру') {
                  el.classList.add('unit-color')
                  if (this.pickedSurgeon === appoint.surgeon) {
                     filteredArray.push(appoint)
                  }
               } else {
                  filteredArray = this.allAppointments
                  el.classList.remove('unit-color')
                  
               
               }
               

            })
            // rank 

            if (this.pickedRank !== 'без фільтру') {
               document.querySelector('.unit_5').classList.add('unit-color')
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
            } else {
               document.querySelector('.unit_5').classList.remove('unit-color')
            }
            // title operation 
            if (this.searchTitle.trim() !== '') {
               let arrOfTitleIndexes = []
               document.querySelector('.unit_14').classList.add('unit-color')
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
            } else {
               document.querySelector('.unit_14').classList.remove('unit-color')
            }

            // Operation code 

            if (this.searchOp_code.trim() !== '') {
               let codeIndexes = []
               document.querySelector('.unit_16').classList.add('unit-color')
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
            } else {
               document.querySelector('.unit_16').classList.remove('unit-color')
            }

            // Complexity 

            if (this.searchComplexity.trim() !== '') {
               let arrOfComplexityIndexes = []
               document.querySelector('.unit_25').classList.add('unit-color')
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
            } else {
               document.querySelector('.unit_25').classList.remove('unit-color')
            }

            // nozlogia

            if (this.searchNozologia.trim() !== '') {
               let arrOfNozologiaIndexes = []
               document.querySelector('.unit_18').classList.add('unit-color')
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
            } else {
               document.querySelector('.unit_18').classList.remove('unit-color')
            }

            // Assistant
            if (this.pickedAssistant.trim() !== 'без фільтру') {
               let assistantIndexes = []
               document.querySelector('.unit_2').classList.add('unit-color')
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
            } else {
               document.querySelector('.unit_2').classList.remove('unit-color')
            }

            // Anesthesiologist
            if (this.pickedAnesthesiologist.trim() !== 'без фільтру') {
               let anesthesiologistIndexes = []
                document.querySelector('.unit_3').classList.add('unit-color')
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
            } else {
                document.querySelector('.unit_3').classList.remove('unit-color')
            }

            // Medsister
            if (this.pickedMedsister.trim() !== 'без фільтру') {
               let medsisterIndexes = []
               document.querySelector('.unit_4').classList.add('unit-color')
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
            } else {
               document.querySelector('.unit_4').classList.remove('unit-color')
            }

            // time Type 

            if (this.pickedTimeType !== 'без фільтру') {
               let timeTypeIndexes = []
               document.querySelector('.unit_6').classList.add('unit-color')
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
            } else {
               document.querySelector('.unit_6').classList.remove('unit-color')
            }

            // urgency type

            if (this.pickedUrgencyType !== 'без фільтру') {
               let urgencyTypeIndexes = []
               document.querySelector('.unit_7').classList.add('unit-color')
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
            } else {
               document.querySelector('.unit_7').classList.remove('unit-color')
            }

            // operation type
            if (this.pickedOperationType !== 'без фільтру') {
               let operationTypeIndexes = []
               document.querySelector('.unit_8').classList.add('unit-color')
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
            } else {
               document.querySelector('.unit_8').classList.remove('unit-color')
            }

            // anasthesia type

            if (this.pickedAnesthesiaType !== 'без фільтру') {
               let anesthesiaTypeIndexes = []
               document.querySelector('.unit_9').classList.add('unit-color')
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
            } else {
               document.querySelector('.unit_9').classList.remove('unit-color')
            }
            // complication

            if (this.searchComplication !== 'без фільтру') {
               let complicationIndexes = []
                document.querySelector('.unit_11').classList.add('unit-color')
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
               
            } else {
               document.querySelector('.unit_11').classList.remove('unit-color')
            }
            // Picked complexity
            if (this.pickedComplexity !== 'без фільтру') {
               let pickedComplexityIndexes = []
               document.querySelector('.unit_24').classList.add('unit-color')
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
               
            } else {
               document.querySelector('.unit_24').classList.remove('unit-color')
            }
            // spot type
            if (this.pickedSpotType !== 'без фільтру') {
               let spotTypeIndexes = []
               document.querySelector('.unit_10').classList.add('unit-color')
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
            } else {
               document.querySelector('.unit_10').classList.remove('unit-color')
            }

            // ultimate type
            if (this.picekdUltimateType !== 'без фільтру') {
               let ultimateTypeIndexes = []
               document.querySelector('.unit_12').classList.add('unit-color')
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
            } else {
               document.querySelector('.unit_12').classList.remove('unit-color')
            }

            // name and lastName
            if (this.searchName.trim() !== '') {
               let arrOfIndexes = []
               document.querySelector('.unit_13').classList.add('unit-color')
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
            } else {
               document.querySelector('.unit_13').classList.remove('unit-color')
            }
            // age 
            if (this.searchAge.trim() !== '') {
               let arrOfAgeIndexes = []
               document.querySelector('.unit_15').classList.add('unit-color')
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
            } else {
               document.querySelector('.unit_15').classList.remove('unit-color')
            }
            // op_number
            // if (this.searchOp_number.trim() !== '') {
            //    let op_numberArray = []
            //    document.querySelector('.unit_17').classList.add('unit-color')
            //    filteredArray.forEach(appoint => {
            //       if (this.searchOp_number.trim() !== '') {
            //          let index = filteredArray.indexOf(appoint)
            //          if(appoint.op_number_of_counter != undefined){
            //             if (appoint.op_number_of_counter.toString().toLowerCase().includes(this.searchOp_number.toLowerCase()) == false) {
            //             op_numberArray.push(index)
            //          } 
            //          } else {
            //             console.log(appoint.op_number)
            //             console.log('pushed')
            //             op_numberArray.push(index)
            //          }
                     
            //       }
            //    })
            //    filteredArray = filteredArray.filter(function (value, index) {
            //       return op_numberArray.indexOf(index) == -1;
            //    })
            // } else {
            //    document.querySelector('.unit_17').classList.remove('unit-color')
            // }

            // op_numberV2

            if (this.searchOp_number.trim() !== '') {
               let op_numberArray = []
               document.querySelector('.unit_17').classList.add('unit-color')
               filteredArray.forEach(appoint => {
                  if (this.searchOp_number.trim() !== '') {
                     let index = filteredArray.indexOf(appoint)
                     if(appoint.op_numbertest1 != undefined){
                        if (appoint.op_numbertest1.toString().toLowerCase() != this.searchOp_number.toLowerCase()) {
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
            } else {
               document.querySelector('.unit_17').classList.remove('unit-color')
            }

            // sickness history
            if (this.searchSicknessHistory.trim() !== '') {
               let sickArray = []
               document.querySelector('.unit_19').classList.add('unit-color')
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
            } else {
               document.querySelector('.unit_19').classList.remove('unit-color')
            }
            // ultimate diagnosis
            if (this.searchDiagnosisUltimate.trim() !== '') {
               let diagArray = []
               document.querySelector('.unit_20').classList.add('unit-color')
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
            } else {
               document.querySelector('.unit_20').classList.remove('unit-color')
            }

            // Operation Date
            if (this.readyDate !== null) {
               let arrayOfNextIndexes = []
               document.querySelector('.unit_21').classList.add('unit-color')

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
            } else {
               document.querySelector('.unit_21').classList.remove('unit-color')
            }

            // Date Entry

            if (this.readyDateEntry !== null) {
               let arrayOfDateEntryIndexes = []
               document.querySelector('.unit_22').classList.add('unit-color')
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
            } else {
               document.querySelector('.unit_22').classList.remove('unit-color')
            }

            // date left
            if (this.readyDateLeft !== null) {
               let arrayOfDateLeftIndexes = []
               document.querySelector('.unit_23').classList.add('unit-color')

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
            } else {
               document.querySelector('.unit_23').classList.remove('unit-color')
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
      searchDublicatesInitials() {
         
      },

      zvitFilter(){
         let operationsToFilter = this.filteredAppointments.forEach(operation => {
            if(this.operationPatients.includes(`${operation.user.firstName.toLowerCase().trim().replace(/ +/g, "")}${operation.user.lastName.toLowerCase().trim().replace(/ +/g, "")}`) == false){
               this.operationPatients.push('1')
            }
            if(operation.complication === 'Більшої'){
               this.operationsHarder.push('1')
            }  else {
               this.operationsEasier.push('2')
            }
            if(operation.operationType === 'Відкрита'){
               this.operationsOpen.push('1')
            } else  if(operation.operationType === 'Ендоскопічна') {
               this.operationsEndo.push('2')
            } else if(operation.operationType === 'Лапараскопічна'){
               this.operationsLapo.push('4')
            } else if(operation.operationType === 'Малоінвазивна'){
               this.operationsMalo.push('3') 
               }
             
         })

         // Сomplexity

      },
      clearDialog(){
         this.operationsHarder = []
         this.operationsEasier = []
         this.operationsOpen = []
         this.operationsEndo = []
         this.operationsMalo = []
         this.operationsLapo = []
         this.operationPatients = []

      },
      clearClassesOfZvit(target){

         let buttons = document.querySelectorAll('.info__button')
         buttons.forEach(button => {
            if(button.classList.contains('clicked-zvit')){
               button.classList.remove('clicked-zvit')
            }
            if(button.childNodes[0].classList.contains('clicked-zvit')){
               button.childNodes[0].classList.remove('clicked-zvit')
            }
         })
         if(target == false){
            return
         }
         if(target.nodeName !== 'SPAN'){
            target.classList.add('clicked-zvit')
            
         } else {
            target.parentElement.classList.add('clicked-zvit')
         }
      },
      weekZvit(e){
         this.zvitTimes = true
         // new week zvit
         this.readyDate = []
         this.pickedDate = []
         let dayOfWeek = 5
         let originDate = new Date()
         // originDate.setDate(10)
         originDate.setHours(23)
         originDate.setMinutes(59)
         originDate.setSeconds(59)
         let resultDate = new Date(originDate.getTime())
         resultDate.setDate(originDate.getDate() + (7 + dayOfWeek - originDate.getDay()) % 7)
         if(originDate.getDay() !== dayOfWeek){
            resultDate.setDate(resultDate.getDate() - 7)
         }
         let firstDate = new Date(resultDate)
         firstDate.setDate(resultDate.getDate() - 7)
         firstDate.setHours(0)
         firstDate.setMinutes(0)
         firstDate.setSeconds(0)
         let secondDate = new Date(resultDate)
         secondDate.setDate(resultDate.getDate() - 1)
         this.readyDate.push(firstDate, secondDate)
         firstDate.setHours(3)
         secondDate.setHours(26)
         this.pickedDate.push(firstDate.toISOString().substr(0, 10))
         this.pickedDate.push(secondDate.toISOString().substr(0, 10))
         console.log(this.readyDate)
         console.log(this.pickedDate)
         this.clearClassesOfZvit(e.target)
         setTimeout(() => {
            this.zvitTimes = false
         }, 150)
         
         this.$refs.menu.save(this.pickedDate);
      },
      monthZvit(e){
         this.zvitTimes = true
         let currentDate
         if(this.pickedDate.length > 1){
            currentDate = new Date(this.pickedDate[1])
         } else {
            currentDate = new Date(this.pickedDate)
         }
         
         const currentMonth = currentDate.getMonth() - 1
         const currentYear = currentDate.getFullYear()
         if(currentMonth < 0){
            currentDate.setMonth(11)
            currentDate.setFullYear(currentYear - 1)
         } else {
            currentDate.setMonth(currentMonth + 1)
         } 
         currentDate.setDate(1)
         let firstDate = new Date(currentDate)
         if(currentMonth < 0){
           firstDate.setMonth(11)
         } else {
            firstDate.setMonth(currentMonth)
         } 
         // firstDate.setMonth(currentMonth)
         firstDate.setHours(0)
         firstDate.setMinutes(0)
         firstDate.setSeconds(0)
         let secondDate = new Date(currentDate)
         if(currentMonth < 0){
            secondDate.setMonth(0)
            secondDate.setFullYear(currentYear)
         }
         secondDate.setDate(secondDate.getDate() - 1)
         secondDate.setHours(23)
         secondDate.setMinutes(59)
         secondDate.setSeconds(59)
         this.readyDate = []
         this.readyDate.push(firstDate, secondDate)
         this.pickedDate = []
         let dateForPickedFirstDate = new Date(firstDate)
         let pickedDay = dateForPickedFirstDate.getDate()
         dateForPickedFirstDate.setDate(pickedDay + 1)
         this.pickedDate.push(dateForPickedFirstDate.toISOString().substr(0, 10))
         // this.pickedDate.push(firstDate.toISOString().substr(0, 10))
         this.pickedDate.push(secondDate.toISOString().substr(0, 10))
         setTimeout(() => {
            this.zvitTimes = false
         }, 150)
         this.clearClassesOfZvit(e.target)
      },
      kvartalZvit(event, fMonth, sMonth, isFourKvartal){
         this.zvitTimes = true
         this.pickedDate = []
         this.readyDate = []
         let firstDate = new Date()
         firstDate.setMonth(fMonth)
         firstDate.setDate(1)
         firstDate.setHours(0)
         firstDate.setMinutes(0)
         firstDate.setSeconds(0)
         let secondProtoDate = new Date()
         if(isFourKvartal){
            let fullYear = secondProtoDate.getFullYear()
            secondProtoDate.setFullYear(fullYear + 1)
         }
         secondProtoDate.setMonth(sMonth)
         secondProtoDate.setDate(1)
         secondProtoDate.setHours(23)
         secondProtoDate.setMinutes(59)
         secondProtoDate.setSeconds(59)
         let secondDate = new Date(secondProtoDate)
         let secondProtoDay = secondProtoDate.getDate() - 1
         secondDate.setDate(secondProtoDay)
         this.readyDate.push(firstDate, secondDate)
         let dateForPickedFirstDate = new Date(firstDate)
         let pickedDay = dateForPickedFirstDate.getDate()
         dateForPickedFirstDate.setDate(pickedDay + 1)
         this.pickedDate.push(dateForPickedFirstDate.toISOString().substr(0, 10))
         this.pickedDate.push(secondDate.toISOString().substr(0, 10))
         setTimeout(() => {
            this.zvitTimes = false
         }, 150)
         this.clearClassesOfZvit(event.target)
      },
      halfYearZvit(event, fMonth, sMonth, isSecondHalf){
         this.zvitTimes = true
         this.pickedDate = []
         this.readyDate = []
         let firstDate = new Date()
         firstDate.setMonth(fMonth)
         firstDate.setDate(1)
         firstDate.setHours(0)
         firstDate.setMinutes(0)
         firstDate.setSeconds(0)
         let secondProtoDate = new Date()
         if(isSecondHalf){
            let fullYear = secondProtoDate.getFullYear()
            secondProtoDate.setFullYear(fullYear + 1)
         }
         secondProtoDate.setMonth(sMonth)
         secondProtoDate.setDate(1)
         secondProtoDate.setHours(23)
         secondProtoDate.setMinutes(59)
         secondProtoDate.setSeconds(59)
         let secondDate = new Date(secondProtoDate)
         let secondProtoDay = secondProtoDate.getDate() - 1
         secondDate.setDate(secondProtoDay)
         this.readyDate.push(firstDate, secondDate)
         let dateForPickedFirstDate = new Date(firstDate)
         let pickedDay = dateForPickedFirstDate.getDate()
         dateForPickedFirstDate.setDate(pickedDay + 1)
         this.pickedDate.push(dateForPickedFirstDate.toISOString().substr(0, 10))
         this.pickedDate.push(secondDate.toISOString().substr(0, 10))
         setTimeout(() => {
            this.zvitTimes = false
         }, 150)
         this.clearClassesOfZvit(event.target)
      },
      onOpenSingle(id) {
         this.$router.push('/appointment/' + id)
      },
      onOpenSingleRelease(id) {
         this.$router.push('/appointmentRelease/' + id)
      },
      onResetDate(){
         this.readyDate = null
         this.editDialog = false
         this.pickedDate = [new Date().toISOString().substr(0, 10)]
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
            sumOfBeds += parseInt(numberOfTime, 10)
         })
         this.showSum = sumOfBeds
      },
      sumOfAfterBeds() {
         let sumOfAfterBeds = 0
         let newFilteredAppointments = this.filteredAppointments.filter(appoint => {
            return appoint.dateLeft !== ''
         })
         newFilteredAppointments.forEach(appoint => {
            let numberOfTime = appoint.dateLeft.toDate().getTime() - appoint.date.toDate().getTime()
            numberOfTime = numberOfTime / (1000 * 3600 * 24)
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
               newDate1.setUTCFullYear(newYear1)
               newDate1.setUTCMonth(newMonth1)
               newDate1.setUTCDate(newDay1)
               newDate1.setUTCHours(-3)
               newDate1.setUTCMinutes(0)
               newDate1.setUTCSeconds(0)
               const newDate2 = new Date(new Date())
               const newDay2 = new Date(this.pickedDate[1]).getUTCDate()
               const newMonth2 = new Date(this.pickedDate[1]).getUTCMonth()
               const newYear2 = new Date(this.pickedDate[1]).getUTCFullYear()
               newDate2.setUTCFullYear(newYear2)
               newDate2.setUTCMonth(newMonth2)
               newDate2.setUTCDate(newDay2)
               newDate2.setUTCHours(20)
               newDate2.setUTCMinutes(59)
               newDate2.setUTCSeconds(59)
               this.readyDate.push(newDate1, newDate2)
               // console.log(this.readyDate)
            } else {
               const newDate = new Date(new Date())
               const newDay = new Date(this.pickedDate).getUTCDate()
               const newMonth = new Date(this.pickedDate).getUTCMonth()
               const newYear = new Date(this.pickedDate).getUTCFullYear()
               newDate.setUTCFullYear(newYear)
               newDate.setUTCMonth(newMonth)
               newDate.setUTCDate(newDay)
               // const newIsoDate = this.pickedDate.toString().substr(8,10)
               // const newDate = new Date(new Date())
               // console.log(newIsoDate)
               // console.log(newDate)
               // // const newDay = new Date(this.pickedDate).getDate()
               // const newMonth = new Date(this.pickedDate).getMonth()
               // const newYear = new Date(this.pickedDate).getFullYear()
               // newDate.setFullYear(newYear)
               // newDate.setMonth(newMonth)
               // newDate.setDate(newIsoDate)
               
               this.readyDate = newDate
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
               newDate1.setUTCFullYear(newYear1)
               newDate1.setUTCMonth(newMonth1)
               newDate1.setUTCDate(newDay1)
               newDate1.setUTCHours(-3)
               newDate1.setUTCMinutes(0)
               newDate1.setUTCSeconds(0)
               const newDate2 = new Date(new Date())
               const newDay2 = new Date(this.pickedDateEntry[1]).getUTCDate()
               const newMonth2 = new Date(this.pickedDateEntry[1]).getUTCMonth()
               const newYear2 = new Date(this.pickedDateEntry[1]).getUTCFullYear()
               newDate2.setUTCFullYear(newYear2)
               newDate2.setUTCMonth(newMonth2)
               newDate2.setUTCDate(newDay2)
               
               
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
               newDate.setUTCFullYear(newYear)
               newDate.setUTCMonth(newMonth)
               newDate.setUTCDate(newDay)
               
               
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
               newDate1.setUTCFullYear(newYear1)
               newDate1.setUTCMonth(newMonth1)
               newDate1.setUTCDate(newDay1)
               
               newDate1.setUTCHours(-3)
               newDate1.setUTCMinutes(0)
               newDate1.setUTCSeconds(0)
               const newDate2 = new Date(new Date())
               const newDay2 = new Date(this.pickedDateLeft[1]).getUTCDate()
               const newMonth2 = new Date(this.pickedDateLeft[1]).getUTCMonth()
               const newYear2 = new Date(this.pickedDateLeft[1]).getUTCFullYear()
               newDate2.setUTCFullYear(newYear2)
               newDate2.setUTCMonth(newMonth2)
               newDate2.setUTCDate(newDay2)
               
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
               newDate.setUTCFullYear(newYear)
               newDate.setUTCMonth(newMonth)
               newDate.setUTCDate(newDay)
               this.readyDateLeft = newDate
               console.log(this.readyDateLeft)
               // console.log(this.readyDate.toISOString().substr(0,10))
               // console.log(this.readyDate.toString().substr(0, 15))
            }
         }

      },
      updateSortedAppointments2020(){
         this.sorted2020appointments.forEach(appoint => {
            const indexPos = this.sorted2020appointments.indexOf(appoint) + 1
            // console.log(appoint.id)
            // console.log(indexPos)
            this.$store.dispatch('updateDocOpNumber', {
               id: appoint.id,
               indexPos: indexPos
            })
         })
      },
      updateSortedAppointments2021(){
         this.sorted2021appointments.forEach(appoint => {
            const indexPos = this.sorted2021appointments.indexOf(appoint) + 1
            // console.log(appoint.id)
            // console.log(indexPos)
            this.$store.dispatch('updateDocOpNumber', {
               id: appoint.id,
               indexPos: indexPos
            })
         })
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
      zvitTimes: false,
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
      pickedComplexity: 'без фільтру',
      dialogWeek: false,
      dialogMonth: false,
      dialog1kvartal: false,
      dialog2kvartal: false,
      dialog3kvartal: false,
      dialog4kvartal: false,
      dialog1half: false,
      dialog2half: false,
      dialogYear: false,
      operationPatients: [],
      operationsEasier: [],
      operationsHarder: [],
      operationsOpen: [],
      operationsLapo: [],
      operationsEndo: [],
      operationsMalo: []


   }),
   created() {
      this.$store.dispatch('loadAppointments')
      console.log(this.isSuperAdmin)
      setTimeout(() => {
         console.log(this.sorted2021appointments)
      }, 2500) 
   },
   watch: {
      filteredAppointments(){
         this.showSum = 'Показати'
         this.showSumAfter = 'Показати'
      },
      pickedDate(){
            
            if(this.zvitTimes == false){
               this.clearClassesOfZvit(false)
            }
            
         
      },
      readyDate(){
         if(this.zvitTimes == false){
            this.clearClassesOfZvit(false)
         }
         
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
.p-unit-z{
    color: #000000;
    display: block;
    padding: 15px;
    font-weight: 500;
    font-size: 17px;
    margin: 0px 5px!important;
    margin-bottom: 7px!important;
    box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.26);
}
.p-unit-z:first-child{
   margin-top: 15px!important;
}
.p-unit-z.p-unit-date{
    text-align: center;
    box-shadow: none;
}
.v-card-zvit{
   text-align: center;
   display: block;
}
.span-unit{
    font-weight: 500;
}

.unit-color{
   /* background-color: #1f88ff47!important; */
   background-color: #05f77785!important;
}
.btn-archive {
   text-align: center;
   font-size: 18px;
   margin-right: 15px;
   width: 170px;
   margin-top: 13px;
   border-radius: 6px;
   height: 48px!important;
   padding: 7px!important;
   margin-left: 0px!important;
   margin-top: 10px!important;
   margin-bottom: 0;
   border-radius: 6px!important;
   align-items: center;
   font-weight: 400;
   letter-spacing: 0.3px;
   justify-content: center;
   position: relative;
   text-decoration: none;
   text-indent: 0;
   text-transform: none;
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
   min-height: 100px;
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
   height: 41px!important;
   padding: 7px!important;
   width: 315px;
   margin-left: 12px;
   margin-top: 3px;
   margin-bottom: 0;
   border-radius: 6px;
   align-items: center;
   font-weight: 400;
   letter-spacing: 0.3px;
   justify-content: flex-start;
   position: relative;
   text-decoration: none;
   text-indent: 0;
   text-transform: none;
   background-color: #0D47A1!important;
}
.info__button-text{
   font-size: 18px;
   height: 41px!important;
   padding: 7px!important;
   width: 315px;
   margin-left: 12px;
   margin-top: 3px;
   margin-bottom: 0;
   border-radius: 6px;
   align-items: center;
   font-weight: 400;
   letter-spacing: 0.3px;
   justify-content: flex-start;
   position: relative;
   text-decoration: none;
   text-indent: 0;
   text-transform: none;
   background-color: #0D47A1!important;
}
/* .info__button > span.clicked-zvit .info__button{
   background-color: violet!important;
} */
.clicked-zvit{
   background-color: #d83535!important;
}
.info__button.zvit{
   width: 200px;
   justify-content: center;
}
.buttons__section{
   justify-content: flex-start;
   margin-top: 8px;
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
   .buttons__section{
      justify-content: center;
   }
}
@media (max-width: 390px) {
   .layout-unit{
   flex: 100%;
   }
   .btn-archive {
   margin-bottom: 15px;
   }
   .info__button{
   width: 280px;
   margin-left: 0px;
   }
}
@media (max-width: 350px){
   .info__button{
   width: 250px;
   margin-left: 0px;
   }
}
</style>
<style>
.appo-div > .v-card{
   min-height: 228px;
}


</style>