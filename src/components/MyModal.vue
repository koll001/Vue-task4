<template>
  <div id="overlay" @click="closeModal()">
    <div id="content" @click.stop>
      <slot></slot>
      <div class="button">
        <button @click="closeModal()">{{ message }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
#content {
  z-index: 10;
  width: 20%;
  background: #fff;
}
#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(63, 61, 61, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.button {
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
  padding-bottom: 10px;
  background-color: rgba(63, 61, 61, 0.3);
}
.button button {
  font-size: 15px;
  margin-top: 12px;
  padding: 6px 15px;
  color: white;
  background-color: rgb(184, 8, 23);
  border: solid 1px rgb(184, 8, 23);
  border-radius: 6px;
}
</style>
