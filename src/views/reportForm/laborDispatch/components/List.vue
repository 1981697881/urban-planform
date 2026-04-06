<template>
  <div>
    <list
       class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      type
      @handle-size="handleSize"
      @handle-current="handleCurrent"
       @row-click="rowClick"
    />

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import List from "@/components/List";
import { processSRReport } from '@/api/reportForm/index'
export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(["node"])
  },
  data() {
    return {
      loading: false,
      list: {},
      columns: [
        { text: '姓名', name: 'empName', width: '100px' },
        { text: '用工类型', name: 'empType', width: '100px' },
        { text: '部门/项目名称', name: 'deptProject', width: '150px' },
        { text: '岗位', name: 'position', width: '120px' },
        { text: '包干工资', name: 'contractSalary', width: '100px' },
        { text: '实际在岗月数', name: 'actualMonths', width: '110px' },
        { text: '人次', name: 'personTimes', width: '70px' },
        { text: '基本工资', name: 'baseSalary', width: '100px' },
        { text: '岗位工资', name: 'positionSalary', width: '100px' },
        { text: '绩效工资', name: 'meritPay', width: '100px' },
        { text: '工龄工资', name: 'seniorityPay', width: '100px' },
        { text: '岗位补贴', name: 'positionAllowance', width: '100px' },
        { text: '年终奖', name: 'yearEndBonus', width: '100px' },
        { text: '补发上月工资差额', name: 'retroactivePay', width: '130px' },
        { text: '年度考核绩效奖', name: 'annualPerformanceBonus', width: '130px' },
        { text: '4小时固定加班工资', name: 'fixedOvertimePay', width: '140px' },
        { text: '夜餐费', name: 'nightMealAllowance', width: '90px' },
        { text: '优秀员工奖', name: 'excellenceAward', width: '100px' },
        { text: '元旦值班费', name: 'newYearDuty', width: '100px' },
        { text: '春节值班费', name: 'springFestivalDuty', width: '100px' },
        { text: '清明值班费', name: 'qingmingDuty', width: '100px' },
        { text: '五一值班费', name: 'laborDayDuty', width: '100px' },
        { text: '端午值班费', name: 'dragonBoatDuty', width: '100px' },
        { text: '国庆值班费', name: 'nationalDayDuty', width: '100px' },
        { text: '中秋值班费', name: 'midAutumnDuty', width: '100px' },
        { text: '休息日加班费', name: 'weekendOvertime', width: '110px' },
        { text: '其他加班费', name: 'otherOvertime', width: '100px' },
        { text: '扣回多发加班费/值班费', name: 'deductOverpaid', width: '150px' },
        { text: '奖考核奖励/扣款金', name: 'rewardDeduction', width: '140px' },
        { text: '请假扣款', name: 'leaveDeduction', width: '100px' },
        { text: '年度工资总额', name: 'annualSalaryTotal', width: '120px' },
        { text: '全年单位社保', name: 'annualUnitSocialSecurity', width: '120px' },
        { text: '全年单位公积金', name: 'annualUnitProvidentFund', width: '130px' },
        { text: '全年单位工会费（2%）', name: 'annualUnionFee', width: '140px' },
        { text: '在岗月数', name: 'employedMonths', width: '100px' },
        { text: '年单位缴纳合计', name: 'annualUnitTotal', width: '130px' },
        { text: '年残保金', name: 'annualDisabilityFund', width: '100px' },
        { text: '人才市场年管理费', name: 'annualManagementFee', width: '140px' },
        { text: '年总用工成本', name: 'annualLaborCost', width: '120px' },
        { text: '备注', name: 'remark', width: '150px' },
        { text: '全年加班费', name: 'annualOvertimePay', width: '120px' }
      ]
    };
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
        excel.export_json_to_excel(tHeader,data,'工序流转进度')
      })
    },
    formatJson(filter, jsonDate){
      return jsonDate.map(v =>
        filter.map(j => {
          return v[j]
        })
      )
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
   /* dblclick(obj) {
      this.$emit('showDialog', obj.row)
    },*/
    Delivery(val) {
      delSupplier(val).then(res => {
        if(res.flag){
          this.$store.dispatch("list/setClickData", '');
          this.fetchData();
        }
      });
    },
    //监听单击某一行
    rowClick(obj) {
      this.$store.dispatch("list/setClickData", obj.row);
    },
    uploadPr(val) {
      this.fetchData(val,{
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = false;
      processSRReport(data, val).then(res => {
        this.loading = false
        this.list = res.data
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 250px);
}
</style>
