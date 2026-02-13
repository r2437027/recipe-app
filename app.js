const deleteItemName = document.getElementById("deleteItemName");

let deleteTargetId = null;

const deleteModal = document.getElementById("deleteModal");
const confirmDeleteBtn = document.getElementById("confirmDelete");
const cancelDeleteBtn = document.getElementById("cancelDelete");


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBpSQL--XWxdzhchXXyAoalHLBuEbQQWIY",
  authDomain: "recipe-app-7f8d3.firebaseapp.com",
  projectId: "recipe-app-7f8d3",
  storageBucket: "recipe-app-7f8d3.appspot.com",
  messagingSenderId: "260784282896",
  appId: "1:260784282896:web:1f6d19639a58d6585e9995"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let editId = null;

async function addRecipe() {
  const name = document.getElementById('name').value;
  const ingredients = document.getElementById('ingredients').value;
  const steps = document.getElementById('steps').value;

  if (!name) {
    alert("料理名の検索!");
    return;
  }

  if (editId === null) {
    await addDoc(collection(db, "recipes"), {
      name,
      ingredients,
      steps
    });
  } else {
    await updateDoc(doc(db, "recipes", editId), {
      name,
      ingredients,
      steps
    });
    editId = null;
  }

  document.getElementById('name').value = '';
  document.getElementById('ingredients').value = '';
  document.getElementById('steps').value = '';

  loadRecipes();
}

async function loadRecipes() {
  const list = document.getElementById('recipeList');
  list.innerHTML = '';

  const querySnapshot = await getDocs(collection(db, "recipes"));

  querySnapshot.forEach((docSnap) => {
    const r = docSnap.data();

    list.innerHTML += `
      <div class="recipe">
        <h3>${r.name}</h3>
        <b>材料🌼</b><br>${r.ingredients}<br>
        <b>作り方🍳</b><br>${r.steps}<br><br>
        <button onclick="editRecipe('${docSnap.id}', \`${r.name}\`, \`${r.ingredients}\`, \`${r.steps}\`)">✏️整理</button>
        <button onclick="deleteRecipe('${docSnap.id}', \`${data.name}\`)">🗑 削除</button>
      </div>
    `;
  });
}

async function deleteRecipe(id, name) {
  deleteTargetId = id;
  deleteItemName.textContent = name;
  deleteModal.classList.add("show");
}



function editRecipe(id, name, ingredients, steps) {
  document.getElementById('name').value = name;
  document.getElementById('ingredients').value = ingredients;
  document.getElementById('steps').value = steps;
  editId = id;
}

window.addRecipe = addRecipe;
window.deleteRecipe = deleteRecipe;
window.editRecipe = editRecipe;

loadRecipes();
async function searchRecipe() {
  const keyword = document.getElementById("search").value.toLowerCase();
  const list = document.getElementById("recipeList");
  list.innerHTML = '';

  const querySnapshot = await getDocs(collection(db, "recipes"));

  querySnapshot.forEach((docSnap) => {
    const r = docSnap.data();
    const nameLower = r.name.toLowerCase();

    if (nameLower.includes(keyword)) {

      // highlight chữ tìm thấy
      let highlightedName = r.name;
      if (keyword !== "") {
        const regex = new RegExp(`(${keyword})`, "gi");
        highlightedName = r.name.replace(
          regex,
          `<span style="background:yellow; font-weight:bold;">$1</span>`
        );
      }

      list.innerHTML += `
        <div class="recipe">
          <h3>${highlightedName}</h3>
          <b>材料🌼</b><br>${r.ingredients}<br>
          <b>作り方🍳</b><br>${r.steps}<br><br>
          <button onclick="editRecipe('${docSnap.id}', \`${r.name}\`, \`${r.ingredients}\`, \`${r.steps}\`)">✏️整理</button>
          <button onclick="deleteRecipe('${docSnap.id}',\`${data.name}\`)">🗑 削除</button>
        </div>
      `;
    }
  });

  // nếu ô trống thì load lại toàn bộ
  if (keyword === "") {
    loadRecipes();
  }
}

window.searchRecipe = searchRecipe;

confirmDeleteBtn.addEventListener("click", async () => {
  if (!deleteTargetId) return;

  try {
    await deleteDoc(doc(db, "recipes", deleteTargetId));
  } catch (error) {
    console.error("削除エラー:", error);
  }

  deleteModal.classList.remove("show");
  deleteTargetId = null;
});

cancelDeleteBtn.addEventListener("click", () => {
  deleteModal.classList.remove("show");
  deleteTargetId = null;
});








