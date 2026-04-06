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
import { getIssuranceDispatchList, deleteDispatch } from '@/api/information/index'
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
        { text: '姓名', name: 'empName', width: '100px' },
        { text: '身份证号码', name: 'idNo', width: '180px' },
        { text: '户口性质', name: 'householdType', width: '100px' },
        { text: '养老基数', name: 'pensionBase', width: '100px' },
        { text: '医疗基数', name: 'medicalBase', width: '100px' },
        { text: '失业工伤基数', name: 'unemploymentInjuryBase', width: '120px' },
        {
          text: '单位支付部分',
          children: [
            {
              text: '养老',
              children: [
                { text: '16%', name: 'unitInsuranceAmount', width: '100px' }
              ]
            },
            {
              text: '失业',
              children: [
                { text: '0.80%', name: 'unitNoempoyeeAmount', width: '100px' }
              ]
            },
            {
              text: '工伤',
              children: [
                { text: '0.40%', name: 'injuryAmount', width: '100px' }
              ]
            },
            {
              text: '医疗保险(含生育)',
              children: [
                { text: '5.35%', name: 'unitMedicalRate', width: '80px' },
                { text: '重大疾病', name: 'unitMedAmount', width: '100px' }
              ]
            },
            { text: '单位合计', name: 'unitAmount', width: '100px' }
          ]
        },
        {
          text: '个人部分',
          children: [
            {
              text: '养老',
              children: [
                { text: '8%', name: 'personInsuranceAmount', width: '100px' }
              ]
            },
            {
              text: '医疗',
              children: [
                { text: '2%', name: 'personMedAmount', width: '100px' }
              ]
            },
            {
              text: '失业',
              children: [
                { text: '0.20%', name: 'personNoempoyeeAmount', width: '100px' }
              ]
            },
            { text: '个人合计', name: 'personAmount', width: '100px' }
          ]
        },
        { text: '总合计', name: 'allAmount', width: '100px' },
        { text: '备注', name: 'remark', width: '150px' }
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
        excel.export_json_to_excel(tHeader,data,'社保费-劳务派遣')
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
      deleteDispatch(val).then(res => {
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
      getIssuranceDispatchList(data, val).then(res => {
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
