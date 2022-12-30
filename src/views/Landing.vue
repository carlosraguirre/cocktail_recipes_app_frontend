<template>
  <div class="app">
    <h1 id="app-name">Cocktail Rolodex</h1>
    <div class="login">
      <form v-on:submit.prevent="submit()">
        <h1>Login</h1>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div>
          <label>Email:</label>
          <input type="email" v-model="newSessionParams.email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" v-model="newSessionParams.password" />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>

    <div class="signup">
      <form v-on:submit.prevent="submit()">
        <h1>Signup</h1>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div>
          <label>Name:</label>
          <input type="text" v-model="newUserParams.name" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" v-model="newUserParams.email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" v-model="newUserParams.password" />
        </div>
        <div>
          <label>Password confirmation:</label>
          <input type="password" v-model="newUserParams.password_confirmation" />
          <small v-if="newUserParams.password !== newUserParams.password_confirmation"> Passwords do not match!</small>          
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data: function () {
      return {
        newUserParams: {},
        errors: [],
        newSessionParams: {},      
      };
    },
    methods: {
      submit: function () {
        axios
          .post("/users", this.newUserParams)
          .then((response) => {
            console.log(response.data);
            this.$router.push("/login");
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
            this.$router.push("/rolodex");
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
#app-name {
  color:#902695;
  margin: 20px;
  font-size: 28px;
}
</style>