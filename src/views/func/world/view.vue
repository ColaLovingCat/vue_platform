<script setup lang="ts">
import { ref, type Ref, onMounted, computed } from 'vue'

import CountryCard from './country.vue'
import * as xlsx from '@/commons/utils/xlsx'

onMounted(async () => {
    const temps: any = await xlsx.readExcel('/docs/datas/world.xlsx');
    const { country } = temps
    datas.value = country
})

interface CountryData {
  no: number;
  name: string;
  fullName: string;
  enName: string;
  flag: string;
  city: string;
  enCity: string;
  continent: string;
  partition: string;
  code: string;
}

const datas: Ref<CountryData[]> = ref([])

// 绑定的筛选状态
const searchQuery = ref('');
const selectedContinent = ref('');
const selectedPartition = ref('');

// 新增：绑定的排序状态
const sortField = ref<keyof CountryData>('no'); // 默认按序号排序
const sortOrder = ref<'asc' | 'desc'>('asc');   // asc: 正序, desc: 倒序

// 动态提取下拉框选项 (去重)
const availableContinents = computed(() => {
    const continents = datas.value.map(c => c.continent);
    return Array.from(new Set(continents));
});

const availablePartitions = computed(() => {
    // 联动逻辑：如果选了某个洲，则只显示该洲的分区
    let filteredForPartition = datas.value;
    if (selectedContinent.value) {
        filteredForPartition = filteredForPartition.filter(c => c.continent === selectedContinent.value);
    }
    const partitions = filteredForPartition.map(c => c.partition);
    return Array.from(new Set(partitions));
});

// 切换排序顺序
const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
};

// 核心过滤与排序计算属性
const filteredDatas = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();

    // 1. 过滤逻辑
    let result = datas.value.filter((country: any) => {
        // 模糊查询匹配
        const matchSearch = !query ||
            country.name.toLowerCase().includes(query) ||
            country.enName.toLowerCase().includes(query) ||
            country.fullName.toLowerCase().includes(query) ||
            country.code.toLowerCase().includes(query);

        // 洲匹配
        const matchContinent = !selectedContinent.value || country.continent === selectedContinent.value;

        // 区域匹配
        const matchPartition = !selectedPartition.value || country.partition === selectedPartition.value;

        return matchSearch && matchContinent && matchPartition;
    });

    // 2. 排序逻辑 (filter返回的是新数组，直接sort不会污染原数据)
    result.sort((a, b) => {
        let valA = a[sortField.value];
        let valB = b[sortField.value];

        // 容错：处理 undefined 或 null
        if (valA === undefined || valA === null) valA = '';
        if (valB === undefined || valB === null) valB = '';

        let comparison = 0;

        // 判断类型进行排序
        if (typeof valA === 'number' && typeof valB === 'number') {
            // 数字类型直接相减（例如序号 no）
            comparison = valA - valB;
        } else {
            // 字符串类型，使用 localeCompare 支持中英文字母和中文拼音排序
            comparison = String(valA).localeCompare(String(valB), 'zh-CN');
        }

        // 根据正倒序返回结果
        return sortOrder.value === 'asc' ? comparison : -comparison;
    });

    return result;
});
</script>

<template>
    <div class="sections">
        <!-- 现代化筛选栏 -->
        <div class="filter-bar">
            <!-- 搜索框 -->
            <div class="search-box">
                <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input v-model="searchQuery" type="text" placeholder="搜索国家中/英文名、全称或简称..." />
            </div>

            <!-- 筛选与排序组 -->
            <div class="filter-group">
                <!-- 所属洲筛选 -->
                <div class="select-wrapper">
                    <select v-model="selectedContinent">
                        <option value="">全部大洲</option>
                        <option v-for="continent in availableContinents" :key="continent" :value="continent">
                            {{ continent }}
                        </option>
                    </select>
                    <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </div>

                <!-- 区域筛选 -->
                <div class="select-wrapper">
                    <select v-model="selectedPartition">
                        <option value="">全部区域</option>
                        <option v-for="partition in availablePartitions" :key="partition" :value="partition">
                            {{ partition }}
                        </option>
                    </select>
                    <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </div>

                <!-- 排序字段选择 -->
                <div class="select-wrapper">
                    <select v-model="sortField">
                        <option value="no">默认序号</option>
                        <option value="name">中文名</option>
                        <option value="enName">英文名</option>
                        <option value="code">国家代号</option>
                    </select>
                    <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </div>

                <!-- 排序正/倒序切换按钮 -->
                <button class="sort-toggle-btn" @click="toggleSortOrder" :title="sortOrder === 'asc' ? '当前正序' : '当前倒序'">
                    <!-- 正序向上箭头，倒序向下箭头 -->
                    <svg v-if="sortOrder === 'asc'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 19V5M5 12l7-7 7 7"/>
                    </svg>
                    <svg v-else class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 5v14M5 12l7 7 7-7"/>
                    </svg>
                </button>
            </div>
        </div>

        <!-- 结果统计 -->
        <div class="results-info">
            共找到 <span>{{ filteredDatas.length }}</span> 个国家
        </div>

        <!-- 卡片列表布局 -->
        <div class="list-country">
            <div v-if="filteredDatas.length === 0" class="empty-state">
                没有匹配的国家数据...
            </div>
            <template v-else>
                <CountryCard v-for="country in filteredDatas" :key="country.no" :country="country" />
            </template>
        </div>
    </div>
