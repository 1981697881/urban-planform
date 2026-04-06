<template>
  <div class="app-list">
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @showInventory="handlerInventory" @exportData="exportData" @del="delivery" @queryBtn="query" @uploadList="upload"/>
      </div>
      <list ref="list" @uploadList="uploadPage" @showDialog="handlerDialog"/>
    </div>
    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      v-dialogDrag
      :width="'60%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="物料清单"
      v-if="visible2"
      v-dialogDrag
      :width="'60%'"
      destroy-on-close
    >
      <inventory @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></inventory>
    </el-dialog>
  </div>
</template>

<script>import { TabsBar, List } from './components'
import { Info, Inventory } from './form'

export default {
  components: {
    TabsBar,
    List,
    Inventory,
    Info
  },
  data() {
    return {
      form: {
        type: 1,
        cn: null,
        eur: null,
        usm: null,
        usw: null,
        select: []
      },
      rules: {
        cn: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], eur: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], usm: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], usw: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        select: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
      },
      visible: null,
      visible2: null,
      rid: null,
      listInfo: null,
      floorId: null
    }
  },
  mounted() {
    this.$refs.list.fetchData(this.$refs.tabs.qFilter())
  },
  methods: {
    handlerInventory(obj) {
      this.listInfo = null
      if (obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible2 = true
    },
    exportData() {
      this.$refs.list.ExportData()
    },
    delivery(obj) {
      if (obj) {
        this.$refs.list.Delivery(obj)
      }
    },
    hideWindow(val) {
      this.visible = val
      this.visible2 = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if (obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    },
    // 更新列表
    upload() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    uploadPage(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 查询
    query() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
