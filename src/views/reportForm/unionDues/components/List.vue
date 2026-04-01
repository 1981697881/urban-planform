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
import { getUnionFeeRepot } from '@/api/reportForm/index'
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
        { text: "期间", name: "laborPeriod", width: "150px" }, // 用startLaborDate/endLaborDate拼接期间，后续可通过formatter处理
        { text: "姓名", name: "empName", width: "100px" },
        { text: "用工类型", name: "empType", width: "100px" },
        { text: "部门", name: "dept", width: "120px" },
        { text: "单位部分缴费基数", name: "unitBase", width: "120px" },
        { text: "个人部分缴费基数", name: "personBase", width: "120px" },
        { text: "单位应缴", name: "unitPay", width: "120px" },
        { text: "个人应缴", name: "personPay", width: "120px" },
        { text: "月度总额", name: "monthAmount", width: "120px" },
        { text: "备注", name: "note", width: "200px" },
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
        excel.export_json_to_excel(tHeader,data,'工会费报表')
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
      getUnionFeeRepot(data, val).then(res => {
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
