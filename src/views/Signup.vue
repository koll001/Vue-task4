<template>
  <div class="home">
    <div class="logo">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <h1>新規登録画面</h1>
    <form @submit.prevent="signUpUser()">
      <div class="ask">
        <span class="input-title">ユーザー名</span>
        <input type="text" placeholder="Username" v-model="userName" />
      </div>
      <div class="ask">
        <span>メールアドレス</span>
        <input type="text" placeholder="E-mail" v-model="email" />
      </div>
      <div class="ask">
        <span style="padding: 15px">パスワード</span>
        <input type="password" placeholder="Password" v-model="password" />
      </div>
      <transition name="fade">
        <p class="errMsg" v-if="errMsg">{{ errMsg }}</p>
      </transition>
      <div class="button">
        <button type="submit">新規登録</button>
      </div>
      <router-link to="/signin">ログインはこちら</router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      email: '',
      password: '',
      errMsg: false,
    };
  },
  methods: {
    signUpUser() {
      if (this.userName === '' || this.email === '' || this.password === '') {
        this.errMsg = '全ての項目を入力してください';
        return;
      }
      if (this.password.length < 6) {
        this.errMsg = 'パスワードは6文字以上で入力してください';
      }
      this.$store.dispatch('signUpUser', {
        email: this.email,
        password: this.password,
        userName: this.userName,
      });
      this.errMsg = false;
      this.userName = '';
      this.email = '';
      this.password = '';
    },
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 30px;
}

.input-title {
  padding: 15px;
}
input {
  border: solid 2px lightgray;
  border-radius: 2px;
}

.button {
  margin-top: 30px;
}

.button button {
  padding: 10px 15px;
  font-size: 15px;
  color: rgb(8, 149, 184);
  border: solid 1px rgb(8, 149, 184);
  background: none;
  border-radius: 6px;
}

.button button:hover {
  transition: 0.3s;
  background: rgb(0, 140, 255);
  color: white;
  cursor: pointer;
}

.errMsg {
  color: red;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
