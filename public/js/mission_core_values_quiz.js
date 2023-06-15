
//THESE PARSE FUNCTIONS INITIALIZE PARSE IN ORDER TO ACCESS THE DATABASE. THE TWO PARAMETERS USED IN THE 
//PARSE.INITIALIZE ARE THE APP_KEY AND THE JAVASCRIPT KEY FOR THE APPLICATION. THE PARSE.SERVERURL IS THE
//STANDARD API URL USED BY B4APP AND IS THE SAME ACROSS ALL APPS

Parse.initialize("W4ODQlsrgGOJ6fxJu057HTW3jaXCXjBqeHFWxcp2", "v8fhfB44i0sdfVwgt7t2WTo2k4VtxHeSUMRz8HZj");
Parse.serverURL = "https://parseapi.back4app.com/";

//END OF PARSE FUNCTIONS


//GLOBAL VARIABLES

let randNum = null;
let report_question_text = null;
let questionRepo = null;
const question = document.getElementById("question");
const rightWrong = document.getElementById("rightWrong");
const next = document.getElementById("next");

//END OF GLOBAL VARIABLES


//FUNCTION TO RESET ALL FIELDS ON THE PAGE. IT RESETS FIELDS CHANGED FROM BLUE TO GREEN,
//YELLOW, OR RED BACK TO BLUE AND FONT COLORS BACK TO WHITE. ALSO RETURNS FIELDS DISPLAY
//PROPERTY BACK TO NONE TO PREVENT INTERFERENCE WITH OTHER QUESTION FORMATS

const resetPage = () =>{
    document.getElementById("true").innerHTML = "";
    document.getElementById("true").style.display = "none";
    document.getElementById("true").style.background = "rgb(1, 1, 65)"
    document.getElementById("true").style.color = "#fff";
    document.getElementById("false").innerHTML = "";
    document.getElementById("false").style.display = "none";
    document.getElementById("false").style.background = "rgb(1, 1, 65)"
    document.getElementById("false").style.color = "#fff";

    for(let i = 1; i < 9; i++){
        document.getElementById(`answer${i}`).innerHTML = "";
        document.getElementById(`answer${i}`).style.display = "none";
        document.getElementById(`answer${i}`).style.background = "rgb(1, 1, 65)"
        document.getElementById(`answer${i}`).style.color = "#fff";
        document.getElementById(`answer${i}`).style.fontSize = "1.2rem";
    }

    rightWrong.innerHTML = "";
    document.getElementById("question_details").style.display = "none";
    document.getElementById("question_details").innerHTML = "";
    document.getElementById("report").style.display = "block";
    document.getElementById("reported").style.display = "none";
    document.getElementById("report_box").style.display = "none";
}

next.addEventListener("click", resetPage);

//END OF RESET PAGE FUNCTION


//THE REPORT FUNCTION THAT ALLOWS THE USER TO REPORT A QUESTION FOR REVIEW

document.getElementById("report").addEventListener("click", ()=>{
    document.getElementById("report_box").style.display = "block";
    document.getElementById("question_number").value = randNum;
    document.getElementById("question_text").value = report_question_text;
});

document.getElementById("cancel_report").addEventListener("click", ()=>{
    document.getElementById("report_box").style.display = "none";
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbw7LxvmwgnDF4b52yiuQK9BQWR4UJm_bkcXhSzseafIKw8GQeklrbGUKI0zGPvuoRzT0Q/exec';
const form = document.forms['submit-to-google-sheet']

const report_question = () =>{
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        console.log("Success!", response);
        document.getElementById("report").style.display = "none";
        document.getElementById("reported").style.display = "block";
        document.getElementById("report_box").style.display = "none";
        form.reset();
    })
    .catch(error => console.error('Error!', error.message))
}

document.getElementById("report_submit").addEventListener("click", report_question);

//END OF REPORT FUNCTION


//THE TRUE OR FALSE QUESTION FORMAT FUNCITON. THIS FUNCTION MANIPULATES THE PAGE TO SERVE
//A TRUE OR FALSE QUESTION

