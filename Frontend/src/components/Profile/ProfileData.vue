<!-- TO DO: BOTAO DE EDITAR FOTOGRAFIA A FUNCIONAR -->
<template>
  <!-- Div Principal -->
  <div class="text-center" style="color: #434343">
    <div class="row" style="display: grid;">
      <div class="col-12" style="position: relative; height: 549px;">
        <!-- Div Cima -->
        <div class="divTop1">
        </div>
        <div class="divTop2">
          <div class="centerDiv">
            <div class="row" style="position: relative; display: grid; justify-content: center; top: 30px">
              <div class="col-12">
                <q-avatar class="shadow" size="140px" font-size="52px" color="teal" text-color="white" >
                  <img style="object-fit: cover;" :src="`${base}${profile.avatar}`">
                </q-avatar>
              </div>
              <div class="col-12">
                <span style="font-weight: 600; font-size: 30px;">
                  {{ profile.name }}
                </span>
                <br/>
                <span style="font-weight: 300; font-size: 20px; line-height: 10px;">
                  {{ profile.username }}
                </span>
              </div>
            </div>
          </div>
          <div class="photoChange">
            <label class="cameraButtom " for="avatar"  >
              <q-icon size="23px" name="fas fa-camera" color="white"/>    
            </label>
            <input id="avatar" style="visibility:hidden;" type="file" @change="changeAvatar">
          </div>  
        </div>
      </div>
      <div class="col-12" style="position: relative;">
        <!-- Div Baixo -->
        <div class="divBottom">
          <!-- Box Vermelha - Detalhes Pessoais -->
          <div class="roundedDivPersonalDetails shadow">
            <p style="font-weight: 500; font-size: 130%; align-items: center; text-align: left; margin: 20px;" class="font-weight-bold button">
              {{ $t('profilePage.personalDetails') }}
            </p>
          </div>
          <!-- Primeira Box - Dados Pessoais -->
          <div class="roundedDiv shadow" style="display: grid; border-radius: 30px; font-weight: 280; font-size: 13px; text-align: left;">
            <div class="row" style="margin: 10px; padding-top: 25px; padding-bottom: 10px;">
              <div class="col-10">
                <!-- Nome -->
                <div style="margin-left: 10px; margin-top: 15px;">
                  <q-form  class="q-gutter-md">
                      <q-input borderless v-model="profile.name"  style="height: 30px;" type="text" :disable ="!editavel">
                        <template v-slot:prepend>
                            <q-icon name="fas fa-user" color="grey-5" style="font-size: 20px; font-weight:350"/>
                        </template>
                      </q-input>
                    </q-form>
                </div>
                <!-- Nome de Utilizador -->
                <div style="margin-left: 10px;">
                  <q-form  class="q-gutter-md">
                  <q-input borderless v-model="profile.username" style="height: 30px;" :disable ="!editavel">
                    <template v-slot:prepend>
                      <span style="font-size: 28px; font-weight:350">#</span>
                    </template>
                  </q-input>
                  </q-form>
                </div>
                <!-- Email -->
                <div style="margin-left: 10px;">
                  <q-input borderless v-model="profile.email" style="height: 30px;" :disable ="!editavel" >
                    <template v-slot:prepend>
                      <span style="font-size: 20px; font-weight:350">@</span>
                    </template>
                  </q-input>
                </div>
                <!-- Morada -->
                <div class="row">
                  <div class="col-1" style="display: flex; justify-content: left; align-items: center; padding: 10px;">
                    <q-icon name="fas fa-home" color="grey-5" style="font-size: 20px; "/>
                  </div>
                  <div class="col-11" style="padding-left: 15px">
                    <q-input borderless v-model="profile.address" style="height: 30px;" :disable ="!editavel"/>
                    <div class = "row" style="margin-top: -10px;">
                      <div class= "col-4">
                        <q-input borderless v-model="profile.zipCode" style="height: 30px;" :disable ="!editavel"/> 
                      </div>
                      <div class= "col-8">
                        <q-input borderless v-model="profile.city" style="height: 30px;" :disable ="!editavel"/>
                      </div>  
                    </div>
                  </div>
                </div>
            </div>
            <div class="col-2" style="padding: 10px">
              <!-- Bot??es -->
              <div style="text-align: right; position: absolute;" >
                <q-btn  size="sm" class="gradientBlue" round @click="bottomEdit" v-show= "!esconde"   >
                  <q-icon name="fas fa-pen" color="white" />
                </q-btn>
              </div> 
              <div>
                <q-btn  size="sm" class="gradientBlue" round @click="bottomSave" v-show= "esconde" >
                  <q-icon name="fas fa-save" color="white" />
                </q-btn>
              </div>
              <div >
                <q-btn size="sm" class="gradientBlue" round @click="bottomCancel" v-show= "esconde" style = "margin-top : 5px">
                  <q-icon name="fas fa-times" color="white" />
                </q-btn>
              </div>
            </div>
          </div>
          </div>
          <!-- Box Vermelha - Seguran??a -->
          <div class="roundedDivSecurity shadow">
              <p style="font-weight: 500; font-size: 130%; align-items: center; text-align: left; margin: 20px;" class="font-weight-bold button">
                {{ $t('profilePage.security') }}
              </p>
          </div>
          <!-- Segunda Box - Password -->
          <div class="roundedDiv shadow" style="display: grid; border-radius: 30px; font-weight: 200; text-align: left; margin-top:20px;">
            <div class="row" style="margin: 10px; padding-top: 10px">
              <div class="col-10" >  
                <div style=" margin-top:7px">
                  <q-form  class="q-gutter-md">
                    <div class="row" style="padding: 5px">
                      <div class="col-6" style="padding: 10px">
                        <q-input borderless v-model="oldPassword" :label= "$t('profilePage.oldPassword')" style="height: 30px;" :type="isPwd ? 'password' : 'text'" :disable ="!editavel2">
                          <template v-slot:append>
                            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd"/>
                          </template>
                        </q-input>
                      </div>
                        <div class="col-6" style="padding: 10px">
                          <q-input borderless v-model="newPassword" :label= "$t('profilePage.newPassword')" style="height: 30px;" :type="isPwd ? 'password' : 'text'" :disable ="!editavel2">
                            <template v-slot:append>
                              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd"/>
                            </template>
                          </q-input>
                        </div>
                    </div>
                  </q-form>
                </div>
              </div>
                <!-- BOT??O CHANGE PASSWORD -->
              <div class="col-2" style="padding: 10px">
                <div style="text-align: right;  position: absolute;"  >
                  <q-btn flat size="sm" class="gradientBlue" round @click="bottomEdit2" v-show= "!esconde2"  >
                    <q-icon name="fas fa-pen" color="white" />
                  </q-btn>
                </div>
                <div>
                  <q-btn flat size="sm" class="gradientBlue" @click="bottomSavePassword" round v-show= "esconde2" >
                      <q-icon name="fas fa-save" color="white" />
                  </q-btn>
                </div>
                <div >
                  <q-btn flat size="sm" class="gradientBlue" @click="bottomCancel2" round v-show= "esconde2" style = "margin-top : 5px">
                    <q-icon name="fas fa-times" color="white" />
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
          <!-- Box Vermelha - Idioma -->
          <div class="roundedDivLanguage shadow">
              <p style="font-weight: 500; font-size: 130%; align-items: center; text-align: left; margin: 20px;" class="font-weight-bold button">
                {{ $t('profilePage.language') }}
              </p>
          </div>
          <!-- Segunda Box - Idioma -->
          <div class="roundedDiv shadow" style="display: grid; border-radius: 30px; margin-top: 20px;">
            <div class="row" style="margin: 15px; padding-right: 10px;">
              <q-select style="width: 100%" rounded behavior="menu" v-model="lang"
                :options="langOptions"
                :label="$t('settingsPage.language')" >
              </q-select>
            </div>
          </div>
          <!-- Bot??o Logout -->
          <q-btn class="gradientBlue" rounded @click="handleLogout" style="width: 200px; height: 35px; margin: 40px; bottom:10px;">
            <p style="font-size:130%; text-transform: capitalize;" class="font-weight-bold button">
                {{ $t('profilePage.signout') }}
            </p>
            <q-icon name="fas fa-sign-out-alt" color="white" style="font-size: 20px; margin-left: 10px;"/>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Service from '../../services/auth.service'
