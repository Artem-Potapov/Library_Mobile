<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-menu-button menu="end">
            <ion-icon name="funnel-outline"></ion-icon>
          </ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div style="display: flex">
        <div
          style="display: flex; flex-grow: 1; padding: 30px; flex-wrap: wrap"
        >
          <a-card
            hoverable
            style="
              width: 200px;
              margin-left: 20px;
              margin-right: 20px;
              margin-bottom: 30px;
              height: 450px;
            "
            v-for="book in books"
            :key="book.name"
          >
            <img slot="cover" alt="example" :src="book.img" />
            <a-card-meta :title="book.name">
              <template slot="description">{{ book.author }}</template>
            </a-card-meta>
            <a-rate v-model="book.rate" :tooltips="desc" allow-half disabled />
            <a-button
              :href="book.download"
              type="link"
              shape="round"
              icon="download"
              size="small"
              >download</a-button
            >
          </a-card>
        </div>
        
      </div>
    </ion-content>
  </ion-page>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Home",
  components: {
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
        });
      console.log(this.filters);
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
