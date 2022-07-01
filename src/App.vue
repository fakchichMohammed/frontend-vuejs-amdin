<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import store from '@/store/index'
export default {
  name: 'App',
  data() {
    return {
      userType: store.getters.user_typ
    }
  },
}
</script>
