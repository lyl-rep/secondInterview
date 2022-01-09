<template>
  <div class="shopcar_box">
    <div class="contactMerchant">
      <i class="iconfont icon-xiaolian"></i>
      <div class="text">联系商家</div>
    </div>
    <div class="totalPrice">
      <div
        class="flex-logo"
        :style="{
          backgroundColor: this.shopcarLength > 0 ? '#ffc300' : '#333333',
        }"
      >
        <i
          class="iconfont icon-gouwucheman"
          :style="{ color: this.shopcarLength > 0 ? '#000' : '#999999' }"
        ></i>
        <div class="positionYoushang" v-if="true">11</div>
      </div>
      <div class="flex-detail">
        <div class="total">￥{{ totalPrice.toFixed(2) }}</div>
        <div class="delivery">
          <span>另需配送费￥{{ 1 }}元</span> |
          <span>支持自取</span>
        </div>
      </div>
    </div>
    <div
      class="submit"
      :style="{
        backgroundColor:this.totalPrice >= this.minDelivery ? '#ffc300' : '#222222',
        color: this.totalPrice >= this.minDelivery ? '#222222' : '#969696',
      }"
    >
      {{ submitInnerHtml }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minDelivery: 20,
      submitInnerHtml: "",
    };
  },
  created() {
    // console.log(this.totalPrice);
    this.submitInnerHtml=`￥${this.minDelivery}起送`
  },

  updated() {
    // console.log(this.totalPrice);
  },
  computed: {
    totalPrice() {
      let total = 0;
      for (let i of this.$store.getters.shopcarList) {
        total += i.num * i.price;
      }
      return total;
    },
    shopcarLength() {
      return this.$store.getters.shopcarList.length;
    },
  },
  watch: {
    totalPrice() {
      //获取需要改变样式的节点dom
      let submit = document.querySelector(".submit");
      if (this.totalPrice == 0) {
        submit.innerHTML = `￥${this.minDelivery}起送`;
      } else if (this.totalPrice > 0 && this.totalPrice < this.minDelivery) {
        submit.innerHTML = `差${this.minDelivery - this.totalPrice}元起送`;
      } else if (this.totalPrice >= this.minDelivery) {
        submit.innerHTML = "去结算";
      }
    },
  },
};
</script>

<style lang='less' scoped>
@textColor: #969696;
@basicGold: #ffc300;
.shopcar_box {
  //   width: 100%;
  height: 60px;
  // line-height: 60px;
  display: flex;
  border-radius: 20px;
  position: relative;
  .contactMerchant {
    flex: 0 0 18%;
    background-color: pink;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    padding: 10px 5px;
    text-align: center;
    align-items: center;
    margin-right: 5px;
    background-color: #222222;
    color: @textColor;
    border-radius: 50px 0 0 50px;
    // border-radius: 50px;
    .iconfont {
      height: 20px;
      line-height: 20px;
      font-size: 20px;
      margin-bottom: 5px;
    }
    .text {
      height: 20px;
      font-size: 12px;
      //    height: 0;
      //    flex: 1;
    }
  }
  .totalPrice {
    flex: 1;
    background-color: #222222;
    color: @textColor;
    padding: 10px;
    display: flex;
    .flex-logo {
      width: 45px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      border-radius: 100%;
      position: relative;
      background-color: #333333;
      color: #999999;
      &.active {
        background-color: @basicGold;
        color: #000;
      }
      .iconfont {
        font-size: 28px;
      }
      .positionYoushang {
        font-size: 12px;
        border-radius: 50%;
        color: #fff;
        background-color: red;
        text-align: center;
        width: 17px;
        height: 17px;
        line-height: 20px;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .flex-detail {
      padding: 5px;
      font-size: 12px;
      .total {
        font-size: 20px;
        color: #fff;
        margin-bottom: 5px;
      }
      .delivery {
        > span:nth-of-type(1) {
          letter-spacing: -2px;
        }
      }
    }
  }
  .submit {
    flex: 0 0 22%;
    font-size: 12px;
    border-radius: 0 50px 50px 0;
    line-height: 60px;
    text-align: center;
    color: #000;
    font-weight: 500;
    background-color: #222222;
    color: #ccc;
  }
}
</style>