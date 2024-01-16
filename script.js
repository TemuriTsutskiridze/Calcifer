const enterPopUp = document.getElementById('button');
const logInPopUp = document.getElementById('logInPopUp');
const successPopUp = document.getElementById('successPopUp')
const enterButton = document.querySelector('.enter');
const emailInput = document.querySelector('.inputMail');
const notFoundDiv = document.querySelector('.noMail');
const agreeButton = document.querySelector('.agree');

//ვაჭერთ შესვლის ღილაკს და ჩნდება დალოგინების ფანჯარა
enterPopUp.addEventListener('click', function() {
    logInPopUp.style.display='flex';
});

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
})
