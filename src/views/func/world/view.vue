<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'
import * as db from './datas'

onMounted(() => {
    datas.value = [...db.list]
})

const datas: any = ref([])
</script>

<template>
    <div class="contents">
        <div class="list-books">
            <div class="book-item" v-for="item in datas">
                <div class="item-no" v-if="item.no">{{ item.no }}</div>
                <div class="item-poster">
                    <img :src="`/docs/books/${item.img}`" alt="" srcset="">
                </div>
                <div class="item-infos">
                    <div class="item-status">
                        <div class="item-icon item-done" v-if="item.status == 'done'">
                            <i class="fa-solid fa-check"></i>
                        </div>
                        <div class="item-icon item-buy" v-if="item.status == 'buy'">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </div>
                    </div>
                    <div class="item-info">
                        <div class="item-titles">{{ item.title }}</div>
                        <div class="item-author">{{ item.author }}</div>
                    </div>
                    <div class="item-tags">
                        <span class="item-tag" v-for="tag in item.tags">{{ tag }}</span>
                    </div>
                    <div class="item-rating">
                        <a-rate :value="item.rate / 2" allow-half />
                        <div class="item-rate">{{ item.rate }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.list-books {
    display: flex;
    flex-wrap: wrap;
    row-gap: 20px;
    column-gap: 20px;

    .book-item {
        position: relative;
        width: 210px;
        height: 300px;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;

        .item-no {
            position: absolute;
            top: 5px;
            left: 5px;
            z-index: 1;
            width: 30px;
            height: 30px;
            color: #fff;
            text-align: center;
            line-height: 30px;
            font-weight: 700;
            background: #0000007d;
            border-radius: 50%;
        }

        .item-poster {
            position: relative;
            width: 210px;
            height: 300px;
            overflow: hidden;

            img {
                object-fit: cover;
            }
        }

        .item-infos {
            position: absolute;
            bottom: -75px;
            bottom: 0;
            width: 100%;
            padding: 10px 20px;
            background: #ffffff9d;
            display: flex;
            flex-direction: column;
            row-gap: 8px;
            transition: 0.6s;
        }

        &:hover {
            .item-infos {
                bottom: 0;
            }
        }

        .item-status {
            position: absolute;
            right: 10px;

            .item-icon {
                width: 25px;
                height: 25px;
                color: #fff;
                text-align: center;
                line-height: 25px;
                border-radius: 8px;
                background: #c4cecf;

                &.item-done {
                    background: #008ecf;
                }

                &.item-buy {
                    background: #f77839;
                }
            }
        }

        .item-tags {
            display: flex;
            flex-wrap: wrap;
            row-gap: 5px;
            column-gap: 8px;

            .item-tag {
                padding: 5px;
                color: #fff;
                border-radius: 5px;
                background: #008ecf;
            }
        }

        .item-titles {
            font-size: 21px;
            font-weight: 700;
        }

        .item-rating {
            display: flex;
            align-items: center;
        }
    }
}
</style>
