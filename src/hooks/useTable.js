// composables/useTable.js
import { ref, onMounted, watch } from "vue";

export function useTable(fetchDataFunction, initialParams = {}) {
  const data = ref([]);
  const currentPage = ref(1);
  const totalItems = ref(0);
  const pageSize = ref(10);
  const loading = ref(false);
  const error = ref(null);
  const params = ref(initialParams); // 用于动态传递请求参数

  const fetchTableData = async () => {
    loading.value = true;
    error.value = null;
    try {
      // 传递分页信息和其他自定义参数
      const response = await fetchDataFunction({
        pageNum: currentPage.value,
        pageSize: pageSize.value,
        ...params.value
      });
      data.value = response.data.records; // 根据 API 返回数据的格式调整
      totalItems.value = response.data.total; // 假设返回的总条目数
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const refreshData = () => {
    fetchTableData();
  };

  const changePage = page => {
    currentPage.value = page;
    //fetchTableData();
  };

  onMounted(() => {
    fetchTableData();
  });

  watch([currentPage, pageSize], fetchTableData);

  return {
    data,
    currentPage,
    totalItems,
    pageSize,
    loading,
    error,
    refreshData,
    changePage,
    params // 如果需要动态调整其他参数，可以暴露出来
  };
}
