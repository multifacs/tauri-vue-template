<template>
  <div class="card" style="width: 18rem">
    <!-- Use require() for relative image paths in v-bind -->
    <img :src="card.avatar" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ card.first_name + " " + card.last_name }}</h5>
      <p class="card-text">
        {{ card.email }}
      </p>
      <Modal :card="card" />
    </div>
  </div>
</template>

<script>
import Modal from "./Modal.vue"
export default {
  name: "CompanyCard",
  components: {
    Modal
  },
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  setup() { },
};
</script>

<style>

</style>