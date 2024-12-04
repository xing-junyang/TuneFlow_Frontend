import { ref, computed, inject } from 'vue'
import { getClientWidth } from '@/utils'

export const SIDEBAR_KEY = Symbol('sidebar')
export const SIDEBAR_COLLAPSED_WIDTH = 72
export const SIDEBAR_MIN_WIDTH = 280
export const SIDEBAR_MAX_WIDTH = 580
export const SIDEBAR_MAX_RATIO = 0.6
export const SIDEBAR_COLLAPSE_THRESHOLD = 200

// 从本地存储读取状态的辅助函数
const getSavedState = () => {
  const savedWidth = Number(localStorage.getItem('sidebarWidth')) || SIDEBAR_MIN_WIDTH
  const savedExpanded = localStorage.getItem('sidebarExpanded') !== 'false' // 默认展开
  
  // 确保宽度和展开状态匹配
  if (!savedExpanded && savedWidth > SIDEBAR_COLLAPSED_WIDTH) {
    return { width: SIDEBAR_COLLAPSED_WIDTH, expanded: false }
  }
  if (savedExpanded && savedWidth < SIDEBAR_MIN_WIDTH) {
    return { width: SIDEBAR_MIN_WIDTH, expanded: true }
  }
  
  return { width: savedWidth, expanded: savedExpanded }
}

export function createSidebarContext() {
  const clientWidth = getClientWidth()
  const { width: initialWidth, expanded: initialExpanded } = getSavedState()
  
  const isExpanded = ref(initialExpanded)
  const width = ref(initialWidth)
  const isMobile = ref(false)
  const isResizing = ref(false)

  // 计算最大宽度
  const maxWidth = Math.min(SIDEBAR_MAX_WIDTH, clientWidth * SIDEBAR_MAX_RATIO)

  const sidebarState = computed(() => ({
    expanded: isExpanded.value,
    width: width.value,
    mobile: isMobile.value
  }))

  // 保存状态到本地存储
  const saveState = () => {
    localStorage.setItem('sidebarWidth', width.value)
    localStorage.setItem('sidebarExpanded', isExpanded.value)
  }

  // 点击图标切换状态
  const toggleSidebar = () => {
    if (isExpanded.value) {
      // 展开 -> 收起
      width.value = SIDEBAR_COLLAPSED_WIDTH
      isExpanded.value = false
    } else {
      // 收起 -> 展开
      width.value = SIDEBAR_MIN_WIDTH
      isExpanded.value = true
    }
    saveState()
  }

  // 处理拖拽更新宽度
  const updateWidth = (newWidth) => {
    if (isResizing.value) {
      // 拖拽时的逻辑
      if (newWidth < SIDEBAR_COLLAPSE_THRESHOLD) {
        // 拖拽小于阈值，收起
        width.value = SIDEBAR_COLLAPSED_WIDTH
        isExpanded.value = false
      } else {
        // 正常拖拽范围
        width.value = Math.min(Math.max(SIDEBAR_MIN_WIDTH, newWidth), maxWidth)
        isExpanded.value = true
      }
    } else {
      // 非拖拽时的直接设置（比如通过点击）
      width.value = newWidth
      isExpanded.value = newWidth > SIDEBAR_COLLAPSED_WIDTH
    }
    
    saveState()
  }

  return {
    sidebarState,
    isExpanded,
    toggleSidebar,
    width,
    isMobile,
    isResizing,
    updateWidth
  }
}

export function useSidebar() {
  const context = inject(SIDEBAR_KEY)
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider')
  }
  return context
} 