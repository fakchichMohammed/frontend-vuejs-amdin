<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="Title" required>
        <el-input v-model="form.title" />
      </el-form-item>

      <el-form-item label="Categories" required>
        <el-select
          v-model="form.categoriesSelected"
          style="display: block"
          multiple
          col="12"
          filterable
          default-first-option
          :reserve-keyword="false"
        >
          <el-option
            v-for="item in form.categories"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Content" required>
        <el-input v-model="form.content" type="textarea" rows="10" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

import slugify from 'slugify'

export default {

  data() {
    return {
      form: {
        userId: 'hidden',
        slug: '',
        title: '',
        content: '',
        categories: [
          {
            value: 'HTML',
            label:
              'Mon article sur la block chaine que je ne kiff pas trou mais woow que du bkabka'
          },
          {
            value: 'CSS',
            label: 'CSS'
          },
          {
            value: 'JavaScript',
            label: 'JavaScript'
          }
        ],
        categoriesSelected: []
      }
    }
  },
  methods: {
    onSubmit() {
      for (const category of this.form.categoriesSelected) {
        console.log(category)
      }
      this.form.slug = slugify(this.form.title, {
        lower: true
      })
      console.log(this.form.title)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
