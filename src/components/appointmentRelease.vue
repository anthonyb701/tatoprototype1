<template >
  <v-layout class="layoutt" v-if="!toDelete">
      <v-layout row wrap>
          <v-flex xs12>
              <div class="button-home">
                  <v-btn @click="toList" class="white--text  home-btn mr-4 blue darken-1 pa-2 mb-5">Повернутися назад</v-btn>
                  <v-btn v-if="!isCopied" @click="copyTEXT" class="white--text home-btn  pa-2 mb-5">Скопіювати звіт</v-btn>
                  <v-btn v-else @click="copyTEXT" class="white--text copied-btn home-btn  pa-2 mb-5">Скопійовано</v-btn>
              </div>
              
              <button v-if="true == false" @click="toProfile" class="white--text  blue darken-1 pa-2 mb-5">To Profile</button>
              <v-card>
                  <v-card-text class="pp-wrapper">
                     <p class="p-unit">ПІБ: <span class="span-unit">{{singleAppointment.user.firstName}} {{singleAppointment.user.lastName}}</span> &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; Рік народження: <span class="span-unit">{{singleAppointment.dateAge | dateR}}</span></p>
                     <p class="p-unit">Категорія: <span class="span-unit">{{singleAppointment.rank}}</span> &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; Історія хвороби: <span class="span-unit">{{singleAppointment.sicknessHistory}}</span></p>
                     <p class="p-unit">Дата поступлення: <span class="span-unit">{{singleAppointment.dateEntry | dateR}}</span> &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; Дата виписки: <span class="span-unit">{{singleAppointment.dateLeft | dateR}}</span></p>
                     <p class="p-unit">Код за  МКХ:  <span class="span-unit">{{singleAppointment.nozologia}}</span> &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; Код операції: <span class="span-unit">{{singleAppointment.op_code}}</span></p>
                     <p class="p-unit">Первинність:  <span class="span-unit">{{singleAppointment.timeType}}</span> &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; Терміновість: <span class="span-unit">{{singleAppointment.urgencyType}}</span></p>
                     <p class="p-unit">Операція: <span class="span-unit">{{singleAppointment.title}}({{singleAppointment.op_code}})</span> &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; Тип анестезії: <span class="span-unit">{{singleAppointment.anesthesiaType}}</span></p>
                     <p class="p-unit">Дата: <span class="span-unit">{{singleAppointment.date | dateR}}</span> &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; Тривалість: <span class="span-unit">{{singleAppointment.duration}} </span></p>
                     <p class="p-unit">Початок Операції: <span class="span-unit">{{singleAppointment.timeStart}} &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; </span> Кінець Операції: <span class="span-unit">{{singleAppointment.timeEnd}}</span></p>
                     <p class="p-unit">Тип операції: <span class="span-unit">{{singleAppointment.operationType}}</span> &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; <span class="span-unit">{{singleAppointment.spotType}} </span></p>
                     <p class="p-unit space"> <br><span class="bold">Операція:</span> <span class="span-unit bold">{{singleAppointment.title}}({{singleAppointment.op_code}})</span><br> Опис операції: <span class="span-unit light">{{singleAppointment.description}}</span></p>
                     <p class="p-unit space"><br> Передопераційний діагноз: <span class="span-unit">{{singleAppointment.diagnosisAfter}}</span></p>
                     <p class="p-unit space"><br> Оперував: <span class="span-unit">{{singleAppointment.surgeon}}</span> &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; Асистували: <span class="span-unit">{{singleAppointment.assistant}}</span></p>
                     <!-- <p class="p-unit">Асистували: <span class="span-unit">{{singleAppointment.assistant}}</span></p> -->
                     <p class="p-unit" ><span v-if="singleAppointment.anesthesiaType != 'Місцева'">Анестезіолог: <span  class="span-unit" >{{singleAppointment.anesthesiologist}} </span> &zwnj; &zwnj; &zwnj; &zwnj; &zwnj;</span> Операційна сестра: <span class="span-unit">{{singleAppointment.medsister}} </span></p> 
                     <!-- <p class="p-unit">Операційна сестра: <span class="span-unit">{{singleAppointment.medsister}} </span></p> -->
                      <!-- <p class="p-unit">Дата операції: <span class="span-unit">{{singleAppointment.date | dateF}}</span></p>
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
                      <p class="p-unit">Звання: <span class="span-unit">{{singleAppointment.rank}}</span></p> -->
                      <!-- <edit-date  v-if="isAuthor" :post="singleAppointment"></edit-date>
                      <edit-dateentry v-if="isAuthor" :post="singleAppointment"></edit-dateentry>
                      <edit-dateleft v-if="isAuthor" :post="singleAppointment"></edit-dateleft>
                      <edit-dateage v-if="isAuthor" :post="singleAppointment"></edit-dateage>
                      <edit-duration v-if="isAuthor" :post="singleAppointment"></edit-duration>
                      <edit-details v-if="isAuthor" :post="singleAppointment"></edit-details> -->
                  </v-card-text>
                  <span class="test-span"></span>
              </v-card>
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
            copied: false,
            isCopied: false,
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
        },
        copyTEXT(){
            /* Get the text field */
            let copyText = document.querySelectorAll('.p-unit');
            let textArray = []
            copyText.forEach(element => {
                if(element.classList.contains('space')){
                    let initialEl = element.innerText
                    element.innerText = `<br>${initialEl}`
                    textArray.push(element.innerText)
                    element.innerText = initialEl
                } else {
                    textArray.push(element.innerText)
                }
                
                

            })
            let newText = textArray.join('<br>')
            document.querySelector('.test-span').innerHTML = newText
            window.navigator.clipboard.writeText(document.querySelector('.test-span').innerText)
            document.querySelector('.test-span').innerHTML = ''
            this.isCopied = true
            console.log(this.isCopied)
                    }
                     
                }
              
}
</script>

<style scope lang="scss">
.layoutt{
    padding: 15px;
}
.pps-wrapper{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    max-height: 5000px;
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
.span-unit.bold{
    font-weight: 500;
    font-size: 18px;
}
.span-unit.light{
    font-weight: 400;
}
.bold{
    font-weight: 500;
    font-size: 18px;
}
.test-span{
    color: white;
}
.button-home{
    display:flex;
    justify-content: space-between;
}
.home-btn{
    height: 48px!important;
    padding: 7px!important;
    margin-left: 0px!important;
    margin-top: 10px!important;
    margin-bottom: 0;
    font-size: 16px!important;
   border-radius: 5px!important;
   align-items: center;
   font-weight: 400;
   letter-spacing: 0.3px;
   justify-content: center;
   position: relative;
   text-decoration: none;
   text-indent: 0;
   text-transform: none;
}

.home-btn:last-child{
    background-color: rgb(63, 81, 181)!important;
    margin-right: 60px;
}
.home-btn.copied-btn{
    background-color: rgb(23, 153, 45)!important;
}
@media (max-width: 1200px){
    .pp-wrapper{
        max-height: 5000px;
    }
}
@media (max-width: 820px){
    .pp-wrapper{
        max-height: 5000px;
    }
    
}
@media (max-width: 430px){
    .p-unit{
        padding: 15px;
        font-size: 14px;
    }

    .pp-wrapper{
        max-height: 5000px;
        padding: 4px!important;
    }
}

</style>