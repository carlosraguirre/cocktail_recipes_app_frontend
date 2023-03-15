<template>
  <div id="landing-page">
    <div>
      </br>
      <h1 id="landing-title">Welcome back to your</h1>
      <h1 id="landing-app-name">Cocktail Rolodex</h1>
    </div>
    </br>
    </br>
    </br>
    </br>
    <div class="login">
      <form v-on:submit.prevent="submit()">
        <p id="login-header">Log in below, Carlos o7</p>
        <h1>Login</h1>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div class="form-titles">
          <div>
            <label>Email: </label>
            <input type="email" v-model="newSessionParams.email" />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" v-model="newSessionParams.password" />
          </div>
        </div>
        <input class="submit-button" type="submit" value="Submit" />
      </form>
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
            this.$router.push("/");
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
#landing-page {
  font-family: "Roboto Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;  
  background-color: rgb(246, 245, 247);
  min-height: 100vh;

}
#landing-title {
  color:#5e595e;
  margin: 20px;
  font-size: 45px;
}
#landing-app-name {
  color:#902695;
  margin: 20px;
  font-size: 60px;
}
#login-header {
  font-size: 23px;
}
#signup-header {
  font-size: 23px;
}
i.arrow-down{
  color: #902695;
  width:  0.55em;
  height:  0.9em;
  display:  inline-block;
  position:  relative;
  background:  currentColor;
  vertical-align: top;
} i.arrow-down:after{
  border-right:  0.5em solid transparent;
  border-left:  0.5em solid transparent;
  border-top:  0.5em solid currentColor;
  position:  absolute;
  content:  "";
  bottom:  -0.3em;
  left:  -0.22em;
}
.submit-button {
  font-family: "Roboto Mono", monospace;
  background-color: #902695;
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  margin: 4px 2px;
  border-radius: 10px;
  font-weight: bold;
}
.submit-button:hover {
  background-color:#04AA6D;
  color: white;
  font-weight: bold;
}
.form-titles {
  font-size: 18px;
}
</style>