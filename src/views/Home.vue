<template>
  <div class="main">
    <h1>Click button and go to checkout</h1>
    <button @click="getRandomId">Get random ID</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    getRandomId() {
      const id = Math.floor(Math.random() * 6 + 1);
      this.$router.push(`/${id}`);
    },
  },
};
</script>
<style lang="scss">
.main {
  height: 90vh;
  width: 95vw;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
}
</style>