import UserService from '../../services/user.service'
import User from '../../models/User';

export default {
  name: "ProfileData",
  props: {
    profile: Object,
    _id: String,
    name: String,
    username: String,
    email: String,
    address: String,
    zipCode: String,
    city: String,
    avatar: String,
    base: String
    
  },

  data () {
    return {
      file: Object,
      isPwd: true,
      editavel: false,
      editavel2: false,
      esconde:false,
      esconde2:false,
      endpoint: `${process.env.API_ENDPOINT}/users/avatar`,
      newPassword: '***************',
      oldPassword:'***************',
       lang: this.$i18n.locale,
        langOptions: [
          { value: 'en-us', label: this.$t('languages.english')},
          { value: 'pt', label: this.$t('languages.portuguese')},
          { value: 'fr', label: this.$t('languages.french')}
      ]
    }
  },

  watch: {
      lang(lang) {
        console.log("Language Change", lang);
        this.$i18n.locale = lang.value;
      }
  },

  methods: {
   
    changeAvatar(e) {
      e.preventDefault();
      console.log(e.target.files[0]);
      if(e.target.files.length === 1) {
          let file = e.target.files[0];
          // event.target.files
          UserService.uploadAvatar(file)
            .then(response => {
              console.log(response);
              this.profile.avatar = response.data[ "data" ].data.avatar;

              console.log(data);
            }).catch(err => console.log(err));
      } else {console.log("Selecione exatamente um ficheiro!")}        
    },

    handleSubmit(e) {
        e.preventDefault();

    },

    handleLogout() {
      console.log("hello")
      Service.logout(this.user)
      this.$router.push({ name: 'Home' })
    },

    bottomEdit(){
      this.editavel = true;
      this.esconde = true;
      
    },

     bottomEdit2(){
      this.editavel2 = true;
      this.esconde2 = true;
      this.newPassword = '';
      this.oldPassword = '';
    },
    
    bottomSave(e){
      e.preventDefault();
      console.group("UserUpdateInformation");

      this.$emit('changeUserProfile', this.profile);
      this.editavel = false;
      this.esconde = false;
      
    },

    bottomSavePassword(e){
      e.preventDefault();
      console.group("UserUpdatePassword");
      let data ={
        oldPassword: this.oldPassword,
        newPassword:this.newPassword
        }
      this.$emit('changeUserPassword', data);
      this.editavel2 = false;
      this.esconde2 = false;
      
    },

    bottomCancel(){
      this.editavel = false;
      this.esconde = false;
      window.location.reload();
      
    },    


    bottomCancel2(){
      this.editavel2 = false;
      this.esconde2 = false;
      this.newPassword= '***************';
      this.oldPassword='***************';
    }    
  }
}
</script>



