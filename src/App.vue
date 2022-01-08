<template>
  <IonApp>
    <IonSplitPane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            
  
            <ion-menu-toggle auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
  
        </ion-content>
      </ion-menu>
      <ion-menu
          menu-id="filters"
          content-id="main-content"
          side="end"
          style="
        padding: 10px
        width: 200px;
        background: white;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      "
        >
          <ion-content content-id="content">
            <h4><b>Автор:</b></h4>
            <a-select
              style="align-self: flex-start; width: 200px"
              v-model="filters.author"
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
              v-model="filters.genre"
            >
              <a-select-option :value="0"> Все жанры </a-select-option>
              <a-select-option
                :value="genre"
                v-for="genre in genres"
                :key="genre"
              >
                {{ genre }}
              </a-select-option>
            </a-select>

            <h4><b>Возраст:</b></h4>
            <a-select
              style="align-self: flex-start; width: 200px"
              v-model="filters.age"
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
              v-model="filters.rating"
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
            <a-button type="primary" :style="kek" @click="filter"
              >Найти</a-button
            >
          </ion-content>
        </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </IonSplitPane>
  </IonApp>
</template>

<script lang="ts">
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { archiveOutline, archiveSharp, bookmarkOutline, bookmarkSharp, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';

export default defineComponent({
  name: 'App',
  components: {
    IonApp, 
    IonContent, 
    IonIcon, 
    IonItem, 
    IonLabel, 
    IonList,  
    IonMenu, 
    IonMenuToggle,  
    IonRouterOutlet, 
    IonSplitPane,
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
  setup() {
    const selectedIndex = ref(0);
    const appPages = [
      {
        title: 'Books',
        url: '/books',
        iosIcon: mailOutline,
        mdIcon: bookmarkOutline
      },
      {
        title: 'Favorites',
        url: '/favorite',
        iosIcon: heartOutline,
        mdIcon: heartSharp
      }
    ];
    const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
    
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      selectedIndex.value = appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    
    const route = useRoute();
    
    return { 
      selectedIndex,
      appPages, 
      labels,
      archiveOutline, 
      archiveSharp, 
      bookmarkOutline, 
      bookmarkSharp, 
      heartOutline, 
      heartSharp, 
      mailOutline, 
      mailSharp, 
      paperPlaneOutline, 
      paperPlaneSharp, 
      trashOutline, 
      trashSharp, 
      warningOutline, 
      warningSharp,
      isSelected: (url: string) => url === route.path ? 'selected' : ''
    }
  }
});
</script>


<style scoped>
ion-menu ion-content {
  --background: #001529;
}
ion-list {
  background-color: #001529;
  border-bottom:0 !important;
}
ion-item {
  --background: #001529;
  --color-activated: #fff;
}
ion-label {
  --color:#fff !important;
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
</style>