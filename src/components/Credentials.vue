<template>
  <div class="title-bar">
    <i class="fas fa-user"></i>
    <span>1. Twoje dane</span>
  </div>
  <div class="login-form" v-show="showLoginForm">
    <button @click="showLoginForm = false">&times;</button>
    <h3>Formularz logowania</h3>
    <form @submit="loginHandler">
      <div class="control">
        <input
          v-model="loginUsername"
          type="text"
          placeholder="Nazwa użytkownika"
        />
      </div>
      <div class="control">
        <input type="password" v-model="loginPassword" placeholder="Hasło" />
      </div>
      <button id="login">Zaloguj</button>
    </form>
  </div>
  <button @click="showLoginForm = true" class="login btn">Logowanie</button>
  <div class="new-account-info">
    <span>Masz już konto? </span>
    <p @click="showLoginForm = true">Kliknij</p>
    <span> aby się zalogować</span>
  </div>
  <input type="checkbox" v-model="createAccount" id="create-account" />
  <label class="label" for="create-account">Stwórz nowe konto</label>
  <form @submit="onSubmitHandler">
    <div class="control">
      <input placeholder="E-mail *" v-model="email" type="email" required />
    </div>
    <div class="control" v-if="createAccount">
      <input
        placeholder="Hasło *"
        :type="passwordIsVisible ? 'text' : 'password'"
        v-model="password"
        required
      />
      <i
        @click="passwordIsVisible = !passwordIsVisible"
        :class="['far', passwordIsVisible ? 'fa-eye-slash' : 'fa-eye']"
      ></i>
    </div>
    <div class="control" v-if="createAccount">
      <input
        placeholder="Potwierdź hasło *"
        v-model="confirmPassword"
        :type="confirmPasswordIsVisible ? 'text' : 'password'"
        required
      />
      <i
        @click="confirmPasswordIsVisible = !confirmPasswordIsVisible"
        :class="['far', confirmPasswordIsVisible ? 'fa-eye-slash' : 'fa-eye']"
      ></i>
    </div>
    <div class="control">
      <input placeholder="Imię *" v-model="firstName" type="text" required />
    </div>
    <div class="control">
      <input type="text" placeholder="Nazwisko *" v-model="lastName" required />
    </div>
    <div class="control">
      <select v-model="countrySelected" @change="selectCountryHandler">
        <option
          :key="country"
          v-for="country in countries"
          :value="country.name"
          >{{ country.name }}</option
        >
      </select>
    </div>
    <div class="control">
      <input type="text" placeholder="Adres *" v-model="address" required />
    </div>
    <div class="control postal">
      <input
        type="text"
        placeholder="Kod pocztowy *"
        required
        v-model="postalCode"
      />
      <input type="text" placeholder="Miasto *" v-model="city" required />
    </div>
    <div class="control">
      <input
        type="number"
        placeholder="Telefon *"
        minlength="1"
        v-model="phone"
        required
      />
    </div>
    <button class="btn">Zapisz dane</button>
  </form>
  <input
    @change="changeAddressHandler"
    type="checkbox"
    v-model="anotherAddress"
    id="another-address"
  />
  <label class="label" for="another-address">Dostawa pod inny adres</label>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Credentials',
  data() {
    return {
      users: [],
      selectedUser: {},
      loginUsername: '',
      loginPassword: '',
      showLoginForm: false,
      createAccount: '',
      anotherAddress: '',
      email: '',
      password: '',
      passwordIsVisible: false,
      confirmPassword: '',
      confirmPasswordIsVisible: '',
      firstName: '',
      lastName: '',
      countrySelected: 'Polska',
      address: '',
      postalCode: '',
      city: '',
      phone: '',
      regex: /^[0-9]{2}-[0-9]{3}$/,
      countries: [
        { name: 'Polska', regex: /^[0-9]{2}-[0-9]{3}$/ },
        { name: 'Szwecja', regex: /^S-[0-9]{5}$/ },
        { name: 'Niemcy', regex: /^[0-9]{5}$/ },
        { name: 'Czechy', regex: /^[0-9]{5}|[0-9]{3} [0-9]{2}$/ },
        { name: 'Francja', regex: /^[0-9]{5}$/ },
        { name: 'Szwajcaria', regex: /^[1-9]{1}[0-9]{3}$/ },
      ],
    };
  },
  methods: {
    ...mapActions(['getCredentials']),
    changeAddressHandler() {
      if (this.anotherAddress) {
        this.selectedUser = {
          address: this.address,
          postalCode: this.postalCode,
          city: this.city,
        };
        this.address = '';
        this.postalCode = '';
        this.city = '';
        return;
      }
      if (this.address === '' && this.postalCode === '' && this.city === '') {
        this.address = this.selectedUser.address;
        this.postalCode = this.selectedUser.postalCode;
        this.city = this.selectedUser.city;
      }
    },
    onSubmitHandler(e) {
      e.preventDefault();
      let form;
      if (!this.postalCode.match(this.regex)) {
        alert('Proszę wprowadzić poprawny kod pocztowy');
        return;
      }
      if (this.createAccount) {
        if (this.password !== this.confirmPassword) {
          alert('Hasła nie są takie same');
          return;
        }
        form = {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          country: this.countrySelected,
          address: this.address,
          postalCode: this.postalCode,
          city: this.city,
          phone: this.phone,
        };
      } else {
        form = {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          country: this.countrySelected,
          address: this.address,
          postalCode: this.postalCode,
          city: this.city,
          phone: this.phone,
        };
      }
      this.getCredentials(form);
    },
    selectCountryHandler() {
      let country = this.countries.find(
        (country) => country.name === this.countrySelected
      );
      this.regex = country.regex;
    },
    async loginHandler(e) {
      e.preventDefault();
      const res = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.loginUsername,
          password: this.loginPassword,
        }),
      });
      const data = await res.json();
      if (data.status !== 'Error') {
        const user = this.users.find(
          (user) => user.username === this.loginUsername
        );
        if (!user) {
          alert('Brak danych');
          return;
        }
        this.postalCode = user.address.zipcode;
        this.city = user.address.city;
        this.firstName = user.name.firstname;
        this.lastName = user.name.lastname;
        this.loginUsername = '';
        this.loginPassword = '';
        this.showLoginForm = false;
        return;
      }
    },
  },
  async created() {
    const res = await fetch('https://fakestoreapi.com/users');
    const data = await res.json();
    this.users = data;
  },
};
</script>

<style lang="scss" scoped>
@import '../constants/_base.scss';

.login-form {
  position: absolute;
  z-index: 5;
  top: 25%;
  left: 50%;
  width: 30vw;
  height: 25vh;
  background: white;
  padding: 20px;
  transform: translate(-50%, -50%);
  border: 1px solid $inputBorderColor;
  border-radius: 4px;
  button {
    position: absolute;
    top: 5px;
    right: 5px;
    border: 1px solid $inputBorderColor;
    padding: 3px 8px;
    background: none;
    border-radius: 2px;
    font-size: 2rem;
    cursor: pointer;
  }
  h3 {
    margin-bottom: 20px;
    text-align: center;
  }
  #login {
    position: relative;
    margin: 0 auto;
    display: block;
  }
}

p {
  display: inline;
  cursor: pointer;
}
.new-account-info {
  width: 100%;
  text-align: center;
  margin-top: 10px;

  a {
    text-decoration: none;
    color: unset;
  }
}

#create-account,
#another-address {
  display: none;
}

#create-account:checked + .label,
#another-address:checked + .label {
  &::before {
    opacity: 1;
  }
}
</style>
