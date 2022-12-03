<template>
  <div>
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
    <button v-on:click="isAddModalOpen = !isAddModalOpen;">
      {{ isAddModalOpen ? "Close" : "Add Cocktail Recipe" }}
    </button>
  </div>
</template>

<script>
  import axios from "axios";

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
.modal {
  width: 500px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 7px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}
.fadeIn-enter {
  opacity: 0;
}
.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}
.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: whitesmoke;
  z-index: 999;
  transition: opacity 0.2s ease;
}
</style>