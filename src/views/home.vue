<template>
  <div id="cesiumContainer" ref="cesiumContainer" style="width: 100%; height: 100vh;"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

onMounted(async () => {
  // The URL on your server where CesiumJS's static files are hosted.
  window.CESIUM_BASE_URL = '/public/cesium';



  // Your access token can be found at: https://ion.cesium.com/tokens.
  // This is the default access token from your ion account

  Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5NTU0NGM5My1jZmY3LTQ4YzAtYTBkNi0wYzA3MDUzY2ZjNzIiLCJpZCI6MjYyNzA1LCJpYXQiOjE3MzQzMTk2NzF9.NQtZWr0qMOVkjluVWCdBQFVA7tYAcFwo0xGGcrJ1niE';

  // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
  const viewer = new Viewer('cesiumContainer', {
    terrain: Terrain.fromWorldTerrain(),
  });

  // Fly the camera to San Francisco at the given longitude, latitude, and height.
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation: {
      heading: CesiumMath.toRadians(0.0),
      pitch: CesiumMath.toRadians(-15.0),
    }
  });

  // Add Cesium OSM Buildings, a global 3D buildings layer.
  const buildingTileset = await createOsmBuildingsAsync();
  viewer.scene.primitives.add(buildingTileset);

  console.log('Viewer', Viewer);
});

</script>

<style scoped>

</style>
