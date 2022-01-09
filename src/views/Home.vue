<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons menu="start" slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-menu-button menu="end">
            <ion-icon color="secondary" :icon="funnel" />
          </ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-menu
      ref="filters"
      menu-id="filters"
      content-id="books-content"
      side="end"
      style="
        padding: 10px
        width: 200px;
        background: white;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      "
    >
      <ion-content content-id="content" class="filters">
        <h4><b>Автор:</b></h4>
        <a-select
          style="align-self: flex-start; width: 200px"
          v-model:value="filters.author"
        >
          <a-select-option :value="0"> Все авторы </a-select-option>
          <a-select-option
            :value="author"
            v-for="author in authors"
            :key="author"
          >
            {{ author }}
          </a-select-option>
        </a-select>

        <h4><b>Жанр:</b></h4>
        <a-select
          style="align-self: flex-start; width: 200px"
          v-model:value="filters.genre"
        >
          <a-select-option :value="0"> Все жанры </a-select-option>
          <a-select-option :value="genre" v-for="genre in genres" :key="genre">
            {{ genre }}
          </a-select-option>
        </a-select>

        <h4><b>Возраст:</b></h4>
        <a-select
          style="align-self: flex-start; width: 200px"
          v-model:value="filters.age"
        >
          <a-select-option :value="0"> Все возрасты </a-select-option>
          <a-select-option :value="age" v-for="age in ages" :key="age">
            {{ age }}
          </a-select-option>
        </a-select>
        <!-- Рейтинг -->
        <h4><b>Рейтинг:</b></h4>
        <a-select
          style="align-self: flex-start; width: 200px"
          v-model:value="filters.rating"
        >
          <a-select-option :value="0"> Любой рейтинг </a-select-option>
          <a-select-option
            :value="index"
            v-for="(rating, index) in ratings"
            :key="index"
          >
            {{ rating }}
          </a-select-option>
        </a-select>
        <a-button type="primary" :style="kek" @click="filter">Найти</a-button>
      </ion-content>
    </ion-menu>

    <ion-content :fullscreen="true" id="books-content">
      <div style="display: flex">
        <div
          style="display: flex; flex-grow: 1; padding: 30px; flex-wrap: wrap;flex-direction: column; align-items: center;"
        >
          <a-card
            hoverable
            style="
              width: 200px;
              margin-left: 20px;
              margin-right: 20px;
            "
            v-for="book in books"
            :key="book.name"
          >
            <img slot="cover" alt="example" :src="book.img" />
            <a-card-meta :title="book.name" :description="book.author">
            </a-card-meta>
            <a-rate
              v-model:value="book.rate"
              :tooltips="desc"
              allow-half
              disabled
            />
            <a-button
              :href="book.download"
              type="link"
              shape="round"
              size="small"
              >download
            </a-button>
          </a-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script>
import { defineComponent } from "vue";
import { funnel } from "ionicons/icons";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    return {
      funnel,
    };
  },
  mounted() {
    this.axios.get("https://musaev.online:5000/books").then((res) => {
      this.books = res.data;
    });
    this.axios.get("https://musaev.online:5000/authors").then((res) => {
      this.authors = res.data;
    });
    this.axios.get("https://musaev.online:5000/genres").then((res) => {
      this.genres = res.data;
    });
    this.axios.get("https://musaev.online:5000/ages").then((res) => {
      this.ages = res.data;
    });
  },
  methods: {
    filter() {
      this.axios
        .get("https://musaev.online:5000/books", {
          params: { filters: this.filters },
        })
        .then((res) => {
          this.books = res.data;
          console.log(this.books);
        });
        this.$refs.filters.close()
    },
  },
  data() {
    return {
      size: "large",
      desc: ["1", "2", "3", "4", "5"],
      books: [],
      authors: [],
      genres: [],
      ages: [],
      ratings: {
        1: "1+",
        2: "2+",
        3: "3+",
        4: "4+",
        5: "5",
      },
      kek: "display:block; margin-top:10px; margin-left:0;",
      filters: {
        author: 0,
        genre: 0,
        age: 0,
        rating: 0,
      },
    };
  },
});
</script>

<style>
.ant-card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
.ant-card-body .ant-btn-link {
  margin-top: -5px;
}
.ant-card-meta-title {
  font: 30px Oswald;
  white-space: normal;
  text-align: center;
  margin-bottom: 0;
}

ion-menu ion-content {
  --background: #001529;
}
ion-list {
  background-color: #001529;
  border-bottom: 0 !important;
}
ion-item {
  --background: #001529;
  --color-activated: #fff;
}
ion-label {
  --color: #fff !important;
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
.filters h4 {
  color: white;
}
</style>
