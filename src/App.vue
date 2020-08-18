<template>
  <div id="app" v-click>
    <div class="box">
      <ul v-if="data && data.length">
        <li class="list-item" :class="{ disable: !item['switch'] }" v-for="(item, index) in data" :key="index">
          <img @click="handleSwitch(index)" :src="item.normal_icon" />
          <div class="item">
            <h4>{{ item['display_name'] }}</h4>
            <vue-slider :min="0" :max="1" :interval="0.01" :value="data[index]['volume']" @change="handleChangeVolume($event, index, item)" />
            <audio loop :volume="item['volume']" :ref="`sound-${ item['id'] }`" :src="item['sound_name']"></audio>
          </div>
        </li>
      </ul>
      <button @click="handleClickButton" class="el-button">{{ setttingText }}</button>
    </div>
    <div class="play-ctl">
      <toggle-button v-model="yoxi" color="#36abff"/>
    </div>

    <modal name="my-first-modal">
      <ul>
        <li class="list-item list-im">
          <h2>背景颜色</h2>
          <div>
            <v-swatches v-model="bgColor" popover-x="left" swatches="text-advanced"></v-swatches>
          </div>
        </li>
      </ul>
    </modal>

  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

import VSwatches from 'vue-swatches'
// Import the styles too, typically in App.vue or main.js
import 'vue-swatches/dist/vue-swatches.css'

import * as assets from '@/share/assets'
import * as send from '@/share/send'
import { changePageTitle, changePageColor } from '@/share/utils'
import { setttingText } from '@/share/config'
export default {
  components: {
    VueSlider,
    VSwatches
  },
  name: 'App',
  data() {
    return {
      data: null,
      value: 12,
      yoxi: false,
    }
  },
  computed: {
    setttingText() {
      return setttingText
    },
    bgColor: {
      get() {
        return this.$store.state.bgColor
      },
      set(newVal) {
        this.$store.commit("CHANGE_BACKGROUND_COLOR", newVal)
      }
    }
  },
  async created() {
    const color = this.bgColor
    changePageColor(color)
    changePageTitle('小夕')
    this.data = await this.getData()
  },
  watch: {
    yoxi(newVal) {
      this.handleCtrlAll(newVal)
    }
  },
  methods: {
    async getData() {
      const cache = assets.getData()
      if (!cache) {
        const data = await send.getData()
        assets.setData(data)
        return data
      } else {
        return cache
      }
    },
    handleClickButton() {
      this.$modal.show('my-first-modal');
    },
    handleChangeVolume(...args) {
      const [ value, index ] = args
      this.data[index]['volume'] = value
      const id = this.data[index]['id']
      const el = this.getAudioEle(id)
      el.volume = value
      this.saveStorage()
    },
    async handleSwitch(index) {
      try {
        await this.$nextTick()
        const flag = !this.data[index]['switch']
        this.data[index]['switch'] = flag
        if (this.yoxi) {
          const id = this.data[index]['id']
          const ele = this.getAudioEle(id)
          const action = flag ? `play` : `pause`
          ele[action]()
        }
        this.saveStorage()
      } catch (error) {
        throw new Error(error)
      }
    },
    async handleCtrlAll(flag) {
      await this.$nextTick()
      const action = flag ? `play` : `pause`
      const data = this.data
      data.forEach(item=> {
        const id = item['id']
        const f = item['switch']
        if (f) {
          const ele = this.getAudioEle(id)
          // console.log('ele: ', ele)
          ele[action]()
        }
      })
    },
    getAudioEle(id) {
      const ele = this.$refs[`sound-${ id }`]
      return ele[0]
    },
    saveStorage() {
      const data = this.data
      assets.setData(data)
    }
  }
}
</script>

<style>
/*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */
html,
body,
p,
ol,
ul,
li,
dl,
dt,
dd,
blockquote,
figure,
fieldset,
legend,
textarea,
pre,
iframe,
hr,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: normal;
}

ul {
  list-style: none;
}

button,
input,
select,
textarea {
  margin: 0;
}

html {
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}

iframe {
  border: 0;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

td,
th {
  padding: 0;
}

td:not([align]),
th:not([align]) {
  text-align: left;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: url(assets/overlay.png);
  z-index: -1;
}
.box {
  width: 380px;
  height: 80%;
  max-height: 420px;
  overflow-y: auto;
  background: rgba(255, 255, 255, .9);
  margin: 0 auto;
  border-radius: 12px;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
/* Hide scrollbar for Chrome, Safari and Opera */
.box::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}

.list-item {
  display: flex;
  padding: 18px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}
.list-item.disable {
  opacity: .6;
}
.list-item img {
  width: 62px;
  height: 40px;
  padding-right: 24px;
  user-select: none;
}
.list-item div.item {
  min-width: 240px;
  text-align: left;
}
.list-item.disable div.item {
  user-select: none;
  pointer-events: none;
}
.list-item.list-im {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
.vm--overlay {
  -webkit-backdrop-filter: saturate(180%) blur(5px);
  backdrop-filter: saturate(180%) blur(5px);
}
.play-ctl {
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color:rgba(0, 0, 0, .04); */
  width: 100%;
  height: 50px;
  margin-top: 24px;
}
.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 8px 24px;
  font-size: 14px;
  border-radius: 4px;
  margin: 12px 0;
}
</style>
