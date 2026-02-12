let editId = null;

async function addRecipe() {
  const name = document.getElementById('name').value;
  const ingredients = document.getElementById('ingredients').value;
  const steps = document.getElementById('steps').value;

  if (!name) {
    alert("Chưa nhập tên món!");
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
        <b>Nguyên liệu</b><br>${r.ingredients}<br>
        <b>Cách làm</b><br>${r.steps}<br><br>
        <button onclick="editRecipe('${docSnap.id}', '${r.name}', '${r.ingredients}', '${r.steps}')">✏️整理</button>
        <button onclick="deleteRecipe('${docSnap.id}')">🗑 削除</button>
      </div>
    `;
  });
}

async function deleteRecipe(id) {
  await deleteDoc(doc(db, "recipes", id));
  loadRecipes();
}

function editRecipe(id, name, ingredients, steps) {
  document.getElementById('name').value = name;
  document.getElementById('ingredients').value = ingredients;
  document.getElementById('steps').value = steps;
  editId = id;
}

loadRecipes();
