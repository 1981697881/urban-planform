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

<script>
import { mapGetters } from 'vuex'
import { getIssuranceList, deleteIssurance } from '@/api/information/index'
import List from '@/components/List'

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
      visible: false,
      list: {},
      fid: null,
      type: null,
      columns: [
        // 基础信息列
        { text: '姓名', name: 'empName', width: '100px' },
        { text: '个人社保号', name: 'insuranceNo', width: '150px' },
        { text: '证件类型', name: 'idType', width: '100px' },
        { text: '证件号码', name: 'idNo', width: '180px' },
        { text: '费款所属期起', name: 'startPeriod', width: '120px' },
        { text: '费款所属期止', name: 'endPeriod', width: '120px' },

        // 跨列：基本养老保险(单位缴纳)
        {
          text: '基本养老保险(单位缴纳)',
          children: [
            { text: '缴费基数', name: 'unitInsuranceBase', width: '100px' },
            { text: '应缴金额', name: 'unitInsuranceAmount', width: '100px' }
          ]
        },
        // 跨列：基本养老保险(个人缴纳)
        {
          text: '基本养老保险(个人缴纳)',
          children: [
            { text: '缴费基数', name: 'personInsuranceBase', width: '100px' },
            { text: '应缴金额', name: 'personInsuranceAmount', width: '100px' }
          ]
        },
        // 跨列：失业保险(单位缴纳)
        {
          text: '失业保险(单位缴纳)',
          children: [
            { text: '缴费基数', name: 'unitNoempoyeeBase', width: '100px' },
            { text: '应缴金额', name: 'unitNoempoyeeAmount', width: '100px' }
          ]
        },
        // 跨列：失业保险(个人缴纳)
        {
          text: '失业保险(个人缴纳)',
          children: [
            { text: '缴费基数', name: 'personNoempoyeeBase', width: '100px' },
            { text: '应缴金额', name: 'personNoempoyeeAmount', width: '100px' }
          ]
        },
        // 跨列：基本医疗保险（含生育）(单位缴纳)
        {
          text: '基本医疗保险（含生育）(单位缴纳)',
          children: [
            { text: '缴费基数', name: 'unitMedBase', width: '120px' },
            { text: '应缴金额', name: 'unitMedAmount', width: '100px' }
          ]
        },
        // 跨列：基本医疗保险（含生育）(个人缴纳)
        {
          text: '基本医疗保险（含生育）(个人缴纳)',
          children: [
            { text: '缴费基数', name: 'personMedBase', width: '120px' },
            { text: '应缴金额', name: 'personMedAmount', width: '100px' }
          ]
        },
        // 跨列：工伤保险（仅单位缴纳）
        {
          text: '工伤保险',
          children: [
            { text: '缴费基数', name: 'injuryBase', width: '100px' },
            { text: '应缴金额', name: 'injuryAmount', width: '100px' }
          ]
        },

        // 合计列
        { text: '个人部分合计', name: 'personAmount', width: '120px' },
        { text: '单位部分合计', name: 'unitAmount', width: '120px' },
        { text: '应缴金额合计', name: 'allAmount', width: '120px' }
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
        excel.export_json_to_excel(tHeader,data,'社保费-职工')
      })
    },
    formatJson(filter, jsonDate){
      return jsonDate.map(v =>
        filter.map(j => {
          return v[j]
        })
      )
    },
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.$emit('uploadList')
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val
      this.$emit('uploadList')
    },
    Delivery(val) {
      deleteIssurance(val).then(res => {
        if(res.flag) {
          this.$store.dispatch('list/setClickData', '');
          this.$emit('uploadList')
        }
      });
    },
    uploadPr(val) {
      this.$refs.list.$refs.list.setCurrentRow({});
      this.$store.dispatch('list/setClickData', {})
      this.fetchData(val, {
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    dblclick(obj) {
      this.$emit('showDialog', obj.row)
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch('list/setClickData', obj.row)
    },
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = false
      getIssuranceList(data, val).then(res => {
        this.loading = false
        this.list = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 250px);
}
</style>
