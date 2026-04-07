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
import { getOutsourceLaborDetailRepot } from '@/api/reportForm/index'
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
        { text: '项目名称', name: 'projectName', width: '150px' },
        { text: '采购服务', name: 'serviceName', width: '120px' },
        { text: '供应商', name: 'supplierName', width: '120px' },

        // 1月
        {
          text: '1月',
          children: [
            { text: '人效', name: 'm1Employs', width: '80px' },
            { text: '支付金额', name: 'm1Amount', width: '100px' }
          ]
        },
        // 2月
        {
          text: '2月',
          children: [
            { text: '人效', name: 'm2Employs', width: '80px' },
            { text: '支付金额', name: 'm2Amount', width: '100px' }
          ]
        },
        // 3月
        {
          text: '3月',
          children: [
            { text: '人效', name: 'm3Employs', width: '80px' },
            { text: '支付金额', name: 'm3Amount', width: '100px' }
          ]
        },
        // 4月
        {
          text: '4月',
          children: [
            { text: '人效', name: 'm4Employs', width: '80px' },
            { text: '支付金额', name: 'm4Amount', width: '100px' }
          ]
        },
        // 5月
        {
          text: '5月',
          children: [
            { text: '人效', name: 'm5Employs', width: '80px' },
            { text: '支付金额', name: 'm5Amount', width: '100px' }
          ]
        },
        // 6月
        {
          text: '6月',
          children: [
            { text: '人效', name: 'm6Employs', width: '80px' },
            { text: '支付金额', name: 'm6Amount', width: '100px' }
          ]
        },
        // 7月
        {
          text: '7月',
          children: [
            { text: '人效', name: 'm7Employs', width: '80px' },
            { text: '支付金额', name: 'm7Amount', width: '100px' }
          ]
        },
        // 8月
        {
          text: '8月',
          children: [
            { text: '人效', name: 'm8Employs', width: '80px' },
            { text: '支付金额', name: 'm8Amount', width: '100px' }
          ]
        },
        // 9月
        {
          text: '9月',
          children: [
            { text: '人效', name: 'm9Employs', width: '80px' },
            { text: '支付金额', name: 'm9Amount', width: '100px' }
          ]
        },
        // 10月
        {
          text: '10月',
          children: [
            { text: '人效', name: 'm10Employs', width: '80px' },
            { text: '支付金额', name: 'm10Amount', width: '100px' }
          ]
        },
        // 11月
        {
          text: '11月',
          children: [
            { text: '人效', name: 'm11Employs', width: '80px' },
            { text: '支付金额', name: 'm11Amount', width: '100px' }
          ]
        },
        // 12月
        {
          text: '12月',
          children: [
            { text: '人效', name: 'm12Employs', width: '80px' },
            { text: '支付金额', name: 'm12Amount', width: '100px' }
          ]
        },

        // 合同合计相关
        { text: '合同约定人数', name: 'contract1Employs', width: '120px' },
        { text: '合同年总价', name: 'ontractAmount', width: '120px' },  // 注意 VO 中字段名为 ontractAmount（可能是笔误）
        { text: '平均人数', name: 'totalAverageEmploys', width: '100px' },
        { text: '合计实付金额', name: 'totalAmount', width: '120px' },
        { text: '备注', name: 'note', width: '150px' }
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
        excel.export_json_to_excel(tHeader,data,'外包服务明细报表')
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
      getOutsourceLaborDetailRepot(data, val).then(res => {
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
