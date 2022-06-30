<template>
  <div class="dashboard-container">
    <el-form label-width="120px">
      <el-form-item label="User Name">
        <el-input v-model=" username " class="dashboard-input" disabled />
      </el-form-item>
      <el-form-item label="First Name">
        <el-input v-model=" first_name " class="dashboard-input" disabled />
      </el-form-item>
      <el-form-item label="Last Name">
        <el-input v-model=" last_name " class="dashboard-input" disabled />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model=" email " class="dashboard-input" disabled />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Edit</el-button>
      </el-form-item>
    </el-form>
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
    position: relative;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    border: 2px solid silver;
    border-radius: 10px;
    width: fit-content;
    text-align: center;
    border-width: medium;
  }
  &-input{
    color: red;
    font-size: large;
  }
}
</style>
