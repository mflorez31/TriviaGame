$(document).ready(function() {
    var intervalId;
    var questionCounter = 0;
    var selecterAnswer;
    var clock;
    var wins = 0;
    var notAnswered = 0;
    var losses = 0;
    var countdown = 30;

    function win() {
        wins++;
        game = "<div class='jumbotron'><h1 class='display-4'>Correct!!</h1></div>" ;
        $("#GameArea").html(game);
        setTimeout(wait, 3000); 
    }

    function lost() {
        losses++;
        gameHTML = "<div class='jumbotron'><h1 class='display-4'>incorrect!!</h1></div>" + correctAnswers[questionCounter] ;
        $("#GameArea").html(gameHTML);
        setTimeout(wait, 3000); 
    }


    $("#startPage").on("click", "#startBtn", function(event){
        event.preventDefault();  
        $('.jumbotron').hide();
        Questions();
        timerCount();
    }); 

    function Questions() {
        game = "<p> Time Remaining: <div class='timer'>30</div>"+ questionArray[questionCounter] + "</p>"+
         "<div class='answers'>A. "+ answerArray[questionCounter][0]+"</div>"+
         "<div class='answers'>B. "+ answerArray[questionCounter][1]+"</div>"+
         "<div class='answers'>C. "+ answerArray[questionCounter][2]+"</div>"+
         "<div class='answers'>D. "+ answerArray[questionCounter][3]+"</div>";
        $("#GameArea").html(game);
    };

    $("body").on("click", ".answers", function(event){
        selectedAnswer = $(this).text();
        console.log(selectedAnswer)
        if (selectedAnswer === correctAnswers[questionCounter]){
                clearInterval(intervalId);
                win();
        } 
        else{
            clearInterval(intervalId);
            lost();
        }
    }); 
    
    function timeoutLoss() {
        notAnswered++;
        losses++;
        game = "<div class='jumbotron'><h1 class='display-4'>Out of Time!!</h1></div>"
        $("#GameArea").html(game);
        setTimeout(wait, 3000);
    
    }
    
    function timerCount() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
        }
        function decrement() {
            countdown--;
            $(".timer").text(countdown);
        
            if (countdown === 0) {
                timeoutLoss();
                clearInterval(intervalId);
            }   
    }

    function wait() {
        //ternary operator replacing if/else for generate more questions
    if(questionCounter < 4 ){ 
        questionCounter++,
        Questions(),
        countdown = 30,
        timerCount() }
     else {
        finalScreen()
    }}

    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + countdown + "</span></p>" 
        + "<p class='text-center'>All done, here's how you did!" + "</p>" 
        + "<p class='summary-correct'>Correct Answers: " + wins 
        + "</p>" + "<p>Wrong Answers: " + losses + "</p>" + "<p>Unanswered: " 
        + notAnswered + "</p>" 
        $("#GameArea").html(gameHTML);
    }



    var questionArray = 
    [ "when was solar energy first used?", 
    "How much solar energy reaches the Earth's surface at any given moment?", 
    "Of all new generating capacity added to the U.S. electrical grid in 2015, what percentage was solar?", 
    "What does the word photovoltaic mean?", 
    "Roughly how much did the cost of PV solar panels decrease between 2008 and 2015?", ]

    var answerArray = [
        ["1902", "1954", "1839", "1899"], 
        ["173 terawatts","17,300 terawatts","173,000 terawatts","1.73 terawatts"], 
        ["13", "29", "50", "10"], 
        ["Sun-powered", "Light-electricity", "Light-cells", "Solar-energy"], 
        ["40%", "80%", "20%", "50%"], ]

    var correctAnswers = 
        [ "C. 1839", 
        "C. 173,000 terawatts", 
        "B. 29", 
        "B. Light-electricity", 
        "B. 80%", ]

});