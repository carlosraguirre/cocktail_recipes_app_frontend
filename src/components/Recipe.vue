<template>
  <div class="boxes">
    <div class="box">
      <!-- Recipe Index -->
      <div id="original">
        <h2>{{ cocktail.cocktail_name }} {{ isFavorite ? '(Favorite)' : '' }}</h2>
        <h4>Ingredients</h4>
        <div class="pre-formatted">{{ cocktail.ingredient }}</div>
        </br>
        <h4>Directions</h4>
        <div class="pre-formatted">{{ cocktail.direction }}</div>
        </br>
        <a v-bind:href="cocktail.recipe_link" target="_blank">Link to Cocktail</a>
        </br>
        <h4>Favorite Test</h4>
        <div class="pre-formatted">{{ cocktail.favorite }}</div>
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
                <!-- <p><input type="text" v-model="editCocktailParams.favorite" placeholder="Favorite?"></p> -->
                <button id="edit-button" v-on:click="updateCocktail()">Save changes</button>
              </div>
            </div>
          </div>
        </transition>

        <!-- Favorite, Delete & Edit Buttons -->
        <div v-if="isLoggedIn()">
          <div id="button-container">
            <button id="favorite-button" v-on:click="toggleFavorite">
              {{ favorited? "Remove Favorite" : "Choose Favorite"  }}
            </button>            
          </div>
        </div>
        <div v-if="isLoggedIn()">
          <div id="button-container">
            <button id="delete-button" v-on:click="destroyCocktail()">Delete</button> 
            &nbsp;&nbsp;&nbsp;
            <button id="edit-button" v-on:click="editModalOpen(cocktail)">
              {{ isEditModalOpen ? "Close" : "Edit" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    emits: ['removeCocktail', 'editRecipe', 'toggle-favorite'],
    props: {
      cocktail: {
        type: Object,
        required: true
      },
      isFavorite: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    data: function () {
      return {
        editCocktailParams: {},
        isEditModalOpen: false,
        favorited: false,
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
      isLoggedIn: function() {
        if (localStorage.getItem("jwt")) {
          return true;
        } else {
          return false;
        }
      },
      toggleFavorite() {
        this.$emit('toggle-favorite', this.cocktail.id);
        this.favorited = true;
      },
    },
  }

</script>
<style>
.box {
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  min-height: 100%;
  width: 500px;
  margin: 4px auto;
  background: white;
  border-radius: 30px;
  text-align: center;
  padding: 1rem;
}
.boxes {
  display: inline-grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));  
  padding: 15px;
  row-gap: 10px;
  column-gap: 10px;
}
@media only screen and (max-width: 725px) {
  .box {
    width: 100%;
    font-size: 12px;
  }
  #button-container {
    display: inline-block;
  }
}
#button-container {
  text-align: center;
}
#favorite-button {
  font-family: "Roboto Mono", monospace;
  background-color: #078bbf;
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  border-radius: 10px;
  font-weight: bold;
}
@media only screen and (max-width: 725px) {
  #favorite-button {
    font-size: 12px;
  }
}
#favorite-button:hover {
  background-color: #04AA6D;
  color: white;
  font-weight: bold;
}
#delete-button {
  font-family: "Roboto Mono", monospace;
  background-color: #4F7942;
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
@media only screen and (max-width: 725px) {
  #delete-button {
    font-size: 12px;
  }
}
#delete-button:hover {
  background-color: #e02c0c;
  color: white;
  font-weight: bold;
}
#edit-button {
  font-family: "Roboto Mono", monospace;
  background-color: #4F7942;
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
@media only screen and (max-width: 725px) {
  #edit-button {
    font-size: 12px;
  }
}
#edit-button:hover {
  background-color:#04AA6D;
  color: white;
  font-weight: bold;
}
</style>
