<template>
    <el-tooltip placement="right" :show-after="300" effect="dark" :show-arrow="false">
        <template #content="">
            <div>{{ playlist.name }}</div>
            <div>{{ playlist.owner.name }}</div>
        </template>
        <div class="playlist-item">
            <div class="item-icon">
                <svg viewBox="0 0 24 24" class="playlist-icon">
                    <path
                        d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z" />
                </svg>
            </div>
        </div>
    </el-tooltip>
</template>

<script setup>
// 引入 el-tooltip
import { ElTooltip } from 'element-plus'

defineProps({
    playlist: {
        type: Object,
        required: true
    }
})
</script>

<style lang="less" scoped>
.playlist-item {
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;

    .item-icon {
        width: 48px;
        height: 48px;
        background: var(--color-background-light);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;

        .playlist-icon {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }
    }
}
</style>