</template>

<style scoped lang="scss">
/* 基础变量与卡片页保持一致 */
$primary-color: #1f2937;
$secondary-color: #6b7280;
$accent-color: #3b82f6;
$bg-color: #ffffff;
$border-color: #e5e7eb;
$border-radius: 16px;

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  background: $bg-color;
  padding: 16px;
  border-radius: $border-radius;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;

  .search-box {
    flex: 1;
    min-width: 280px;
    position: relative;
    display: flex;
    align-items: center;

    .search-icon {
      position: absolute;
      left: 14px;
      width: 18px;
      height: 18px;
      color: #9ca3af;
    }

    input {
      width: 100%;
      padding: 12px 16px 12px 40px;
      font-size: 15px;
      border: 1px solid $border-color;
      border-radius: 12px;
      background: #f9fafb;
      color: $primary-color;
      transition: all 0.2s ease;
      outline: none;

      &::placeholder {
        color: #9ca3af;
      }

      &:focus {
        background: #fff;
        border-color: $accent-color;
        box-shadow: 0 0 0 3px rgba($accent-color, 0.1);
      }
    }
  }

  .filter-group {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    
    .select-wrapper {
      position: relative;
      display: flex;
      align-items: center;

      select {
        appearance: none;
        padding: 12px 36px 12px 16px;
        font-size: 14px;
        font-weight: 500;
        border: 1px solid $border-color;
        border-radius: 12px;
        background: #f9fafb;
        color: $primary-color;
        cursor: pointer;
        outline: none;
        transition: all 0.2s ease;

        &:focus {
          background: #fff;
          border-color: $accent-color;
          box-shadow: 0 0 0 3px rgba($accent-color, 0.1);
        }
      }

      .chevron {
        position: absolute;
        right: 12px;
        width: 16px;
        height: 16px;
        color: #9ca3af;
        pointer-events: none;
      }
    }

    /* 正倒序切换按钮样式 */
    .sort-toggle-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 16px;
      background: #f9fafb;
      border: 1px solid $border-color;
      border-radius: 12px;
      color: $secondary-color;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #f3f4f6;
        color: $primary-color;
      }

      &:focus {
        outline: none;
        border-color: $accent-color;
        box-shadow: 0 0 0 3px rgba($accent-color, 0.1);
      }

      .icon {
        width: 18px;
        height: 18px;
      }
    }
  }
}

.results-info {
  margin-bottom: 24px;
  font-size: 14px;
  color: $secondary-color;
  padding-left: 8px;

  span {
    font-weight: 700;
    color: $primary-color;
  }
}

.list-country {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
  
  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px 20px;
    color: #9ca3af;
    font-size: 16px;
    background: #f9fafb;
    border-radius: $border-radius;
    border: 2px dashed $border-color;
  }
}

/* 响应式调整 */
@media (max-width: 640px) {
  .filter-bar {
    flex-direction: column;
    
    .filter-group {
      width: 100%;
      /* 手机上平分空间 */
      .select-wrapper {
        flex: 1;
        min-width: 40%;
        select {
          width: 100%;
        }
      }
      .sort-toggle-btn {
        flex: 1;
        min-width: 40%;
      }
    }
  }
}
</style>