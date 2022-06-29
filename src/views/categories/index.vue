<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="CategoryRules" label-width="120px">
      <div class="title-container">
        <h2 class="title">Create Category : </h2>
      </div>
      <el-form-item label="Category title" prop="title">
        <el-input
          ref="title"
          v-model="form.title"
          placeholder="Type your category title"
          name="title"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input
          ref="description"
          v-model="form.description"
          name="description"
          type="textarea"
          placeholder="Describe your category"
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
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title" @row-click="openDetails">
        <template slot-scope="scope">
          <el-link @click="openDetails(scope.row)">
            {{ scope.row.title }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Created_at" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="editClick(scope.row)">
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
              <el-link class="el-btn" type="danger" :underline="false">Delete</el-link>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- dialog edit form -->
    <el-dialog :visible="dialogVisible" title="Edit your category" width="70%">
      <el-form ref="formEdit" :model="form" label-width="120px">
        <el-form-item label="Group title">
          <el-input v-model="formEdit.title" placeholder="Type your group title" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="formEdit.desc" type="textarea" placeholder="Describe your group" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="onEdit">Edit</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getList, add } from '@/api/categories'

export default {
  name: 'Category',
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
        callback(new Error(' Category title can not be less than 3 digits'))
      } else {
        callback()
      }
    }
    /*  const validateDescription = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error(' Category description can not be less than 3 digits'))
      } else {
        callback()
      }
    } */
    return {
      form: {
        title: '',
        description: '',
        value: [],
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
      CategoryRules: {
        title: [
          { required: true, trigger: 'blur', validator: validateTitle }
        ]
        /* description: [
          { required: false, trigger: 'blur', validator: validateDescription }
        ] */
      },
      formEdit: {
        title: '',
        desc: '',
        value: [],
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
  },
  methods: {
    onSubmit() {
      // post new group
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          try {
            add(this.form)
            this.loading = false
            this.$message('Category!')
          } catch (error) {
            this.loading = false
          }
        } else {
          console.log('Category error!!')
          return false
        }
      })
    },
    onCancel() {
      this.form.title = ''
      this.form.desc = ''
      this.form.value = []
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
    deleteClick() { },
    editClick(row) {
      this.formEdit.title = row.title
      this.formEdit.desc = row.description
      this.getArticles(row.id)
      this.dialogVisible = true
      this.canEdit = false
    },
    getArticles(groupId) {
      // fetch articles of the group
      console.log(groupId)
      this.formEdit.value = [
        'Mon article sur la block chaine que je ne kiff pas trou mais woow que du bkabka',
        'CSS',
        'JavaScript'
      ]
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
    onEdit(row) {
      // update group
      console.log('Edit group', row)
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

.el-btn {
  padding: 0.7em;
}

.red-el-btn {
  color: "#F56C6C";
}

.title-container {
  margin-bottom: 5em;
}
</style>
