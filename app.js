let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

// thêm công thức
function addRecipe() {
  const name = document.getElementById('name').value;
  const ingredients = document.getElementById('ingredients').value;
  const steps = document.getElementById('steps').value;

  if (!name) {
    alert("Chưa nhập tên món!");
    return;
  }

  recipes.push({ name, ingredients, steps });
  localStorage.setItem('recipes', JSON.stringify(recipes));

  document.getElementById('name').value = '';
  document.getElementById('ingredients').value = '';
  document.getElementById('steps').value = '';

  render();
}

// hiển thị
function render(keyword = '') {
  const list = document.getElementById('recipeList');
  list.innerHTML = '';

  recipes
    .filter(r => r.name.toLowerCase().includes(keyword.toLowerCase()))
    .forEach(r => {
      list.innerHTML += `
        <div class="recipe">
          <h3>${r.name}</h3>
          <b>Nguyên liệu</b><br>${r.ingredients}<br>
          <b>Cách làm</b><br>${r.steps}
        </div>
      `;
    });
}

// tìm kiếm
document.getElementById('search').addEventListener('input', e => {
  render(e.target.value);
});

render();
