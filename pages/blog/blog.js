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

const blogId = getQueryParam("id");
//აქ მოწმდებბა ის თუკი არ იარსებებს ასეთი id მაში გამოიტანოს კონსოლში ერორი
if (blogId) {
  loadData(blogId);
} else {
  console.error("No blog ID specified in the query parameters.");
}
