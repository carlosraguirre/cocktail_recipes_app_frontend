<template>
  <div class="boxes">
    <div class="box">
      <!-- Recipe Index -->
      <div id="original">
        <br />
        <h5><b>{{ cocktail.cocktail_name }} {{ cocktail.favorite ? '(Favorite)' : '' }}</b></h5>
        <br />
        <br />
        <b>Ingredients</b>
        <div class="pre-formatted">{{ cocktail.ingredient }}</div>
        <br />
        <b>Directions</b>
        <div class="pre-formatted">{{ cocktail.direction }}</div>
        <br />
        <b>
          <a v-bind:href="cocktail.recipe_link" target="_blank">Link to Recipe</a>
        </b>
        <br />
        <br />
        <div v-if="cocktail.tag != null"><b>Tag: </b>{{ cocktail.tag }}</div>
        <br />
      </div>

      <!-- Edit Recipe Modal -->
      <div>
        <div class="modal fade" id="editRecipeModal" tabindex="-1" aria-labelledby="editRecipeModalLabel" aria-hidden="true" v-if="isEditModalOpen">
          <div class="modal-dialog modal-dialog-centered" v-on:click.self="isEditModalOpen = false;">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editRecipeModalLabel">Edit Cocktail</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p><input type="text" v-model="editCocktailParams.cocktail_name" placeholder="Name"></p>
                <p><textarea class="textarea" v-model="editCocktailParams.ingredient" placeholder="Ingredients"></textarea></p>
                <p><textarea class="textarea" type="text" v-model="editCocktailParams.direction" placeholder="Directions"></textarea></p>
                <p><input type="text" v-model="editCocktailParams.recipe_link" placeholder="Link to Recipe"></p>
                <p><input type="text" v-model="editCocktailParams.tag" placeholder="Edit tag"></p>                
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary rounded-pill" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-info rounded-pill" data-dismiss="modal" v-on:click="updateCocktail()">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Favorite, Delete & Edit Buttons -->
      <div class="container">
        <div class="row justify-content-center">
          <div class="btn-group" role="group" aria-label="Favorite Group" v-if="isLoggedIn()">
            <h4 v-if="cocktail.favorite === false">
              <button type="button" class="btn btn-info rounded-pill" data-toggle="button" aria-pressed="false" v-on:click="addtoFavorites()">
                Add to Favorites
              </button>
            </h4>
            <h4 v-if="cocktail.favorite === true">
              <button type="button" class="btn btn-info rounded-pill" data-toggle="button" aria-pressed="false" v-on:click="removeFavorite()">
                Remove from Favorites
              </button>
            </h4>
          </div>
        </div>
        <div class="row justify-content-center">
          <div v-if="isLoggedIn()">
            <div class="btn-group" role="group" aria-label="Delete and Edit Group">
              <button type="button" class="btn btn-info rounded-pill" data-toggle="button" aria-pressed="false" v-on:click="destroyCocktail()">
                Delete
              </button> 
              &nbsp;&nbsp;&nbsp;
              <button type="button" class="btn btn-info rounded-pill" data-toggle="modal" data-target="#editRecipeModal" v-on:click="editModalOpen(cocktail)">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    emits: ['removeCocktail', 'editRecipe'],
    props: {
      cocktail: {
        type: Object,
        required: true
      },
    },

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
      isLoggedIn: function() {
        if (localStorage.getItem("jwt")) {
          return true;
        } else {
          return false;
        }
      },
      addtoFavorites: function() {
        axios.patch(`/cocktails/${this.cocktail.id}`, {favorite: true}).then(response => {
          console.log("favorites update", response.data);
          location.reload();
        });
      },
      removeFavorite: function() {
        axios.patch(`/cocktails/${this.cocktail.id}`, {favorite: false}).then(response => {
          console.log("favorites update", response.data);
          location.reload();
        });
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
.textarea {
  padding-top: 10px;
  padding-bottom: 10px;
  width: 80%;
  display: inline;
}
@media only screen and (max-width: 725px) {
  .box {
    width: 100%;
    font-size: 12px;
  }
  /* #button-container {
    display: inline-block;
  } */
}
/* #button-container {
  text-align: center;
} */

/* Favorite Button */
/* #favorite-button {
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
  background-color: #dfe9df;
  color: black;
  font-weight: bold;
} */

/* Delete Button */
/* #delete-button {
  font-family: "Roboto Mono", monospace;
  background-color: #078bbf;
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
} */

/* Edit Button */
/* #edit-button {
  font-family: "Roboto Mono", monospace;
  background-color: #078bbf;
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
  background-color:#dfe9df;
  color: black;
  font-weight: bold;
} */
</style>
