<template >
  <v-layout class="layoutt" v-if="!toDelete">
      <v-layout row wrap>
          <v-flex xs12>
              <button @click="toList" class="white--text  mr-4 blue darken-1 pa-2 mb-5">Повернутися назад</button>
              <button v-if="true == false" @click="toProfile" class="white--text  blue darken-1 pa-2 mb-5">To Profile</button>
              <v-card>
                  <v-card-title primary-title>
                      <h3 class="primary--text">Операція: {{singleAppointment.title}}</h3>
                  </v-card-title>
                  <v-card-text class="p-wrapper">
                      <p class="p-unit">Дата операції: <span class="span-unit">{{singleAppointment.date | dateF}}</span></p>
                      <p class="p-unit">Поступив: <span class="span-unit">{{singleAppointment.dateEntry | dateF}}</span></p>
                      <p class="p-unit">Дата виписки: <span class="span-unit">{{singleAppointment.dateLeft | dateF}}</span></p>
                      <p class="p-unit">Дата народження: <span class="span-unit">{{singleAppointment.dateAge | dateF}}</span></p> 
                      <p class="p-unit">Patient: <span class="span-unit">{{singleAppointment.user.firstName}} {{singleAppointment.user.lastName}}</span></p>
                      <p class="p-unit">Вік: <span class="span-unit">{{age}}</span></p>
                      <p class="p-unit">Опис: <span class="span-unit">{{singleAppointment.description}}</span></p>
                      <p class="p-unit">Тривалість: <span class="span-unit">{{singleAppointment.duration}}</span></p>
                      <p class="p-unit">Первинна/ Повторна: <span class="span-unit">{{singleAppointment.timeType}}</span></p>
                      <p class="p-unit">Планова / Ургентна: <span class="span-unit">{{singleAppointment.urgencyType}}</span></p>
                      <p class="p-unit">Тип операції: <span class="span-unit">{{singleAppointment.operationType}}</span></p>
                      <p class="p-unit">Тип анестезії: <span class="span-unit">{{singleAppointment.anesthesiaType}}</span></p>
                      <p class="p-unit">Стаціонарна/ Амбулаторна: <span class="span-unit">{{singleAppointment.spotType}}</span></p>
                      <p class="p-unit">Виписаний / Помер: <span class="span-unit">{{singleAppointment.ultimateType}}</span></p>
                      <p class="p-unit">Ускладнення: <span class="span-unit">{{singleAppointment.complexity}}</span></p>
                      <p class="p-unit">Гістологічне заключення: <span class="span-unit">{{singleAppointment.gisto}}</span></p>
                      <p class="p-unit">Нозологія: <span class="span-unit">{{singleAppointment.nozologia}}</span></p>
                      <p class="p-unit">Хірург: <span class="span-unit">{{singleAppointment.surgeon}}</span></p>
                      <p class="p-unit">Номер Операції: <span class="span-unit">{{singleAppointment.op_number}}</span></p>
                      <p class="p-unit">Код Операції: <span class="span-unit">{{singleAppointment.op_code}}</span></p>
                      <p class="p-unit">Звання: <span class="span-unit">{{singleAppointment.rank}}</span></p>
                      <edit-date  v-if="isAuthor" :post="singleAppointment"></edit-date>
                      <edit-dateentry v-if="isAuthor" :post="singleAppointment"></edit-dateentry>
                      <edit-dateleft v-if="isAuthor" :post="singleAppointment"></edit-dateleft>
                      <edit-dateage v-if="isAuthor" :post="singleAppointment"></edit-dateage>
                      <edit-duration v-if="isAuthor" :post="singleAppointment"></edit-duration>
                      <edit-details v-if="isAuthor" :post="singleAppointment"></edit-details>
                  </v-card-text>
              </v-card>
              <div v-if="isAuthor">
                  <button v-if="!onDelete" @click.prevent="onDelete = !onDelete" class="white--text red pa-2 mt-3">Видалити цю операцію</button>
                    <form v-else @submit.prevent="onSubmit">
                  <v-checkbox
                    v-model="checkbox"
                    value="1"
                    label="Підтвердження"
                    type="checkbox"
                    required
                  ></v-checkbox>
                  <button @click="onDelete = !onDelete" class="white--text green pa-2 mr-3" >Скасувати</button>
                  <button type="submit" class="white--text red pa-2">Видалити!</button>
              </form>
              </div>
          </v-flex>
      </v-layout>
  </v-layout>
</template>

<script>

export default {
    props: ['id'],
    data(){
        return {
            checkbox: '',
            onDelete: false,
            toDelete: false,
        }
    },
    computed: {
        singleAppointment(){
            return this.$store.getters.appointment(this.id)
        },
        currentUser(){
            return this.$store.getters.onUserChanged
        },
        isAuthor(){
            if(this.singleAppointment.creatorId === this.currentUser){
                return true
            } else {
                return false
            }
        },
        age(){
            const nowDate = new Date()
            let ageNumber = (nowDate.getTime() - this.singleAppointment.dateAge.toDate().getTime()) / (1000 * 3600 * 24 * 365) 
            console.log(ageNumber)
            ageNumber = ageNumber - 0.012
            console.log(ageNumber)
            ageNumber = Math.floor(ageNumber) 
            console.log(ageNumber)
            return ageNumber
        }

    },
    methods: {
        onSubmit(){
            this.toDelete = true
            this.$store.dispatch('deleteAppointment', this.id)
        },
        toProfile(){
            this.$router.push('/profile').catch(()=>{})
        },
        toList(){
            this.$router.push('/').catch(()=>{})
            this.$destroy()
        }
    }
}
</script>

<style scope lang="scss">
.layoutt{
    padding: 15px;
}
.p-wrapper{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    max-height: 600px;
}
.p-unit{
    color: #000000;
    display: block;
    padding: 15px;
    font-size: 17px;
    margin: 0px 5px!important;
    margin-bottom: 7px!important;
    box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.26);
}
.span-unit{
    font-weight: 500;
}
@media (max-width: 1200px){
    .p-wrapper{
        max-height: 850px;
    }
}
@media (max-width: 820px){
    .p-wrapper{
        max-height: 2600px;
    }
    
}
@media (max-width: 430px){
    .p-unit{
        padding: 15px;
        font-size: 14px;
    }

    .p-wrapper{
        max-height: 3000px;
        padding: 4px!important;
    }
}

</style>