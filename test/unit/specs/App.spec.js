import Vue from "vue";
import App from "src/App";

function constructAppWithProps(App) {
  const Ctor = Vue.extend(App)
  return new Ctor().$mount();
}

describe('App.vue', () => {
  let vm;
  beforeEach(function() {
    vm = constructAppWithProps(App);
  })

  it('checks sanity', () => {
    expect(vm.$el.id).to.equal('app');
  })

  it('should render a correct page', () => {
    expect(vm.$el.querySelector('#informations p').textContent).to.equal('La vie a évolué 0 fois.')
    // expect(vm.$el.innerHTML).to.equal('<div id="informations"><p>La vie a évolué 0 fois. </p> <p>Nombre de cellules en vie : Non connue</p> <p></p></div> <div id="creation"><p>Hauteur de la nouvelle grille à créer : <input placeholder="insert a height"></p> <p>Largeur de la nouvelle grille à créer : <input placeholder="insert a width"></p> <button class="button-create">Create intelligent and formatted grid</button></div> <div id="refresh"><button class="button-refresh">Refresh</button> <button class="button-refresh-automatic">Start Refresh Automatic</button> <button class="button-stop">Stop refresh Automatic</button></div> <br> <div id="grid"><canvas width="1000" height="500" style="border: 1px solid rgb(187, 187, 187);"></canvas></div>')
    // expect(vm.$el.innerHTML).to.equal('<div id="informations"><p>La vie a évolué 0 fois. </p> <p>Nombre de cellules en vie : Non connue</p> <p></p></div> <div id="creation"><p>Hauteur de la nouvelle grille à créer : <input placeholder="insert a height"></p> <p>Largeur de la nouvelle grille à créer : <input placeholder="insert a width"></p> <button class="button-create">Create intelligent and formatted grid</button></div> <div id="refresh"><button class="button-refresh">Refresh</button> <button class="button-refresh-automatic">Start Refresh Automatic</button> <button class="button-stop">Stop refresh Automatic</button></div> <br> <div id="grid"><canvas width="1000" height="500" style="border: 1px solid rgb(187, 187, 187);"></canvas></div>')
  })

  xit('should count correctly', () => {
  })
})
