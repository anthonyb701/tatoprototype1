<template>
  <v-dialog
     fullscreen hide-overlay transition="dialog-bottom-transition"
     v-model="editDialog"
  ><template v-slot:activator="{ on }">
        <v-btn
          accent
          class="blue darken-2 white--text mt-3 btn-appo-edit"
          style="font-size: 15px; height: 45px; margin: 0 20px"
          v-on="on"
          
        > Реадгувати деталі
        <v-icon>edit</v-icon>
        </v-btn>
      </template>
      <v-card>
         <v-main class="main-wrapper">
            <v-layout row wrap>
               <v-flex xs12>
                  <v-card-title class="box__modal__Close" >
                     <span>Редагувати операцію</span>
                     <div class="modal-close-div"><v-btn text class="blue--text darken-1" @click="onClose">Скасувати</v-btn>
                     <v-btn text class="blue--text darken-1" @click="onSaveChanges">Зберегти</v-btn></div> 
                  </v-card-title>
                  <v-layout row wrap>
            </v-layout>
               </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap >
               <v-flex xs12>
                  <v-card-text  class="layout-wrapper">
                     <v-text-field class="wrapper-unit"
                        name="title"
                        label="Title"
                        id="title"
                        v-model="editedTitle"
                        required
              ></v-text-field>
               <v-text-field class="wrapper-unit"
                        name="firstName"
                        label="First Name"
                        id="firstName"
                        v-model="editedFirstName"
                        required
              ></v-text-field>
              <v-text-field class="wrapper-unit"
                        name="lastName"
                        label="Last Name"
                        id="lastName"
                        v-model="editedLastName"
                        required
              ></v-text-field>
              <v-text-field class="wrapper-unit"
                        name="op_code"
                        label="Код Операції"
                        id="op_code"
                        v-model="editedOp_code"
                        required
              ></v-text-field>
              <v-text-field class="wrapper-unit"
                        name="op_number"
                        label="Номер Операції"
                        id="op_number"
                        v-model="editedOp_number"
              ></v-text-field>
              <v-text-field class="wrapper-unit"
                        name="nozologia"
                        label="Нозологія"
                        id="nozologia"
                        v-model="editedNozologia"
                        required
              ></v-text-field>
              <v-text-field class="wrapper-unit"
                        name="SicknessHistory"
                        label="Історія Хвороби"
                        id="SicknessHistory"
                        v-model="editedSicknessHistory"
                        required
              ></v-text-field>
               <v-text-field class="wrapper-unit"
                        name="DiagnosisAfter"
                        label="Післяопераційний діагноз"
                        id="DiagnosisAfter"
                        v-model="editedDiagnosisAfter"
                        required
              ></v-text-field>
              <v-text-field class="wrapper-unit"
                        name="DiagnosisUltimate"
                        label="Кінцевий діагноз"
                        id="DiagnosisUltimate"
                        v-model="editedDiagnosisUltimate"
              ></v-text-field>

              <v-textarea class="wrapper-unit"
                        label="Опис операції"
                        name="description"
                        v-model="editedDescription"
                        rows="3"
                        id="description"
                        required
              ></v-textarea>
              <v-textarea class="wrapper-unit"
                        label="Ускладнення"
                        name="complexity"
                        v-model="editedComplexity"
                        rows="3"
                        id="complexity"
              ></v-textarea>
              <v-select class="wrapper-unit"
               v-model="editedComplexityPicked"
               :items="complexityItems"
               label="Тип ускладнення"
               data-vv-name="select"
               required
               ></v-select>
              <v-textarea class="wrapper-unit"
                        label="Гістологічне Заключення"
                        name="gisto"
                        v-model="editedGisto"
                        rows="3"
                        id="gisto"
              ></v-textarea>
              <v-select class="wrapper-unit"
               v-model="editedSurgeon"
               :items="items"
               label="Хірург"
               data-vv-name="select"
               required
        ></v-select>
        <v-select class="wrapper-unit"
               v-model="editedAssistant"
               :items="items"
               label="Ассистент"
               data-vv-name="select"
               required
        ></v-select>
        <v-select class="wrapper-unit"
               v-model="editedAnesthesiologist"
               :items="anesthesiologistItems"
               label="Анестезіолог"
               data-vv-name="select"
               required
        ></v-select>
        <v-select class="wrapper-unit"
               v-model="editedMedsister"
               :items="medsisterItems"
               label="Операційна Сестра"
               data-vv-name="select"
               required
        ></v-select>
        <v-select class="wrapper-unit"
               v-model="editedRank"
               :items="rankItems"
               label="Звання"
               data-vv-name="select"
               required
        ></v-select>
        <v-select class="wrapper-unit"
               v-model="editedTimeType"
               :items="timeTypeItems"
               label="Первинна/ Повторна"
               data-vv-name="select"
               required
        ></v-select>
        <v-select class="wrapper-unit"
               v-model="editedUrgencyType"
               :items="urgencyTypeItems"
               label="Планова / Ургентна"
               data-vv-name="select"
               required
        ></v-select>
         <v-select class="wrapper-unit"
               v-model="editedOperationType"
               :items="operationTypeItems"
               label="Тип операції"
               data-vv-name="select"
               required
        ></v-select>
        <v-select class="wrapper-unit"
               v-model="editedAnesthesiaType"
               :items="anesthesiaTypeItems"
               label="Тип анастезії"
               data-vv-name="select"
               required
        ></v-select>
        <v-select class="wrapper-unit"
               v-model="editedSpotType"
               :items="spotTypeItems"
               label="Стаціонарна / Амбулаторна"
               data-vv-name="select"
               required
        ></v-select>
        <v-select class="wrapper-unit"
               v-model="editedUltimateType"
               :items="ultimateTypeItems"
               label="Виписаний/ Помер"
               data-vv-name="select"
        ></v-select>
        <v-select class="wrapper-unit"
               v-model="editedComplication"
               :items="complicationItems"
               label="Складність"
               data-vv-name="select"
        ></v-select>
                  </v-card-text>
               </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <!-- <v-layout row wrap>
               <v-flex xs12>
                  <v-card-actions>
                     <v-btn text class="blue--text darken-1" @click="onClose">Скасувати</v-btn>
                     <v-btn text class="blue--text darken-1" @click="onSaveChanges">Зберегти</v-btn>
                  </v-card-actions>
               </v-flex>
            </v-layout> -->
         </v-main>
      </v-card> 
  </v-dialog>
