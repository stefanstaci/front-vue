<template>
  <div class="container">
    <h3 class="p-3 text-center">Vue.js - Display a list of items with v-for</h3>
    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th>id</th>
        <th>title</th>
        <th>description</th>
        <th>price</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.id }}</td>
        <td>{{ product.title }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.price }}</td>
        <td>
          <button @click="deleteProduct(product.id)">Delete</button>
        </td>
        <td>
          <button @click="editProduct(product)">Edit</button>
        </td>
        <td>
<!--          <router-link :to="{name: 'test', params: {test_data: product.id}}">details</router-link>-->
<!--          <button @click="$router.push(`/about/` + product.id)">Details</button>-->
            <router-link :to="{name: 'about', params: {id: product.id}}">details</router-link>
        </td>
      </tr>
      </tbody>
    </table>


    <!--    <DataTable :value="products">-->
    <!--      <Column field="title" header="Title"></Column>-->
    <!--      <Column field="description" header="Description"></Column>-->
    <!--      <Column field="price" header="Price"></Column>-->
    <!--    </DataTable>-->

  </div>
  <div class="product-add">
    <h2>Add product</h2>
    <input type="text" v-model="title"/> <br/>
    <input type="text" v-model="description"/> <br/>
    <input type="text" v-model="price"/> <br/>

    <button @click="storeProduct">add</button>
  </div>

  <div class="product-update">
    <h2>Update product</h2>
    <input type="text" v-model="product.title"/> <br/>
    <input type="text" v-model="product.description"/> <br/>
    <input type="text" v-model="product.price"/> <br/>

    <button @click="updateProduct">Update</button>
  </div>
</template>

<script>

import AXIOS from "@/service/AxiosService";

export default {
  name: "TestView",
  props: {},
  data() {
    return {
      products: [],
      product: {},
      title: '',
      description: '',
      price: ''
    }
  },

  async mounted() {
    this.products = await AXIOS.get('/products/all').then(response => response.data)
    console.log(this.products)
  },
  methods: {
    async storeProduct() {
      return AXIOS.post(
          '/products/new',
          {
            title: this.title,
            description: this.description,
            price: this.price
          }, {
            headers: {"Content-Type": "application/json"}
          })
          .then(response => response.data);
    },

    // async updateProduct() {
    //     return await AXIOS.put(
    //         '/products/' + this.product.id,
    //         {
    //           title: this.product.title,
    //           description: this.product.description,
    //           price: this.product.price,
    //         }, {
    //           headers: {"Content-Type": "application/json"}
    //         })
    //         .then(response => response.data);
    // },
    async updateProduct() {
      try {
        const product = await AXIOS.put(
            '/products/' + this.product.id,
            {
              title: this.product.title,
              description: this.product.description,
              price: this.product.price,
            }, {
              headers: {"Content-Type": "application/x-www-form-urlencoded"}
            })
            .then(response => response.data);

        console.log(product.data);
      } catch (e) {
        console.log(e);
      }
    },

    async editProduct(product) {
      this.product.title = product.title;
      this.product.description = product.description;
      this.product.price = product.price;
      this.product.id = product.id;
    },

    async deleteProduct(id) {
      let x = window.confirm("You want to delete the product?");

      if (x) {
        const product = await AXIOS.delete(
            '/products/' + id
        );

        console.log(product);
        alert("product deleted!");
      }
    },
  }
}
</script>

<style scoped>

</style>