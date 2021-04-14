<template>
  <div class="home">
    <div class="logo">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div class="align">
      <p class="align-left">{{ userName }}さんようこそ！</p>
      <p>残高：</p>
      <p>{{ userBalance }}</p>
      <div class="button">
        <router-link to="/" tag="button">ログアウト</router-link>
      </div>
    </div>
    <h1>ユーザー覧</h1>
    <div class="user-contents">
      <h3>ユーザー名</h3>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    userName: function() {
      return this.$store.getters.getUserName;
    },
    userBalance: function() {
      return this.$store.getters.getUserBalance;
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

.user-contents {
  width: 50%;
  text-align: left;
  margin: 0 auto;
}
</style>
