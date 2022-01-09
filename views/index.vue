<template>
  <div class="index_box">
    <!-- 头部 -->
    <div class="head">
      <div class="merchant-info">
        <img class="img_bag" :src="merChantInfo.avatar" alt="" />
        <img
          class="left-img"
          :style="{ width: '80px', height: '80px' }"
          :src="merChantInfo.avatar"
        />
        <div class="right-info">
          <div class="right-info-name">
            <span class="name-logo">品牌</span>
            <span class="merchant-name">{{ merChantInfo.name }}</span>
          </div>
          <div class="right-info-delivery">
            <span>{{ merChantInfo.description }}</span
            >/
            <span>{{ merChantInfo.deliveryTime }}分钟送达</span>
          </div>
          <div class="right-info-supports">
            <span class="right-info-supports-logo">减</span>
            <div class="right-info-supports-content">
              <span v-for="(item, index) in merChantInfo.supports" :key="index"
                >{{ item }}
              </span>
            </div>
            <div
              class="right-info-supports-spread"
              v-if="merChantInfo.supports"
            >
              {{ supportsLength }}个
              <span>></span>
            </div>
          </div>
        </div>
      </div>
      <div class="bulletin">
        <span class="bulletin-logo">公告</span>
        <span class="bulletin-content">{{ merChantInfo.bulletin }}</span>
        <span class="bulletin-spread">></span>
      </div>
    </div>
    <!-- 主体 -->
    <div class="body">
      <ul class="nav">
        <li :class="{ single: true, active: this.$route.path == '/' }">
          <router-link to="/" tag="span">商品</router-link>
        </li>
        <li :class="{ single: true, active: this.$route.path == '/evaluate' }">
          <router-link to="/evaluate" tag="span">评价</router-link>
        </li>
        <li :class="{ single: true, active: this.$route.path == '/merchant' }">
          <router-link to="/merchant" tag="span">商家</router-link>
        </li>
      </ul>
      <div class="scroll">
        <router-view></router-view>
      </div>
    </div>
    <!-- 购物车 -->
    <div class="shop-car" @click="shopcarShow">
      <shopCar></shopCar>
    </div>
    <!-- 这是固定定位的滑出效果div -->
    <transition name="Fade">
      <div class="slide-in" v-if="shopcarIsShow">
        <p class="title">新用户下单立减5元</p>
        <div class="flex-between">
          <span class="flex-left">购物车</span>
          <span class="flex-right" @click="clearShopcar">
            <i class="iconfont icon-shanchu"></i> 清空购物车</span
          >
        </div>
        <ul>
          <li v-for="(i,k) in shopcarList" :key="k">
            <div class="name">{{i.name}}</div>
            <div class="price">￥{{(i.price*i.num).toFixed(2)}}</div>
            <div class="shopcarBtn">
              <span class="reduce" @click=changeNum(i.name,-1)>-</span>
              <span class="shopcarNum">{{ i.num}}</span>
              <span class="add" @click="changeNum(i.name,1)">+</span>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { getMerchantInfo } from "@/api/api.js";
import shopCar from "@/views/shopcar.vue";
export default {
  components: {
    shopCar,
  },
  data() {
    return {
      merChantInfo: {},
      goodsInfo: {},
      shopcarNum: 3434,
      shopcarIsShow:false,
    };
  },
  created() {
    getMerchantInfo().then((res) => {
      // console.log(res.data)
      this.merChantInfo = res.data;
      // console.log(this.merChantInfo);
    });
  },
  computed: {
    supportsLength() {
      return this.merChantInfo.supports.length;
    },
    shopcarList(){
      return this.$store.getters.shopcarList
    }
  },
  methods:{
    shopcarShow(){
      this.shopcarIsShow=!this.shopcarIsShow
    },
    clearShopcar(){
      // console.log('清空购物车',this.shopcarList)
      this.$store.commit('clearShopcarList_vuex')
      this.shopcarIsShow=false;
    },
    changeNum(name,num){
      this.$store.commit('changeNum',{name,num})
    }
  }
};
</script>

