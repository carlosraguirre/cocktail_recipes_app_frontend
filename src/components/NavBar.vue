<template>
  <div>
    <b-navbar style="padding: 20px;" toggleable="lg" type="dark" variant="secondary">
      <b-navbar-brand href="#">Cocktail Rolodex</b-navbar-brand>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ms-auto">
        <b-button v-on:click="isAddModalOpen = !isAddModalOpen;">
          {{ isAddModalOpen ? "Close" : "Add Cocktail Recipe" }}
        </b-button>        
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search Recipes"></b-form-input>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>

    <transition name="modal">
      <div v-if="isAddModalOpen">
        <div class="overlay" v-on:click.self="isAddModalOpen = false;">
          <div class="modal">
            <h1>Add Cocktail</h1>
            <p><input type="text" v-model="newCocktailParams.cocktail_name" placeholder="Name"></p>
            <p><textarea v-model="newCocktailParams.ingredient" placeholder="Ingredients"></textarea></p>
            <p><textarea type="text" v-model="newCocktailParams.direction" placeholder="Directions"></textarea></p>
            <p><input type="text" v-model="newCocktailParams.recipe_link" placeholder="Link to Recipe"></p>
            <button v-on:click="cocktailCreate()">Add recipe</button>
          </div>
        </div>
      </div>
    </transition>
    <!-- <button v-on:click="isAddModalOpen = !isAddModalOpen;">
      {{ isAddModalOpen ? "Close" : "Add Cocktail Recipe" }}
    </button> -->
  </div>
</template>

<script>
  import axios from "axios";
  import BNavbar from 'bootstrap-vue';

  export default {
    data: function () {
      return {
        newCocktailParams: {},
        isAddModalOpen: false,
      };
    },
    methods: {
      cocktailCreate: function () {
        // console.log("create cocktail");
        var cocktailParams = {
          cocktail_name: this.newCocktailParams.cocktail_name,
          ingredient: this.newCocktailParams.ingredient,
          direction: this.newCocktailParams.direction,
          recipe_link: this.newCocktailParams.recipe_link,
        };
        axios.post("/cocktails", cocktailParams).then((response) => {
          // console.log(response.data);
          this.$emit('addCocktail', response.data);
          this.newCocktailParams = {};
        });
        this.isAddModalOpen=false;
      },
    },
  }
</script>

<style>
</style>