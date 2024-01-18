document.addEventListener("DOMContentLoaded", function () {
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

    // Remove uploaded file
    const dropArea = document.getElementById("drop-area");
    const removeBtn = document.getElementsByClassName('removeX')[0];
    const fileIsUploaded = document.getElementById("fileIsUploaded");

    removeBtn.addEventListener('click', function () {
        fileIsUploaded.style.display = 'none';
        dropArea.style.display = 'flex';
    });

    function validateAuthor() {
        let authorInputValue = authorInput.value;
        const georgianAlphabetRegex = /^[\u10A0-\u10FF\s.,;:'"-]+$/;

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
        const re = /@redberry\.ge$/;

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

        const publishBtn = document.getElementById("publish");

        if (isValid) {
            publishBtn.style.background = "green";
        } else {
            publishBtn.style.background = "#E4E3EB";
        }
    }
});
