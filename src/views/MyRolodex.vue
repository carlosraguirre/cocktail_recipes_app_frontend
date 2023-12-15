<template>
  <div class="app">

    <!-- Navbar -->
    <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-info">

      <!-- Search -->
      <ul class="navbar-nav">
        <form class ="form-inline">
          <span class="nav-bar-media-text-size"> 
            <input type="search" v-model="search" placeholder="Search Cocktails" />
          </span>
        </form>
      </ul>

      <!-- Collapse Toggle -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Actions & Info -->
      <div class="navbar-collapse collapse" id="collapsingNavbar">
        <ul class="navbar-nav">         
          <li class="nav-item dropdown">
            <span class="nav-bar-media-text-size">
              <a class="nav-link dropdown-toggle active" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                Actions & Info
              </a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="/">
                  Home
                </a>                 
                <a class="dropdown-item" v-if="isLoggedIn()">
                  <button type="button" class="btn btn-link" data-toggle="modal" data-target="#addCocktailModal">
                    Add Cocktail
                  </button>
                </a>             
                <div class="dropdown-divider"></div>
                <a class="dropdown-item">
                  <p>Saved Cocktails: {{cocktails.length}}</p>
                </a>
                <a class="dropdown-item">
                  <p>Favorite Cocktails: {{ getNumberOfFavs(true) }}</p>
                </a>                
              </div>
            </span>
          </li>
        </ul>
        
        <!-- User Actions -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown">
            <span class="nav-bar-media-text-size">
              <a class="nav-link dropdown-toggle active" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                User
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" v-if="isLoggedIn()" href="/Logout">Log Out</a>
                <a class="dropdown-item" v-else href="/Login">Log In</a>                
              </div>
            </span>
          </li>          
        </ul>
      </div>      
    </nav>

    <!-- Add Recipe Modal -->
    <div>
      <AddRecipeModal @addCocktail="addNewCocktail" data-target="addCocktailModal" />
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
            <div class="divider"></div>
            <!-- Tag Filters -->
            <select v-model="tagFilter" class="dropdown">
              <option value="">
                    Select Tag
              </option>
              <template v-for="cocktail in uniqueTags">
                <option :key="cocktail.id" v-if="cocktail.tag !== null && cocktail.tag !== ''">
                  {{ cocktail.tag }}
                </option>
              </template> 
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
  import AddRecipeModal from '../components/AddRecipeModal.vue';
  // import SortDropdown from '../components/SortDropdown.vue';

  export default {
    components: {
      Recipe,
      AddRecipeModal,
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
      isLoggedIn: function () {
        if (localStorage.getItem("jwt")) {
          return true;
        } else {
          return false;
        }
      },
      colorToggle(id) {
        this.activeFilterAndSortButton = id;
      },
      getNumberOfFavs: function (fav) {
        var favLength = this.cocktails.filter((item) => item.favorite == fav);
        return favLength.length;
      },
      isLoggedIn: function() {
        if (localStorage.getItem("jwt")) {
          return true;
        } else {
          return false;
        }
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
*, *:before, *:after {
  box-sizing: inherit;
}
html {
  box-sizing: border-box;
}
#below-nav {
  margin-top: 40px;
  margin-bottom: 5px;
}
@media only screen and (max-width: 725px) {
  #below-nav {
    margin-top: 40px;
    margin-bottom: -10px;
  }
}
#filter-and-sort-area {
  width: 100%;
  height: 75px;
  align-items: center;
  justify-content: center;
  /* background-color: #2c3e50; */
  margin: 0px;
  padding: 0px;
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
  font-size: 14px;
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
.dropdown {
  font: inherit;
  font-size: 14px;
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
    font-size: 10px;
  }
  .filter-radio-toolbar {
    font-size: 10px;
  }
  .filter-radio-toolbar label {
    font-size: 10px;
  }
  .nav-bar-component {
    font-size: 10px;
  }
  .nav-bar-media-text-size {
    font-size: 12px;
  }
}

/* nav bar */
/* input{
  text-align: center;
} */
.nav-bar-media-text-size {
  font-size: 16px;
}
</style>