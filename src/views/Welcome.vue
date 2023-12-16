<template>
  <body data-spy="scroll" data-target=".navbar" data-offset="50" class= "welcome bg-light">
    
    <!-- Nav -->
    <div>
      <nav class="navbar navbar-expand-md bg-dark navbar-dark fixed-top">  
        <ul class="navbar-nav flex-row">
          <li class="nav-item active nav-bar-media-text-size">
            <a class="nav-link" href="/MyRolodex">My Rolodex</a>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#about">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#updates">Updates Corner!</a>
          </li> -->
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown nav-bar-media-text-size ">
            <span>
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
      </nav>
    </div>

    <!-- Banner -->
    <div>
      <div class="jumbotron jumbotron bg-info border border-dark" style="padding-top:120px">
        <div class="container">
          <h1 class="display-3 text-black-50">Welcome to your <b class="text-white">Cocktail Rolodex!</b></h1>
          <p class="lead">Ditch your bookmarks and create your own Rolodex.</p>
        </div>
      </div>
      
      <div class="content">
        <!-- About -->
        <div id="about" class="container bg-light" style="padding-top:70px;padding-bottom:70px">
          <h1><b>About </b></h1>
          <br>
          <p>
            With your own Cocktail Rolodex, you can save new recipes and easily search them by name or ingredients. Want to categorize your saved cocktails? You can also set Favorites and create tags!
          <br>
          <!-- Click /here/ for a tutorial on how to use your Rolodex. link opens to modal with video -->
          </p>
        </div>
        <!-- Login -->
        <div id="login" class="container bg-light" style="padding-top:70px;padding-bottom:70px">
          <h1><b>Login </b></h1>
          <br>
          <LoginSignUp />
        </div>
        <!-- Updates -->
        <div id="updates" class="container bg-light" style="padding-top:70px;padding-bottom:70px">
          <h1><b>Updates Corner! </b></h1>
          <br>
          <p>
            Check here for updates made to this site.
          </p>
        </div>
      </div>
    </div>
  </body>
  
</template>

<script>
  import LoginSignUp from '../components/LoginSignUp.vue';

  export default {
    components: {
      LoginSignUp
    },

    methods: {
      isLoggedIn: function () {
        if (localStorage.getItem("jwt")) {
          return true;
        } else {
          return false;
        }
      },      
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