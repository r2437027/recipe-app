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
