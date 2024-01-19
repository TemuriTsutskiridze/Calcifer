//url-დან მომაქვს id რადგან შევძლო იმის გაგება,თუ რომელი პოსტი მოაქვს
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}
let post;
async function loadData(id) {
  const response = await fetch("../../data.json");
  const data = await response.json();
  post = data.find((item) => item.id == id); //წამოიღებს მთლიან ობიექტს
  fullPostElement.innerHTML = `
    <img src="../../image/mob.png" alt="Blog Image" class="post-image">
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
  //მომაქვს დაკლიკულ პოსტზე არსებული კატეგორიები
  const clickedPostCategories = post.categories.map(
    (categoryName) => categoryName.name
  );
  //ვაბრუნებ ობიექტს რომლის ერთი კატეგორია მაინც ემთხვევა მთლიანი პოსტის კატეგორიებს
  const similarPosts = data.filter((postObj) => {
    return postObj.categories.some((category) =>
      clickedPostCategories.includes(category.name)
    );
  });
  // renderSimilarPosts არის ფუნქცია სადაც ვლუპავ დაბრუნებულ მასივს foreeach-ით და ვამატებ კონტეიბერსი
  //მსგავს პოსტებს
  function renderSimilarPosts() {
    const similarPostsContainer = document.getElementById("similar-posts");
    similarPostsContainer.innerHTML = ""; // თავიდან უნდა გვქონდეს ცარიელი მასივი

    //დავლიპოთ და დავამატოთ html-ში
    similarPosts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.innerHTML = `
      <img src="../../image/mob.png" alt="Blog Image" class="post-image">
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
        <a href="fullpost.html">See more...</a>
      </div>
    `;

      similarPostsContainer.appendChild(postElement);
    });
  }

  // ვიძახებ მსგავსი პოსტების დამატების ფუნქციას.
  renderSimilarPosts();
}

function displayCategories(category) {
  const categoryButton = document.createElement("button");
  categoryButton.classList.add("category-button");
  categoryButton.style.backgroundColor = category.background_color;
  categoryButton.style.color = category.text_color;
  categoryButton.textContent = category.name;
  return categoryButton;
}
const fullPostContainer = document.getElementById("full-post-container");
console.log(fullPostContainer);
const fullPostElement = document.createElement("div");
fullPostElement.classList.add("blog-post");

fullPostContainer.appendChild(fullPostElement);

const blogId = getQueryParam("id");
//აქ მოწმდებბა ის თუკი არ იარსებებს ასეთი id მაში გამოიტანოს კონსოლში ერორი
if (blogId) {
  loadData(blogId);
} else {
  console.error("No blog ID specified in the query parameters.");
}
/*********************************/
/*SLIDER SECTION*/
/*********************************/
//svg ფუნქცია,წინა გვერდზე დასაბრუნებლად
//blog.html-ში ვამატებ svg -ს onclick-ს რომელშიც ვიძახებ goBack ფუნქციას
function goBack() {
  window.history.back();
}
/*********************************/
/*SLIDER SECTION*/
/*********************************/
//ამ სექციისთვის განკუტვნილი კოდი,ყველაფერი ჩავსვი loadData ფუნქციაში
