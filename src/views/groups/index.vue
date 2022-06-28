<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Group title">
        <el-input v-model="form.title" placeholder="Type your group title" />
      </el-form-item>
      <el-form-item label="List of articles">
        <el-select
          v-model="form.value"
          style="display: block"
          el-col="12"
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
      <el-form-item label="Description">
        <el-input v-model="form.desc" type="textarea" placeholder="Describe your group" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
    <br>
    <br>
    <br>
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
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Owner" width="190" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.owner }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Articles" width="90" align="center">
        <template slot-scope="scope">
          {{ scope.row.articles }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Created_at" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operations"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="editClick(scope.row)"
          >
            Edit
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteClick(scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getList } from '@/api/groups'
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
    return {
      form: {
        title: '',
        desc: '',
        value: '',
        options: [
          {
            value: 'HTML',
            label: 'Mon article sur la block chaine que je ne kiff pas trou mais woow que du bkabka'
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
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    editClick(row) {
      console.log(row)
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
