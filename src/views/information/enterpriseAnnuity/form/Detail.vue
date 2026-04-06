<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'订单日期'" prop="poDate">
            <el-date-picker
              v-model="form.poDate"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <!--<el-form-item :label="'订单号'" prop="fgender">
            <el-select style="width: 100%" v-model="form.fgender" placeholder="请选择">
              <el-option
                v-for="(item,index) in levelFormat"
                :key="index"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item :label="'母订单号'" prop="poNo">
            <el-input v-model="form.poNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'子订单号'" prop="subPoNo">
            <el-input v-model="form.subPoNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'客户'" prop="custId">
            <el-select style="width: 100%" filterable
                       remote
                       :remote-method="remoteCustMethod"
                       :loading="loading"
                       v-model="form.custId" placeholder="请选择">
              <el-option
                      v-for="(item,index) in custList"
                      :key="index"
                      :label="item.custName+'-'+item.addr"
                      :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'产品数量'">
            <el-input-number :min="0" v-model="form.prdQty"></el-input-number>
          </el-form-item>
        </el-col>
        <!--<el-col :span="12">
          <el-form-item :label="'产品编码'" prop="productNumber">
            <el-input v-model="form.productNumber"></el-input>
          </el-form-item>
        </el-col>-->
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'产品名称'" prop="productName">
            <el-input v-model="form.productName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'材质'">
            <el-input v-model="form.productTxture"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'油漆工艺'">
            <el-input v-model="form.productPaint"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'预计交货日期'">
            <el-date-picker
                    v-model="form.deliveryDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                    placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
          <el-col :span="8">
            <el-form-item :label="'客户要求日期'">
              <el-date-picker
                      v-model="form.custReqDate"
                      type="date"
                      value-format="yyyy-MM-dd"
                      style="width: 100%"
                      placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
         <!-- <el-form-item :label="'客户'">
            <el-input v-model="form.custName"></el-input>
          </el-form-item>-->
        </el-col>
       <!-- <el-col :span="12">
          <el-form-item :label="'销售部门'">
            <el-input v-model="form.deptName"></el-input>
          </el-form-item>
          <el-form-item :label="'销售部门'">
            <el-select
              filterable
              remote
              :remote-method="remoteMethod"
              :loading="loading"
              style="width: 100%"
              v-model="form.fteamleader"
              placeholder="请选择">
              <el-option
                v-for="item in userList"
                :key="item.fid"
                :label="item.fenglishname +'-'+item.fname"
                :value="item.fenglishname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>-->
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'页数'">
            <el-input v-model="form.pageNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'设计员'">
            <el-input v-model="form.designer"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'发货地址'">
            <el-input v-model="form.custAddr"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'联系电话'">
            <el-input v-model="form.custTel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'发货时间'">
            <el-date-picker
                    v-model="form.sendDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                    placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'发货单号'">
            <el-input v-model="form.sendNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'发货方式'">
            <el-input v-model="form.sendWay"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'合同状态'">
            <el-radio-group v-model="form.poStatus">
              <el-radio label="发齐">发齐</el-radio>
              <el-radio label="未发齐">未发齐</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'备注'">
            <el-input v-model="form.note"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'物料清单'">
            <el-button @click="setRow">增加</el-button>
            <el-button @click="delRow">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-table class="tableBox" ref="multipleTable" @selection-change="handleSelectionChange" border height="250px"
                  stripe size="mini" :highlight-current-row="true" :data="form.prdOrderEntry" align="center"
                  :cell-style="myclass" highlight-current-row>
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
          <el-table-column
            v-for="(t,i) in columns"
            :key="i"
            align="center"
            :prop="t.name"
            :label="t.text"
          >
            <template slot-scope="scope">
              <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->

              <div v-if="t.name === 'itemType'">
                <el-select filterable
                         style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                          placeholder="请选择">
                 <el-option
                   v-for="(item, index) in optionList"
                   :key="index"
                   :label="item.label"
                   :value="item.label">
                 </el-option>
               </el-select>
                <span>{{scope.row[t.name]}}</span>
              </div>
              <div v-else>
                <el-input v-if="!t.sfkgg" v-model="scope.row[t.name]" clearable/>
                <span>{{scope.row[t.name]}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addProdOrder, deleteDProdOrder} from '@/api/information/index'
import {getTuserList, getCustomerByPage} from '@/api/basic/index'

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
        poDate: null,
        poNo: null,
        prdQty: null,
        productNumber: null,
        productName: null,
        productSpec: null,
        /*custName: null,
        deptName: null,*/
        subPoNo: null,
        custId: null,
        productTxture: null,
        productPaint: null,
        pageNo: null,
        designer: null,
        deliveryDate: null,
        custReqDate: null,
        custAddr: null,
        custTel: null,
        sendDate: null,
        sendNo: null,
        poStatus: null,
        note: null,
        sendWay: null,
        prdOrderEntry: [],
      },
      loading: false,
      columns: [
        {text: '级别', name: 'itemLevel'},
        {text: '物料属性', name: 'itemType'},
        {text: '物料编码', name: 'itemNumber'},
        {text: '物料名称', name: 'itemName'},
        {text: '物料规格', name: 'itemSpec'},
        {text: '数量', name: 'qty'},
      ],
      userList: [],
      custList: [],
      optionList: [
        {label: '产品', value: '产品'},
        {label: '物料', value: '物料'},
        {label: '半成品', value: '半成品'},
      ],
      multipleSelection: [],
      rules: {
        poDate: [
          {required: true, message: '请选择', trigger: 'change'}
        ], poNo: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], productNumber: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], productName: [
          {required: true, message: '请输入', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    //this.getUsersArray()
    this.getCustsArray()
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.getUsersArray({fenglishname: query});
      } else {
        this.userList = [];
      }
    },
    remoteCustMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.getCustsArray({custName: query});
      } else {
        this.custList = [];
      }
    },
    myclass({row, columnIndex}) {
      if (row[columnIndex] && !row[columnIndex].sfcb && row[columnIndex].sfcb != null) {
        return "color: red";
      }
    },
    setRow() {
      var itemObj = Object.assign({
        sfkgg: true,
        sfcb: null,
      })
      console.log(itemObj)
      if(this.form.prdOrderEntry == null){
        this.form.prdOrderEntry = []
      }
      this.form.prdOrderEntry.push(itemObj)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delRow() {
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach((item) => {
          if(this.form.id && item.id){
            deleteDProdOrder({id: item.id}).then(res => {
              if(res.flag) {
                this.form.prdOrderEntry.splice(item)
              }
            });
          }else{
            this.form.prdOrderEntry.splice(item)
          }
        })
      } else {
        this.$message({
          message: "请选择删除项",
          type: 'error'
        });
      }
    },
    getCustsArray(val = {}, data = {
      pageNum: 1,
      pageSize: 100
    }) {
      getCustomerByPage(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.custList = res.data.records
        }
      });
    },
    getUsersArray(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getTuserList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.userList = res.data.records
        }
      });
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          let params = {...this.form}
          addProdOrder(params).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
  .tableBox {
    margin-bottom: 20px;
  }

  /* 通过显隐控制input框的状态 */
  .tableBox .el-input {
    display: none;
  }

  .tableBox .current-row .el-input {
    display: block;
  }

  .tableBox .current-row .el-input + span {
    display: none;
  }

  /* 通过显隐控制input框的状态 */
  .tableBox .el-select {
    display: none;
  }

  .tableBox .current-row .el-select {
    display: block;
  }

  .tableBox .current-row .el-select + span {
    display: none;
  }
</style>
