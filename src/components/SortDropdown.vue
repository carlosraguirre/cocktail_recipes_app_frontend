<template>
  <div class="custom-select">
    <select>
      <option value="">Sort By</option>
      <option value="">Alphabetically Descending</option>
      <option value="">Alphabetically Ascending</option>
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

</style>