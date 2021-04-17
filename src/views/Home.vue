<template>
  <div class="home">
    <div class="logo">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div class="align">
      <p class="align-left">{{ userName }}さんようこそ！！</p>
      <p>残高：{{ userBalance }}</p>
      <div class="button">
        <button @click="signOutUser()">ログアウト</button>
      </div>
    </div>
    <h1>ユーザー覧</h1>
    <div class="user-contents">
      <h3>ユーザー名</h3>
      <div class="user-list" v-for="user in usersData" :key="user.id">
        <p class="align-left">{{ user.userName }}</p>
        <div class="user-button">
          <button @click="openModal(user.userName, user.balance)">
            walletを見る
          </button>
        </div>
        <div class="user-button">
          <button>送る</button>
        </div>
      </div>
      <myModal
        v-if="showUserBalance"
        @close="closeModal()"
        :message="closeMessage"
      >
        <p>{{ othersUserName }}さんの残高</p>
        <p>{{ othersUserBalance }}</p>
      </myModal>
    </div>
  </div>
</template>

<script>
import myModal from '../components/MyModal';
export default {
  components: { myModal },
  mounted() {
    this.userName = this.$store.getters.getUserName;
  },
  data() {
    return {
      userName: '',
      showUserBalance: false,
      closeMessage: 'close',
      othersUserName: '',
      othersUserBalance: null,
    };
  },
  methods: {
    signOutUser() {
      this.$store.dispatch('signOutUser');
    },
    openModal(userName, balance) {
      this.showUserBalance = true;
      this.othersUserName = userName;
      this.othersUserBalance = balance;
    },
    closeModal() {
      this.showUserBalance = false;
    },
  },
  computed: {
    userBalance() {
      return this.$store.getters.getUserBalance;
    },
    usersData() {
      return this.$store.getters.getUsersData;
    },
  },
};
</script>

<style scoped>
.home {
  width: 90%;
  margin: 0 auto;
}
.align {
  display: flex;
}
.align button {
  box-sizing: initial;
  padding: 1px;
}
.align-left {
  margin-right: auto;
}
.button button {
  margin-left: 5px;
  margin-top: 12px;
  padding: 3px 10px;
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
.user-button button {
  margin-left: 5px;
  margin-top: 12px;
  padding: 3px 10px;
  color: white;
  background-color: rgb(8, 178, 184);
  border: solid 1px rgb(8, 178, 184);
  border-radius: 6px;
}
.user-contents {
  width: 50%;
  text-align: left;
  margin: 0 auto;
}
.user-contents h3 {
  margin: 0;
}
.user-list {
  display: flex;
  margin-bottom: 3px;
  height: 30px;
  margin-left: 20px;
  text-align: center;
}
.user-list p {
  font-size: 18px;
}
</style>
