async function loadData() {
  const response = await fetch("data.json");
  const data = await response.json();

  data.forEach((post) => {
    addPostToHTML(post);
  });
}
async function loadCategories() {
  const response = await fetch("categories.json");
  const dataCategories = await response.json();

  dataCategories.forEach((category) => {
    addCategoriesToHTML(category);
  });
}
function displayCategories(category) {
  const categoryButton = document.createElement("button");
  categoryButton.classList.add("category-button");
  categoryButton.style.backgroundColor = category.background_color;
  categoryButton.style.color = category.text_color;
  categoryButton.textContent = category.name;
  return categoryButton;
}
function addCategoriesToHTML(category) {
  const categoryButton = document.createElement("button");
  categoryButton.classList.add("category-button");
  categoryButton.style.backgroundColor = category.background_color;
  categoryButton.style.color = category.text_color;
  categoryButton.textContent = category.title;

  categoryButton.addEventListener("click", () => {
    console.log(`${category.title}`);
  });
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.appendChild(categoryButton);
}

loadCategories();

function addPostToHTML(post) {
  const postContainer = document.getElementById("posts-container");

  const postElement = document.createElement("div");
  postElement.classList.add("blog-post");

  postElement.innerHTML = `
    <img src="${post.image}" alt="Blog Image" class="post-image">
    <div class="post-details">
    <div class="personal-info">
      <h3 class="author">${post.author}</h3>
      <h4 class="publish-date">${post.publish_date}</h4>
      </div>
      <h2 class="title">${post.title}</h2>
      <div class="display-categories">${post.categories
        .map((category) => displayCategories(category).outerHTML)
        .join("")}</div>
      <p class="description">${post.description}</p>
      <a href="./pages/blog/blog.html?id=${
        post.id
      }" class="full-view-link" onclick="toggleFullView(event)">სრულად ნახვა
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.93415 13.0052C5.64125 13.2981 5.64125 13.773 5.93415 14.0659C6.22704 14.3587 6.70191 14.3587 6.99481 14.0659L5.93415 13.0052ZM14.2855 6.46446C14.2855 6.05024 13.9498 5.71445 13.5355 5.71446L6.78555 5.71445C6.37133 5.71445 6.03555 6.05024 6.03555 6.46445C6.03555 6.87867 6.37133 7.21445 6.78555 7.21445H12.7855V13.2145C12.7855 13.6287 13.1213 13.9645 13.5355 13.9645C13.9498 13.9645 14.2855 13.6287 14.2855 13.2145L14.2855 6.46446ZM6.99481 14.0659L14.0659 6.99478L13.0052 5.93412L5.93415 13.0052L6.99481 14.0659Z" fill="#5D37F3"/>
</svg>
      </a>
    </div>
  `;

  postContainer.appendChild(postElement);
}

loadData();
