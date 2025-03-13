<template>
  <div class="min-h-screen bg-gray-100">
    <router-view></router-view>
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 自定义全局样式 */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>