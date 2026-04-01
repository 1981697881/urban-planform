<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="150px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'客户代码'" prop="custCode">
            <el-input v-model="form.custCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'客户名称'" prop="custName">
            <el-input v-model="form.custName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'联系电话'">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'客户地址'">
            <el-input v-model="form.addr"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
  </div>
</div>
  </template>

<script>import {customerAM} from '@/api/basic/index'

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
        custCode: null,
        custName: null,
        tel: null,
        addr: null,
      },
      options: [],
      disPl: true,
      rules: {
        custCode: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        custName: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
      }
    }
  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          customerAM(this.form).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          })
        } else {
          return false
        }
      })
    },
  }
}
</script>

<style>
</style>
