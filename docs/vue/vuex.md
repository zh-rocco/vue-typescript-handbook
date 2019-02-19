---
sidebar: auto
sidebarDepth: 3
prev: ./use.md
next: ./faq.md
---

# Vuex

## JS 语法

```js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  count: 0,
};

const mutations = {
  increment(state) {
    state.count++;
  },
  decrement(state) {
    state.count--;
  },
};

const actions = {
  increment: ({ commit }) => commit("increment"),
  decrement: ({ commit }) => commit("decrement"),
  incrementIfOdd({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit("increment");
    }
  },
  incrementAsync({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit("increment");
        resolve();
      }, 1000);
    });
  },
};

const getters = {
  evenOrOdd: (state) => (state.count % 2 === 0 ? "even" : "odd"),
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
```

## TS 语法

```ts {2,6-8,10,15,18,24-26,31,42}
import Vue from "vue";
import Vuex, { ActionContext } from "vuex";

Vue.use(Vuex);

interface State {
  count: number;
}

const state: State = {
  count: 0,
};

const mutations = {
  increment(state: State) {
    state.count++;
  },
  decrement(state: State) {
    state.count--;
  },
};

const actions = {
  increment: ({ commit }: ActionContext<State, any>) => commit("increment"),
  decrement: ({ commit }: ActionContext<State, any>) => commit("decrement"),
  incrementIfOdd({ commit, state }: ActionContext<State, any>) {
    if ((state.count + 1) % 2 === 0) {
      commit("increment");
    }
  },
  incrementAsync({ commit }: ActionContext<State, any>) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit("increment");
        resolve();
      }, 1000);
    });
  },
};

const getters = {
  evenOrOdd: (state: State) => (state.count % 2 === 0 ? "even" : "odd"),
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
```

## 更好的写法

- [Vue2.5+ Typescript 引入全面指南 - Vuex篇](https://segmentfault.com/a/1190000011864013)

