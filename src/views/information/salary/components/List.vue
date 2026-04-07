<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      ref="list"
      index
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @row-click="rowClick"
    />
  </div>
</template>

<script>import {mapGetters} from 'vuex'
import List from '@/components/List'
import { getLaborList, deleteLabor } from '@/api/information/index'
export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(['node'])
  },
  data() {
    return {
      loading: false,
      list: {}, // 接口返回的工资数据
      // 核心：配置跨列表头
      columns: [
        // 基础信息列（无跨列）
        {text: '工资所属年度', name: 'laborYear', width: '120px'},
        {text: '工资期间', name: 'laborPeriod', width: '120px'},
        {text: '姓名', name: 'empName', width: '100px'},
        {text: '用工类型', name: 'empType', width: '100px'},
        {text: '部门', name: 'dept', width: '120px'},
        {text: '岗位名称', name: 'jobName', width: '120px'},
        {text: '到岗时间', name: 'joinDate', width: '150px'},
        {text: '入职年限（年）', name: 'joinYears', width: '150px'},
        {text: '每年工龄工资', name: 'yearLabor', width: '150px'},

        // 跨列：工资（一级表头）
        {
          text: '工资',
          colspan: 1, // 跨列数（可根据子列数调整）
          children: [
            {text: '基本工资', name: 'baseLabor', width: '100px'},
            {text: '岗位工资', name: 'dutyLabor', width: '100px'},
            {text: '绩效工资', name: 'kpiLabor', width: '100px'},
            {text: '工龄工资', name: 'yearsLabor', width: '100px'},
            {text: '岗位补贴', name: 'subsidyLabor', width: '100px'},
            {text: '年终奖', name: 'yearEndBonus', width: '100px'},
            {text: '补扣工资', name: 'deductLabor', width: '100px'},
            {text: '季度绩效奖', name: 'yearKpi', width: '100px'},
            {text: '4小时固定加班工资', name: 'hourotLabor', width: '120px'},
            {text: '夜餐费', name: 'midnightmealFee', width: '100px'},
            {text: '上月停餐费', name: 'lastmonthStoplunchFee', width: '120px'},
            {text: '优秀员工奖', name: 'excellenceAward', width: '120px'},
            {text: '月固定工资', name: 'fixLabor', width: '100px'},
            {text: '补发岗位工资', name: 'backpayDutylabor', width: '120px'},
            {text: '补发绩效工资', name: 'backpayKpilabor', width: '120px'},
            {text: '补发其他工资', name: 'backpayOtherlabor', width: '120px'},
            {text: '商业意外险', name: 'accidentInsurance', width: '120px'},
            {text: '多退少补工资差额', name: 'differenceLabor', width: '120px'},
            {text: '工资合计', name: 'totalLabor', width: '120px'},
            {text: '日工资', name: 'dayLabor', width: '120px'},
          ]
        },

        // 跨列：值班费（一级表头）
        {
          text: '值班费',
          colspan: 1,
          children: [
            {text: '元旦值班费', name: 'newyearotFee', width: '100px'},
            {text: '春节值班费', name: 'springfestivalotFee', width: '100px'},
            {text: '清明值班费', name: 'qingmingdayotFee', width: '100px'},
            {text: '五一值班费', name: 'maydayotFee', width: '100px'},
            {text: '端午值班费', name: 'duanwuotFee', width: '100px'},
            {text: '国庆值班费', name: 'nationaldayotFee', width: '100px'},
            {text: '中秋值班费', name: 'midautumnotFee', width: '100px'},
            {text: '休息日加班费', name: 'restdayotFee', width: '120px'},
            {text: '公休日加班', name: 'publicdayotFee', width: '100px'},
            {text: '合计', name: 'otfeeTotal', width: '100px'}
          ]
        },

        // 跨列：考核/考勤（一级表头）
        {
          text: '考核/考勤',
          colspan: 1,
          children: [
            {text: '考勤分数', name: 'attendScore', width: '100px'},
            {text: '考核奖励/扣款金', name: 'kpiFee', width: '120px'},
            {text: '请假扣款', name: 'leaveDedut', width: '100px'},
            {text: '合计', name: 'attendTotal', width: '100px'}
          ]
        },
        {
          text: '应发工资',
          colspan: 1,
          children: [
            {text: '合计', name: 'payroolTotal', width: '100px'}
          ]
        },
        // 跨列：代扣款（个人部分）
        {
          text: '代扣款（个人部分）',
          colspan: 1,
          children: [
            {text: '社保', name: 'socialSecurity', width: '100px'},
            {text: '住房公积金', name: 'housingFund', width: '100px'},
            {text: '本月企业年金', name: 'monthEnerpriseannuity', width: '120px'},
            {text: '工会费', name: 'unionDues', width: '100px'},
            {text: '伙食费', name: 'boardWages', width: '100px'},
            {text: '个税', name: 'individualTax', width: '100px'},
            {text: '二次医保', name: 'secMedicalinsurance', width: '100px'},
            {text: '代扣款', name: 'accidentInsurance', width: '120px'},
            {text: '补上月工会费差额', name: 'backpayLastmonthuniondiff', width: '120px'},
            {text: '扣商业意外险', name: 'deductAccidentinsurance', width: '120px'},
            {text: '补缴社保差额', name: 'backpaySocialsecuritydiff', width: '120px'},
            {text: '代扣款合计', name: 'replacedeductTotal', width: '120px'},
          ]
        },
        {text: '实发工资', name: 'realSalary'},
        {text: '离职补偿金', name: 'sererancePay'},
        {
          text: '单位部分',
          colspan: 1,
          children: [
            {text: '养老保险缴费基数', name: 'socialsecurityBasepay', width: '100px'},
            {text: '失业保险缴费基数', name: 'unemploymentsecurityBasepay', width: '100px'},
            {text: '医疗保险（含生育）缴费基数', name: 'medicalsecurityBasepay', width: '120px'},
            {text: '工伤保险缴费基数', name: 'workinjurysecurityBasepay', width: '100px'},
            {text: '住房公积金缴费基数', name: 'housingfundBasepay', width: '100px'},
            {text: '工会费缴费基数', name: 'unionBasepay', width: '100px'},
            {text: '企业年金缴费基数', name: 'enerpriseannuityBasepay', width: '100px'},
            {text: '养老', name: 'basicSalary', width: '120px'},
            {text: '失业', name: 'pension', width: '120px'},
            {text: '医疗保险（含生育）', name: 'medicalInsurance', width: '120px'},
            {text: '工伤', name: 'workInjury', width: '120px'},
            {text: '单位公积金', name: 'unitprovidentFund', width: '120px'},
            {text: '单位工会费', name: 'unitunionFunc', width: '120px'},
            {text: '单位企业年金', name: 'unitenerpriseannuityFunc', width: '120px'},
            {text: '残保金', name: 'disabilitysecurityFund', width: '120px'},
            {text: '人才市场管理费', name: 'talentmarketmanageFund', width: '120px'},
          ]
        },
        // 其他核心列（无跨列）
        {text: '备注', name: 'note', width: '200px'},
        {text: '工会费基数', name: 'unionFeeBase', width: '120px'},
        {text: '合计', name: 'total', width: '100px'},
      ]
    }
  },
  methods: {
    ExportData() {
      import('@/vendor/Export2Excel').then(excel => {
        // 表格的表头列表
        const columns = this.columns
        const tHeader = []
        // 与表头相对应的数据里边的字段
        const filterVal = []
        columns.forEach((item, index) => {
          tHeader.push(item.text)
          filterVal.push(item.name)
        })
        const list = this.list.records
        const data = this.formatJson(filterVal, list);
        // 这里还是使用export_json_to_excel方法比较好，方便操作数据
        excel.export_json_to_excel(tHeader,data,'工资表')
      })
    },
    formatJson(filter, jsonDate){
      return jsonDate.map(v =>
        filter.map(j => {
          return v[j]
        })
      )
    },
    Delivery(val) {
      deleteLabor(val).then(res => {
        if(res.flag) {
          this.$store.dispatch('list/setClickData', '');
          this.$emit('uploadList')
        }
      });
    },
    //监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.$emit('uploadList')
    },
    //监听当前页
    handleCurrent(val) {
      this.list.current = val
      this.$emit('uploadList')
    },
    // 行点击
    rowClick(obj) {
      console.log('点击行数据：', obj.row)
    },
    uploadPr(val) {
      this.fetchData(val, {
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    // 加载数据
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true
      getLaborList(data, val).then(res => {
        this.loading = false
        this.list = res.data
      }).catch(() => {
        this.loading = false
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  .list-main {
    height: calc(100vh - 250px);
  }
</style>
