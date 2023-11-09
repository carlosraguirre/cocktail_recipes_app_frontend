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
    },  
  };
</script>
<style>

</style>