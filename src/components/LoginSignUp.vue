<template>
  <div>

    <!-- Login -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4">
          <form v-on:submit.prevent="submit()">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Email" v-model="newSessionParams.email" />
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="Password" v-model="newSessionParams.password" />
            </div>
            <div class="form-group">
              <input type="submit" class="btn btn-info rounded-pill" value="Login" />
            </div>
            <div class="form-group">
              <a href="#">
                Forget Password?
              </a>
            </div>
            <div class="form-group">
              Don't have an account? <a href="#SignUpModal" data-toggle="modal">Sign Up!</a>
            </div>
            <ul>
              <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>   
          </form>
        </div>
      </div>
    </div>
    
    <!-- Sign Up -->
    <div class="modal fade" id="SignUpModal" tabindex="-1" aria-labelledby="SignUpModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCocktailModalLabel">Sign Up</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="d-flex flex-column text-center">
              <form v-on:submit.prevent="submitSignup()">
                <div class="form-group">
                  <input type="text" class="form-control" v-model="newUserParams.name" id="name1" placeholder="Your name"/>
                </div>
                <div class="form-group">
                  <input type="email" class="form-control" v-model="newUserParams.email" id="email1" placeholder="Your email address"/>
                </div>
                <div class="form-group">
                  <input type="password" class="form-control" v-model="newUserParams.password" id="password1" placeholder="Your password"/>
                </div>
                <div class="form-group">
                  <input type="password" class="form-control" v-model="newUserParams.password_confirmation" id="passwordconfirm1" placeholder="Confrim your password"/>
                  <small v-if="newUserParams.password !== newUserParams.password_confirmation"> Passwords do not match!</small>
                </div>
              </form>
            </div>

          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary rounded-pill" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-info rounded-pill" data-dismiss="modal" v-on:click="submitSignup()">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    components: {
      
    },
    data: function () {
      return {
        newUserParams: {},
        errors: [],
        newSessionParams: {},      
      };
    },
    methods: {
      submitSignup: function () {
        axios
          .post("/users", this.newUserParams)
          .then((response) => {
            console.log(response.data);
            this.$router.push("/myrolodex");
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      },
      submit: function () {
        axios
          .post("/sessions", this.newSessionParams)
          .then((response) => {
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
            localStorage.setItem("jwt", response.data.jwt);
            this.$router.push("/myrolodex");
          })
          .catch((error) => {
            console.log(error.response);
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          });
      },      
    },
  };
</script>

<style>

</style>