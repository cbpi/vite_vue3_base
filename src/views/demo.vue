<template>
  <div>
    <el-button @click="openDialog">打开弹窗</el-button>
    <el-dialog v-model="dialogVisible">
      <el-form :model="formData">
        <el-form-item v-for="field in fields" :key="field.key" :label="field.label">
          <component :is="getComponentType(field.type)" v-model="formData[field.key]" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="saveData">保存</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script setup>
import useDialog from '../hooks/useDialog';
import { saveForm } from '../api/demo';


const fieldConfig = [
  { label: 'Name', key: 'name', type: 'text' },
  { label: 'Age', key: 'age', type: 'number' },
  // 其他字段配置
];

const { dialogVisible, formData, fields, openDialog, closeDialog, saveData } = useDialog(saveForm, fieldConfig);

const getComponentType = (type) => {
  switch (type) {
    case 'text':
      return 'el-input';
    case 'number':
      return 'el-input-number';
    // 其他类型
    default:
      return 'el-input';
  }
};

</script>
