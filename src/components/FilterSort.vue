<template>
  <div>
    <p>Sort Recipes</p>
    <button v-on:click="toggleSort()">
      <span v-if="oldestFirst">Oldest First</span>
      <span v-else>Newest First</span>
    </button>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data: function () {
      return {
        cocktails: [],
        oldestFirst: false,
      };
    },

    computed: {

      sortedRecipes: function() {
        this.cocktails.sort( (a, b) => {
          return new createdAt(a.created_at) - new createdAt(b.created_at);
        });
        return this.cocktails;
      }

      // newDates: function() {
      //   var order = this.oldestFirst ? 1 : -1;
      //   this.cocktails.sort(function(a, b) {
      //     a = new Created_At(a.created_at);
      //     b = new Created_At(b.created_at);
      //     var results = a > b ? -1 : a < b ? 1 : 0;
      //     return results * order;
      //   });
      // }      
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
      toggleSort: function () {
        this.oldestFirst = !this.oldestFirst;
      }
    },  
  };
</script>
<style>

</style>