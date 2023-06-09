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
          <button class="sign-out" v-if="user" @click="signOut">
            <i class="fab fa-github" aria-hidden="true"></i> Sign Out
          </button>
        </div>
      </div>
      <h2 class="signed-in" v-if="user">You can do it {{ user }}:)</h2>
      <img :src="darkMode ? '/images/woman_dark.svg' : '/images/woman.svg'" :class="{ 'image-light': !darkMode, 'image-dark': darkMode }" alt="Woman image">
      <h2 class="title">- CodeQuest - <br> Tame Your Side Projects</h2>
      <h3 class="subtitle">Embrace the Challenge, One Project at a Time!</h3>
      <input type="text" v-model="inputValue" placeholder="To Finish Project" @keypress.enter="addItemToList" :disabled="!user" v-show="user">
      <button class="add-item" @click="addItemToList" :disabled="!user" v-show="user">Add to list</button>
      <div v-if="!user" class="main-text">
      <p>
        We all know how it goes: as developers, 
        we have an ever-growing list of side projects that often end up forgotten or left unfinished. 😅
      </p>
      <p>
        This simple app lets you create and manage your project list, 
        making sure no brilliant idea slips through the cracks.
      </p>
      <p>Stay focused, embrace the challenge, and bring your side projects to life! 💪✨"</p>
      </div>
      <ul>
        <li v-for="(item, index) in items" :key="'item-' + index" @click="removeItem(item.id)">{{ item.value }}</li>
      </ul>
    </div>
  </div>
  <div v-if="!user" class="footer">
    <p>Made by <a href="https://github.com/highflyer910/codequests_app" target="_blank">Thea</a> © 2023</p>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { getAuth, signInWithRedirect, onAuthStateChanged, setPersistence, browserSessionPersistence, GithubAuthProvider } from 'firebase/auth';
import { getDatabase, ref as dbRef, push, onValue, remove } from 'firebase/database';
import firebaseApp from '/db';

export default {
  name: 'Projects',
  setup() {
    const darkMode = ref(false);
    const inputValue = ref('');
    const items = ref([]);

    const app = firebaseApp;
    const database = getDatabase(app);
    const projectsInDB = dbRef(database, 'projects');

    const auth = getAuth(app);
    setPersistence(auth, browserSessionPersistence);
    const provider = new GithubAuthProvider();

    const user = ref(null);

    const saveUserToLocalStorage = (displayName) => {
      localStorage.setItem('user', displayName);
    };

    const removeUserFromLocalStorage = () => {
      localStorage.removeItem('user');
    };

    const saveThemeToLocalStorage = (theme) => {
      localStorage.setItem('theme', theme);
    };

    const getThemeFromLocalStorage = () => {
      return localStorage.getItem('theme');
    };

    const addItemToList = () => {
      const trimmedValue = inputValue.value.trim();

      if (trimmedValue !== '') {
        const today = new Date();
        const date = today.toLocaleDateString();
        const itemValue = `${date} - ${trimmedValue}`;

        push(projectsInDB, itemValue);

        inputValue.value = '';
      }
    };

    const removeItem = (itemId) => {
      const exactLocationOfItemInDB = dbRef(database, `projects/${itemId}`);
      remove(exactLocationOfItemInDB);
    };

    const signIn = async () => {
      try {
        await signInWithRedirect(auth, provider);
      } catch (error) {
        console.log('Error signing in:', error.message);
      }
    };

    const signOut = async () => {
      try {
        await auth.signOut();
        user.value = null;
        removeUserFromLocalStorage(); // Remove the user from local storage
        items.value = []; // Clear the to-do items
      } catch (error) {
        console.log('Error signing out:', error.message);
      }
    };

    onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        // User is signed in
        const displayName = loggedInUser.displayName;
        user.value = displayName;

        // Fetch initial to-do items once when the user is signed in
        onValue(projectsInDB, (snapshot) => {
          const data = snapshot.val();

          if (data) {
            items.value = Object.entries(data).map(([id, value]) => ({ id, value }));
          } else {
            items.value = [];
          }
        });
      } else {
        // User is signed out
        user.value = null;
        items.value = []; // Clear the to-do items
      }
    });

    onMounted(() => {
      const theme = getThemeFromLocalStorage();
      if (theme === 'dark') {
        darkMode.value = true;
        document.documentElement.classList.add('dark-mode');
      } else {
        darkMode.value = false;
        document.documentElement.classList.remove('dark-mode');
      }
    });

    watch(darkMode, (newVal) => {
      if (newVal) {
        document.documentElement.classList.add('dark-mode');
        saveThemeToLocalStorage('dark');
      } else {
        document.documentElement.classList.remove('dark-mode');
        saveThemeToLocalStorage('light');
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
