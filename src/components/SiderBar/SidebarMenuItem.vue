<template>
  <li class="sidebar-menu-item" :class="{ 'is-resizing': isResizing }" draggable="true"
    @contextmenu="handleContextMenu" @dragstart="handleDragStart" @dragend="handleDragEnd" @dragover.prevent @drop="handleDrop">
    <div class="menu-item-content" :class="{ 'is-collapsed': collapsed }">
      <slot v-if="!collapsed" name="expanded"></slot>
      <slot v-else name="collapsed"></slot>
    </div>
    <RightMenu v-if="menuItems.length > 0" ref="rightMenuRef" :menu-items="menuItems" />
  </li>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSidebar } from './SidebarContext'
import RightMenu from '../RightMenu/RightMenu.vue'

const { isResizing } = useSidebar()
const rightMenuRef = ref(null)

const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  collapsed: {
    type: Boolean,
    default: false
  },
  rightMenuOptions: {
    type: Object,
    default: () => ({
      items: [],
      enable: false
    })
  }
})

const menuItems = computed(() => {
  const items = props.rightMenuOptions.items.map(item => {
    return {
      ...item,
      onClick: () => item.onClick(props.index)
    }
  })
  const enable = props.rightMenuOptions.enable
  return enable ? items : []
})

const handleContextMenu = (e) => {
  if (menuItems.value.length > 0) {
    rightMenuRef.value?.show(e)
  }
}
</script>

<style lang="less" scoped>
.sidebar-menu-item {
  list-style: none;

  &.is-resizing {
    pointer-events: none;
  }
}

.menu-item-content {
  display: flex;
  gap: 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--color-background-hover);
  }

  &.is-collapsed {
    justify-content: center;
  }
}
</style>