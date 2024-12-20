<template>
  <div ref="container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import * as THREE from 'three';

// 创建对 DOM 元素的引用
const container = ref(null);
let scene, camera, renderer, sphere;

onMounted(() => {
  // 创建场景
  scene = new THREE.Scene();

  // 创建相机
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000);
  camera.position.z = 5;


  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.value.appendChild(renderer.domElement);

  // 创建一个球体
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  const material = new THREE.MeshLambertMaterial({ color: 0x00ffff, transparent: true, opacity: 0.9 });
  for (let i = 0; i < 10; i++) {
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    // 沿着x轴分布
    mesh.position.set(i*200,0,0);
    scene.add(mesh); //网格模型添加到场景中
}

// 在场景中添加一个点光源
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);



  // 动画循环
  // function animate() {
  //   requestAnimationFrame(animate);

  //   // 旋转球体
  //   sphere.rotation.x += 0.01;
  //   sphere.rotation.y += 0.01;

  //   renderer.render(scene, camera);
  // }
  // animate();
  // 处理窗口大小调整
  window.addEventListener('resize', onWindowResize);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
});
</script>


<style lang="scss" scoped>

</style>
