<template>
  <div>
    <div class="search-fields">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="股票代码">
          <el-select v-model="searchForm.ticker" placeholder="选择股票代码">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="证券公司">
          <el-select v-model="searchForm.exchange_code" placeholder="选择证券公司" clearable>
            <el-option label="上交所" value="XSHG" />
            <el-option label="深交所" value="XSHE" />
            <template #empty></template>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="searchForm.start_date" type="date" placeholder="选择开始时间" format="YYYY-MM-DD"
            value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="searchForm.end_date" type="date" placeholder="选择结束时间" format="YYYY-MM-DD"
            value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleOnsearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="前一天最高">
        <el-input-number v-model="form.dayBeforeHigh" />
      </el-form-item>
      <el-form-item label="前一天最低">
        <el-input-number v-model="form.dayBeforeLow" />
      </el-form-item>
      <el-form-item label="前一天收盘">
        <el-input-number v-model="form.dayBeforeClose" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">计算</el-button>
      </el-form-item>
    </el-form>
    <div style="text-align: left;"><span class="blue">数轴线：</span>{{ pivot_point }}</div>
    <div class="text-left"><span class="green">第一阻力位：</span>{{ firstResistanceLevel }}</div>
    <div class="text-left"><span class="green">第二阻力位：</span>{{ secondResistanceLevel }}</div>
    <div class="text-left"><span class="green">第三阻力位：</span>{{ thirdResistanceLevel }}</div>

    <el-divider />

    <div class="text-left"><span class="red">第一支撑位：</span>{{ firstSupportLevel }}</div>
    <div class="text-left"><span class="red">第二支撑位：</span>{{ secondSupportLevel }}</div>
    <div class="text-left"><span class="red">第三支撑位：</span>{{ thirdSupportLevel }}</div>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from "vue";
import { ElMessage } from 'element-plus'
import axios from "axios";

const pivot_point = ref(0);
const form = reactive({
  dayBeforeHigh: 0, // 前一天最高
  dayBeforeLow: 0,  // 前一天最低
  dayBeforeClose: 0, // 前一天收盘
})
const options = [
  {
    value: '002895',
    label: '川恒股份（002895）',
  },
  {
    value: '301831',
    label: '赛维时代（301831）',
  },
  {
    value: '301236',
    label: '软通动力（301236）',
  },
  {
    value: '000736',
    label: '中交地产（000736）',
  },
  {
    value: '002583',
    label: '海能达（002583）',
  },
  {
    value: '300229',
    label: '拓尔思（300229）',
  },
]

const searchForm = reactive({
  ticker: '',
  exchange_code: '',
  start_date: '',
  end_date: '',
  token: 'demo'
})


const onSubmit = () => {
  pivot_point.value = (form.dayBeforeHigh + form.dayBeforeLow + form.dayBeforeClose) / 3;
}

// 第一阻力位
const firstResistanceLevel = computed(() => ((2 * pivot_point.value) - form.dayBeforeLow).toFixed(2));
// 第二阻力位
const secondResistanceLevel = computed(() => (pivot_point.value + (form.dayBeforeHigh - form.dayBeforeLow)).toFixed(2));
// 第三阻力位
const thirdResistanceLevel = computed(() => (form.dayBeforeHigh + 2 * (pivot_point.value - form.dayBeforeLow)).toFixed(2));
// 第一支撑位
const firstSupportLevel = computed(() => (2 * pivot_point.value) - form.dayBeforeHigh);
// 第二支撑位
const secondSupportLevel = computed(() => (pivot_point.value - (form.dayBeforeHigh - form.dayBeforeLow)).toFixed(2));
// 第三支撑位
const thirdSupportLevel = computed(() => (form.dayBeforeLow - 2 * (form.dayBeforeHigh - pivot_point.value)).toFixed(2));

const handleOnsearch = () => {
  console.log(searchForm.start_date)
  axios.get(`/socketapi/api/fin/stock/${searchForm.exchange_code}/daily`, {
    params: searchForm
  }).then(res => {
    console.log(res)
    if (res.data.code === 200) {
      form.dayBeforeHigh = res.data.data[0].high;
      form.dayBeforeLow = res.data.data[0].low;
      form.dayBeforeClose = res.data.data[0].close;
      ElMessage({
        message: res.data.msg,
        type: 'success',
      })
    } else {
      ElMessage.error(res.data.msg)
    }
  })
}

</script>

<style lang="scss" scoped>
.green {
  color: green;
}

.red {
  color: #e00000;
}

.blue {
  color: blue;
}

.text-left {
  text-align: left;
}
</style>
