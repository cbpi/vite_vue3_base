<template>
  <div>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <!-- <el-form-item label="昨日最高">
        <el-input-number v-model="form.high" />
      </el-form-item>
      <el-form-item label="昨日最低">
        <el-input-number v-model="form.low" />
      </el-form-item>
      <el-form-item label="昨日收盘">
        <el-input-number v-model="form.close" />
      </el-form-item> -->
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
    数轴线：{{ pivot_point }} <br />
    第一阻力位：{{ firstResistanceLevel }} <br />
    第二阻力位：{{ secondResistanceLevel }} <br />
    第三阻力位：{{ thirdResistanceLevel }} <br />

    <el-divider />

    第一支撑位：{{ firstSupportLevel }} <br />
    第二支撑位：{{ secondSupportLevel }} <br />
    第三支撑位：{{ thirdSupportLevel }} <br />
  </div>
</template>

<script setup>
import { computed, ref, reactive } from "vue";

const pivot_point = ref(0);
const form = reactive({
  // high: 19.98,
  // low: 18.01,
  // close: 18.23,
  dayBeforeHigh: 17.15, // 前一天最高
  dayBeforeLow: 16.22,  // 前一天最低
  dayBeforeClose: 16.25, // 前一天收盘
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


</script>

<style lang="scss" scoped></style>
