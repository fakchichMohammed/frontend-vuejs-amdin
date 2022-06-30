<template>
  <div class="app-container">
    <!-- create group -->
    <el-form ref="form" :model="form" :rules="GroupRules" label-width="120px">
      <el-form-item label="Group title" prop="title">
        <el-input ref="title" v-model="form.title" placeholder="Type your group title" name="title" />
      </el-form-item>
      <el-form-item label="List of articles" prop="articles">
        <el-select
          ref="articles"
          v-model="form.articles"
          name="articles"
          style="display: block"
          multiple
          col="12"
          filterable
          default-first-option
          :reserve-keyword="false"
          placeholder="Choose articles for your group"
        >
          <el-option
            v-for="item in form.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input
          ref="description"
          v-model="form.description"
          name="description"
          type="textarea"
          placeholder="Describe your group"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button :disabled="canEdit" @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
    <br>
    <br>
    <br>
    <!-- list group -->
    <el-table
      v-loading="listLoading"
      :data="list"
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
          <el-link @click="openDetails(scope.row)">
            {{ scope.row.title }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="Owner" width="190" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Articles" width="90" align="center">
        <template slot-scope="scope">
          {{ scope.row.articles }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="Created_at"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="editClick(scope.row)"
          >
            Edit
          </el-button>
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
    <!-- dialog edit form -->
    <el-dialog :visible="dialogVisible" title="Edit your group" width="70%">
      <el-form ref="formEdit" :model="formEdit" label-width="120px">
        <el-form-item label="Group title" prop="title">
          <el-input ref="title" v-model="formEdit.title" placeholder="Type your group title" />
        </el-form-item>
        <el-form-item label="List of articles" prop="articles">
          <el-select
            ref="articles"
            v-model="formEdit.articles"
            style="display: block"
            multiple
            col="12"
            filterable
            default-first-option
            :reserve-keyword="false"
            placeholder="Choose articles for your group"
          >
            <el-option
              v-for="item in formEdit.options"
              :key="item.articles"
              :label="item.label"
              :value="item.articles"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input
            ref="description"
            v-model="formEdit.description"
            type="textarea"
            placeholder="Describe your group"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="onEdit"
          >Edit</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getList, add, edit, deleteGroup } from '@/api/groups'
import { getArticlesList } from '@/api/articles'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    const validateTitle = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error(' Group title can not be less than 3 digits'))
      } else {
        callback()
      }
    }
    const validateArticles = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error(' List articles can not be less than 1'))
      } else {
        callback()
      }
    }
    return {
      form: {
        title: '',
        description: '',
        articles: [],
        options: [
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
        ]
      },
      GroupRules: {
        title: [
          { required: true, trigger: 'blur', validator: validateTitle }
        ],
        articles: [
          { required: false, trigger: 'blur', validator: validateArticles }
        ]
        /* description: [
          { required: false, trigger: 'blur', validator: validateDescription }
        ] */
      },
      formEdit: {
        title: '',
        description: '',
        slug: '',
        articles: [],
        options: []
      },
      dialogVisible: false,
      canEdit: true,
      list: null,
      listLoading: true,
      confirmEvent: () => {
        console.log('confirm!')
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.fetchData()
    this.getArticles()
  },
  methods: {
    onSubmit() {
      // post new group
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          try {
            add(this.form).then(() => {
              this.fetchData()
              this.$message('Group created successfully!')
            })
            this.loading = false
          } catch (error) {
            this.loading = false
          }
        } else {
          console.log('Group error!!')
          return false
        }
      })
    },
    onCancel() {
      this.form.title = ''
      this.form.description = ''
      this.form.articles = []
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    fetchData() {
      this.listLoading = true
      getList().then((response) => {
        this.list = response.data
        this.listLoading = false
      })
    },
    deleteClick() {},
    editClick(row) {
      this.formEdit.title = row.title
      this.formEdit.description = row.description
      this.formEdit.slug = row.slug
      // this.getArticles(row.id)
      this.dialogVisible = true
      this.canEdit = false
    },
    getArticles(groupId) {
      if (!groupId) {
        console.log('get articles')
        this.listLoading = true
        getArticlesList().then((response) => {
          /* response.data.forEach(function(arrayItem) {
            for (const [key, value] of Object.entries(arrayItem)) {
              console.log(`${key}: ${value}`)
            }
          }) */
          response.data.map(({ title, slug, id }) => {
            console.log(`${title} with quantity ${slug} with price ${id}`)
          })

          /* const { title, slug, id } = response.data
          // this.form.options = response.data
          console.log(response.data) */
          this.listLoading = false
        })()
      }
      // fetch articles of the group
      this.formEdit.articles = [
        'Mon article sur la block chaine que je ne kiff pas trou mais woow que du bkabka',
        'CSS',
        'JavaScript'
      ]
    },
    confirmDelete(row) {
      // delete group
      this.loading = true
      try {
        deleteGroup(this.form).then(() => {
          this.fetchData()
          this.$message('Category deleted successfully!')
        })
        this.loading = false
      } catch (error) {
        this.loading = false
      }
      this.visible = false
      this.$emit('onConfirm')
    },
    cancelDelete() {
      this.visible = false
      this.$emit('onCancel')
    },
    onEdit() {
      // update group
      this.loading = true
      try {
        edit(this.formEdit, this.formEdit.slug).then(() => {
          this.fetchData()
          this.$message('Category updated successfully!')
        })
        this.loading = false
      } catch (error) {
        this.loading = false
      }
      this.dialogVisible = false
    },
    openDetails(row) {
      // redirect to list of articles of the group
      alert(row.id)
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
.el-btn{
  padding: 0.7em;
}
.red-el-btn{
  color: '#F56C6C'
}
</style>
