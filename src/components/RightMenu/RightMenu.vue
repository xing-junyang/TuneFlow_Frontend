<template>
  <div v-show="visible" 
       class="right-menu" 
       :style="{ left: position.x + 'px', top: position.y + 'px' }"
       @click.stop
       @contextmenu.prevent>
    <div class="menu-list">
      <div v-for="(item, index) in menuItems" 
           :key="index" 
           class="menu-item"
           @click="handleItemClick(item)">
        <i v-if="item.icon" :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)
const position = ref({ x: 0, y: 0 })

defineProps({
  menuItems: {
    type: Array,
    default: () => []
  }
})

const handleItemClick = (item) => {
  if (item.onClick) {
    item.onClick()
  }
  visible.value = false
}

const show = (e) => {
  e.preventDefault()
  position.value = {
    x: e.clientX,
    y: e.clientY
  }
  visible.value = true
}

const hide = () => {
  visible.value = false
}

// 暴露方法给父组件
defineExpose({
  show,
  hide
})

onMounted(() => {
  document.addEventListener('click', hide)
})

onUnmounted(() => {
  document.removeEventListener('click', hide)
})
</script>

<style lang="less" scoped>
.right-menu {
  position: fixed;
  z-index: 9999;
  background: var(--color-background);
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  padding: 6px 0;
  min-width: 160px;

  .menu-list {
    .menu-item {
      padding: 10px 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--color-text);
      font-size: 14px;
      transition: all 0.2s ease;
      
      &:hover {
        background: var(--color-background-hover);
        color: var(--color-primary);

        i {
          color: var(--color-primary);
        }
      }

      i {
        font-size: 14px;
        color: var(--color-text-secondary);
        width: 16px;
        text-align: center;
        transition: color 0.2s ease;
      }

      span {
        flex: 1;
        text-align: left;
      }
    }

    // 添加分隔线样式
    .menu-item + .menu-item {
      margin-top: 2px;
    }
  }
}
</style> 