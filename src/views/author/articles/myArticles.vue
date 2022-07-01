<template>
  <div class="app-container">
    <h1>My Articles</h1>

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
      <el-table-column fixed="right" label="Operations" width="120">
        <template slot-scope="scope">
          <template>
            <el-link
              style="margin: 0 10px;"
              class="el-btn "
              type="primary"
              :underline="false"
              @click="editArticle(scope.row)"
            >Edit</el-link>
          </template>
          <el-popconfirm
            confirm-button-text="Delete"
            cancel-button-text="No thanks"
            confirm-button-type="danger"
            icon-color="#F56C6C"
            title="Are you sure to delete this?"
            @onConfirm="confirmDelete(scope.row)"
            @onCancel="cancelDelete"
          >
            <template #reference>
              <el-link
                class="el-btn "
                type="danger"
                :underline="false"
              >Delete</el-link>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible="dialogVisible" title="Edit your article" width="70%">
      <el-form ref="formEdit" :model="formEdit" :rules="ArticleRules" label-width="120px">
        <el-form-item label="Title" prop="title">
          <el-input ref="title" v-model="formEdit.title" />
        </el-form-item>
        <el-form-item label="Categories" prop="categoriesSelected">
          <el-select
            ref="categoriesSelected"
            v-model="formEdit.categories"
            style="display: block"
            multiple
            col="12"
            filterable
            default-first-option
            :reserve-keyword="false"
          >
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.title"
              :value="category.slug"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Content" prop="content">
          <el-input
            ref="content"
            v-model="formEdit.content"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="updateArticle"
          >Update</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import { getMyArticles, deleteArticle } from '@/api/articles'
import { getList } from '@/api/categories'

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
      categories: [],
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
      }
    }
  },
  mounted() {
    this.fetchData()
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
    fetchData() {
      this.listLoading = true
      getMyArticles().then((response) => {
        this.articlesList = response.data
        this.listLoading = false
        console.log('ok')
      })
    },
    editArticle(article) {
      this.formEdit.title = article.title
      this.formEdit.content = article.content
      this.formEdit.categories = article.categories
      console.log(this.formEdit.categories)
      this.dialogVisible = true
      this.canEdit = false
    },
    confirmDelete(row) {
      try {
        deleteArticle(row.slug).then(response => {
          const data = JSON.parse(response.data)
          if (data.error) {
            this.$message('Failed : ' + data.message)
          } else {
            console.log(data.message)
            this.$message('Success : ' + data.message)
          }
        })
      } catch (error) {
        this.$message('Error : ' + error.messge)
      }
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
