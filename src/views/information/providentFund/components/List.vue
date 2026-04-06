<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      ref="list"
      index
      type
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @row-click="rowClick"
    />
  </div>
</template>

<script>import {mapGetters} from 'vuex'
import {getPfList, deletePF } from '@/api/information'   // 请替换为实际 API
import List from '@/components/List'

export default {
  components: {List},
  computed: {
    ...mapGetters(['node'])
  },
  data() {
    return {
      loading: false,
      list: {},
      columns: [
        { text: '期间', name: 'period' },
        { text: '姓名', name: 'empName' },
        { text: '月缴存基数', name: 'personalBase', width: '120px' },      // 或 unitBase，此处取 personalBase
        { text: '单位缴存比例', name: 'unitRatio', width: '120px' },       // 无对应后端字段，保留
        { text: '个人缴存比例', name: 'personalRatio', width: '120px' },    // 无对应后端字段，保留
        { text: '单位缴金额', name: 'uniteAmount', width: '120px' },       // 原 unitAmount → uniteAmount
        { text: '个人缴金额', name: 'perosonalAmount', width: '120px' },    // 原 personalAmount → perosonalAmount
        { text: '合计', name: 'allAmount' },               // 原 total → allAmount
        { text: '备注', name: 'note', width: '150px' }                     // 原 remark → note
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
        excel.export_json_to_excel(tHeader,data,'公职金-职工')
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
      deletePF(val).then(res => {
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
      getPfList(data, val).then(res => {
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
