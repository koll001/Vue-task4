import Vue from 'vue';
import Vuex from 'vuex';
import { firebase } from '../firebase';
import 'firebase/auth';
import 'firebase/database';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    userBalance: null,
    usersData: null,
  },
  getters: {
    getUserName(state) {
      return state.user.displayName;
    },
    getUserId(state) {
      return state.user.uid;
    },
    getUserBalance(state) {
      return state.userBalance;
    },
    getUsersData(state) {
      return state.usersData;
    },
  },
  mutations: {
    setUser(state, val) {
      state.user = val;
    },
    setUserBalance(state, val) {
      state.userBalance = val;
    },
    setUsersData(state, val) {
      state.usersData = val;
    },
  },
  actions: {
    async signUpUser({ dispatch, commit }, { email, password, userName }) {
      const auth = firebase.auth();
      try {
        const result = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        const user = result.user;
        await user.updateProfile({
          displayName: userName,
        });
        commit('setUser', user);
        const database = firebase.database();
        await database
          .ref('users')
          .child(user.uid)
          .set({
            userName: user.displayName,
            email: user.email,
            balance: 1000,
          });
        commit('setUserBalance', 1000);
        dispatch('fetchUsersData', user.uid);
        router.push('/home');
      } catch (error) {
        console.log(error);
      }
    },
    async loginUser({ dispatch, commit }, { email, password }) {
      const auth = firebase.auth();
      try {
        const result = await auth.signInWithEmailAndPassword(email, password);
        const user = result.user;
        commit('setUser', user);
        const database = firebase.database();
        database
          .ref('users')
          .child(user.uid)
          .on('value', (snapshot) => {
            const data = snapshot.val();
            const userBalance = data.balance;
            commit('setUserBalance', userBalance);
          });
        dispatch('fetchUsersData', user.uid);
        router.push('/home');
      } catch (error) {
        console.log(error);
      }
    },

    async signOutUser() {
      const auth = firebase.auth();
      try {
        await auth.signOut();
        router.push('/signin').catch((error) => {
          if (
            error.name !== 'NavigationDuplicated' &&
            !error.message.includes(
              'Avoided redundant navigation to current location'
            )
          ) {
            console.log(error);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    async fetchUsersData({ commit }, myId) {
      const database = firebase.database();
      try {
        database
          .ref('users/')
          .orderByChild('userName')
          .on('value', (snapshot) => {
            const usersData = [];
            snapshot.forEach((childSnapshot) => {
              const userId = childSnapshot.key;
              if (myId !== userId) {
                const childData = childSnapshot.val();
                const userData = { userId, ...childData };
                usersData.push(userData);
              }
            });
            commit('setUsersData', usersData);
          });
      } catch (error) {
        console.log(error);
      }
    },

    async updateUserBalance(
      { getters },
      { receiveUserId, receiveUserBalance, amountSendMoney }
    ) {
      const myId = getters.getUserId;
      const myBalance = getters.getUserBalance;
      const resultMyBalance = myBalance - amountSendMoney;
      const resultReceiveUserBalance = receiveUserBalance + amountSendMoney;
      const database = firebase.database();
      await database.ref('users/').transaction(
        (currentData) => {
          if (currentData) {
            if (currentData[myId].balance) {
              currentData[myId].balance = resultMyBalance;
            } else if (!currentData[myId].balance) {
              currentData[myId].balance = resultMyBalance;
            }
            if (currentData[receiveUserId].balance) {
              currentData[receiveUserId].balance = resultReceiveUserBalance;
            } else if (!currentData[receiveUserId].balance) {
              currentData[receiveUserId].balance = resultReceiveUserBalance;
            }
            return currentData;
          } else {
            return;
          }
        },
        (error, committed) => {
          if (error) {
            console.log(`エラー：${error}`);
          } else if (committed) {
            console.log(`コミット${committed}`);
          }
        }
      );
    },
  },
});
