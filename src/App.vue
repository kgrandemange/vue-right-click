<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <right-click :items="items" @action="handleSimpleTestAction">
      Test
    </right-click>
    <right-click :items="tableRightClick" v-for="row in tableRows" contenteditable="true" :key="row.id" @action="handleComplexeExampleAction($event, row)">
      {{ row.name }}
    </right-click>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import RightClick from './components/RightClick.vue';
import {RightClickItem} from '@/components/RightClick.vue';

@Component({
  components: {
    RightClick
  },
})
export default class App extends Vue {
  private items: Array<RightClickItem> = [{
    id: 1,
    name: 'First Item',
    action: 'first item'
  }, {
    id: 2,
    name: 'Second Item',
    action: 'second item'
  }, {
    id: 3,
    template: `<i class="material-icons">check</i> Test`,
    action: 'third item'
  }];

  private tableRows = [{
    id: 1,
    name: 'item 1'
  }, {
    id: 2,
    name: 'item 2'
  }, {
    id: 3,
    name: 'item 3'
  }]

  private tableRightClick = [{
    id: 1,
    name: 'Add new item',
    action: 'add'
  }, {
    id: 2,
    name: 'Remove this item',
    action: 'delete'
  }];

  addItem () {
    this.tableRows.push({
      id: Math.floor((Math.random() * 100000) + 1),
      name: 'new item'
    })
  }

  removeItem (item: any) {
    this.tableRows = this.tableRows.filter(row => row.id !== item.id)
  }

  handleSimpleTestAction(item: String) {
    console.log(item)
  }

  handleComplexeExampleAction(action: String, item: any) {
    if (action === 'delete') {
      this.removeItem(item)
    } else if (action === 'add') {
      this.addItem()
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
