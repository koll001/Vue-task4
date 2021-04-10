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
        <router-link to="/signup" tag="button">ログアウト</router-link>
      </div>
      <p v-if="$store.state.user">{{ $store.state.user.displayName }}</p>
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
.align {
  display: flex;
}

.align-left {
  margin-right: auto;
}
.button button {
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
</style>
