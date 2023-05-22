<template>
  <div class="app">
    <div class="container" :class="{ 'dark-mode': darkMode }">
      <div class="navbar">
        <div class="toggle">
          <input type="checkbox" id="toggle-checkbox" v-model="darkMode" @click="toggleDarkMode">
          <label for="toggle-checkbox"></label>
        </div>
        <div class="github">
          <button class="sign-in" v-if="!user" @click="signIn">
            <i class="fab fa-github" aria-hidden="true"></i> Sign In
          </button>
          <h2 v-if="user">Signed In User: {{ user }}</h2>
          <button class="sign-out" v-if="user" @click="signOut">Sign Out</button>
        </div>
      </div>
      <img :src="darkMode ? 'src/assets/woman_dark.svg' : 'src/assets/woman.svg'" :class="{ 'image-light': !darkMode, 'image-dark': darkMode }" alt="Woman image">
      <h2 class="title">-CodeQuest- <br> Tame Your Side Projects</h2>
      <h3 class="subtitle">Embrace the Challenge, One Project at a Time!</h3>
      <input type="text" v-model="inputValue" v-if="user" placeholder="To Do Project" @keypress.enter="addItemToList" :disabled="!user">
      <button v-if="user" class="add-item" @click="addItemToList" :disabled="!user">Add to list</button>
      <ul>
        <li v-for="item in items" :key="item.id" @click="removeItem(item.id)">{{ item.value }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { getAuth, signInWithPopup, onAuthStateChanged, GithubAuthProvider, signOut } from 'firebase/auth';
import { getDatabase, ref as dbRef, push, onValue, remove } from 'firebase/database';
import firebaseApp from '/db';

export default {
  name: 'App',
  setup() {
    const darkMode = ref(false);
    const inputValue = ref('');
    const items = ref([]);
    const user = ref(null);

    const app = firebaseApp;
    const database = getDatabase(app);
    const shoppingListInDB = dbRef(database, 'projects');

    const auth = getAuth(app);
    const provider = new GithubAuthProvider();

    const addItemToList = () => {
      const trimmedValue = inputValue.value.trim();

      if (trimmedValue !== '') {
        const today = new Date();
        const date = today.toLocaleDateString();
        const itemValue = `${date} - ${trimmedValue}`;

        push(shoppingListInDB, itemValue);

        inputValue.value = '';
      }
    };

    const removeItem = (itemId) => {
      const exactLocationOfItemInDB = dbRef(database, `projects/${itemId}`);
      remove(exactLocationOfItemInDB);
    };

    const signIn = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        user.value = result.user.displayName;
        saveUserToLocalStorage(result.user);
      } catch (error) {
        console.log('Error signing in:', error.message);
      }
    };

    const signOut = async () => {
      try {
        await signOut(auth);
        user.value = null;
        removeUserFromLocalStorage();
      } catch (error) {
        console.log('Error signing out:', error.message);
      }
    };

    const saveUserToLocalStorage = (user) => {
      localStorage.setItem('user', JSON.stringify(user));
    };

    const getUserFromLocalStorage = () => {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    };

    const removeUserFromLocalStorage = () => {
      localStorage.removeItem('user');
    };

    onMounted(() => {
      onValue(shoppingListInDB, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          items.value = Object.entries(data).map(([id, value]) => ({ id, value }));
        } else {
          items.value = [];
        }
      });

      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          user.value = user;
          saveUserToLocalStorage(user);
        } else {
          // User is signed out
          user.value = getUserFromLocalStorage();
        }
      });
    });

    watch(darkMode, (newVal) => {
      if (newVal) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
    });

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
    };

    return {
      darkMode,
      inputValue,
      items,
      user,
      addItemToList,
      removeItem,
      signIn,
      signOut,
      toggleDarkMode
    };
  },
};
</script>