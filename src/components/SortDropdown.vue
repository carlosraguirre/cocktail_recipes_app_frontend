<template>
  <div class="custom-select">
    <select>
      <option value="">Sort By</option>
      <option value="" @click="sortDescending">Alphabetically Descending</option>
      <option value="">Alphabetically Ascending</option>
      <option value="">Newest Cocktails First</option>
      <option value="">Oldest Cocktails First</option>

  <!-- Sort by:
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
      <div id="filter-and-sort-button-wrapper">
        <button
          id="filter-and-sort-button"
          v-on:click="sortFavorites(); colorToggle('Favorites');"
          :class="{ activeFilterAndSortButtonClass: activeFilterAndSortButton === 'Favorites' }"
        >
          Favorites
        </button>
      </div>
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
    </div> -->
    </select>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data: function () {
      return {
        cocktails: [],
      };
    },

    mounted: function () {
      this.cocktailsIndex();
    },

    methods: {
      cocktailsIndex: function () {
        axios.get("/cocktails").then((response) => {
          this.cocktails = response.data;
        });
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
      sortFavorites: function() {
        this.cocktails.sort((a, b) => {
          if (a. favorite && -!b.favorite) {
            return -1
          } else if (!a.favorite && b.favorite) {
            return 1
          } else {
            return 0
          }
        });
      },        
    },  
  };
</script>
<style>
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
  .filter-radio-toolbar {
    font-size: 12px;
  }
}
</style>