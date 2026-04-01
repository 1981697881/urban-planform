<template>
  <div>
    <el-table
      :data="list.records"
      border
      :stripe="!timeColor"
      size="mini"
      ref="list"
      :highlight-current-row="highlight"
      @row-dblclick="dblclick"
      @row-click="rowClick"
      :row-class-name="tableRowClassName"
      :row-style="formatRow ? rowClass : null"
      @selection-change="handleSelectionChange"
      :height="height"
      @sort-change="sortChange"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      v-loading="loading"
      row-key="id"
      :tree-props="tree"
    >
      <!-- 多选列 -->
      <el-table-column v-if="type" type="selection" align="center" fixed />
      <!-- 序号列 -->
      <el-table-column v-if="index" type="index" label="序号" align="center" sortable />
      <!-- 自定义前置列 -->
      <slot name="title"></slot>

      <!-- 递归渲染动态列 -->
      <table-column-recursive
        v-for="(col, idx) in columns"
        :key="idx"
        :column="col"
        :self-adaption="selfAdaption"
        :file-url="fileUrl"
        :methods="methods"
      />

      <!-- 自定义后置列 -->
      <slot name="after"></slot>
    </el-table>

    <!-- 分页组件 -->
    <div class="text-center pages" v-if="list.total && list.total != 0" style="padding-top: 15px;">
      <el-pagination
        @size-change="handleSize"
        @current-change="handleCurrent"
        :current-page="list.current"
        :page-sizes="[50, 100, 250, 500, 1000, 2500]"
        :page-size="list.size"
        :page-count="list.pages ? list.pages : 0"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.total ? list.total : 0"
      />
    </div>
  </div>
</template>

<script>
  import TableColumnRecursive from './TableColumnRecursive.vue'

  export default {
    components: { TableColumnRecursive },
    props: {
      list: { type: Object, default: null },
      columns: { type: Array, default: null },
      tree: { type: Object, default: () => ({}) },
      index: { type: Boolean, default: false },
      operation: { type: Boolean, default: false },
      formatRow: { type: Boolean, default: false },
      highlight: { type: Boolean, default: true },
      type: { type: Boolean, default: false },
      timeColor: { type: Boolean, default: false },
      loading: { type: Boolean, default: false },
      sort: { type: Boolean, default: false },
      showSummary: { type: Boolean, default: false },
      selfAdaption: { type: Boolean, default: true },
      height: { type: String, default: '100%' },
      operationName: { type: String, default: '+' }
    },
    data() {
      return {
        methods: this.$options.methods,
        fileUrl: this.$store.state.user.url + '/images/'
      }
    },
    methods: {
      setCurrentRow() {
        this.$refs.list.setCurrentRow({})
      },
      sortChange(row) {
        return this.$emit('sortChange', { row })
      },
      checkType(row, column) {
        let stau = ''
        if (row.status == 0) stau = '待寄回'
        else if (row.status == 1) stau = '待检修'
        else if (row.status == 2) stau = '待确认'
        else if (row.status == 3) stau = '待维修'
        else if (row.status == 4) stau = '待发货'
        else if (row.status == 5) stau = '待收货'
        else if (row.status == 6) stau = '完成'
        return stau
      },
      checkPay(row, column) {
        let stau = ''
        if (row.payStatus == 0) stau = '未付款'
        else if (row.payStatus == 1) stau = '已付款'
        return stau
      },
      checkHandleStatus(row, column) {
        let stau = ''
        if (row.status == 0) stau = '未处理'
        else if (row.status == 1) stau = '已处理'
        return stau
      },
      checkStatus(row, column, name) {
        let stau = ''
        if (row[name] == "1") stau = '是'
        else if (row[name] == "0") stau = '否'
        return stau
      },
      checkInternalOrNot(row, column) {
        let stau = ''
        if (row.internalOrNot == 0) stau = '内部员工'
        else if (row.internalOrNot == 1) stau = '非内部员工'
        return stau
      },
      tableRowClassName({ row, rowIndex }) {
        if (row.judgeStatus) {
          var oDate1 = new Date();
          var oDate2 = new Date(row.editDate);
          var dimDate = parseInt((oDate1.getTime() - oDate2.getTime()) / 3600 / 1000 / 24);
          if (row.status == 3) {
            if (row.payStatus == 0) {
              if (oDate1.getTime() > oDate2.getTime() && dimDate >= 2) return 'suspended-row1';
              else if (oDate1.getTime() > oDate2.getTime() && dimDate >= 1 && dimDate < 2) return 'suspended-row2';
            } else {
              if (oDate1.getTime() > oDate2.getTime() && dimDate > 2) return 'suspended-row1';
              else if (oDate1.getTime() > oDate2.getTime() && dimDate >= 1 && dimDate < 2) return 'suspended-row2';
            }
          } else if (row.status == 4) {
            if (oDate1.getTime() > oDate2.getTime() && dimDate > 2) return 'suspended-row1';
            else if (oDate1.getTime() > oDate2.getTime() && dimDate >= 1 && dimDate < 2) return 'suspended-row2';
          }
        }
      },
      rowClass(row, index) {
        if (row.row.evenNum >= row.row.qty) return { 'background-color': '#FFDAB9' }
      },
      handleSelectionChange(val) {
        this.$store.dispatch('list/setSelections', val)
      },
      getSummaries({ columns, data }) {
        const sums = [];
        columns.forEach((column, index) => {
          if (index == 0) sums[index] = '合计'
          else {
            const values = data.map(item => Number(item[column.property]))
            const flag = values.every(item => isNaN(item))
            if (column.property == 'productName') sums[index] = values.length;
          }
        })
        return sums
      },
      rowClick(row, column, el) {
        return this.$emit('row-click', { row, column, el })
      },
      dblclick(row, column, el) {
        return this.$emit('dblclick', { row, column, el })
      },
      handleSize(size) {
        return this.$emit('handle-size', size)
      },
      handleCurrent(current) {
        return this.$emit('handle-current', current)
      }
    }
  }
</script>

<style>
  .el-table__body tr.current-row>td{
    background-color: #f19944 !important;
  }
  .urgent-row { color: red; }
  .delay-row { color: orange; }
  .conflict-row { color: blue; }
  .suspended-row1 { color: red; }
  .suspended-row2 { color: blue; }
</style>
