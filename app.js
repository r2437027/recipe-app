let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
let editIndex = null;

// Lưu hoặc cập nhật
function addRecipe() {
  const nameInput = document.getElementById('name');
  const ingredientsInput = document.getElementById('ingredients');
  const stepsInput = document.getElementById('steps');

  const name = nameInput.value.trim();
  const ingredients = ingredientsInput.value.trim();
  const steps = stepsInput.value.trim();

  if (!name) {
    alert("Chưa nhập tên món!");
    return;
  }

  if (editIndex === null) {
    // Thêm mới
    recipes.push({ name, ingredients, steps });
  } else {
    // Cập nhật
    recipes[editIndex] = { name, ingredients, steps };
    editIndex = null;
  }

  localStorage.setItem('recipes', JSON.stringify(recipes));

  nameInput.value = '';
  ingredientsInput.value = '';
  stepsInput.value = '';

  render();
}

// Hiển thị danh sách
function render(keyword = '') {
  const list = document.getElementById('recipeList');
  list.innerHTML = '';

  recipes
    .filter(r => r.name.toLowerCase().includes(keyword.toLowerCase()))
    .forEach((r, index) => {
      list.innerHTML += `
        <div class="recipe">
          <h3>${r.name}</h3>
          <b>Nguyên liệu</b><br>${r.ingredients}<br>
          <b>Cách làm</b><br>${r.steps}<br><br>
          <button onclick="editRecipe(${index})">✏️ Sửa</button>
          <button onclick="deleteRecipe(${index})" style="background:red;">🗑 Xoá</button>
        </div>
      `;
    });
}

// Xoá món
function deleteRecipe(index) {
  if (confirm("Bạn chắc chắn muốn xoá món này?")) {
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    render();
  }
}

// Chỉnh sửa
function editRecipe(index) {
  const recipe = recipes[index];

  document.getElementById('name').value = recipe.name;
  document.getElementById('ingredients').value = recipe.ingredients;
  document.getElementById('steps').value = recipe.steps;

  editIndex = index;
}

// Tìm kiếm
document.getElementById('search').addEventListener('input', e => {
  render(e.target.value);
});

render();
