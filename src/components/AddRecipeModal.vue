<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addCocktailModal" tabindex="-1" aria-labelledby="addCocktailModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCocktailModalLabel">Add Cocktail</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p><input type="text" v-model="newCocktailParams.cocktail_name" placeholder="Name"></p>
            <p><textarea class="textarea" v-model="newCocktailParams.ingredient" placeholder="Ingredients"></textarea></p>
            <p><textarea class="textarea" type="text" v-model="newCocktailParams.direction" placeholder="Directions"></textarea></p>
            <p><input type="text" v-model="newCocktailParams.recipe_link" placeholder="Link to Cocktail"></p>
            <p><input type="text" v-model="newCocktailParams.tag" placeholder="Add tags"></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary rounded-pill" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-info rounded-pill" data-dismiss="modal" v-on:click="cocktailCreate()">Add Cocktail</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"; 

  export default {
    data: function () {
      return {
        newCocktailParams: {},
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
          tag: this.newCocktailParams.tag,
        };
        axios.post("/cocktails", cocktailParams).then((response) => {
          // console.log(response.data);
          this.$emit('addCocktail', response.data);
          this.newCocktailParams = {};
        });
      },
    },
  }
</script>

<style>
.textarea {
  padding-top: 10px;
  padding-bottom: 10px;
  width: 80%;
  display: inline;
}
</style>