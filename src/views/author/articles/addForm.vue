<template>
  <div v-if="userType === 'Author'" class="app-container">
    <el-form ref="form" :model="form" :rules="ArticleRules" label-width="120px">

      <el-form-item label="Title" prop="title">
        <el-input ref="title" v-model="form.title" />
      </el-form-item>

      <el-form-item label="Categories" prop="categoriesSelected">
        <el-select
          ref="categoriesSelected"
          v-model="form.categoriesSelected"
          style="display: block"
          multiple
          col="12"
          filterable
          default-first-option
          :reserve-keyword="false"
        >
          <el-option
            v-for="item in categories"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Content" prop="content">
        <el-input ref="content" v-model="form.content" type="textarea" rows="10" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

import slugify from 'slugify'
import { getList } from '@/api/categories'
import { createArticle } from '@/api/articles'
import store from '@/store'

export default {

  data() {
    return {
      listLoading: true,
      categories: [],
      form: {
        userId: 'hidden',
        slug: '',
        title: '',
        content: '',
        categoriesSelected: []
      },
      ArticleRules: {
        title: [
          { required: true, trigger: 'blur' }
        ],
        content: [
          { required: true, trigger: 'blur' }
        ],
        categoriesSelected: [
          { required: true, trigger: 'blur' }
        ]
      },
      userType: store.getters.user_type
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    getCategories() {
      this.listLoading = true
      getList().then((response) => {
        this.categories = response.data
        this.listLoading = false
      })
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          this.form.slug = slugify(this.form.title, { lower: true })
          const categoriesToSubmit = []
          for (const category of this.form.categoriesSelected) {
            categoriesToSubmit.push(parseInt(category))
          }
          try {
            if (!store.state.user.userId) {
              throw new Error('User id not stored')
            }
            createArticle({
              author: store.state.user.userId,
              title: this.form.title,
              slug: this.form.slug,
              content: this.form.content,
              category: categoriesToSubmit
            }).then(response => console.log(response))
            this.loading = false
            this.$message('Category created successfully!')
          } catch (error) {
            this.loading = false
            this.$message('Category creation failed !')
            console.log(error.message)
          }
        } else {
          console.log('Category error!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
