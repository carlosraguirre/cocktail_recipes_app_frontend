<template>
  <div class="app">  
    <div class="nav-bar">
      <MenuButton />
      <div class="search">
        <input type="search" v-model="search" placeholder="Search Cocktails">
      </div>
      <div v-if="isLoggedIn()">
        <div id="add-button-position">
          <AddRecipe @addCocktail="addNewCocktail" />
        </div>
      </div>
    </div>
    <br />
    <div id="below-nav">
      <div id="filter-and-sort-area">
        <div id="filter-and-sort-button-wrapper">
          <label><input filter-and-sort-button type="radio" v-model="selectedFilter" value="All" /> Show All</label>
          <label><input type="radio" v-model="selectedFilter" value="true" /> Show Favorites</label>
        </div>
        <br />
        Sort by:
        <div id="filter-and-sort-buttons-row">
          <div id="filter-and-sort-button-wrapper">
            <button
              id="filter-and-sort-button"
              v-on:click="sortDescending(); colorToggle('A-Z');"
              :class="{ activeFilterAndSortButtonClass: activeFilterAndSortButton === 'A-Z' }"
            >
              A-Z
            </button>
          </div>
          <div id="filter-and-sort-button-wrapper">
            <button
              id="filter-and-sort-button"
              v-on:click="sortAscending(); colorToggle('Z-A');"
              :class="{ activeFilterAndSortButtonClass: activeFilterAndSortButton === 'Z-A' }"
            >
              Z-A
            </button>
          </div>
          <!-- <div id="filter-and-sort-button-wrapper">
            <button
              id="filter-and-sort-button"
              v-on:click="sortFavorites(); colorToggle('Favorites');"
              :class="{ activeFilterAndSortButtonClass: activeFilterAndSortButton === 'Favorites' }"
            >
              Favorites
            </button>
          </div> -->
        </div>
        <div id="filter-and-sort-buttons-row">
          <div id="filter-and-sort-button-wrapper">
            <button
              id="filter-and-sort-button"
              v-on:click="sortNewestFirst(); colorToggle('Newest Cocktail First');"
              :class="{ activeFilterAndSortButtonClass: activeFilterAndSortButton === 'Newest Cocktail First' }"
            >
              Newest Cocktail First
            </button>
          </div>
          <div id="filter-and-sort-button-wrapper">
            <button
              id="filter-and-sort-button"
              v-on:click="sortOldestFirst(); colorToggle('Oldest Cocktail First');"
              :class="{ activeFilterAndSortButtonClass: activeFilterAndSortButton === 'Oldest Cocktail First' }"
            >
              Oldest Cocktail First
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
  // import FilterSort from '../components/FilterSort.vue';

  export default {
    components: {
      AddRecipe,
      Recipe,
      MenuButton,
    },
    data: function () {
      return {
        cocktails: [],
        search: "",
        activeFilterAndSortButton: "",
        selectedFilter: "All",
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
            .filter(cocktail => {
              return cocktail.ingredient?.toLowerCase().includes(this.search.toLowerCase()) || cocktail.cocktail_name.toLowerCase().includes(this.search.toLowerCase());
            })
            // favorite filter
            .filter(cocktail => {
              if (this.selectedFilter === "" || this.selectedFilter === "All") {
                return this.cocktails
              } else {
                return cocktail.favorite === true
              }
            })
        )
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
      sortDescending: function () {
        this.cocktails.sort(function(a, b) {
          let x = a.cocktail_name.toLowerCase();
          let y = b.cocktail_name.toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
      },
      sortAscending: function () {
        this.cocktails.sort(function(a, b) {
          let x = a.cocktail_name.toLowerCase();
          let y = b.cocktail_name.toLowerCase();
          if (x > y) {return -1;}
          if (x < y) {return 1;}
          return 0;
        });
      },
      sortNewestFirst: function () {
        this.cocktails.sort((a, b) => {
          if(Date.parse(a.created_at) < Date.parse(b.created_at)) {
            return 1
          } else if (Date.parse(a.created_at) > Date.parse(b.created_at)) {
            return -1
          } else {
            return 0
          }
        });
      },
      sortOldestFirst: function () {
        this.cocktails.sort((a, b) => {
          if(Date.parse(a.created_at) > Date.parse(b.created_at)) {
            return 1
          } else if (Date.parse(a.created_at) < Date.parse(b.created_at)) {
            return -1
          } else {
            return 0
          }
        });
      },
      // sortFavorites: function() {
      //   this.cocktails.sort((a, b) => {
      //     if (a. favorite && -!b.favorite) {
      //       return -1
      //     } else if (!a.favorite && b.favorite) {
      //       return 1
      //     } else {
      //       return 0
      //     }
      //   });
      // },      
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
  margin-bottom: 50px;
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
  font-size: 16px;
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
}
.activeFilterAndSortButtonClass {
  background-color: #dfe9df!important;
  color: black!important;
}
</style>