<style lang='less' scoped>
.index_box {
  // background-color: red;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .head {
    flex: 0 0 140px;
    // background-color: skyblue;
    position: relative;
    // padding: 20px;
    .img_bag {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      filter: blur(8px);
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
    .merchant-info {
      display: flex;
      box-sizing: border-box;
      padding: 20px;
      background-color: tomato;
      // margin: 20px;
      .left-img {
        // width:50px;
        z-index: 5;
        border-radius: 10px;
        margin-right: 20px;
      }
      .right-info {
        z-index: 2;
        color: #ffffff;
        box-sizing: border-box;
        flex: 1;
        width: 0;
        .right-info-name {
          font-weight: 899;
          margin-bottom: 10px;
          .name-logo {
            font-size: 12px;
            background-color: #ef1414;
            margin-right: 10px;
            padding: 2px;
          }
        }
        .right-info-delivery {
          margin-bottom: 10px;
        }
        .right-info-supports {
          display: flex;
          font-size: 12px;
          box-sizing: border-box;
          width: 100%;
          height: 16px;
          line-height: 16px;
          position: relative;
          .right-info-supports-logo {
            background-color: #fff;
            color: #f58889;
            font-weight: 700;
          }
          .right-info-supports-content {
            flex: 0 0 66%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0 8px 0 8px;
          }
          .right-info-supports-spread {
            flex: 0 0 18%;
            border-radius: 35px;
            position: absolute;
            right: 0;
            top: -5px;
            padding: 5px 8px;
            background-color: #5f5757;
            text-align: center;
          }
        }
      }
    }
    .bulletin {
      box-sizing: border-box;
      width: 100%;
      padding: 7px 10px;
      font-size: 12px;
      background-color: #5f5757;
      position: absolute;
      bottom: 0;
      display: flex;
      .bulletin-logo {
        flex: 0 0 30px;
        background-color: #fdfdfd;
        font-weight: 700;
        color: #73787d;
        margin-right: 15px;
        text-align: center;
        padding: 1px;
      }
      .bulletin-content {
        color: #dfdddd;
        flex: 0 0 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .bulletin-spread {
        color: #dfdddd;
        // flex:0 0 5%;
      }
    }
  }
  .body {
    height: 0;
    flex: 1;
    overflow: hidden;
    .scroll {
      height: 100%;
      // overflow: scroll;
    }
    .nav {
      display: flex;
      justify-content: space-evenly;
      font-size: 16px;
      li {
        font-size: 14px;
        padding: 10px 15px;
        &.active {
          border-bottom: 3px solid #fbc309;
          color: #fbc309;
        }
      }
    }
  }
  .shop-car {
    width: 100%;
    position: absolute;
    bottom: 10px;
    z-index: 10px;
  }
  .Fade-enter,.Fade-leave-to{
    opacity:0;
  }
  .Fade-enter-to,Fade-leave{
    opacity:1;
  }
  .Fade-enter-active,.Fade-leave-active{
    transition:all 1.6s;
  }
  .slide-in {
    z-index: 5;
    height: 200px;
    position: absolute;
    background-color: rgb(243, 241, 241);
    bottom: 0;
    margin-bottom: 70px;
    overflow: hidden;
    border-radius: 30px 30px 0 0;
    width: 100%;
    .title {
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 30px 30px 0 0;
      color: #eb8f68;
      background-color: #f3dcbf;
      font-size: 12px;
    }
    .flex-between {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      padding: 10px;
      border-bottom: 1px solid rgb(230, 228, 228);
      .flex-left {
      }
      .flex-right {
        color: #ddd8d8;
      }
    }
    ul {
      padding: 0 10px;
      overflow: scroll;
      height: 130px;
      li {
        margin: 15px 0;
        display: flex;
        width: 100%;
        .name {
          flex: 0 0 50%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .price {
          flex: 0 0 20%;
          text-align: right;
          font-size: 16px;
          font-weight: 600;
          color: #dc4823;
        }
        .shopcarBtn {
          flex: 0 0 30%;
          text-align: right;
          .reduce {
            padding: 2px 8px;
            border: solid 1px #dadada;
            border-radius: 50%;
            font-size: 14px;
            font-weight: 700;
          }
          .shopcarNum {
            margin: 0 5px;
            width: 28px;
            text-align: center;
            display: inline-block;
          }
          .add {
            padding: 2px 6px;
            border: solid 1px #dadada;
            border-radius: 50%;
            background-color: #ffc300;
            font-size: 14px;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>