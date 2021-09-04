<template>
  <div class="container">
    <h1>Dziękujemy za złożenie zamówienia</h1>
    <router-link to="/">Wróć na stronę główną</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
h1 {
  font-size: 3rem;
}
a {
  font-size: 2rem;
}
</style>
