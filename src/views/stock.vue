<template>
  <div>
    <div class="search-fields mb-8">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="股票代码">
          <el-select v-model="searchForm.ticker" placeholder="选择股票代码" @change="handleSelected">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
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
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form :model="form" label-width="auto" size="large">
          <el-form-item label="该股数轴线">
            <el-tag type="default">
              {{ pivot_point }}
            </el-tag>
          </el-form-item>
          <el-form-item label="前一天最高">
            <el-tag type="danger" effect="dark">
              {{ form.dayBeforeHigh }}
            </el-tag>
          </el-form-item>
          <el-form-item label="前一天最低">
            <el-tag type="success" effect="dark">
              {{ form.dayBeforeLow }}
            </el-tag>
          </el-form-item>
          <el-form-item label="前一天收盘">
            <el-tag type="primary" effect="dark">
              {{ form.dayBeforeClose }}
            </el-tag>
          </el-form-item>
          <el-form-item>
            <!-- <el-button type="primary" @click="onSubmit">计算</el-button> -->

          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-descriptions class="margin-top" :column="1" size="default" direction="vertical" border>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                第一阻力位
              </div>
            </template>
            <span class="text-green-500 font-black">{{ firstResistanceLevel }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                第二阻力位
              </div>
            </template>
            <span class="text-green-500 font-black">{{ secondResistanceLevel }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                第三阻力位
              </div>
            </template>
            <span class="text-green-500 font-black">{{ thirdResistanceLevel }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
      <el-col :span="8">
        <el-descriptions class="margin-top" :column="1" direction="vertical" size="default" border>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                第一支撑位
              </div>
            </template>
            <span class="text-red-600 font-black">{{ firstSupportLevel }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                第二支撑位
              </div>
            </template>
            <span class="text-red-600 font-black">{{ secondSupportLevel }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                第三支撑位
              </div>
            </template>
            <span class="text-red-600 font-black">{{ thirdSupportLevel }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
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
    value: '002402',
    label: '和而泰（002402）',
  },
  {
    value: '300031',
    label: '宝通科技（300031）',
  },
  {
    value: '600602',
    label: '云赛（600602）',
  },
  {
    value: '603496',
    label: '恒为科技（603496）',
  },
]

const handleSelected = (v) => {
  let securitiesCompany = ''
  if (/^60|^68/.test(v)) {
    securitiesCompany = 'XSHG';
  } else if (/^00|^30|^002/.test(v)) {
    securitiesCompany = 'XSHE';
  }
  searchForm.exchange_code = securitiesCompany;
}

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

  axios.get(`/socketapi/api/fin/stock/${searchForm.exchange_code}/daily`, {
    params: searchForm
  }).then(res => {
    if (res.data.code === 200) {
      form.dayBeforeHigh = res.data.data[0].high;
      form.dayBeforeLow = res.data.data[0].low;
      form.dayBeforeClose = res.data.data[0].close;
      ElMessage({
        message: res.data.msg,
        type: 'success',
      })

      onSubmit()
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
