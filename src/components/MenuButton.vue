<template>
  <nav role="navigation">
    <div id="menuToggle">
      <input type="checkbox" />
      
      <span></span>
      <span></span>
      <span></span>
      
      <ul id="menu">
        <p id="app-name">Cocktail Rolodex</p>
        <!-- <p>Hello, {{ getUserName() }}</p> -->
        <p>Saved recipes: {{cocktails.length}}</p>
        <!-- <div v-if="isLoggedIn()"> -->
          <a href="/logout">Logout</a>
        <!-- </div> -->
      </ul>
    </div>
  </nav>
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
      getUserName: function() {
        return localStorage.getItem("name");
      },
      cocktailsIndex: function () {
        console.log("in cocktails index");
        axios.get("/cocktails").then((response) => {
          this.cocktails = response.data;
        });
      },
      // isLoggedIn: function() {
      //   if (localStorage.getItem("jwt")) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // },      
    },  
  };
</script>


<style>
#app-name {
  color:#902695;
  margin: 20px;
  font-size: 28px;
}

#menuToggle
{
  display: block;
  position: relative;
  margin: 20px;
  /* top: 40px;
  left: 40px; */
  
  z-index: 1;
  
  -webkit-user-select: none;
  user-select: none;
}

#menuToggle a
{
  text-decoration: none;
  color: #232323;
  
  transition: color 0.3s ease;
}

#menuToggle a:hover
{
  color: tomato;
}

#menuToggle input
{
  display: block;
  width: 40px;
  height: 32px;
  position: absolute;
  top: -7px;
  left: -5px;
  
  cursor: pointer;
  
  opacity: 0; /* hide this */
  z-index: 2; /* and place it over the hamburger */
  
  -webkit-touch-callout: none;
}

#menuToggle span
{
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 5px;
  position: relative;
  
  background: #902695;
  border-radius: 3px;
  
  z-index: 1;
  
  transform-origin: 4px 0px;
  
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              opacity 0.55s ease;
}

#menuToggle span:first-child
{
  transform-origin: 0% 0%;
}

#menuToggle span:nth-last-child(2)
{
  transform-origin: 0% 100%;
}

#menuToggle input:checked ~ span
{
  opacity: 1;
  transform: rotate(45deg) translate(-2px, -1px);
  background: #232323;
}

#menuToggle input:checked ~ span:nth-last-child(3)
{
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}

#menuToggle input:checked ~ span:nth-last-child(2)
{
  transform: rotate(-45deg) translate(0, -1px);
}

/*
 * Make this absolute positioned
 * at the top left of the screen
 */
#menu
{
  position: absolute;
  width: 275px;
  margin: -100px 0 0 -50px;
  padding: 40px;
  padding-top: 100px;
  
  background: #ededed;
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  /* to stop flickering of text in safari */
  
  transform-origin: 0% 0%;
  transform: translate(-100%, 0);
  
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
}

#menu li
{
  padding: 10px 0;
  font-size: 22px;
}

#menuToggle input:checked ~ ul
{
  transform: none;
}
</style>