const trueOrFalse = questionObj =>{
    question.innerHTML = questionObj.question;
    report_question_text = questionObj.question;
    let correctAnswer = questionObj.correctAnswer;
    console.log(correctAnswer);

    var tr = document.getElementById("true");
    tr.style.display = "block";
    tr.innerHTML = "True";
    var fl = document.getElementById("false");
    fl.style.display = "block";
    fl.innerHTML = "False";

    const answerCheckTrue = () =>{
        if(correctAnswer === "true"){
            tr.style.background = "green";
            rightWrong.innerHTML = "Correct!";
        }else{
            tr.style.background = "red";
            tr.style.color = "black";
            rightWrong.innerHTML = "Incorrect!";
            fl.style.background = "green";
        }
        tr.removeEventListener("click", answerCheckTrue);
        fl.removeEventListener("click", answerCheckFalse);
    }

    const answerCheckFalse = () =>{
        if(correctAnswer === "false"){
            fl.style.background = "green";
            rightWrong.innerHTML = "Correct!";
        }else{
            fl.style.background = "red";
            fl.style.color = "black";
            rightWrong.innerHTML = "Incorrect!";
            tr.style.background = "green";
            }
        tr.removeEventListener("click", answerCheckTrue);
        fl.removeEventListener("click", answerCheckFalse);
    }

    tr.addEventListener("click", answerCheckTrue);
    fl.addEventListener("click", answerCheckFalse);
}

//END OF TRUE AND FALSE FUNCTION


//THE SELECT ALL THAT APPLY FUNCTION. THIS FUNCTION MANIPULATES THE PAGE TO SERVE 
//A SELECT ALL THAT APPLY QUESTION. IT WILL CHANGE THE NECESSARY ELEMENTS DISPLAY TO 
//BLOCK AND INJECT TO NECESSARY TEXT. IT WILL ADD EVENT LISTENERS AND REMOVE THEM WHEN
//DONE IT WILL ALSO RUN AN ANSWER CHECK TO VERIFY IF THE USER ANSWERED THE QUESTION CORRECTLY.

