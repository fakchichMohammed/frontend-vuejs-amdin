<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="articlesList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          <el-link>
            {{ scope.row.title }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="Categories" width="190" align="center">
        <template slot-scope="scope">
          <ul>
            <li v-for="category in scope.row.categories" :key="category.id">{{ category.title }}</li>
          </ul>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
import { getArticlesList } from '@/api/articles'

export default {
  data() {
    return {
      dialogVisible: false,
      canEdit: true,
      articlesList: [],
      listLoading: true,
      formEdit: {
        title: '',
        categories: [],
        content: ''
      },
      categories: [
        {
          slug: 'HTML',
          title:
              'Mon article sur la block chaine que je ne kiff pas trou mais woow que du bkabka'
        },
        {
          slug: 'CSS',
          title: 'CSS'
        },
        {
          slug: 'JavaScript',
          title: 'JavaScript'
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getArticlesList().then((response) => {
        this.articlesList = response.data
        this.listLoading = false
        console.log('ok')
      })
    },
    editArticle(article) {
      console.log(article.id)
      this.formEdit.title = article.title
      this.formEdit.content = article.content
      this.formEdit.categories = article.categories
      this.dialogVisible = true
      this.canEdit = false
    },
    confirmDelete(row) {
      console.log('clicked on delete', row)
      this.visible = false
      this.$emit('onConfirm')
    },
    cancelDelete() {
      this.visible = false
      this.$emit('onCancel')
    },
    updateArticle() {
      console.log('update article')
    }
  }
}
</script>
