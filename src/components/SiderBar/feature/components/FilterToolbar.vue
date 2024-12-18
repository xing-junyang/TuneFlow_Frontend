<template>
    <div class="sidebar-toolbar" role="toolbar">
        <div class="toolbar-content">
            <div class="search-wrapper" role="search" :class="{ 'expanded': isSearchExpanded }">
                <div class="search-container">
                    <button class="search-button" @click="expandSearch" aria-label="在音乐库中搜索">
                        <svg viewBox="0 0 16 16" role="img" aria-hidden="true">
                            <path
                                d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z" />
                        </svg>
                    </button>
                    <div class="search-input-wrapper">
                        <input ref="searchInput" class="search-input" role="searchbox" maxlength="80" autocorrect="off"
                            autocapitalize="off" spellcheck="false" placeholder="在音乐库中搜索" v-model="searchText"
                            @change="setSearchText($event.target.value)" @blur="handleSearchBlur" />
                    </div>
                </div>
            </div>
            <div class="sort-wrapper">
                <span class="sort-label">最近播放</span>
                <el-popover :width="200" trigger="click" popper-class="sort-popover" :show-arrow="false">
                    <template #reference>
                        <button role="combobox" class="sort-button">
                            <span class="sort-icon">
                                <svg viewBox="0 0 16 16" aria-hidden="true">
                                    <path
                                        d="M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 11.5H1V13h2v1.5zm0-5.75H1v-1.5h2v1.5z" />
                                </svg>
                            </span>
                        </button>
                    </template>

                    <div class="sort-menu">
                        <div class="menu-section">
                            <div class="section-title">排序方式</div>
                            <ul class="menu-list" role="menu">
                                <li role="presentation">
                                    <button class="menu-item" role="menuitemradio" :aria-checked="sortBy === SORT_TYPES.RECENT"
                                        @click="setSortBy(SORT_TYPES.RECENT)">
                                        <span class="menu-text">{{ SORT_LABELS[SORT_TYPES.RECENT] }}</span>
                                        <svg v-if="sortBy === SORT_TYPES.RECENT" viewBox="0 0 16 16" aria-hidden="true">
                                            <path
                                                d="M15.53 2.47a.75.75 0 0 1 0 1.06L4.907 14.153.47 9.716a.75.75 0 0 1 1.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 0 1 1.06 0z" />
                                        </svg>
                                    </button>
                                </li>
                                <li role="presentation">
                                    <button class="menu-item" role="menuitemradio" :aria-checked="sortBy === SORT_TYPES.ADDED"
                                        @click="setSortBy(SORT_TYPES.ADDED)">
                                        <span class="menu-text">{{ SORT_LABELS[SORT_TYPES.ADDED] }}</span>
                                        <svg v-if="sortBy === SORT_TYPES.ADDED" viewBox="0 0 16 16" aria-hidden="true">
                                            <path
                                                d="M15.53 2.47a.75.75 0 0 1 0 1.06L4.907 14.153.47 9.716a.75.75 0 0 1 1.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 0 1 1.06 0z" />
                                        </svg>
                                    </button>
                                </li>
                                <li role="presentation">
                                    <button class="menu-item" role="menuitemradio"
                                        :aria-checked="sortBy === SORT_TYPES.ALPHABETICAL" @click="setSortBy(SORT_TYPES.ALPHABETICAL)">
                                        <span class="menu-text">{{ SORT_LABELS[SORT_TYPES.ALPHABETICAL] }}</span>
                                        <svg v-if="sortBy === SORT_TYPES.ALPHABETICAL" viewBox="0 0 16 16" aria-hidden="true">
                                            <path
                                                d="M15.53 2.47a.75.75 0 0 1 0 1.06L4.907 14.153.47 9.716a.75.75 0 0 1 1.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 0 1 1.06 0z" />
                                        </svg>
                                    </button>
                                </li>
                                <li role="presentation">
                                    <button class="menu-item" role="menuitemradio" :aria-checked="sortBy === SORT_TYPES.CREATOR"
                                        @click="setSortBy(SORT_TYPES.CREATOR)">
                                        <span class="menu-text">{{ SORT_LABELS[SORT_TYPES.CREATOR] }}</span>
                                        <svg v-if="sortBy === SORT_TYPES.CREATOR" viewBox="0 0 16 16" aria-hidden="true">
                                            <path
                                                d="M15.53 2.47a.75.75 0 0 1 0 1.06L4.907 14.153.47 9.716a.75.75 0 0 1 1.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 0 1 1.06 0z" />
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-popover>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { userSongList } from '@/hooks/useSongs'
import { SORT_TYPES, SORT_LABELS } from '@/constants/sort'
const { searchText, setSearchText, sortBy, setSortBy } = userSongList()