const selectAllThatApply = questionObj =>{
    question.innerHTML = questionObj.question;
    report_question_text = questionObj.question;
    let correctAnswerList = questionObj.correctAnswer;
    console.log(correctAnswerList);
    let selectedAnswerList = [];
    console.log(selectedAnswerList);
    next.innerHTML = "Submit";
    next.removeEventListener("click", resetPage);
    next.removeEventListener("click", questionGenerator);

    for(let i in questionObj) {
        if(i === "questionType" || i === "question" || i === "correctAnswer"){
            continue;
        }else{
            console.log(questionObj[i]);
            document.getElementById(i).style.display = "block";
            document.getElementById(i).innerHTML = questionObj[i];
            document.getElementById(i).style.fontSize = "14px";
        }
    }
    
    document.getElementById("question_details").style.display = "block";
    document.getElementById("question_details").innerHTML = "Select all that apply. All selected are highlighted in yellow. Submit after making selections."

    const answer1 = document.getElementById("answer1");
    const answer2 = document.getElementById("answer2");
    const answer3 = document.getElementById("answer3");
    const answer4 = document.getElementById("answer4");
    const answer5 = document.getElementById("answer5");
    const answer6 = document.getElementById("answer6");
    const answer7 = document.getElementById("answer7");
    const answer8 = document.getElementById("answer8");

    const answer1Toggle = () =>{
        if(selectedAnswerList.includes("answer1") === false){
            document.getElementById("answer1").style.background = "yellow";
            document.getElementById("answer1").style.color = "black";
            selectedAnswerList.push("answer1");
            console.log(selectedAnswerList);
        }else if(selectedAnswerList.includes("answer1") === true){
            document.getElementById("answer1").style.background = "rgb(1, 1, 65)";
            document.getElementById("answer1").style.color = "#fff";
            let index = selectedAnswerList.indexOf("answer1");
            console.log(index);
            selectedAnswerList.splice(index, 1);
            console.log(selectedAnswerList);
        }
    }

    const answer2Toggle = () =>{
        if(selectedAnswerList.includes("answer2") === false){
            document.getElementById("answer2").style.background = "yellow";
            document.getElementById("answer2").style.color = "black";
            selectedAnswerList.push("answer2");
            console.log(selectedAnswerList);
        }else if(selectedAnswerList.includes("answer2") === true){
            document.getElementById("answer2").style.background = "rgb(1, 1, 65)";
            document.getElementById("answer2").style.color = "#fff";
            let index = selectedAnswerList.indexOf("answer2");
            console.log(index);
            selectedAnswerList.splice(index, 1);
            console.log(selectedAnswerList);
        }
    }

    const answer3Toggle = () =>{
        if(selectedAnswerList.includes("answer3") === false){
            document.getElementById("answer3").style.background = "yellow";
            document.getElementById("answer3").style.color = "black";
            selectedAnswerList.push("answer3");
            console.log(selectedAnswerList);
        }else if(selectedAnswerList.includes("answer3") === true){
            document.getElementById("answer3").style.background = "rgb(1, 1, 65)";
            document.getElementById("answer3").style.color = "#fff";
            let index = selectedAnswerList.indexOf("answer3");
            console.log(index);
            selectedAnswerList.splice(index, 1);
            console.log(selectedAnswerList);
        }
    }

    const answer4Toggle = () =>{
        if(selectedAnswerList.includes("answer4") === false){
            document.getElementById("answer4").style.background = "yellow";
            document.getElementById("answer4").style.color = "black";
            selectedAnswerList.push("answer4");
            console.log(selectedAnswerList);
        }else if(selectedAnswerList.includes("answer4") === true){
            document.getElementById("answer4").style.background = "rgb(1, 1, 65)";
            document.getElementById("answer4").style.color = "#fff";
            let index = selectedAnswerList.indexOf("answer4");
            console.log(index);
            selectedAnswerList.splice(index, 1);
            console.log(selectedAnswerList);
        }
    }

    const answer5Toggle = () =>{
        if(selectedAnswerList.includes("answer5") === false){
            document.getElementById("answer5").style.background = "yellow";
            document.getElementById("answer5").style.color = "black";
            selectedAnswerList.push("answer5");
            console.log(selectedAnswerList);
        }else if(selectedAnswerList.includes("answer5") === true){
            document.getElementById("answer5").style.background = "rgb(1, 1, 65)";
            document.getElementById("answer5").style.color = "#fff";
            let index = selectedAnswerList.indexOf("answer5");
            console.log(index);
            selectedAnswerList.splice(index, 1);
            console.log(selectedAnswerList);
        }
    }

    const answer6Toggle = () =>{
        if(selectedAnswerList.includes("answer6") === false){
            document.getElementById("answer6").style.background = "yellow";
            document.getElementById("answer6").style.color = "black";
            selectedAnswerList.push("answer6");
            console.log(selectedAnswerList);
        }else if(selectedAnswerList.includes("answer6") === true){
            document.getElementById("answer6").style.background = "rgb(1, 1, 65)";
            document.getElementById("answer6").style.color = "#fff";
            let index = selectedAnswerList.indexOf("answer6");
            console.log(index);
            selectedAnswerList.splice(index, 1);
            console.log(selectedAnswerList);
        }
    }

    const answer7Toggle = () =>{
        if(selectedAnswerList.includes("answer7") === false){
            document.getElementById("answer7").style.background = "yellow";
            document.getElementById("answer7").style.color = "black";
            selectedAnswerList.push("answer7");
            console.log(selectedAnswerList);
        }else if(selectedAnswerList.includes("answer7") === true){
            document.getElementById("answer7").style.background = "rgb(1, 1, 65)";
            document.getElementById("answer7").style.color = "#fff";
            let index = selectedAnswerList.indexOf("answer7");
            console.log(index);
            selectedAnswerList.splice(index, 1);
            console.log(selectedAnswerList);
        }
    }

    const answer8Toggle = () =>{
        if(selectedAnswerList.includes("answer8") === false){
            document.getElementById("answer8").style.background = "yellow";
            document.getElementById("answer8").style.color = "black";
            selectedAnswerList.push("answer8");
            console.log(selectedAnswerList);
        }else if(selectedAnswerList.includes("answer8") === true){
            document.getElementById("answer8").style.background = "rgb(1, 1, 65)";
            document.getElementById("answer8").style.color = "#fff";
            let index = selectedAnswerList.indexOf("answer8");
            console.log(index);
            selectedAnswerList.splice(index, 1);
            console.log(selectedAnswerList);
        }
    }

    answer1.addEventListener("click", answer1Toggle);
    answer2.addEventListener("click", answer2Toggle);
    answer3.addEventListener("click", answer3Toggle);
    answer4.addEventListener("click", answer4Toggle);
    answer5.addEventListener("click", answer5Toggle);
    answer6.addEventListener("click", answer6Toggle);
    answer7.addEventListener("click", answer7Toggle);
    answer8.addEventListener("click", answer8Toggle);

    const answerCheck = () =>{
        let listMatch = false;
        selectedAnswerList.sort();
        for(let i = 0; i < selectedAnswerList.length; i++){
            if(selectedAnswerList[i] != correctAnswerList[i]){
                console.log(selectedAnswerList[i] + " != " + correctAnswerList[i]);
                listMatch = false;
                break;
            }else{
                listMatch = true;
            }        
        }
        if(listMatch){
            rightWrong.innerHTML = "Correct!";
            for(let i = 0; i < correctAnswerList.length; i++){
                document.getElementById(correctAnswerList[i]).style.background = "green";
            }
        }else{
            rightWrong.innerHTML = "Incorrect!";
            for(let i = 0; i < selectedAnswerList.length; i++){
                document.getElementById(selectedAnswerList[i]).style.background = "red";
                document.getElementById(selectedAnswerList[i]).style.color = "black";
            }
            for(let i = 0; i < correctAnswerList.length; i++){
                console.log(correctAnswerList[i]);
                document.getElementById(correctAnswerList[i]).style.background = "green";
                document.getElementById(correctAnswerList[i]).style.color = "white";
            }
        }
        
        answer1.removeEventListener("click", answer1Toggle);
        answer2.removeEventListener("click", answer2Toggle);
        answer3.removeEventListener("click", answer3Toggle);
        answer4.removeEventListener("click", answer4Toggle);
        answer5.removeEventListener("click", answer5Toggle);
        answer6.removeEventListener("click", answer6Toggle);
        answer7.removeEventListener("click", answer7Toggle);
        answer8.removeEventListener("click", answer8Toggle);
        
        next.removeEventListener("click", answerCheck);
        selectedAnswerList = [];
        next.innerHTML = "Next";
        next.addEventListener("click", resetPage);
        next.addEventListener("click", questionGenerator);
    }

    next.addEventListener("click", answerCheck);
}   

