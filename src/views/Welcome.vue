<template>
  <body data-spy="scroll" data-target=".navbar" data-offset="50" class= "welcome bg-light">
    <div>
      <nav class="navbar navbar-expand-md bg-dark navbar-dark fixed-top">  
        <ul class="navbar-nav flex-row">
          <li class="nav-item">
            <a class="nav-link" href="/MyRolodex">My Rolodex</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#about">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#updates">Updates Corner!</a>
          </li>
        </ul>
      </nav>



    </div>

    <div>
      <div class="jumbotron jumbotron-fluid bg-info border border-dark" style="padding-top:100px">
        <div class="container" style="max-width:1500px">
          <h1 class="display-3 text-black-50">Welcome to your <b class="text-white">Cocktail Rolodex!</b></h1>
          <p class="lead">Ditch your bookmarks and create your own Rolodex.</p>
        </div>
      </div>
      
      <div class="content">
        <!-- About -->
        <div id="about" class="container-fluid bg-light" style="padding-top:70px;padding-bottom:70px">
          <h1><b>About </b></h1>
          <br>
          <p>
            With your own Cocktail Rolodex, you can save new recipes and easily search them by name or ingredients. Want to categorize your saved cocktails? You can also set Favorites and create tags!
          <br>
          <!-- Click /here/ for a tutorial on how to use your Rolodex. link opens to modal with video -->
          </p>
        </div>
        <!-- Login -->
        <div id="login" class="container-fluid bg-light" style="padding-top:70px;padding-bottom:70px">
          <h1><b>Login </b></h1>
          <br>
          <LoginSignUp />
        </div>
        <!-- Updates -->
        <div id="updates" class="container-fluid bg-light" style="padding-top:70px;padding-bottom:70px">
          <h1><b>Updates Corner! </b></h1>
          <br>
          <p>
            Check here for updates made to this site.
          </p>
        </div>
      </div>
    </div>


    <h2>Login / Sign Up</h2>
   
    

    <h2>Check here for site updates!</h2>

  </body>
  
</template>

<script>
  import LoginSignUp from '../components/LoginSignUp.vue';

  export default {
    components: {
      LoginSignUp
    },
  }
</script>

<style >
.welcome {
  font-family: "Roboto Mono", monospace;
  /* font-size: 16px; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;  
}
.content {
  font-size: 16px;
  max-width: 1500px;
  margin: auto;
}

.banner {
  font-size: 25px;
}

@media only screen and (max-width: 725px) {
  .welcome {
    font-size: 14px;
  }
  .content {
    font-size: 12px;
  }
}
</style>



      <!-- <div id="section2" class="container-fluid bg-warning" style="padding-top:70px;padding-bottom:70px">
        <h1>Section 2</h1>
        <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
        <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
      </div>
      <div id="section3" class="container-fluid bg-secondary" style="padding-top:70px;padding-bottom:70px">
        <h1>Section 3</h1>
        <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
        <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
      </div>
      <div id="section41" class="container-fluid bg-danger" style="padding-top:70px;padding-bottom:70px">
        <h1>Section 4 Submenu 1</h1>
        <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
        <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
      </div>
      <div id="section42" class="container-fluid bg-info" style="padding-top:70px;padding-bottom:70px">
        <h1>Section 4 Submenu 2</h1>
        <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
        <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
      </div> -->