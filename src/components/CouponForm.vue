<template>
  <button @click="isCouponFormVisible = true" class="add-coupon btn">
    Dodaj kod rabatowy
  </button>
  <div v-show="isCouponFormVisible" class="coupon-form">
    <div class="control coupon-input">
      <input
        v-model="couponCode"
        type="text"
        placeholder="Kod kuponu rabatowego"
      />
    </div>
    <div class="buttons">
      <button @click="checkCouponCode" class="coupon btn">Zastosuj</button>
      <button @click="isCouponFormVisible = false" class="coupon btn">
        Anuluj
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'CouponForm',
  data() {
    return {
      coupon: '',
      couponCode: '',
      isCouponFormVisible: false,
    };
  },
  methods: {
    ...mapActions(['getCoupon']),
    checkCouponCode() {
      if (this.couponCode === 'RABAT15') {
        this.coupon = 0.15;
      } else if (this.couponCode === 'SMARTBEES') {
        this.coupon = 0.2;
      } else {
        alert('Przepraszamy kupon jest nie ważny');
      }
      this.getCoupon(this.coupon);
      this.isCouponFormVisible = false;
      this.couponCode = '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../constants/_base.scss';
.coupon-form {
  width: 90%;
  margin: 10px auto 5px;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.coupon {
  display: inline-block;
  width: 48%;
  background: #868686;
  border: none;
  color: white;
}
</style>
