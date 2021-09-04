<template>
  <div class="checkout">
    <div class="column">
      <Credential />
    </div>
    <div class="column">
      <Shipping />
    </div>
    <div class="column">
      <Summary />
      <textarea v-model="comment" placeholder="Komentarz"></textarea>
      <input
        @change="getNewsletter(newsletter)"
        type="checkbox"
        v-model="newsletter"
        id="newsletter"
      />
      <label class="label" for="newsletter"
        >Zapisz się aby otrzymać newsletter</label
      >
      <input
        @change="getStatute(statute)"
        type="checkbox"
        v-model="statute"
        id="statute"
      />
      <label class="label" for="statute"
        >Zapoznałam/em się z
        <a href="#" target="_blank">Regulaminem</a> zakupów</label
      >
      <button @click="confirmHandler" class="btn action">
        Potwierdź zakup
      </button>
    </div>
  </div>
</template>

<script>
import Credential from '../components/Credentials.vue';
import Shipping from '../components/Shipping.vue';
import Summary from '../components/Summary.vue';
import { mapActions } from 'vuex';
export default {
  name: 'Checkout',
  components: {
    Credential,
    Shipping,
    Summary,
  },
  data() {
    return {
      cart: {},
      products: [],
      newsletter: '',
      statute: '',
      comment: '',
    };
  },
  methods: {
    ...mapActions([
      'getCartProducts',
      'confirmOrder',
      'getStatute',
      'getComment',
      'getNewsletter',
    ]),
    onSubmitHandler(e) {
      e.preventDefault();
      console.log('aaa');
    },
    async confirmHandler() {
      this.getComment(this.comment);
      const flag = await this.confirmOrder();
      if (!flag) {
        alert('Wypełnij wszystkie dane');
        return;
      }
      this.$router.push('/success');
    },
    async getCart(id) {
      const res = await fetch(`https://fakestoreapi.com/carts/${id}`);
      const data = await res.json();
      return data;
    },
    async getProducts(products) {
      let singleProduct = {};
      for (const product in products) {
        const res = await fetch(
          `https://fakestoreapi.com/products/${products[product].productId}`
        );
        const data = await res.json();
        singleProduct = { ...data, quantity: products[product].quantity };
        this.products = [...this.products, singleProduct];
      }
      this.getCartProducts(this.products);
    },
  },
  async created() {
    const { id } = this.$router.currentRoute.value.params;
    this.cart = await this.getCart(id);
    await this.getProducts(this.cart.products);
  },
};
</script>

<style lang="scss">
@import '../constants/_base.scss';

.checkout {
  font-size: 1.6rem;
  width: 91vw;
  height: 95vh;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  grid-row-gap: 40px;
}

.column {
  width: 30%;
  min-width: 350px;
  &:not(:last-child) {
    margin-right: 40px;
  }
}

.action {
  background: $redColor;
  padding: 20px;
  color: white;
  text-transform: uppercase;
  font-weight: 600;
}

a {
  &,
  &:hover {
    color: rgb(51, 91, 143);
    text-decoration: none;
  }
}
textarea {
  padding: 10px 15px;
  margin-top: 10px;
  resize: none;
  width: 100%;
  height: 80px;
  border-radius: 4px;
  border: 1px solid $inputBorderColor;
}
</style>
