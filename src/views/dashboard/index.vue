<template>
  <div class="dashboard-container">
    <div class="dashboard-text">user name: {{ username }}</div>
    <div class="dashboard-text">first name: {{ first_name }}</div>
    <div class="dashboard-text">last name: {{ last_name }}</div>
    <div class="dashboard-text">email: {{ email }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'username',
      'first_name',
      'last_name',
      'email'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
