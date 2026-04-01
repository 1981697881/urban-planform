<!-- CheckboxGroupModal.vue -->
<template>
  <div style="height: 350px;overflow: auto;">
    <p style="margin-bottom: 15px; color: #606266;">请从以下选项中选择：</p>
    <el-checkbox-group v-model="internalValue" @change="handleChange">
      <el-checkbox
        v-for="option in options"
        :key="option.value"
        :label="option.value"
        :disabled="option.disabled"
        style="display: block; margin: 8px 0;"
      >
        {{ option.label }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
  export default {
    name: 'CheckboxGroupModal',
    props: {
      value: { type: Array, default: () => [] }, // 接收外部传入的已选值
      options: { type: Array, required: true }  // 接收可选项列表
    },
    data() {
      return {
        internalValue: [...this.value] // 在组件内部维护一个副本
      };
    },
    watch: {
      // 监听外部传入的 value 变化，同步到内部值
      value(newVal) {
        this.internalValue = [...newVal];
      }
    },
    methods: {
      handleChange(newValues) {
        // 当选择变化时，通知父组件
        this.$emit('input', newValues);
        this.$emit('change', newValues);
      },
      // 一个方法，用于获取当前选中的值
      getSelectedValues() {
        return this.internalValue;
      }
    }
  };
</script>
