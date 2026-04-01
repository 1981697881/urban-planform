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
  import { getPersonTaxRepot } from '@/api/reportForm/index'

  export default {
    components: { List },
    computed: {
      ...mapGetters(["node"])
    },
    data() {
      return {
        loading: false,
        list: {},
        columns: [
          // 基础信息区
          { text: "所属期间", name: "laborPeriod", width: "120px" },
          { text: "姓名", name: "empName", width: "100px" },
          { text: "部门", name: "dept", width: "120px" },
          { text: "身份证件类型", name: "unitBase", width: "120px" },
          { text: "身份证件号码", name: "personBase", width: "180px" },
          { text: "纳税人识别号", name: "unitPay", width: "180px" },
          { text: "是否为非居民个人", name: "personalPay", width: "120px" },
          { text: "所得项目", name: "monthAmount", width: "120px" },
          // 保留无字段映射的列（VO 中不存在，但前端保留）
          { text: "所得项目说明", name: "incomeProjectDesc", width: "150px" },

          // 一级跨列：本月（次）情况
          {
            text: "本月（次）情况",
            children: [
              {
                text: "收入额计算",
                children: [
                  { text: "收入", name: "income", width: "100px" },
                  { text: "费用", name: "inFee", width: "100px" },
                  { text: "免税收入", name: "inNoTax", width: "100px" },
                ]
              },
              { text: "减除费用", name: "inDeduct", width: "100px" },
              // 专项扣除
              {
                text: "专项扣除",
                children: [
                  { text: "基本养老保险费", name: "specialInsuranceBase", width: "120px" },
                  { text: "基本医疗保险费", name: "specialMedical", width: "120px" },
                  { text: "失业保险费", name: "specialUnemployment", width: "120px" },
                  { text: "住房公积金", name: "specialHousing", width: "120px" }
                ]
              },
              // 其他扣除
              {
                text: "其他扣除",
                children: [
                  { text: "年金", name: "otherPension", width: "100px" },
                  { text: "商业健康保险", name: "otherHealthInsurance", width: "100px" },
                  { text: "税延养老保险", name: "otherPensionInsurance", width: "100px" },
                  { text: "财产原值", name: "otherHouseValue", width: "100px" },
                  { text: "允许扣除的税费", name: "otherTax", width: "120px" },
                  { text: "其他", name: "otherDeductOther", width: "100px" }
                ]
              }
            ]
          },

          // 一级跨列：累计情况
          {
            text: "累计情况",
            children: [
              { text: "累计收入额", name: "inAll", width: "120px" },
              // 保留无字段映射的列
              { text: "累计收入总额", name: "cumulativeTotalIncome", width: "120px" },
              { text: "累计减除费用", name: "totalReliefDeduct", width: "120px" },
              // 累计专项附加扣除
              {
                text: "累计专项附加扣除",
                children: [
                  { text: "子女教育", name: "totalChildEducation", width: "100px" },
                  { text: "赡养老人", name: "totalOldMan", width: "100px" },
                  { text: "住房贷款利息", name: "totalHouseLoan", width: "100px" },
                  { text: "住房租金", name: "totalHouseRend", width: "100px" },
                  { text: "继续教育", name: "totalReducation", width: "100px" },
                  { text: "3岁以下婴幼儿照护", name: "totalDeductChild", width: "140px" }
                ]
              },
              { text: "累计个人养老金", name: "totalPerson", width: "120px" },
              { text: "累计其他扣除", name: "totalDeductOther", width: "120px" }
            ]
          },

          { text: "减按计税比例", name: "deductTaxRate", width: "100px" },
          { text: "准予扣除的捐赠额", name: "deductDonate", width: "120px" },

          // 一级跨列：税额计算
          {
            text: "税额计算",
            children: [
              { text: "应纳税所得额", name: "taxLabor", width: "120px" },
              { text: "税率/预扣率", name: "taxRate", width: "100px" },
              { text: "速算扣除数", name: "taxQuickDeduct", width: "100px" },
              { text: "应纳税额", name: "taxPay", width: "100px" },
              { text: "减免税额", name: "taxRelief", width: "100px" },
              { text: "已缴税额", name: "taxPayed", width: "100px" },
              { text: "应补/退税额", name: "taxDeduct", width: "120px" }
            ]
          },

          // 备注列
          { text: "备注", name: "note", width: "200px" }
        ]
      };
    },
    methods: {
      ExportData() {
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = [];
          const filterVal = [];
          const flattenColumns = (cols) => {
            cols.forEach(col => {
              if (col.children) flattenColumns(col.children);
              else if (col.name) {
                tHeader.push(col.text);
                filterVal.push(col.name);
              }
            });
          };
          flattenColumns(this.columns);
          const list = this.list.records;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel(tHeader, data, '个税报表');
        });
      },
      formatJson(filter, jsonDate) {
        return jsonDate.map(v => filter.map(j => v[j]));
      },
      handleSize(val) {
        this.list.size = val;
        this.$emit('uploadList');
      },
      handleCurrent(val) {
        this.list.current = val;
        this.$emit('uploadList');
      },
      rowClick(obj) {
        this.$store.dispatch("list/setClickData", obj.row);
      },
      uploadPr(val) {
        this.fetchData(val, {
          pageNum: 1,
          pageSize: this.list.size || 50
        });
      },
      fetchData(val, data = {
        pageNum: this.list.current || 1,
        pageSize: this.list.size || 50
      }) {
        this.loading = true;
        getPersonTaxRepot(data, val).then(res => {
          this.loading = false;
          this.list = res.data;
        }).catch(() => { this.loading = false; });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .list-main {
    height: calc(100vh - 250px);
  }
</style>