<style scoped>

  .photoChange {

  }

  .cameraButtom::after{
    content:"" !important;
  }

  .cameraButtom{
    background: linear-gradient(#e9695c, #e03459);
    padding: 9px 9px;
    border-radius: 50px;
    border: 1px solid #e9695c;
    display: inline-block;
    outline: none;
  }

  .divTop1{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60%;
    background-size: cover;
    background-position: center top;
    background-image: url('../../assets/Other/ProfileFrame.svg');
  }

  .divTop2{
    position: relative;
    left: 0;
    top: 30px;
    width: 100%;
    height: 250px;
    color: white;
  }

  .divBottom {
    position: relative;
    top: 60px;
    width: 100%;
    padding: 30px;
  }

  .button {
    font: bold 12px;
    margin: 0px;
    color: #fff;
  }

  .inputWhite {
    background: white;
  }

  .gradientRed {
    background-image: linear-gradient(#e9695c, #e03459);
  }

  .gradientBlue {
     background-image: linear-gradient(#13c1e0, #2897e3);
  }

  .roundedDiv {
    background: white;
    display: flex;
    align-items: center;
    padding-left: 10px;
  }



  .roundedDivSecurity {
    background: linear-gradient(#e9695c, #e03459);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 60px;
    -webkit-transform: translate(-50%, 100%);
    width: 120px;
    height: 35px;
    border-radius: 30px;
  }

  .roundedDivLanguage {
    background: linear-gradient(#e9695c, #e03459);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 60px;
    -webkit-transform: translate(-50%, 100%);
    width: 120px;
    height: 35px;
    border-radius: 30px;
  }

  .shadow {
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.116);
  }

</style>
