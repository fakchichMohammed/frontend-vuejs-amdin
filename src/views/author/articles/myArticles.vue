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
          <span>{{ scope.row.categories }}</span>
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
      <el-form ref="formEdit" :model="formEdit" label-width="120px">
        <el-form-item label="Title" required>
          <el-input v-model="formEdit.title" />
        </el-form-item>
        <el-form-item label="Categories" required>
          <el-select
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
              :key="category.slug"
              :label="category.title"
              :value="category.slug"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Content">
          <el-input
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
import { getList } from '@/api/articles'

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
      getList().then((response) => {
        this.articlesList = response.data.items
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
