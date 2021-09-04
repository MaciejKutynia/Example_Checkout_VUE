<template>
  <div class="title-bar">
    <i class="far fa-clipboard"></i>
    <span>4. Podsumowanie</span>
  </div>
  <div class="products">
    <div v-for="product in cartProducts" :key="product.id" class="product">
      <div class="img_box">
        <img :src="product.image" alt="" />
      </div>
      <div class="info">
        <span class="title">{{ product.title }}</span>
        <span>Ilość: {{ product.quantity }}</span>
      </div>
      <div class="price">
        {{ getFormatedPrice(product.price, product.quantity) }}
      </div>
    </div>
  </div>
  <div class="totals">
    <div class="wrapper">
      <span>Suma częściowa</span>
      <strong>{{ getTotal() }}</strong>
    </div>
    <div v-show="shipmentPrice" class="wrapper">
      <span>Dostawa</span>
      <strong>{{ shipmentPrice.toFixed(2) }} zł</strong>
    </div>
    <div class="wrapper total">
      <span>Łącznie</span>
      <strong>{{ totalCart }}</strong>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Summary',
  data() {
    return {
      total: 0,
      totalCart: 0,
    };
  },
  watch: {
    shipmentPrice: function() {
      this.getSummary();
    },

    total: function() {
      this.getSummary();
    },
    coupon: function() {
      this.getSummary();
    },
  },
  computed: mapGetters(['cartProducts', 'shipmentPrice', 'coupon']),
  methods: {
    ...mapActions(['getCartTotal']),
    getFormatedPrice(price, quantity) {
      let formatedPrice = (parseFloat(price) * parseInt(quantity))
        .toFixed(2)
        .replace('.', ',');
      formatedPrice = formatedPrice + ' zł';
      return formatedPrice;
    },
    getTotal() {
      let total = 0;
      for (const product in this.cartProducts) {
        let price =
          this.cartProducts[product].price *
          this.cartProducts[product].quantity;
        total += price;
      }
      this.total = total;
      return total.toFixed(2) + ' zł';
    },
    getSummary() {
      let discount = 0,
        total = 0;
      if (this.shipmentPrice) {
        if (this.coupon < 1) {
          discount = this.total * this.coupon;
          total = this.total - discount + this.shipmentPrice;
        } else {
          total = this.total + this.shipmentPrice;
        }
      } else {
        total = this.total;
      }
      this.getCartTotal(total.toFixed(2));
      this.totalCart = total.toFixed(2) + ' zł';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../constants/_base.scss';
.far {
  margin-right: 8px;
}

.products {
  padding-bottom: 10px;
}

.totals {
  padding: 15px 0;
  border: 1px dashed #868686;
  border-width: 1px 0px;
  .wrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;
    span,
    strong {
      font-size: 14px;
    }
    &.total {
      span,
      strong {
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
}

.product {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.title {
  max-width: 150px;
  display: block;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
  font-weight: 600;
}

.price {
  font-weight: 600;
}

.img_box {
  width: 80px;
  height: 80px;
  img {
    width: 100%;
    height: 100%;
    margin: auto;
    min-width: 100%;
    max-width: 100%;
    min-height: 100%;
    max-height: 100%;
  }
}
</style>
