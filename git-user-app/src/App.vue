<template>
  <div id="app">
    <User/>
  </div>
</template>

<script>

import User from "./pages/user/User";
export default {
  name: 'App',
  components: {User},
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
