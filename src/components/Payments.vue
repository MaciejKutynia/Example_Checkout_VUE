<template>
  <div class="title-bar">
    <i class="fas fa-credit-card"></i>
    <span>3. Metoda płatności</span>
  </div>
  <div v-for="method in methods" :key="method.id" class="control-radio">
    <input
      type="radio"
      name="payment"
      :id="`payment-${method.id}`"
      @change="getPaymentMethod(method)"
      :checked="method.id === paymentId"
    />
    <label :for="`payment-${method.id}`"
      ><span>
        <img :src="method.logo" :alt="method.name" />
        {{ method.name }}
      </span></label
    >
  </div>
  <CouponForm />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CouponForm from './CouponForm.vue';
export default {
  name: 'Payment',
  components: {
    CouponForm,
  },
  props: {
    selectedMethod: Object,
  },
  computed: mapGetters(['paymentId']),
  watch: {
    selectedMethod: function() {
      if (this.selectedMethod.cashOnDelivery) {
        this.methods = this.methods.filter(
          (method) => method.onlyCash === true
        );
        this.getPaymentMethod(this.methods[0]);
      } else {
        this.methods = this.paymentMethods;
      }
    },
  },
  created() {
    this.methods = this.paymentMethods;
  },
  methods: mapActions(['getPaymentMethod']),

  data() {
    return {
      paymentMethods: [
        {
          id: 1,
          name: 'PayU',
          logo: 'https://kontomania.pl/images/logo-payu.png',
          onlyCash: false,
        },
        {
          id: 2,
          name: 'Płatność przy odbiorze',
          logo: 'https://www.spoxsox.pl/public/assets/gotowka.png',
          onlyCash: false,
        },
        {
          id: 3,
          name: 'Przelew bankowy - zwykły',
          logo:
            'https://d-pt.ppstatic.pl/k/r/1/42/b8/5b35db272c392_p.jpg?1530256167',
          onlyCash: true,
        },
      ],
      methods: [],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../constants/_base.scss';
.title-bar {
  margin-top: 30px;
}
</style>
