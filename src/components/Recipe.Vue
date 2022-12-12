<template>
  <div class="box">
    <!-- Recipe Index -->
    <div id="original">
      <h2>{{ cocktail.cocktail_name}}</h2>
      <h4>Ingredients</h4>
      <div class="pre-formatted">{{ cocktail.ingredient }}</div>
      </br>
      <h4>Directions</h4>
      <div class="pre-formatted">{{ cocktail.direction }}</div>
      </br>
      <a v-bind:href="cocktail.recipe_link" target="_blank">Link to Recipe</a>
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
              <button id="edit-button" v-on:click="updateCocktail()">Save changes</button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Delete & Edit Buttons -->
      <div id="button-container">
        <button id="delete-button" v-on:click="destroyCocktail()">Delete Recipe</button> 
        &nbsp;&nbsp;&nbsp;
        <button id="edit-button" v-on:click="editModalOpen(cocktail)">
          {{ isEditModalOpen ? "Close" : "Edit Recipe" }}
        </button>
      </div>
    </div>
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
<style>
.box {
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
;
  min-height: 100px;
  width: 25vw;
  margin: 50px auto;
  background: white;
  border-radius: 5px;
  text-align: center;
  padding: 15px;
}
#button-container {
  text-align: center;
}
#delete-button {
  background-color: #04AA6D;
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 10px;
  font-weight: bold;
}
#delete-button:hover {
  background-color: #e04c0c;
  color: black;
  font-weight: bold;
}
#edit-button {
  background-color: #04AA6D;
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 10px;
  font-weight: bold;
}
#edit-button:hover {
  background-color: #078bbf;
  color: black;
  font-weight: bold;
}
</style>