const enterPopUp = document.getElementById('button');
const logInPopUp = document.getElementById('logInPopUp');
const removePopUp = document.querySelector('.remove');
const successPopUp = document.getElementById('successPopUp')
const enterButton = document.querySelector('.enter');
const emailInput = document.querySelector('.inputMail');
const notFoundDiv = document.querySelector('.noMail');
const agreeButton = document.querySelector('.agree');
const overlay = document.querySelector('.overlay');

//ვაჭერთ შესვლის ღილაკს და ჩნდება დალოგინების ფანჯარა
enterPopUp.addEventListener('click', function() {
    logInPopUp.style.display='flex';
    overlay.style.display = 'block';
});

removePopUp.addEventListener('click', function(){
    overlay.style.display = 'none';
    logInPopUp.style.display = 'none';
    successPopUp.style.display='none';
})

// აქ შეგვყავს მეილი და მოწმდება რამდენად ვალიდურია
enterButton.addEventListener('click', function() {
    // Regular expression for checking if the email ends with "@redberry.ge"
    const re = /@redberry\.ge$/;

    if (re.test(emailInput.value.trim())) {
        logInPopUp.style.display = 'none';
        successPopUp.style.display='flex';
    } else {
        notFoundDiv.style.display = 'flex';
    }
});

// ვაწვებით ღილაკს "კარგი" და ვხურავთ ფანჯარას
agreeButton.addEventListener('click', function(){
    successPopUp.style.display='none';
    overlay.style.display = 'none';
})
