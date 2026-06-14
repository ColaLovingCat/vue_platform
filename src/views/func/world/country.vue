<template>
  <div class="card-country">
    <!-- 背景水印 -->
    <div class="watermark">{{ country.code }}</div>

    <!-- 顶部：编号与区域标签 -->
    <div class="card-header">
      <div class="rank-badge">NO.{{ country.no.toString().padStart(2, '0') }}</div>
      <div class="tags">
        <span class="tag">{{ country.continent }}</span>
        <span class="tag partition">{{ country.partition }}</span>
      </div>
    </div>

    <!-- 主体：国旗与名称 -->
    <div class="card-main">
      <div class="flag-wrapper">
        <img :src="`docs/flags/${country.flag}`" :alt="country.name" class="flag-img" />
      </div>
      <div class="name-info">
        <h2 class="name">{{ country.name }}</h2>
        <p class="full-name">{{ country.fullName }}</p>
        <p class="en-name">{{ country.enName }}</p>
      </div>
    </div>

    <!-- 底部：首都城市信息 -->
    <div class="card-footer">
      <div class="city-label">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        Capital City
      </div>
      <div class="city-value">
        <span class="city-cn">{{ country.city }}</span>
        <span class="city-en">{{ country.enCity }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

// 接收外部传入的 country 属性，如果不传则使用默认值方便您预览
withDefaults(defineProps<{ country?: CountryData }>(), {
  country: () => ({
    no: 1,
    name: '中国',
    fullName: '中华人民共和国',
    enName: "the People's Republic of China",
    flag: 'China.png',
    city: '北京',
    enCity: 'Beijing',
    continent: '亚洲',
    partition: '东亚',
    code: 'CHN',
  })
});
</script>

<style scoped lang="scss">
/* SCSS 变量定义 */
$primary-color: #1f2937;
$secondary-color: #4b5563;
$accent-color: #3b82f6;
$bg-color: #ffffff;
$border-radius: 20px;
$transition-speed: 0.3s;

.card-country {
  position: relative;
  width: 360px;
  background: $bg-color;
  border-radius: $border-radius;
  padding: 24px;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02);
  transition: transform $transition-speed ease, box-shadow $transition-speed ease;
  border: 1px solid rgba(0, 0, 0, 0.04);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

  /* 悬浮交互：微上移 + 阴影扩散 */
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05);

    .flag-img {
      transform: scale(1.05);
    }
  }

  /* ISO Code 水印背景 */
  .watermark {
    position: absolute;
    top: -15px;
    right: -10px;
    font-size: 100px;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.03);
    z-index: 0;
    pointer-events: none;
    user-select: none;
    line-height: 1;
  }

  /* 顶部排版 */
  .card-header {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    .rank-badge {
      font-size: 14px;
      font-weight: 700;
      color: $primary-color;
      background: #f3f4f6;
      padding: 4px 10px;
      border-radius: 8px;
      letter-spacing: 0.5px;
    }

    .tags {
      display: flex;
      gap: 8px;

      .tag {
        font-size: 12px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 20px;
        background: rgba($accent-color, 0.1);
        color: $accent-color;

        &.partition {
          background: rgba(#10b981, 0.1);
          color: #10b981;
        }
      }
    }
  }

  /* 主体国旗与名称 */
  .card-main {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 28px;

    .flag-wrapper {
      width: 80px;
      // height: 56px;
      border-radius: 8px;
      overflow: hidden;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

      .flag-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        transition: transform $transition-speed ease;
      }
    }

    .name-info {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .name {
        margin: 0;
        font-size: 24px;
        font-weight: 800;
        color: $primary-color;
        line-height: 1.1;
      }

      .full-name {
        margin: 0;
        font-size: 13px;
        color: $secondary-color;
        font-weight: 500;
      }

      .en-name {
        margin: 0;
        font-size: 12px;
        color: #9ca3af;
        line-height: 1.2;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }

  /* 底部城市信息 */
  .card-footer {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    border-top: 1px dashed #e5e7eb;

    .city-label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 600;
      color: #9ca3af;

      svg {
        color: #ef4444;
      }
    }

    .city-value {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;

      .city-cn {
        font-size: 15px;
        font-weight: 700;
        color: $primary-color;
      }

      .city-en {
        font-size: 12px;
        color: $secondary-color;
      }
    }
  }
}
</style>