</template>

<script>
export default {
   props: ['post'],
   data(){
      return {
         editedTitle: this.post.title,
         editedDescription: this.post.description,
         editDialog: false,
         editedSurgeon: this.post.surgeon,
         editedFirstName: this.post.user.firstName,
         editedLastName: this.post.user.lastName,
         editedOp_number: this.post.op_numbertest1,
         editedRank: this.post.rank,
         editedOp_code: this.post.op_code,
         editedComplexity: this.post.complexity,
         editedNozologia: this.post.nozologia,
         editedGisto: this.post.gisto,
         editedTimeType: this.post.timeType,
         editedUrgencyType: this.post.urgencyType,
         editedOperationType: this.post.operationType,
         editedAnesthesiaType: this.post.anesthesiaType,
         editedSpotType: this.post.spotType,
         editedUltimateType: this.post.ultimateType,
         editedAssistant: this.post.assistant,
         editedAnesthesiologist: this.post.anesthesiologist,
         editedMedsister: this.post.medsister,
         editedSicknessHistory: this.post.sicknessHistory,
         editedDiagnosisAfter: this.post.diagnosisAfter,
         editedDiagnosisUltimate: this.post.diagnosisUltimate,
         editedComplication: this.post.complication,
         editedComplexityPicked: this.post.complexityPicked

      }
   },
   computed: {
      items(){
         return this.$store.getters.items
      },
      rankItems(){
         return this.$store.getters.rankItems
      },
      timeTypeItems(){
         return this.$store.getters.timeTypeItems
      },
      urgencyTypeItems(){
         return this.$store.getters.urgencyTypeItems
      },
      operationTypeItems(){
         return this.$store.getters.operationTypeItems
      },
      anesthesiaTypeItems(){
         return this.$store.getters.anesthesiaTypeItems
      },
      spotTypeItems(){
         return this.$store.getters.spotTypeItems
      },
      ultimateTypeItems(){
         return this.$store.getters.ultimateTypeItems
      },
      anesthesiologistItems(){
         return this.$store.getters.anesthesiologistItems
      },
      medsisterItems(){
         return this.$store.getters.medsisterItems
      },
      complicationItems(){
         return this.$store.getters.complication
      },
      complexityItems(){
         return this.$store.getters.complexityItems
      }
   },
   watch: {
      editedAnesthesiaType(){
         if(this.editedAnesthesiaType == 'Місцева'){
            this.editedAnesthesiologist= ''
         }
      }
   },
   methods: {
      onSaveChanges() {
         console.log('save changes')
         if(this.editedTitle.trim() === '' || this.editedDescription.trim() === '' 
         || this.editedSurgeon.trim() === '' || this.editedFirstName.trim() === '' || this.editedLastName.trim() === ''
         || this.editedRank.trim() === '' || this.editedOp_code.trim() === ''
         || this.editedNozologia.trim() === ''
         || this.editedTimeType.trim() === '' || this.editedUrgencyType.trim() === '' || this.editedOperationType.trim() === ''
         || this.editedAnesthesiaType.trim() === '' || this.editedSpotType.trim() === ''
         || this.editedAssistant.trim() === '' || this.editedMedsister.trim() === ''
         || this.editedSicknessHistory.trim() === '' || this.editedDiagnosisAfter.trim() === '' || this.editedComplication.trim() === ''){
            return 
         }
         this.editDialog = false
         console.log(this.editedOp_number)
         this.$store.dispatch('updatePost', {
            id: this.post.id,
            title: this.editedTitle,
            description: this.editedDescription,
            surgeon: this.editedSurgeon,
            firstName: this.editedFirstName,
            lastName: this.editedLastName,
            op_numbertest1: this.editedOp_number,
            op_code: this.editedOp_code,
            rank: this.editedRank,
            complexity: this.editedComplexity,
            nozologia: this.editedNozologia,
            gisto: this.editedGisto,
            timeType: this.editedTimeType,
            urgencyType: this.editedUrgencyType,
            operationType: this.editedOperationType,
            anesthesiaType: this.editedAnesthesiaType,
            spotType: this.editedSpotType,
            ultimateType: this.editedUltimateType,
            assistant: this.editedAssistant,
            anesthesiologist: this.editedAnesthesiologist,
            medsister: this.editedMedsister,
            sicknessHistory: this.editedSicknessHistory,
            diagnosisAfter: this.editedDiagnosisAfter,
            diagnosisUltimate: this.editedDiagnosisUltimate,
            complication: this.editedComplication,
            complexityPicked: this.editedComplexityPicked

         })
      },
      onClose(){
         this.editDialog = false
         this.editedTitle = this.post.title
         this.editedDescription = this.post.description
         this.editedSurgeon = this.post.surgeon
         this.editedFirstName = this.post.user.firstName
         this.editedLastName = this.post.user.lastName
         this.editedOp_number = this.post.op_numbertest1
         this.editedOp_code = this.post.op_code
         this.editedRank = this.post.rank
         this.editedComplexity = this.post.complexity
         this.editedNozologia = this.post.nozologia
         this.editedGisto = this.post.gisto
         this.editedTimeType = this.post.timeType
         this.editedUrgencyType = this.post.urgencyType
         this.editedOperationType = this.post.operationType
         this.editedAnesthesiaType = this.post.anesthesiaType
         this.editedSpotType = this.post.spotType
         this.editedUltimateType = this.post.ultimateType
         this.editedAssistant = this.post.editedAssistant
         this.editedAnesthesiologist = this.post.anesthesiologist
         this.editedMedsister = this.post.medsister
         this.editedSicknessHistory = this.post.sicknessHistory
         this.editedDiagnosisAfter = this.post.diagnosisAfter
         this.editedDiagnosisUltimate = this.post.diagnosisAfter
         this.editedComplication = this.post.complication
         this.editedComplexityPicked = this.post.complexityPicked
      }
   }
}
</script>

<style scoped>
.v-btn--fab{
   height: 35px;
   width: 35px;
   font-size: 16px!important
}
.v-icon{
   font-size: 20px!important
}
.main-wrapper{
   padding: 8px!important;
   overflow-x: hidden;
}
.layout-wrapper{
   display: flex;
   flex-wrap: wrap;
   flex-direction: column;
   max-height: 800px;
}
.wrapper-unit{
   margin: 10px;
   box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.17);
   padding: 2px 10px;
   padding-top: 17px;
   margin-bottom: 15px;
   border-radius: 4px;
}
.box__modal__Close{
   display: flex;
   justify-content: space-between;
}
.box__modal__Close > span {
   font-weight: 700;
   font-size: 20px;
}
@media (max-width: 1200px){
   .layout-wrapper{
      max-height: 1200px;
   }
}
@media (max-width: 800px){
   .layout-wrapper{
      max-height: 3000px;
}
}
@media (max-width: 468px){
   .modal-close-div{
      margin-left: -15px;
   }
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