<template>
  <div class="about">
    <div class="about-content">
      <div>
        <h1>Our partners</h1>
      </div>

      <div class="container">
        <div class="row row-cols-auto d-flex justify-content-center my-3">
          <transition-group name="scroll" appear @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div v-for="(card, index) of cardList" :key="card.id" class="col d-flex justify-content-center my-3"
              :data-index="index">
              <CompanyCard :card="card" />
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, onMounted } from "vue";
import gsap from "gsap";
import axios from 'axios';

const requestURL = "https://reqres.in/api/users?page=1";

const sendRequest = (method, url) => {
  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return response.json().then((error) => {
      const e = new Error("Something went wrong");
      e.data = error;
      throw e;
    });
  });
};

// const sendRequest = (method, url) => {

// return axios.get(url)
//   .then(function (response) {
//     return response.json();
//   })
//   .catch(function (error) {
//     const e = new Error("Something went wrong");
//       e.data = error;
//       throw e;
//   })
// };

import CompanyCard from '../components/about/CompanyCard.vue'

export default {
  name: "App",
  components: {
    CompanyCard
  },
  setup() {
    const store = inject("store");
    const foo = ref("ass");
    const searchValue = ref("");
    const showElem = ref(false);
    const cardList = ref(store.state.companies);

    //recording
    store.commit("addRecord", {
      event: "About.vue created()",
      time: store.getters.getTime,
    });

    //changing styles in a transition using js hooks instead of css
    const beforeEnter = (el) => {
      el.style.opacity = 0;
      el.style.transform = "translateY(100px)"; //this shit breaks modal, gotta remove it
    };

    const enter = (el, done) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        onComplete: done,
        delay: 0.2 * el.dataset.index,
      });
      console.log("bruh123s"); //for some reason transform = null doesn't apply after gsap in @enter
    };

    const afterEnter = (el) => {
      console.log("works");
      el.style.transform = null; //I guess this works
    };

    onMounted(() => {
      const about = document.getElementsByClassName("about");
      console.log(about[0].classList);
      about[0].classList.add(store.state.about);

      cardList.value = [];
      sendRequest("GET", requestURL).then((data) => {
        console.log(data.data);
        cardList.value = data.data;
      });
    });

    return {
      foo,
      searchValue,
      showElem,
      cardList,
      beforeEnter,
      enter,
      afterEnter,
    };
  },
};
</script>

<style scoped>
.container {
  width: 65%;
}

.about {
  background-image: linear-gradient(60deg, #abecd6 0%, #fbed96 100%);
}

.about-content {
  padding: 30px;
}

.bg1 {
  background-image: linear-gradient(60deg, #abecd6 0%, #fbed96 100%);
}

.bg2 {
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
}

.bg3 {
  background-image: linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);
}

.partners {
  margin: 20px auto;
}

@media screen and (max-width: 900px) {
  .about-content {
    padding: 30px 0;
  }
}
</style>