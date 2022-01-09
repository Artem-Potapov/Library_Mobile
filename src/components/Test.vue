<template>
<div>
    <a-card style="margin: 30px">
      <span slot="title" :class="{ error: iserror && !genres.length }"
        >Какие жанры вам нравятся?</span
      >
      <a-checkbox :disabled="genres[0] == 'all'" :checked="genres.includes(genre)" @change="(e) => genreChange(e, genre)" v-for="genre in allGenres" :key="genre">{{genre}}</a-checkbox>
      <a-checkbox @change="(e) => genreChange(e, 'all')">Я не знаю</a-checkbox>
    </a-card>
    <a-card style="margin: 30px">
      <span slot="title" :class="{ error: iserror && !age }"
        >В какую возраснтую категорию вы входите?</span
      >
      <a-radio-group v-model:value="age">
        <a-radio :value="6"> 6+ </a-radio>
        <a-radio :value="10"> 10+ </a-radio>
        <a-radio :value="12"> 12+ </a-radio>
        <a-radio :value="16"> 16+ </a-radio>
      </a-radio-group>
    </a-card>
    <a-card style="margin: 30px">
      <span slot="title" :class="{ error: iserror && !capacity }"
        >Какой обьем страниц для вас приемлем?</span>
      <a-radio-group v-model:value="capacity">
        <a-radio :value="50"> До 50 </a-radio>
        <a-radio :value="100"> До 100 </a-radio>
        <a-radio :value="200"> До 200 </a-radio>
        <a-radio :value="400"> До 400 </a-radio>
        <a-radio :value="Number.MAX_VALUE"> Мне не важен обьём </a-radio>
      </a-radio-group>
    </a-card>
    <a-card style="margin: 30px">
      <span slot="title" :class="{ error: iserror && !authors.length }">Какие авторы вам больше по душе?</span>
      <a-checkbox
        :disabled="authors[0] == 'all'"
        :checked="authors.includes(author)"
        @change="(e) => authorChange(e, author)"
        v-for="author in allAuthors"
        :key="author">{{ author }}</a-checkbox>
        <a-checkbox @change="(e) => authorChange(e, 'all')"> Мне нравятся все авторы </a-checkbox>
    </a-card> 
    <a-button type="primary" style="margin: 0px 30px" @click="okay"
      >ОК</a-button
    >
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  mounted() {
    this.axios.get("https://musaev.online:5000/authors").then((res) => {
      this.allAuthors = res.data;
    });
    this.axios.get("https://musaev.online:5000/genres").then((res) => {
      this.allGenres = res.data;
    });
  },
  data() {
    return {
      age: null,
      capacity: null,
      genres: [],
      allAuthors: [],
      allGenres: [],
      authors: [],
      iserror: false,
    };
  },

  methods: {
    genreChange(e, genre) {
      if (e.target.checked) {
        if (genre == 'all'){
          this.genres = ['all']
        }
        else {
        this.genres.push(genre);
        }
      } else {
        this.genres = this.genres.filter((i) => genre != i);
      }
    },
    authorChange(e, author) {
      if (e.target.checked) {
        if (author == 'all') {
          this.authors = ['all']
        }
        else {
        this.authors.push(author); 
        }
      } else {
        this.authors = this.authors.filter((i) => author != i);
      }
    },
    okay() {
      if (
        !this.genres.length ||
        !this.age ||
        !this.capacity ||
        !this.authors.length
      ) {
        this.iserror = true;
        return;
      }
      const result = {
        genres: this.genres,
        age: this.age,
        capacity: this.capacity,
        authors: this.authors
      };
      Cookies.set('result', JSON.stringify(result))
      this.$emit('testdone')
    },
  },
};
</script>

<style>
.error {
  color: rgb(255, 0, 0) !important;
}
</style>