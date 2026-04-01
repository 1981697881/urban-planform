<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" size="mini">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="工号" prop="fnumber">
            <el-input v-model="form.fnumber" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="fname">
            <el-input v-model="form.fname" clearable />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用工类型">
            <el-select v-model="form.empType" placeholder="请选择" clearable style="width: 100%">
              <el-option
                v-for="item in employmentTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!--<el-form-item label="所属部门">
            <el-select
              v-model="form.fdept"
              filterable
              remote
              :remote-method="remoteSearchDept"
              :loading="deptLoading"
              placeholder="请输入部门名称"
              clearable
              style="width: 100%"
            >
              <el-option
                v-for="dept in deptList"
                :key="dept.fdeptid"
                :label="dept.fdeptname"
                :value="dept.fdeptname"
              />
            </el-select>
          </el-form-item>-->
          <el-form-item label="所属部门">
            <el-input v-model="form.fdept" clearable />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="入职日期">
            <el-date-picker
              v-model="form.fjoindate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width: 100%"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="试用期(月)">
            <el-input v-model="form.probationPeriod" clearable />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="转正日期">
            <el-date-picker
              v-model="form.fregulardate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width: 100%"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="离职日期">
            <el-date-picker
              v-model="form.leaveDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width: 100%"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="离职原因">
            <el-input v-model="form.leaveReason" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件类型">
            <el-select v-model="form.idType" placeholder="请选择" clearable style="width: 100%">
              <el-option
                v-for="item in idTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="证件号码">
            <el-input v-model="form.idNo" clearable />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 合同列表 -->
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="合同列表">
            <el-button type="primary" size="mini" @click="addContractRow">增加</el-button>
            <el-button type="danger" size="mini" @click="deleteContractRows">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-table
        ref="contractTable"
        :data="form.contractEntry"
        border
        stripe
        size="mini"
        height="250px"
        @selection-change="handleContractSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="55" align="center" />
        <el-table-column prop="startDate" label="合同开始时间" align="center">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.startDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width: 100%"
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column prop="endDate" label="合同结束时间" align="center">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.endDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width: 100%"
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column prop="signDate" label="签订日期" align="center">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.signDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width: 100%"
              clearable
            />
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <div slot="footer" style="text-align: center; margin-top: 20px">
      <el-button type="primary" @click="saveData">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { addTuser, getOrganizationsList } from '@/api/basic/index'

  export default {
    props: {
      listInfo: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        form: {
          fnumber: null,          // 工号
          fname: null,            // 姓名
          empType: null,          // 用工类型
          fdept: null,            // 所属部门
          fjoindate: null,        // 入职日期
          probationPeriod: null,  // 试用期(月)
          fregulardate: null,     // 转正日期
          leaveDate: null,        // 离职日期
          leaveReason: null,      // 离职原因
          idType: null,           // 证件类型
          idNo: null,             // 证件号码
          contractEntry: []       // 合同列表
        },
        employmentTypeOptions: [
          { label: '合同工', value: '合同工' },
          { label: '临时工', value: '临时工' },
          { label: '劳务派遣', value: '劳务派遣' }
        ],
        idTypeOptions: [
          { label: '身份证', value: '身份证' },
          { label: '护照', value: '护照' }
        ],
        deptList: [],       // 部门下拉数据
        deptLoading: false, // 部门远程搜索loading
        selectedContracts: [], // 表格选中行
        rules: {
          fnumber: [{ required: true, message: '请输入工号', trigger: 'blur' }],
          fname: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
        }
      }
    },
    mounted() {
      this.initDeptList()
      if (this.listInfo) {
        // 编辑/详情时回填数据
        this.form = { ...this.form, ...this.listInfo }
        // 确保合同列表是数组
        if (!this.form.contractEntry) this.form.contractEntry = []
      }
    },
    methods: {
      // 初始化部门列表（首次加载）
      initDeptList() {
        this.getDeptList({ pageNum: 1, pageSize: 10 })
      },

      // 获取部门列表（支持分页和模糊查询）
      getDeptList(params = {}) {
        this.deptLoading = true
        const data = { pageNum: 1, pageSize: 10, ...params }
        getOrganizationsList(data, { fdeptname: params.fdeptname || '' })
          .then(res => {
            this.deptList = res.data.records || []
          })
          .finally(() => {
            this.deptLoading = false
          })
      },

      // 远程搜索部门
      remoteSearchDept(query) {
        if (query) {
          this.getDeptList({ fdeptname: query })
        } else {
          this.deptList = []
        }
      },

      // 新增合同行
      addContractRow() {
        const newRow = {
          startDate: null,
          endDate: null,
          signDate: null
          // 如果需要额外字段（如id），可在此添加
        }
        this.form.contractEntry.push(newRow)
      },

      // 删除选中的合同行
      deleteContractRows() {
        if (this.selectedContracts.length === 0) {
          this.$message.warning('请先选择要删除的合同行')
          return
        }
        this.selectedContracts.forEach(item => {
          const index = this.form.contractEntry.indexOf(item)
          if (index !== -1) {
            this.form.contractEntry.splice(index, 1)
          }
        })
        this.$message.success('删除成功')
      },

      // 表格选中变化
      handleContractSelectionChange(val) {
        this.selectedContracts = val
      },

      // 保存数据
      saveData() {
        this.$refs.form.validate(valid => {
          if (!valid) return false

          addTuser(this.form)
            .then(() => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
              this.$message.success('保存成功')
            })
            .catch(err => {
              this.$message.error('保存失败：' + (err.message || '未知错误'))
            })
        })
      }
    }
  }
</script>

<style scoped>
  /* 可根据需要添加样式 */
</style>
