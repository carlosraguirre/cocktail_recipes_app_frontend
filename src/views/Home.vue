<template>
  <div id="app">
    <div class="nav-bar">
      <h1>Cocktail Rolodex</h1>
      <div class="search">
        <input type="search" v-model="search" placeholder="Search Recipes..">
      </div>
      <div>
        <AddRecipe @addCocktail="addNewCocktail" />
      </div>
    </div>
    </br>
    <div id="below-nav">
      <p>Total cocktails: {{cocktails.length}}</p>
    </div>

    <!-- Recipe Component -->
    <Recipe
      v-for="cocktail in cocktailList"
      @removeCocktail=deleteCocktail
      @editRecipe=editCocktail
      :cocktail="cocktail" 
      :key="cocktail.id" 
    />
  </div>
</template>

<script>
  import axios from "axios";
  import Recipe from '@/components/Recipe.vue';
  import AddRecipe from '@/components/AddRecipe.vue';

  export default {
    components: {
      AddRecipe,
      Recipe
    },
    data: function () {
      return {
        cocktails: [],
        search: "",
      };
    },
    mounted: function () {
      this.cocktailsIndex();

    },
    computed: {
      cocktailList() {
        return this.cocktails.filter(cocktail => 
          cocktail.ingredient?.toLowerCase().includes(this.search.toLowerCase())
            || cocktail.cocktail_name.toLowerCase().includes(this.search.toLowerCase())
        );
      },
      filterCocktails() {
        return this.cocktails.filter(cocktail =>
          cocktail.ingredient?.toLowerCase().includes(this.search.toLowerCase())
            || cocktail.cocktail_name.toLowerCase().includes(this.search.toLowerCase())
        );
      }
    },
    methods: {
      cocktailsIndex: function () {
        console.log("in cocktails index");
        axios.get("/cocktails").then((response) => {
          this.cocktails = response.data;
        });
      },
      addNewCocktail: function (cocktail) {
        console.log("new cocktail", cocktail);
        this.cocktails = [
          cocktail, ...this.cocktails
            // spread operator
        ];
      },
      deleteCocktail: function (cocktailId) {
        console.log("delete cocktail", cocktailId);
        this.cocktails = this.cocktails.filter((cocktail) => cocktail.id !== cocktailId);
      },
      editCocktail: function (cocktail) {
        console.log("edit cocktail", cocktail);
      }
    },
  };
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;  
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.pre-formatted {
  white-space: pre-line;
  
}
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
*, *:before, *:after {
  box-sizing: inherit;
}
html {
  box-sizing: border-box;
}
.nav-bar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  align-items: center;
  width: 100%;
  background: rgb(210, 209, 209);
  padding: 10px;  
}
.search {
  flex: 1;
}
.search input {
  width: 50%;
  font-size: 17px;
}
#below-nav {
  margin-top: 150px;
}
</style>