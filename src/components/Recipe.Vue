<template>
  <div>
    <!-- Recipe Index -->    
    <div id="original">
      <h2>{{ cocktail.cocktail_name }}</h2>
      <h4>Ingredients</h4>
      <div class="pre-formatted">{{ cocktail.ingredient }}</div>
      </br>
      <h4>Directions</h4>
      <div class="pre-formatted">{{ cocktail.direction }}</div>
      </br>
      <a v-bind:href="cocktail.recipe_link" target="-blank">Link to Recipe</a>
    </div>
    </br>
    </br>

    <!-- Edit Recipe -->
    <div>
      <transition name="modal">
        <div v-if="isEditModalOpen">
          <div class="overlay" v-on:click.self="isEditModalOpen = false;">
            <div class="modal">
              <p><input type="text" v-model="editCocktailParams.cocktail_name" placeholder="Name"></p>
              <p><textarea v-model="editCocktailParams.ingredient" placeholder="Ingredients"></textarea></p>
              <p><textarea type="text" v-model="editCocktailParams.direction" placeholder="Directions"></textarea></p>
              <p><input type="text" v-model="editCocktailParams.recipe_link" placeholder="Link to Recipe"></p>
              <button v-on:click="updateCocktail()">Save changes</button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Delete & Edit Buttons -->
      <div id="container">
        <button v-on:click="destroyCocktail()">Delete Recipe</button> 
        &nbsp;&nbsp;&nbsp;
        <button v-on:click="editModalOpen(cocktail)">
          {{ isEditModalOpen ? "Close" : "Edit Recipe" }}
        </button>
      </div>

    </div>
    </br>
    <hr style="width:60%">
    </br>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    emits: ['removeCocktail', 'editRecipe'],
    props: {cocktail:{type: Object, required: true}},

    data: function () {
      return {
        editCocktailParams: {},
        isEditModalOpen: false,
      };
    },

    methods: {     
      destroyCocktail: function() {
        axios.delete(`/cocktails/${this.cocktail.id}`).then((response) => {
          console.log(this.cocktail.id);
          this.$emit('removeCocktail', this.cocktail.id);        
        });
      },
      updateCocktail: function() {
        console.log("updating Cocktail");
        axios.patch(`/cocktails/${this.editCocktailParams.id}`, this.editCocktailParams).then(response => {
          console.log(response.data);
          this.$emit('editRecipe', response.data);
          this.isEditModalOpen = !this.isEditModalOpen;
        });
      },
      editModalOpen: function (cocktail) {
        console.log(cocktail);
        this.editCocktailParams = cocktail
        this.isEditModalOpen = !this.isEditModalOpen;
      },        
    },
  }

</script>