//END OF SELECT ALL THAT APPLY


//THE MULTIPLE CHOICE FUNCTION. THIS FUNCTION MANIPULATES THE PAGE TO SERVE THE USER
//A MULTIPLE CHOICE QUESTION. THIS FUNCTION WILL CHANGE THE NECESSARY FIELDS DISPLAY FROM
//NONE TO BLOCK. IT WILL INJECT THE APPROPRIATE TEXT AND WILL ADD EVENT LISTENERS AND 
//REMOVE THEM AS NECESSARY. IT WILL ALSO VERIFY IF THE USER ANSWERED THE QUESTION CORRECTLY.

const multipleChoice = questionObj =>{
    question.innerHTML = questionObj.question;
    report_question_text = questionObj.question;
    let correctAnswer = questionObj.correctAnswer;
    console.log(correctAnswer);

    const answer1 = document.getElementById("answer1");
    answer1.style.display = "block";
    answer1.innerHTML = questionObj.answer1;
    const answer2 = document.getElementById("answer2");
    answer2.style.display = "block";
    answer2.innerHTML = questionObj.answer2;
    const answer3 = document.getElementById("answer3");
    answer3.style.display = "block";
    answer3.innerHTML = questionObj.answer3;
    const answer4 = document.getElementById("answer4");
    answer4.style.display = "block";
    answer4.innerHTML = questionObj.answer4;

    
    const answerCheck1 = () =>{
        if(correctAnswer === "answer1"){
            answer1.style.background = "green";
            rightWrong.innerHTML = "Correct!";
        }else{
            answer1.style.background = "red";
            answer1.style.color = "black";
            rightWrong.innerHTML = "Incorrect!";
            document.getElementById(`${correctAnswer}`).style.background = "green";
        }
    }
    
    const answerCheck2 = () =>{
        if(correctAnswer === "answer2"){
            answer2.style.background = "green";
            rightWrong.innerHTML = "Correct!";
        }else{
            answer2.style.background = "red";
            answer2.style.color = "black";
            rightWrong.innerHTML = "Incorrect!";
            document.getElementById(`${correctAnswer}`).style.background = "green";
        }
    }
    
    const answerCheck3 = () =>{
        if(correctAnswer === "answer3"){
            answer3.style.background = "green";
            rightWrong.innerHTML = "Correct!";
        }else{
            answer3.style.background = "red";
            answer3.style.color = "black";
            rightWrong.innerHTML = "Incorrect!";
            document.getElementById(`${correctAnswer}`).style.background = "green";
        }
    }
    
    const answerCheck4 = () =>{
        if(correctAnswer === "answer4"){
            answer4.style.background = "green";
            rightWrong.innerHTML = "Correct!";
        }else{
            answer4.style.background = "red";
            answer4.style.color = "black";
            rightWrong.innerHTML = "Incorrect!";
            document.getElementById(`${correctAnswer}`).style.background = "green";
        }
    }

    answer1.addEventListener("click", answerCheck1);
    answer1.addEventListener("click", () =>{
    answer1.removeEventListener("click", answerCheck1);
    answer2.removeEventListener("click", answerCheck2);
    answer3.removeEventListener("click", answerCheck3);
    answer4.removeEventListener("click", answerCheck4);
    });

    answer2.addEventListener("click", answerCheck2);
    answer2.addEventListener("click", () =>{
    answer1.removeEventListener("click", answerCheck1);
    answer2.removeEventListener("click", answerCheck2);
    answer3.removeEventListener("click", answerCheck3);
    answer4.removeEventListener("click", answerCheck4);
    });

    answer3.addEventListener("click", answerCheck3);
    answer3.addEventListener("click", () =>{
    answer1.removeEventListener("click", answerCheck1);
    answer2.removeEventListener("click", answerCheck2);
    answer3.removeEventListener("click", answerCheck3);
    answer4.removeEventListener("click", answerCheck4);
    });

    answer4.addEventListener("click", answerCheck4);
    answer4.addEventListener("click", () =>{
    answer1.removeEventListener("click", answerCheck1);
    answer2.removeEventListener("click", answerCheck2);
    answer3.removeEventListener("click", answerCheck3);
    answer4.removeEventListener("click", answerCheck4);
    });
}

