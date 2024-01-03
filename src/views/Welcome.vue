<template>
  <body data-spy="scroll" data-target=".navbar" data-offset="50" class= "welcome">
    
    <!-- Nav -->
    <div>
      <nav class="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
        <ul class="navbar-nav flex-row">
          <li class="nav-item active nav-bar-media-text-size" v-if="isLoggedIn()">
            <router-link class="nav-link" :to="{ path: `/user/${user.id}/myrolodex` }">My Rolodex</router-link>
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
                {{ user.name }}
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" v-if="isLoggedIn()" href="/Logout">Log Out</a>
                <a class="dropdown-item" v-else href="/#login">Log In</a>                
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
          <p class="lead">Ditch your bookmarks and save your recipes here!</p>
        </div>
      </div>
      
      <div class="content container" style="padding-top:70px; padding-bottom:70px">
        <!-- About -->
        <div class="container px-5 pb-5">
          <div class="row gx-5 align-items-center">
            <div class="col-lg-6 order-lg-2">
              <div class="p-2">
                <img class="img-fluid" src="assets/Welcome1.jpeg" alt="..."/>
              </div>
            </div>
            <div class="col-lg-6 order-lg-1">
              <div class="p-2">
                <h1 class="mb-3"><b>About</b></h1>
                  <p>
                    With your own Cocktail Rolodex, you can save new recipes and easily search them by name or ingredients. Want to categorize your saved cocktails? You can also set Favorites and create tags!
                  <br />
                  <br />

                  Click below for a tutorial on how to use your Rolodex. <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">(Show Video)</button>
                  </p>
                  <p>

                  </p>
                  <div class="collapse" id="collapseExample">
                    <div class="card card-body">
                      <div class="embed-responsive embed-responsive-16by9">
                        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/7nEja-I9nH8"></iframe>
                      </div>
                    </div>
                  </div>             
              </div>
            </div>
          </div>
        </div>

        <!-- Login -->
        <div class="container px-2 pb-5" id="login">
          <div class="row gx-5 align-items-center">
            <div class="col-lg-6">
              <div class="p-5">
                <img class="img-fluid" src="assets/Welcome2.jpeg" alt="..."/>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="p-2">
                <h1 class="mb-3"><b>Login</b></h1>
                <LoginSignUp />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Updates -->
        <UpdatesCorner />

      </div>
    </div>

    <!-- Footer -->
    <footer id="sticky-footer" class="flex-shrink-0 py-3 bg-dark text-white-50">
      <div class="container text-center">
        <small>Copyright &copy; <a href="https://carlosaguirre.dev" target="_blank">Carlos Aguirre</a></small>
      </div>
    </footer>

  </body>
  
</template>

<script>
  import axios from "axios";
  import LoginSignUp from '../components/LoginSignUp.vue';
  import UpdatesCorner from '../components/UpdatesCorner.vue';

  export default {
    components: {
      LoginSignUp,
      UpdatesCorner
    },

    data: function () {
      return {
        user: "",
      };
    },

    created: function() {
    this.userShow()
    }, 
    
    methods: {
      isLoggedIn: function () {
        if (localStorage.getItem("jwt")) {
          return true;
        } else {
          return false;
        }
      },
      userShow: function() {
        axios.get(`/users/${localStorage.user_id}`).then((response) => {console.log(response)
        this.user = response.data;
        });
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