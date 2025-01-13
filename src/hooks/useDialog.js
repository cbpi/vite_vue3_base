import { ref } from 'vue';
import { ElMessage } from 'element-plus';

export default function useDialog(saveFunction, fieldConfig) {
  const dialogVisible = ref(false);
  const formData = ref({});
  const fields = ref(fieldConfig);

  const openDialog = (data = {}) => {
    console.log('111')
    formData.value = { ...data };
    dialogVisible.value = true;
  };

  const closeDialog = () => {
    dialogVisible.value = false;
  };

  const saveData = async () => {
    try {
      await saveFunction(formData.value);

      ElMessage.success('保存成功');
      closeDialog();
    } catch (error) {
      ElMessage.error('保存失败');
    }
  };

  return {
    dialogVisible,
    formData,
    fields,
    openDialog,
    closeDialog,
    saveData,
  };
}
