<template>
  <div class="my-content">
    <section class="my-concept">
      <div class="container pt-15 pb-15">
        <h1 class="my-page__title">from 8とは？</h1>
        <p class="my-page__desc">
          8号車の、8号車による、8号車のためだけのサイト
        </p>
      </div>
    </section>
    <section class="my-section my-howto">
      <div class="container pt-10 pb-10">
        <h2 class="my-section__title">How to use</h2>
        <v-row class="my-howto__list">
          <v-col cols="12" sm="4" class="my-howto__item">
            <v-card class="pa-5 rounded-lg" outlined>
              <p class="my-howto__name">ログイン</p>
              <figure class="my-howto__thumb">
                <img src="~assets/images/login.svg" alt="" />
              </figure>
              <p class="my-howto__desc">
                Twitterアカウントでログインすることができます。
              </p>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4" class="my-howto__item">
            <v-card class="pa-5 rounded-lg" outlined>
              <p class="my-howto__name">投稿</p>
              <figure class="my-howto__thumb">
                <img src="~assets/images/post.svg" alt="" />
              </figure>
              <p class="my-howto__desc">
                ページ上部にあるペンマークのボタンから投稿することができます。投稿内容を書き込んで、Colorを選択して投稿しましょう！
              </p>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4" class="my-howto__item">
            <v-card class="pa-5 rounded-lg" outlined>
              <p class="my-howto__name">検索</p>
              <figure class="my-howto__thumb">
                <img src="~assets/images/search.svg" alt="" />
              </figure>
              <p class="my-howto__desc">
                投稿内容から検索することができます。<br />検索ページの各Colorボタンから、Colorごとの投稿一覧を見ることができます。
              </p>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </section>
    <section class="my-section my-color">
      <div class="container pt-10 pb-10">
        <h2 class="my-section__title">各Colorのイメージ</h2>
        <ul class="my-color__list pl-4 pr-4">
          <li class="my-color__item d-flex align-start mb-3">
            <v-icon class="mr-3 mb-0" color="rgba(0, 0, 0, 0.8)"
              >fas fa-train</v-icon
            >
            <p class="my-color__desc">
              デフォルトのColor。<br />箱推しや、Colorをまたいだ投稿
            </p>
          </li>
          <li class="my-color__item d-flex align-start mb-5">
            <v-icon class="mr-3 mb-0" color="rgba(66, 165, 245, 0.8)"
              >fas fa-train</v-icon
            >
            <p class="my-color__desc">2号車に関する投稿</p>
          </li>
          <li class="my-color__item d-flex align-start mb-5">
            <v-icon class="mr-3 mb-0" color="rgba(171, 71, 188, 0.8)"
              >fas fa-train</v-icon
            >
            <p class="my-color__desc">3号車に関する投稿</p>
          </li>
          <li class="my-color__item d-flex align-start mb-5">
            <v-icon class="mr-3 mb-0" color="rgba(102, 187, 106, 0.8)"
              >fas fa-train</v-icon
            >
            <p class="my-color__desc">4号車に関する投稿</p>
          </li>
          <li class="my-color__item d-flex align-start mb-5">
            <v-icon class="mr-3 mb-0" color="rgba(239, 83, 80, 0.8)"
              >fas fa-train</v-icon
            >
            <p class="my-color__desc">5号車に関する投稿</p>
          </li>
          <li class="my-color__item d-flex align-start mb-5">
            <v-icon class="mr-3 mb-0" color="rgba(255, 202, 40, 0.8)"
              >fas fa-train</v-icon
            >
            <p class="my-color__desc">6号車に関する投稿</p>
          </li>
          <li class="my-color__item d-flex align-start mb-5">
            <v-icon class="mr-3 mb-0" color="rgba(189, 189, 189, 0.8)"
              >fas fa-train</v-icon
            >
            <p class="my-color__desc">7号車に関する投稿</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import headMeta from '~/mixins/headMeta.js'
export default {
  mixins: [headMeta],
  data() {
    return {
      meta: {
        title: 'from 8とは？ | from 8号車',
        description: 'from 8号車の、Aboutページです。',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
img {
  max-width: 100%;
}
.my-concept,
.my-color {
  background-color: #fff;
}
.my-page {
  &__title {
    position: relative;
    padding-bottom: 12px;
    margin-bottom: 30px;
    font-size: 32px;
    text-align: center;
    &::after {
      position: absolute;
      bottom: 0;
      left: calc(50% - 30px);
      content: '';
      width: 60px;
      height: 4px;
      background-image: linear-gradient(
        -225deg,
        #2cd8d5 0%,
        #c5c1ff 56%,
        #ffbac3 100%
      );
    }
  }
  &__desc {
    font-size: 20px;
    text-align: center;
  }
}
.my-section {
  &__title {
    margin-bottom: 20px;
    font-size: 28px;
    text-align: center;
  }
}
.my-howto {
  &__thumb {
    margin-bottom: 15px;
    text-align: center;
    img {
      max-height: 100px;
    }
  }
  &__name {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
  &__desc {
    margin: 0;
  }
}
.my-color {
  &__list {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
}
</style>
