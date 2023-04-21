Parse.initialize("oSVBTw2Nc6wRXU46YaOIw4Ke7hLOgq7ndY0j9hLa", "jUGb1Cf2UJIE1ljsTaFH7lmQ2jLMFD2JJbX5IMgy");
Parse.serverURL = "https://parseapi.back4app.com/";

let questionRepo = null;
let section = Parse.Object.extend("question_repo");

const question = document.getElementById("question");
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");
const rightWrong = document.getElementById("rightWrong");
const next = document.getElementById("next");
let correctAnswer = 0;

const questionGenerator = () =>{
    let questionCount = 0;
    for (let i in questionRepo) {
        questionCount += 1;
    }
    const randNum = Math.floor(Math.random() * questionCount + 1);
    const questionObj = questionRepo[randNum];
    question.innerHTML = questionObj.question;
    answer1.innerHTML = questionObj.answer1;
    answer2.innerHTML = questionObj.answer2;
    answer3.innerHTML = questionObj.answer3;
    answer4.innerHTML = questionObj.answer4;
    correctAnswer = questionObj.correctAnswer;
    console.log(correctAnswer);
}

const resetPage = () =>{
    answer1.style.background = "rgb(1, 1, 65)";
    answer1.style.color = "white";
    answer2.style.background = "rgb(1, 1, 65)";
    answer2.style.color = "white";
    answer3.style.background = "rgb(1, 1, 65)";
    answer3.style.color = "white";
    answer3.style.background = "rgb(1, 1, 65)";
    answer3.style.color = "white";
    answer4.style.background = "rgb(1, 1, 65)";
    answer4.style.color = "white";
    rightWrong.innerHTML = "";
    answer1.addEventListener("click", answerCheck1);
    answer2.addEventListener("click", answerCheck2);
    answer3.addEventListener("click", answerCheck3);
    answer4.addEventListener("click", answerCheck4);
}

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

const generatePage = () =>{
  query = new Parse.Query("question_repo");
  query.equalTo("section", "detective_operations_manual");
  query.first().then(function(sectionLibrary){
    if(sectionLibrary){
        console.log('Section library search successful with \n name: ' + sectionLibrary.get("section"));
        questionRepo = sectionLibrary.get("question_list");
        questionGenerator();
        
        answer1.addEventListener("click", answerCheck1);
        answer1.addEventListener("click", () =>{
        answer2.removeEventListener("click", answerCheck2);
        answer3.removeEventListener("click", answerCheck3);
        answer4.removeEventListener("click", answerCheck4);
        });

        answer2.removeEventListener("click", answerCheck2);
        answer2.addEventListener("click", () =>{
        answer1.removeEventListener("click", answerCheck1);
        answer3.removeEventListener("click", answerCheck3);
        answer4.removeEventListener("click", answerCheck4);
        });

        answer3.removeEventListener("click", answerCheck3);
        answer3.addEventListener("click", () =>{
        answer1.removeEventListener("click", answerCheck1);
        answer2.removeEventListener("click", answerCheck2);
        answer4.removeEventListener("click", answerCheck4);
        });

        answer4.addEventListener("click", answerCheck4);
        answer4.addEventListener("click", () =>{
        answer1.removeEventListener("click", answerCheck1);
        answer2.removeEventListener("click", answerCheck2);
        answer3.removeEventListener("click", answerCheck3);
        });
    }else{
        console.log("Nothing found, please try again");
    }
  }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);       
  });
}

document.body.onload = resetPage;
document.body.onload = generatePage;

next.addEventListener("click", resetPage);
next.addEventListener("click", questionGenerator);

