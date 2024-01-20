document.addEventListener("DOMContentLoaded", function () {
    // img upload
    let dropArea = document.getElementById("drop-area");
    let inputFile = document.getElementById("file-input");
    let fileIsUploaded = document.getElementById("fileIsUploaded");
    let file;
    
    inputFile.addEventListener("change", uploadImage);
    
    function uploadImage() {
        file = inputFile.files[0];
    
        if (file && file.type.startsWith('image/')) {
            let reader = new FileReader();
    
            reader.onload = function (e) {
                console.log("img upload function called");
                updateImgUploadView();
                console.log(file);  
            };
    
            reader.readAsDataURL(file);
        } else {
            console.log("No valid image file selected");
        }
    }
    
    function updateImgUploadView() {
        dropArea.style.display = "none";
        fileIsUploaded.style.display = "block";
        fileIsUploaded.textContent = `${file.name}`;
        console.log("updateImgUploadView function called")
    }


    dropArea.addEventListener("dragover", function (e) {
        e.preventDefault();
        dropArea.classList.add("drag-over");
    });

    dropArea.addEventListener("dragleave", function () {
        dropArea.classList.remove("drag-over");
    });

    dropArea.addEventListener("drop", function (e) {
        e.preventDefault();
        dropArea.classList.remove("drag-over");
        inputFile.files = e.dataTransfer.files;
        uploadImage();
    });
    

// adding article data to server
let publishBtn = document.getElementById("publish");
publishBtn.addEventListener("click", function () {
    // Collect form data
    let title = document.getElementById("titleInput").value;
    let description = document.getElementById("descriptionText").value;
    let image = file ? file.name : "";
    let publishDate = document.getElementById("release").value;
    let category = document.getElementById("articleCategory").innerText;
    let author = document.getElementById("authorInput").value;

    // Create data object
    let newData = {
        id: Math.floor(Math.random() * 1000000) + 1;,
        title: title,
        description: description,
        image: image,
        publish_date: publishDate,
        categories: [
            {
                id: this.id;
                name: category,
                text_color: "#ffffff",
                background_color: "#000000"
            }
        ],
        author: author
    };

    // Fetch existing data from the server
    fetch('/Calcifer/data1.json')
        .then(response => response.json())
        .then(existingData => {
            existingData.push(newData);

            // Save the updated data back to the server
            return fetch('/Calcifer/data1.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(existingData, null, 2),
            });
        })
        .then(() => {
            console.log('Data added successfully');
            showSuccessMessage();
        })
        .catch(error => console.error('Error adding data:', error));
});


    // Remove uploaded file
    let removeBtn = document.getElementById('removeX');
    // let fileIsUploaded = document.getElementById("fileIsUploaded");

    removeBtn.addEventListener('click', function () {
        fileIsUploaded.style.display = 'none';
        dropArea.style.display = 'flex';
    });
    

    // Author validation
    let authorInput = document.getElementById("authorInput");
    let listItems = document.querySelectorAll('.authorName ul li');
    let firstListItem = listItems[0];
    let secondListItem = listItems[1];
    let thirdListItem = listItems[2];

    authorInput.addEventListener("input", function () {
        validateAuthor();
        checkAllValidations();
    });

    // Title validation
    let titleInput = document.getElementById("titleInput");
    let titleSymbols = document.getElementById('titleSymbols');

    titleInput.addEventListener("input", function () {
        validateTitle();
        checkAllValidations();
    });

    // Description validation
    let descriptionInput = document.getElementById("descriptionText");
    let numOfSym = document.getElementById('numOfSym');

    descriptionInput.addEventListener("input", function () {
        validateDescription();
        checkAllValidations();
    });

    // choose category
    let arrowDown = document.getElementById("arrow-down");
    let listCategory = document.getElementById("categoryList");
    let emailBlock = document.getElementById('emailAddress');
    let articleCategory = document.getElementById('articleCategory');
    

    arrowDown.addEventListener("click", function() {
        console.log("Clicked on arrow-down");
        listCategory.style.display = (listCategory.style.display === "none" || listCategory.style.display === "") ? "flex" : "none";
        emailBlock.style.marginTop = (emailBlock.style.marginTop === "-122px") ? "24px" : "-122px";
    });

// Array of element IDs
const elementIds = ["market", "app", "ai", "ui", "research", "figma"];

function copyContent(element) {
  if (articleCategory.innerHTML === "აირჩიეთ კატეგორია") {
    articleCategory.innerHTML = "";
  }


  let wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add("copied-element-wrapper");

  // Clone the clicked element
  let clonedElement = element.cloneNode(true);

let originalElementStyles = window.getComputedStyle(element);
let originalBackgroundColor = originalElementStyles.backgroundColor;
wrapperDiv.style.backgroundColor = originalBackgroundColor;


clonedElement.style.backgroundColor = 'transparent';

  // Create a close button
  let closeButton = document.createElement("span");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = `<img src="/Calcifer/images/add.svg" alt="close">`;


  // Add a click event listener to the close button
  closeButton.addEventListener("click", function () {
    // Remove the corresponding element when the close button is clicked
    wrapperDiv.remove();
  });

  // Append the cloned element and close button to the wrapper div
  wrapperDiv.appendChild(clonedElement);
  wrapperDiv.appendChild(closeButton);


  // Append the wrapper div to the copied elements container
  articleCategory.appendChild(wrapperDiv);
}

// Add event listeners to each element using a loop
elementIds.forEach(function (id) {
  let element = document.getElementById(id);
  element.addEventListener("click", function () {
    copyContent(element);
  });
});


    // Email validation
    let emailInput = document.getElementById('email');
    let emailError = document.getElementById('emailError');

    emailInput.addEventListener('input', function () {
        validateEmail();
        checkAllValidations();
    });



    function validateAuthor() {
        let authorInputValue = authorInput.value;
        let georgianAlphabetRegex = /^[\u10A0-\u10FF\s.,;:'"-]+$/;

        if (authorInputValue.length < 4) {
            firstListItem.style.color = "#EA1919";
        } else {
            firstListItem.style.color = "#14D81C";
        }

        if (authorInputValue.split(" ").length < 2) {
            secondListItem.style.color = "#EA1919";
        } else {
            secondListItem.style.color = "#14D81C";
        }

        if (!georgianAlphabetRegex.test(authorInputValue)) {
            thirdListItem.style.color = "#EA1919";
        } else {
            thirdListItem.style.color = "#14D81C";
        }
    }

    function validateTitle() {
        let titleInputValue = titleInput.value;

        if (titleInputValue.length < 4) {
            titleSymbols.style.color = "#EA1919";
        } else {
            titleSymbols.style.color = "#14D81C";
        }
    }

    function validateDescription() {
        let descriptionInputValue = descriptionInput.value;

        if (descriptionInputValue.length < 2) {
            numOfSym.style.color = "#EA1919";
        } else {
            numOfSym.style.color = "#14D81C";
        }
    }

    function validateEmail() {
        let re = /@redberry\.ge$/;

        if (re.test(emailInput.value.trim())) {
            emailInput.style.borderColor = "";
            emailError.style.display = "none";
        } else {
            emailInput.style.borderColor = "#EA1919";
            emailInput.style.background = "#FAF2F3";
            emailError.style.display = "flex";
        }
    }


    // Function to check all validations
    // let publishBtn = document.getElementById("publish");
function checkAllValidations() {
    let isValid =
        firstListItem.style.color === "#14D81C" &&
        secondListItem.style.color === "#14D81C" &&
        thirdListItem.style.color === "#14D81C" &&
        titleSymbols.style.color === "#14D81C" &&
        numOfSym.style.color === "#14D81C" &&
        emailInput.style.borderColor !== "#EA1919";



    if (isValid) {
        publishBtn.style.background = "green";
    } else {
        publishBtn.style.background = "#E4E3EB";
    }
}

// Event listener to show success message
publishBtn.addEventListener("click", function () {
    successPopUp.style.display = "flex";
    successOverlay.style.display = "flex";
});

// Event listener to remove success message
let xRemove = document.getElementById('xRemove');
let successPopUp = document.getElementById('addSuccess');
let successOverlay = document.getElementById('overlayPage');

xRemove.addEventListener("click", function () {
    successPopUp.style.display = 'none';
    successOverlay.style.display = 'none';
});

    
});
