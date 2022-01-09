<template>
  <div
    class="flex-wrap flex flex-grow p-8"
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
      <a-card-meta :title="book.name" :description="book.author"> </a-card-meta>
      <a-rate v-model:value="book.rate" :tooltips="desc" allow-half disabled />
      <a-button :href="book.download" type="link" shape="round" size="small"
        >download
      </a-button>
    </a-card>
    <a-button
      style="position:fixed; right: 30px; bottom: 10px;"
      class="right-4 bottom-2.5 fixed"
      type="primary"
      shape="round"
      @click="reTest()"
      >Перепройти тест</a-button
    >
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  mounted() {
    this.axios
      .get("https://musaev.online:5000/favbooks", {
        params: {
          testresult: Cookies.get("result"),
        },
      })
      .then((res) => {
        this.books = res.data;
      });
  },
  data() {
    return {
      books: [],
      desc: [],
    };
  },
  methods: {
    reTest() {
      Cookies.remove("result");
      this.$emit("retest");
    },
  },
  components: {},
};
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
.ant-card-meta-description {
  text-align: center;
}
</style>
