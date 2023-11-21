<template>
  <div class="app">
    <!-- Navbar -->
    <div class="nav-bar">
      <MenuButton />
      <div class="search">
        <input type="search" v-model="search" placeholder="Search Cocktails" />
      </div>
      <!-- Add Cocktail -->
      <div v-if="isLoggedIn()">
        <div id="add-button-position">
          <AddRecipe @addCocktail="addNewCocktail" />
        </div>
      </div>
    </div>
    <br />

    <!-- Filter Buttons -->
    <div id="below-nav">
      <div id="filter-and-sort-area">
        <div><b>Filter by:</b></div>
        <div class="line-break"></div>
        <div id="filter-and-sort-button-wrapper">
          <div class="filter-radio-toolbar">
            <!-- Favorite Filter -->
            <input
              type="radio"
              id="radio1"
              v-model="favoriteFilter"
              value=""
              checked
            />
            <label for="radio1">Show All</label>
            <input
              type="radio"
              id="radio2"
              v-model="favoriteFilter"
              value="true"
            />
            <label for="radio2">Favorites</label>
            <!-- Tag Filters -->
            <select v-model="tagFilter">
              <option value="">
                    Select Tag
              </option>
              <option v-for="cocktail in uniqueTags" v-if="cocktail.tag !== null && cocktail.tag !== ''" >
                <option :key="cocktail.id">
                  {{ cocktail.tag }}
                </option>
              </option> 
            </select>
            <button id="filter-and-sort-button" v-if="tagFilter !== ''" v-on:click="tagFilter = ''">
              Clear Tag
            </button>
          </div> 
        </div>
      </div>
    </div>

    <!-- Recipe Component -->
    <Recipe
      v-for="cocktail in filteredCocktails"
      @removeCocktail=deleteCocktail
      @editRecipe=editCocktail 
      :cocktail="cocktail" 
      :key="cocktail.id"
    />
  </div>
</template>

<script>
  import axios from "axios";
  import Recipe from '../components/Recipe.vue';
  import AddRecipe from '../components/AddRecipe.vue';
  import MenuButton from '../components/MenuButton.vue';
  // import SortDropdown from '../components/SortDropdown.vue';

  export default {
    components: {
      AddRecipe,
      Recipe,
      MenuButton,
      // SortDropdown,
    },
    data: function () {
      return {
        cocktails: [],
        search: "",
        activeFilterAndSortButton: "",
        favoriteFilter: "All",
        tagFilter: "",
      };
    },
    mounted: function () {
      this.cocktailsIndex();
      this.colorToggle("Favorites");
    },
    computed: {
      filteredCocktails() {
        return (
          this.cocktails
            // search filter
            .filter((cocktail) => {
              return cocktail.ingredient?.toLowerCase().includes(this.search.toLowerCase()) || cocktail.cocktail_name.toLowerCase().includes(this.search.toLowerCase());
            })
            // favorite filter
            .filter((cocktail) => {
              if (this.favoriteFilter === "" || this.favoriteFilter === "All") {
                return cocktail;
              } else {
                return cocktail.favorite === true;
              }
            })
            // tag filter
            .filter((cocktail) => {
              if (this.tagFilter === "") {
                return cocktail;
              } else {
                return cocktail.tag === this.tagFilter;
              }
            })
        );
      },
      uniqueTags() {
      return this.cocktails.reduce((seed, current) => {
        return Object.assign(seed, {
          [current.tag]: current
          });
        }, {});
      },
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
        this.search = "";
      },
      editCocktail: function (cocktail) {
        console.log("edit cocktail", cocktail);
      },
      isLoggedIn: function() {
        if (localStorage.getItem("jwt")) {
          return true;
        } else {
          return false;
        }
      },
      colorToggle(id) {
        this.activeFilterAndSortButton = id;
      },
    },
  };
</script>

<style>
.app {
  font-family: "Roboto Mono", monospace;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;  
  background-color: rgb(246, 245, 247);
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
  font-family: "Roboto Mono", monospace;
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
  background: white;
  padding: 10px;
}
.search {
  flex: 1;
}
.search input {
  width: 65%;
  font-size: 17px;
  font-family: "Roboto Mono", monospace;  
}
@media only screen and (max-width: 725px) {
  .search input {
    font-size: 12px;
  }
}
#below-nav {
  margin-top: 125px;
  margin-bottom: 5px;
}
@media only screen and (max-width: 725px) {
  #below-nav {
    margin-top: 100px;
  }
}
#add-button-position {
  margin: 20px;
}
#filter-and-sort-area {
  width: 100%;
  height: 75px;
  align-items: center;
  justify-content: center;
  /* background-color: #2c3e50; */
  margin: 0;
  padding: 0;
  font-size: 16px;
}
#filter-and-sort-buttons-row {
  height: 50%;
  width: 100%;
  margin: 0;
  padding: 0;
  /* display: inline-block; */
}
#filter-and-sort-button-wrapper {
  display: inline-block;
  margin: 0;
  padding: 0;
  margin-left: 2px;
  margin-right: 2px;
}
#filter-and-sort-button {
  font-family: "Roboto Mono", monospace;
  background-color: #078bbf;
  border: none;
  color: white;
  padding: 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  margin: 4px 2px;
  border-radius: 10px;
  font-weight: bold;  
  /* height: 33px;
  width: 100%; */
  /* margin: 5px; */
}
@media only screen and (max-width: 725px) {
  #filter-and-sort-area {
    width: 100%;
    font-size: 12px;
  }
  #filter-and-sort-buttons-row {
    display: inline-block;
  }
  #filter-and-sort-button-wrapper {
    margin-left: 1px;
    margin-right: 1px;
  }
  #filter-and-sort-button {
    font-size: 12px;
  }
  .filter-radio-toolbar {
    font-size: 12px;
  }
}
.activeFilterAndSortButtonClass {
  background-color: #dfe9df!important;
  color: black!important;
}
/* Change radio to button */
.filter-radio-toolbar input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}
/* Change radio to button */
.filter-radio-toolbar label {
  font-family: "Roboto Mono", monospace;
  background-color: #078bbf;
  border: none;
  color: white;
  padding: 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 10px;
  font-weight: bold; 
}
.filter-radio-toolbar input[type="radio"]:checked + label {
  background-color: #dfe9df!important;
  color: black!important;  
}
.divider{
  width:5px;
  height:auto;
  display:inline-block;
}
.line-break{
  margin-bottom: 5px;
}
</style>