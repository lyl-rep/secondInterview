<template>
  <div class="goods_box">
    <div class="flex-left">
      <div class="content">
        <ul>
          <li
            v-for="(i, k) in goodsInfo"
            :key="k"
            :class="{ active: selectedCss == k }"
            @click="selected(k)"
          >
            <!-- 该div是占位做一个左侧小光标的div -->
            <div class="cursor" v-if="selectedCss == k"></div>
            {{ i.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="flex-right">
      <div class="rightContent">
        <ul>
          <li class="" v-for="(i, k) in goodsInfo" :key="k" :id="k">
            <div class="goodsClassify">{{ i.name }}</div>
            <div class="goodsDetail" v-for="(j, key) in i.foods" :key="key">
              <div class="flex-left-img">
                <img
                  :src="j.imgUrl"
                  :style="{ width: '80px', height: '100px' }"
                  alt=""
                />
              </div>
              <div class="flex-right-detail">
                <div class="flex-right-detail-name">{{ j.name }}</div>
                <div class="flex-right-detail-specail">特惠</div>
                <div class="flex-right-detail-evaluate">
                  <span>月售{{ j.sellCount }}份</span>
                  <span>好评度{{ j.rating }}%</span>
                </div>
                <div class="flex-right-detail-price">
                  <div class="price">
                    <span class="newPrice">${{ j.price.toFixed(2) }}</span>
                    <span class="oldPrice">998</span>
                  </div>
                  <div class="shopcarBtn">
                    <span
                      class="reduce"
                      @click.stop="changeNum(j.name, -1)"
                      v-if="j.num > 0"
                      >-</span
                    >
                    <span
                      class="shopcarNum"
                      v-if="j.num > 0"
                      @click="console1(j.num)"
                      >{{ j.num }}</span
                    >
                    <span class="add" @click.stop="changeNum(j.name, 1)"
                      >+</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsInfo } from "@/api/api.js";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      // goodsInfo: [],
      selectedCss: 0,
    };
  },
  created() {
    getGoodsInfo().then((res) => {
      for (let i of res.goodsList) {
        for (let j of i.foods) {
          j.num = 0;
        }
      }
      console.log(res.goodsList)
      // 把数据放到vuex当中去
      this.$store.commit('goodsList_vuex',res.goodsList)

      
    });
  },
  mounted() {
    //左侧导航栏的BScroll效果
    new BScroll(document.querySelector(".flex-left"), {
      click: true,
    });
    //右侧导航栏的BScroll效果
    this.rightWrapper = new BScroll(document.querySelector(".flex-right"), {
      click: true,
      probeType: 3,
    });
    //实时监听右侧滚动
    this.rightWrapper.on("scroll", (positon) => {
      // console.log(positon.x, positon.y);
      let h = Math.abs(positon.y).toFixed(2);
      // console.log(h, this.returnArr);
      for (let i of this.returnArr) {
        if (h >= i.min && h < i.max) {
          this.selectedCss = i.id;
        }
      }
    });
  },
  methods: {
    selected(params) {
      this.selectedCss = params;
      this.rightWrapper.scrollToElement(document.getElementById(params), 600);
      // console.log(this.returnArr)
    },
    changeNum(name, num) {
      this.$store.commit('changeNum',{name,num})
      // console.log('11111111:',this.shopcarList)
    },
    console1(p) {
      console.log(p);
    },
  },
  computed: {
    //返回一个区间数组.右联左用的
    returnArr() {
      let totalH = 0;
      let H = 0;
      let areaArr = [];
      for (let i in this.goodsInfo) {
        H = document.getElementById(i).clientHeight;
        // console.log(H)
        areaArr.push({ id: i, min: totalH, max: (totalH += H) });
      }
      return areaArr;
    },
    //接收来自vuex的goodsList
    goodsInfo(){
      return this.$store.state.goodsList
    },
    //接收来自vuex的shopcarList
    shopcarList(){
      return this.$store.getters.shopcarList
    }
  },
};
</script>

<style lang='less' scoped>
@colorTitle: #f4f4f4;
.goods_box {
  display: flex;
  height: 100%;
  .flex-left {
    flex: 0 0 22%;
    background-color: @colorTitle;
    height: 100%;
    overflow: scroll;

    ul {
      li {
        height: 20px;
        line-height: 20px;
        padding: 20px 10px;
        position: relative;
        &.active {
          background-color: #fff;
        }
        .cursor {
          position: absolute;
          left: 0;
          width: 3px;
          height: 20px;
          background-color: #ffc300;
        }
      }
    }
  }
  .flex-right {
    // height: 100%;
    flex: 0 0 78%;
    overflow: scroll;
    // background-color: skyblue;
    .rightContent {
      ul {
        li {
          .goodsClassify {
            background-color: @colorTitle;
            border-left: 3px solid #dddddd;
            text-indent: 5px;
            padding: 10px 0;
          }
          .goodsDetail {
            padding: 15px;
            display: flex;
            .flex-left-img {
              margin-right: 10px;
            }
            .flex-right-detail {
              flex: 0 0 1;
              width: 100%;
              .flex-right-detail-name {
                font-weight: 600;
                color: #171717;
              }
              .flex-right-detail-specail {
                background-color: #d3d3d3cc;
                padding: 5px;
                font-weight: 500;
                display: inline-block;
                font-size: 12px;
                margin: 10px 0;
              }
              .flex-right-detail-evaluate {
                font-size: 12px;
                color: #a9a9a9;
                > span:nth-of-type(1) {
                  margin-right: 10px;
                }
                margin-bottom: 10px;
              }
              .flex-right-detail-price {
                display: flex;
                width: 100%;
                justify-content: space-between;
                .price {
                  .newPrice {
                    color: #fd3301;
                    font-size: 16px;
                    font-weight: 700;
                    margin-right: 10px;
                  }
                  .oldPrice {
                    color: #a9a9a9;
                    text-decoration: line-through;
                    font-size: 12px;
                  }
                }
                .shopcarBtn {
                  flex: 0 0 1;

                  .reduce {
                    padding: 2px 8px;
                    border: solid 1px #dadada;
                    border-radius: 50%;
                    font-size: 14px;
                    font-weight: 700;
                  }
                  .shopcarNum {
                    margin: 0 5px;
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
      }
    }
  }
}
</style>