<template>
    <div class="playlist-row" role="group">
        <div class="side-area">
            <div class="cover-wrapper">
                <div class="cover-icon" :aria-label="playlist.name">
                    <img v-if="playlist.coverUrl" :src="playlist.coverUrl" :alt="playlist.name" />
                    <svg v-else viewBox="0 0 24 24" class="playlist-icon">
                        <path
                            d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z" />
                    </svg>
                </div>
                <div class="play-button-wrapper">
                    <button class="play-button" @click.stop="$emit('play', playlist)" :aria-label="`播放${playlist.name}`">
                        <span class="icon-wrapper">
                            <svg viewBox="0 0 24 24">
                                <path
                                    d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <div class="content-area">
            <div class="content-wrapper">
                <p class="title" dir="auto">
                    <span class="title-text">{{ playlist.name }}</span>
                </p>
                <div class="subtitle-wrapper">
                    <p class="subtitle" dir="auto">
                        <span class="subtitle-text">
                            <span>歌单</span>
                            <span v-if="playlist.creator"> • {{ playlist.creator }}</span>
                            <span v-if="playlist.songCount"> • {{ playlist.songCount }}首歌</span>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

defineProps({
    playlist: {
        type: Object,
        required: true,
        validator: (playlist) => {
            return playlist.id && playlist.name;
        }
    }
})

defineEmits(['play'])
</script>

<style lang="less" scoped>
.playlist-row {
    display: flex;
    padding: 8px 16px;
    gap: 16px;
    cursor: pointer;

    .side-area {
        .cover-wrapper {
            width: 48px;
            height: 48px;
            position: relative;

            .cover-icon {
                width: 100%;
                height: 100%;
                background: var(--color-background-light);
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .playlist-icon {
                    width: 24px;
                    height: 24px;
                    fill: currentColor;
                }
            }

            .play-button-wrapper {
                //opacity: 0;
                position: absolute;
                right: 10px;
                bottom: 10px;

                .play-button {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: var(--color-primary);
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: opacity 0.2s ease;
                    box-shadow: 0 8px 8px rgba(0,0,0,.3);
                    opacity: 0;
                    &:hover {
                        transform: scale(1.04);
                        opacity: 1;
                    }

                    .icon-wrapper {
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        svg {
                            width: 18px;
                            height: 18px;
                            fill: black;
                        }
                    }
                }
            }

            //&:hover .play-button-wrapper {
            //    opacity: 1;
            //}
        }
    }

    .content-area {
        flex: 1;
        display: flex;
        min-width: 0;

        .content-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 4px;

            .title {
                margin: 0;
                color: var(--color-text);
                font-size: 1rem;
                font-weight: 400;

                .title-text {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-align: start;
                    display: block;
                }
            }

            .subtitle-wrapper {
                .subtitle {
                    margin: 0;
                    color: var(--color-text-secondary);
                    font-size: 0.875rem;

                    .subtitle-text {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: block;
                        text-align: left;
                    }
                }
            }
        }
    }
}
</style> 