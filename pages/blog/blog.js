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
    <img src="../../image/mob.png" alt="Blog Image" class="full-post-image">
    <div class="full-post-details">
    <div class="full-personal-info">
      <h3 class="full-post-author">${post.author}</h3>
      <h4 class="full-post-publish-date">${post.publish_date}</h4>
      </div>
      <h2 class="full-post-title">${post.title}</h2>
      <div class="display-categories">${post.categories
        .map((category) => displayCategories(category).outerHTML)
        .join("")}</div>
      <p class="full-post-description">${post.description}</p>
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
        <a href="./blog.html?id=${
          post.id
        }" class="full-view-link" onclick="toggleFullView(event)">სრულად ნახვა
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.93415 13.0052C5.64125 13.2981 5.64125 13.773 5.93415 14.0659C6.22704 14.3587 6.70191 14.3587 6.99481 14.0659L5.93415 13.0052ZM14.2855 6.46446C14.2855 6.05024 13.9498 5.71445 13.5355 5.71446L6.78555 5.71445C6.37133 5.71445 6.03555 6.05024 6.03555 6.46445C6.03555 6.87867 6.37133 7.21445 6.78555 7.21445H12.7855V13.2145C12.7855 13.6287 13.1213 13.9645 13.5355 13.9645C13.9498 13.9645 14.2855 13.6287 14.2855 13.2145L14.2855 6.46446ZM6.99481 14.0659L14.0659 6.99478L13.0052 5.93412L5.93415 13.0052L6.99481 14.0659Z" fill="#5D37F3"/>
  </svg>
        </a>
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
fullPostElement.classList.add("full-blog-post");

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
//ვამატებ ბლოგ გვერდზე ამოყრილი პოსტებისთვის,ფუნქციას სადაც სრულად დაჭერისას გამოვა მთლიანი პოსტი
// async function loadData() {
//   const response = await fetch("../../data.json");
//   const data = await response.json();

//   data.forEach((post) => {
//     addPostToHTML(post);
//   });
// }

// function addPostToHTML(post) {
//   const postContainer = document.getElementById("posts-container");

//   const postElement = document.createElement("div");
//   postElement.classList.add("blog-post");
//   postElement.setAttribute(
//     "data-categories",
//     post.categories.map((item) => item.name).join("-")
//   );

//   postElement.innerHTML = `
//     <img src="${post.image}" alt="Blog Image" class="post-image">
//     <div class="post-details">
//     <div class="personal-info">
//       <h3 class="author">${post.author}</h3>
//       <h4 class="publish-date">${post.publish_date}</h4>
//       </div>
//       <h2 class="title">${post.title}</h2>
//       <div class="display-categories">${post.categories
//         .map((category) => displayCategories(category).outerHTML)
//         .join("")}</div>
//       <p class="description">${post.description}</p>
//       <a href="./pages/blog/blog.html?id=${
//         post.id
//       }" class="full-view-link" onclick="toggleFullView(event)">სრულად ნახვა
//     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path d="M5.93415 13.0052C5.64125 13.2981 5.64125 13.773 5.93415 14.0659C6.22704 14.3587 6.70191 14.3587 6.99481 14.0659L5.93415 13.0052ZM14.2855 6.46446C14.2855 6.05024 13.9498 5.71445 13.5355 5.71446L6.78555 5.71445C6.37133 5.71445 6.03555 6.05024 6.03555 6.46445C6.03555 6.87867 6.37133 7.21445 6.78555 7.21445H12.7855V13.2145C12.7855 13.6287 13.1213 13.9645 13.5355 13.9645C13.9498 13.9645 14.2855 13.6287 14.2855 13.2145L14.2855 6.46446ZM6.99481 14.0659L14.0659 6.99478L13.0052 5.93412L5.93415 13.0052L6.99481 14.0659Z" fill="#5D37F3"/>
// </svg>
//       </a>
//     </div>
//   `;

//   postContainer.appendChild(postElement);
// }
// loadData();