//END OF MULTIPLE CHOICE FUNCTION


//THE QUESTION GENERATOR FUNCTION. THIS FUNCTION WILL GENERATE A QUESTION EVERY TIME THE PAGE
//IS LOADED OR THE NEXT BUTTON IS CLICKED. THIS FUNCTION WILL CHOOSE A QUESTION RANDOMLY WITH
//A RANDOM NUMBER GENERATOR, PULL THE QUESTION FROM THE QUESTION REPO, AND THEN CALL THE NECESSARY
//FUNCTION BASED ON THE QUESTION TYPE TO SERVE THE QUESTION TO THE USER

const questionGenerator = () =>{
    let questionCount = 0;
    for (let i in questionRepo) {
        questionCount += 1;
    }
    randNum = Math.floor(Math.random() * questionCount + 1);
    const questionObj = questionRepo[randNum];

    if(questionObj.questionType === "multipleChoice"){
        multipleChoice(questionObj);
    }else if(questionObj.questionType === "trueOrFalse"){
        trueOrFalse(questionObj);
    }else if(questionObj.questionType === "selectAllThatApply"){
        selectAllThatApply(questionObj);
    }else{
        console.log("Question Generation Error");
    }
}

next.addEventListener("click", questionGenerator);

//END OF QUESTION GENERATOR FUNCTION


//THIS FUNCTION IS THE MOST IMPORTANT FUNCTION. IT WILL PULL THE QUESTION REPO FROM THE DATABASE AND STORE
//THE QUESTION REPO OBJECT INTO A VARIABLE FOR USE ON THIS PAGE. THIS FUNCTION ONLY NEEDS TO EXECUTE ONCE,
//SINCE THE OBJECT PULLED FROM THE DATABASE IS STORED LOCALLY IN A VARIABLE FOR USE. IT WILL CALL THE QUESTION
//GENERATOR FUNCTION IN ORDER TO START THE PAGE

let section = Parse.Object.extend("question_repo");
const generatePage = () =>{
  query = new Parse.Query("question_repo");
  query.equalTo("section", "mission_core_values");
  query.first().then(function(sectionLibrary){
    if(sectionLibrary){
        console.log('Section library search successful with \n name: ' + sectionLibrary.get("section"));
        questionRepo = sectionLibrary.get("question_list");
        questionGenerator();
    }else{
        console.log("Nothing found, please try again");
    }
  }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);       
  });
}


document.body.onload = resetPage;
document.body.onload = generatePage;

