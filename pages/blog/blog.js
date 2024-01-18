//url-დან მომაქვს id რადგან შევძლო იმის გაგება,თუ რომელი პოსტი მოაქვს
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}
async function loadData(id) {
  const response = await fetch("../../data.json");
  const data = await response.json();
  const post = data.find((item) => item.id == id); //წამოიღებს მთლიან ობიექტს
}
const fullPostContainer = document.getElementById("full-post-container");

const fullPostElement = document.createElement("div");
fullPostElement.classList.add("blog-post");

fullPostElement.innerHTML = `
    <img src="${blogId.image}" alt="Blog Image" class="post-image">
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
  `;

fullPostContainer.appendChild(fullPostElement);

const blogId = getQueryParam("id");
//აქ მოწმდებბა ის თუკი არ იარსებებს ასეთი id მაში გამოიტანოს კონსოლში ერორი
if (blogId) {
  loadData(blogId);
} else {
  console.error("No blog ID specified in the query parameters.");
}