const isSearchExpanded = ref(false)
const searchInput = ref(null)

const expandSearch = async () => {
    isSearchExpanded.value = true
    await nextTick()
    searchInput.value?.focus()
}

const handleSearchBlur = () => {
    if (!searchText.value) {
        isSearchExpanded.value = false
    }
}
</script>

<style lang="less" scoped>
.sidebar-toolbar {
    padding: 8px 16px;

    .toolbar-content {
        display: flex;
        align-items: center;
        gap: 8px;

        .search-wrapper {
            position: relative;
            min-width: 32px;
            height: 32px;
            transition: all 0.2s ease;

            &.expanded {
                flex: 1;

                .search-container {
                    background: var(--color-background-light);
                    border-radius: 4px;

                    .search-button {
                        background: transparent;
                    }

                    .search-input-wrapper {
                        width: calc(100% - 32px);
                        opacity: 1;
                    }
                }
            }

            .search-container {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                transition: all 0.2s ease;

                .search-button {
                    flex-shrink: 0;
                    width: 32px;
                    height: 32px;
                    border: none;
                    padding: 8px;
                    cursor: pointer;
                    color: var(--color-text-secondary);
                    border-radius: 4px;
                    transition: all 0.2s ease;
                    background: var(--color-background-light);

                    &:hover {
                        color: var(--color-text);
                    }

                    svg {
                        width: 16px;
                        height: 16px;
                        fill: currentColor;
                    }
                }

                .search-input-wrapper {
                    width: 0;
                    opacity: 0;
                    transition: all 0.2s ease;
                    overflow: hidden;

                    .search-input {
                        width: 100%;
                        height: 32px;
                        padding: 6px 12px;
                        border: none;
                        background: transparent;
                        color: var(--color-text);
                        font-size: 0.875rem;

                        &::placeholder {
                            color: var(--color-text-secondary);
                        }

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }

        .sort-wrapper {
            margin-left: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .sort-label {
                font-size: 14px;
                color: var(--color-text-secondary);
            }

            .sort-button {
                background: transparent;
                border: none;
                padding: 4px;
                cursor: pointer;
                color: var(--color-text-secondary);

                &:hover {
                    color: var(--color-text);
                }

                .sort-icon {
                    display: flex;
                    align-items: center;

                    svg {
                        width: 16px;
                        height: 16px;
                        fill: currentColor;
                    }
                }
            }
        }
    }
}

.menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu-section {
    &:not(:last-child) {
        border-bottom: 1px solid var(--color-border);
    }

    .section-title {
        padding: 8px 12px;
        color: var(--color-text-secondary);
        font-size: 12px;
        font-weight: 700;
        font-family: 'Noto Sans SC', sans-serif;
    }
}

.menu-item {
    width: 100%;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
    background: transparent;
    color: var(--color-text);
    cursor: pointer;
    text-align: left;

    &:hover {
        background: var(--color-background-hover);
    }

    &[aria-checked="true"] {
        color: var(--color-primary);
        
        .menu-text {
            color: var(--color-primary);
        }
        
        svg {
            fill: var(--color-primary);
        }
    }

    .menu-text {
        font-size: 14px;
        font-weight: normal;
    }

    svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
    }
}

.view-option {
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
    }
}
</style>

<style>
.el-popper{
	font-family: 'Noto Sans SC', sans-serif;
}
.el-popper.sort-popover {
    background-color: #282828 !important;
    border: none;
    border-radius: 4px;
    padding: 4px 0;
    color: var(--color-text);

    .el-popper__arrow::before {
        background: #282828 !important;
        border-color: var(--color-border) !important;
    }
}
</style>