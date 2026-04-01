<template>
  <!-- 1. 有子列：分组表头，递归渲染 -->
  <el-table-column
    v-if="column.children && column.children.length"
    :label="column.text"
    :width="column.width || (selfAdaption ? '' : '120px')"
    align="center"
  >
    <table-column-recursive
      v-for="(child, idx) in column.children"
      :key="idx"
      :column="child"
      :self-adaption="selfAdaption"
      :file-url="fileUrl"
      :methods="methods"
    />
  </el-table-column>

  <!-- 2. 无子列，但为图片类型：使用自定义插槽显示图片 -->
  <el-table-column
    v-else-if="column.default === 'img' || column.default === 'image' || column.default === 'images'"
    :label="column.text"
    :width="column.width || (selfAdaption ? '' : '120px')"
    :fixed="column.fixed"
    align="center"
  >
    <template slot-scope="scope">
      <template v-if="column.default === 'img'">
        <img style="width:80px;height:80px;border:none;" :src="fileUrl + scope.row[column.name]" />
      </template>
      <template v-else-if="column.default === 'image' && scope.row[column.name]">
        <el-image
          style="width:80px;height:80px"
          :src="fileUrl + scope.row[column.name]"
          :preview-src-list="[fileUrl + scope.row[column.name]]"
        />
      </template>
      <template v-else-if="column.default === 'images' && Array.isArray(scope.row[column.name])">
        <el-image
          v-for="(url, idx) in scope.row[column.name]"
          :key="idx"
          style="width:80px;height:80px;margin-right:5px;"
          :src="fileUrl + url"
          :preview-src-list="scope.row[column.name].map(u => fileUrl + u)"
        />
      </template>
    </template>
  </el-table-column>

  <!-- 3. 无子列，普通文本列：完全依赖 prop 和 formatter，无任何插槽 -->
  <el-table-column
    v-else
    :prop="column.name"
    :label="column.text"
    :width="column.width || (selfAdaption ? '' : '120px')"
    :fixed="column.fixed"
    :sortable="column.sort"
    :formatter="column.formatt ? (row, col) => methods[column.formatt](row, col, column.name) : null"
    show-overflow-tooltip
    align="center"
  />
</template>

<script>
  export default {
    name: 'TableColumnRecursive',
    props: {
      column: Object,
      selfAdaption: Boolean,
      fileUrl: String,
      methods: Object
    }
  }
</script>
