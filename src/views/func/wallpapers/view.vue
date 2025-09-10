<script lang="ts" setup>
// name
defineOptions({
    name: 'custom-name'
})

const datas = [
    { img: '10-13-6k.jpg' },
    { img: '20.jpg' },
    { img: 'beautiful_places_scenic_view-wallpaper-5120x2880.jpg' },
    { img: 'boy.png' },
    { img: 'desktop.png' },
    { img: 'desktop02.jpg' },
    { img: 'desktop02.png' },
    { img: 'desktop03.jpg' },
    { img: 'desktop03.png' },
    { img: 'desktop08.jpg' },
    { img: 'dgh (2)_1265248115_.jpeg' },
    { img: 'Ghibli Coffee Shop 4K.jpeg' },
    { img: 'girl.png' },
    { img: 'mac01.jpg' },
    { img: 'mac02.jpg' },
    { img: 'mac03.jpg' },
    { img: 'mac04.jpg' },
    { img: 'mac05.jpg' },
    { img: 'mac06.jpg' },
    { img: 'mac07.jpg' },
    { img: 'mac08.jpg' },
    { img: 'mac09.jpg' },
    { img: 'mac10.jpg' },
    { img: 'mac11.jpg' },
    { img: 'mac12.jpg' },
    { img: 'window.jpg' },
    { img: 'window02.jpg' },
]
</script>

<template>
    <a-carousel autoplay>
        <div v-for="img in datas">
            <img :src="`/docs/wallpapers/${img.img}`" alt="" srcset="">
        </div>
    </a-carousel>
</template>

<style scoped lang="scss">
:deep(.slick-slide) {
    text-align: center;
    height: calc(100vh - 66px);
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
}
</style>
