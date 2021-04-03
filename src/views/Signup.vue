<template>
  <div class="home">
    <div class="logo">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <h1>新規登録画面</h1>
    <form @submit.prevent="registUser()">
      <div class="ask">
        <span style="padding: 15px;">ユーザー名</span>
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
      <div class="button">
        <button type="submit">新規登録</button>
      </div>
      <router-link to="/signin">ログインはこちら</router-link>
    </form>
  </div>
</template>

<script>
import { signUp } from '../components/helpers/definition';
import 'firebase/auth';

export default {
  data() {
    return {
      userName: '',
      email: '',
      password: '',
    };
  },
  methods: {
    registUser() {
      signUp(this.email, this.password);
    },
  },
  computed: {
    signUp,
  },
};
</script>

<style>
h1 {
  margin-bottom: 30px;
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
</style>
