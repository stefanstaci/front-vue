<template>
  <div class="container">
    <div>
      <h2>{{products.title}}</h2>
      <h3>description: {{products.description}}</h3>
      <h3>price: {{products.price}} $</h3>
    </div>
    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th></th>
        <th>Comments</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="comment in products.comment" :key="comment.id">
        <td>{{ comment.content }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="comment-add">
    <h2>Add comment</h2>
    <input type="text" v-model="content"/> <br/>

    <button @click="addComment">add</button>
  </div>
</template>

<script>
import AXIOS from "@/service/AxiosService";
// import router from "@/router";
// import { ref} from 'vue';
// import {useRoute} from "vue-router";

// const route = useRoute();
// const product = ref({});


export default {
  name: "AboutView",
  props: ["id"],
  data() {
    return {
      products: [],
      comments: [],
      content: '',
    }
  },

  async mounted() {
     this.products = await AXIOS.get("/products/" + this.$route.params.id)
        .then(response => response.data)
    console.log(this.products);

  },
  methods: {
    async addComment() {
      return await AXIOS.post(
          '/comment/new',
          {
            content: this.content,
            productId: this.products.id
          }, {
            headers: {"Content-Type": "application/json"}
          })
          .then(response => response.data);
    },
  }
}
</script>

<style scoped>

</style>