<template>
  <div class="text-sm">
    <h1 class="text-sm">网格交易策略，设置当前股价，网格上限，网格下限，网格间距，剩余游资，已拥有股市</h1>
    <el-form :model="tradingParams" label-width="120px">
      <el-form-item label="当前股价">
        <el-input v-model="tradingParams.currentPrice" type="number"></el-input>
      </el-form-item>
      <el-form-item label="网格下限">
        <el-input v-model="tradingParams.lowerLimit" type="number"></el-input>
      </el-form-item>
      <el-form-item label="网格上限">
        <el-input v-model="tradingParams.upperLimit" type="number"></el-input>
      </el-form-item>
      <el-form-item label="网格间距">
        <el-input v-model="tradingParams.gridSpacing" type="number"></el-input>
      </el-form-item>
      <el-form-item label="剩余资金">
        <el-input v-model="tradingParams.capital" type="number"></el-input>
      </el-form-item>
      <el-form-item label="已拥有股票数量">
        <el-input v-model="tradingParams.sharesOwned" type="number"></el-input>
      </el-form-item>
      <el-form-item label="每次买入卖出股数">
        <el-input v-model="tradingParams.gridSize" type="number"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="calculate">计算</el-button>
      </el-form-item>
    </el-form>
    <div v-if="result" class="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold mb-4 text-center">计算结果</h2>
      <p class="mb-2 text-left"><span class="font-medium">网格价格点：</span>{{ result.gridPoints.join(', ') }}</p>
      <p class="mb-2 text-left"><span class="font-medium">买入订单：</span>{{ result.buyOrders }}</p>
      <p class="mb-2 text-left"><span class="font-medium">卖出订单：</span>{{ result.sellOrders }}</p>
      <p class="mb-2 text-left"><span class="font-medium">总成本：</span>{{ result.totalCost }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tradingParams = ref({
  currentPrice: 27.3,    // 当前股价
  lowerLimit: 20,        // 下限
  upperLimit: 28.8,      // 上限
  gridSpacing: 1.5,      // 网格间距
  capital: 60000,        // 剩余资金
  sharesOwned: 900,      // 已拥有股票数量
  gridSize: 400          // 每次买入卖出股数
});

const result = ref(null);

function calculateGridTrading({
  currentPrice,    // 当前股价
  lowerLimit,      // 网格下限
  upperLimit,      // 网格上限
  gridSpacing,     // 网格间距
  capital,         // 剩余资金
  sharesOwned,     // 已拥有股票数量
  gridSize         // 每次买入和卖出的股数
}) {
  let gridPoints = [];
  let buyOrders = [];
  let sellOrders = [];
  let totalCost = sharesOwned * currentPrice;

  // 计算网格区间的价格点
  for (let price = lowerLimit; price <= upperLimit; price += gridSpacing) {
    gridPoints.push(price);
  }

  // 计算买入和卖出操作
  gridPoints.forEach(price => {
    if (price <= currentPrice && capital >= price * gridSize) {
      // 当前股价低于网格买入价格时，执行买入操作
      buyOrders.push({ price, shares: gridSize });
      capital -= gridSize * price; // 更新剩余资金
    } else if (price > currentPrice && sharesOwned >= gridSize) {
      // 当前股价高于网格卖出价格时，执行卖出操作
      sellOrders.push({ price, shares: gridSize });
      sharesOwned -= gridSize; // 更新剩余持仓
    }
  });

  // 返回网格区间、买入和卖出操作
  return {
    gridPoints,
    buyOrders,
    sellOrders,
    totalCost: totalCost + capital // 当前持仓的总成本
  };
}

function calculate() {
  result.value = calculateGridTrading(tradingParams.value);
}
</script>

<style lang="scss" scoped></style>
