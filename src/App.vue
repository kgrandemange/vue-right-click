<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <right-click :items="items">
      Test
    </right-click>
    <right-click :items="tableRightClick" v-for="row in tableRows" contenteditable="true" :key="row.name" :current-item="row">
      {{ row.name }}
    </right-click>
  </div>
</template>

<script>
  import RightClick from './components/RightClick'

  export default {
    name: 'app',
    components: {
      RightClick
    },
    data () {
      return {
        items: [{
          id: 1,
          name: 'First Item',
          onClick() {
            console.log('first item')
          }
        }, {
          id: 2,
          name: 'Second Item',
          onClick() {
            console.log('second item')
          }
        }, {
          id: 3,
          template: `<i class="material-icons">check</i> Test`,
          onClick() {
            console.log('Check test')
          }
        }],
        tableRows: [{
          id: 1,
          name: 'item 1'
        }, {
          id: 2,
          name: 'item 2'
        }, {
          id: 3,
          name: 'item 3'
        }],
        tableRightClick: [{
          id: 1,
          name: 'Add new item',
          onClick: (item) => {
            this.addItem(item)
          }
        }, {
          id: 2,
          name: 'Remove this item',
          onClick: (item) => {
            this.removeItem(item)
          }
        }]
      }
    },
    methods: {
      doNothing (evt) {
        evt.stopPropagation()
      },
      addItem () {
        this.tableRows.push({
          id: Math.floor((Math.random() * 100000) + 1),
          name: 'new item'
        })
      },
      removeItem (item) {
        this.tableRows = this.tableRows.filter(row => row.id !== item.id)
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
