document.addEventListener("DOMContentLoaded", function () {
    // img upload
    let dropArea = document.getElementById("drop-area");
    let inputFile = document.getElementById("input-file");
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
                // createAndAppendNewDataObject(imageName, imgLink);
                // let imgLink = e.target.result;      
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


    // function createAndAppendNewDataObject(imageName, imgLink) {
    //     let newData = {
    //         id: 90,
    //         title: titleInput,
    //         description: "New Blog Description",
    //         image: imgLink,
    //         publish_date: "2024-01-19",
    //         categories: [
    //             {
    //                 id: 14,
    //                 name: "New Category",
    //                 text_color: "#000000",
    //                 background_color: "#ffffff"
    //             }
    //         ],
    //         author: "New Author"
    //     };

    //     fetch('./data1.json', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(newData, null, 2),
    //     })
    //     .then(() => console.log('Data updated successfully'))
    //     .catch(error => console.error('Error updating data:', error));
    // }


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


    // ეს ვერ ავამუშავე ჯერ
    function checkAllValidations() {
        let isValid = (
            firstListItem.style.color === "#14D81C" &&
            secondListItem.style.color === "#14D81C" &&
            thirdListItem.style.color === "#14D81C" &&
            titleSymbols.style.color === "#14D81C" &&
            numOfSym.style.color === "#14D81C" &&
            emailInput.style.borderColor !== "#EA1919"
        );

        let publishBtn = document.getElementById("publish");

        if (isValid) {
            publishBtn.style.background = "green";
        } else {
            publishBtn.style.background = "#E4E3EB";
        }
    }
});
