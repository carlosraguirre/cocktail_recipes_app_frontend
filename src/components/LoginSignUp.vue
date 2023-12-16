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
              <input type="password" class="form-control" placeholder=" Password" v-model="newSessionParams.password" />
            </div>
            <div class="form-group">
              <input type="submit" class="btn btn-info rounded-pill" value="Login" />
            </div>
            <div class="form-group">
              <a href="#" class="ForgetPwd">Forget Password?</a>
            </div>
            <ul>
              <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>            
          </form>
        </div>
      </div>
    </div>

    <!-- <div class="signup">
      <form v-on:submit.prevent="submitSignup()">
        <p id="signup-header">Don't have an account? Signup here <i class="arrow-down"></i></p>
        <h1>Signup</h1>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div class="form-titles">
          <div>
            <label>Name: </label>
            <input type="text" v-model="newUserParams.name" />
          </div>
          <div>
            <label>Email: </label>
            <input type="email" v-model="newUserParams.email" />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" v-model="newUserParams.password" />
          </div>
          <div>
            <label>Password confirmation: </label>
            <input type="password" v-model="newUserParams.password_confirmation" />
            <small v-if="newUserParams.password !== newUserParams.password_confirmation"> Passwords do not match!</small>          
          </div>
        </div>
        <input class="submit-button" type="submit" value="Submit" />
      </form>
    </div> -->
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
            this.$router.push("/");
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
            this.$router.push("/MyRolodex");
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