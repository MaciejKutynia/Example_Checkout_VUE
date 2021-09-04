<template>
  <div class="title-bar">
    <i class="fas fa-shipping-fast"></i>
    <span>2. Metoda dostawy</span>
  </div>
  <div class="control-radio" v-for="method in shippingMethods" :key="method.id">
    <input
      @change="changeHandler(method)"
      :id="method.id"
      type="radio"
      name="shipping"
      :value="method.name"
    />
    <label :for="method.id">
      <span><img :src="method.logo" />{{ method.name }} </span>
      <span>{{ method.price.toFixed(2) }} zł</span></label
    >
  </div>
  <Payments :selectedMethod="this.selectedMethod" />
</template>

<script>
import Payments from './Payments.vue';
import { mapActions } from 'vuex';
export default {
  name: 'Shipping',
  components: {
    Payments,
  },
  methods: {
    ...mapActions(['getShippingMethod']),
    changeHandler(method) {
      this.selectedMethod = method;
      this.getShippingMethod(method);
    },
  },
  data() {
    return {
      selectedMethod: {},
      shippingMethods: [
        {
          id: 1,
          name: 'Paczkomaty 24/7',
          logo: 'https://inpost.pl/themes/custom/inpost/images/logo.png',
          cashOnDelivery: false,
          price: 10.99,
        },
        {
          id: 2,
          name: 'Kurier DPD',
          logo:
            'https://www.dpd.com/wp-content/themes/DPD_NoLogin/images/DPD_logo_redgrad_rgb_responsive.svg',
          cashOnDelivery: false,
          price: 18.0,
        },
        {
          id: 3,
          name: 'Kurier DPD pobranie',
          logo:
            'https://www.dpd.com/wp-content/themes/DPD_NoLogin/images/DPD_logo_redgrad_rgb_responsive.svg',
          cashOnDelivery: true,
          price: 22.0,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../constants/_base.scss';
</style>
