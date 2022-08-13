
var messages = [], //array that hold the record of each string in chat
    lastUserMessage = "", //keeps track of the most recent input string from the user
    botMessage = "Sorry, the server is down. Please try some other time.", //var keeps track of what the chatbot is going to say
    botName = 'JaskiratBot', //name of the chatbot
    talking = true, //when false the speach function doesn't work
    count = 0;

function chatbotResponse() {
    debugger
    talking = true;
    botMessage = "I'm confused :-("; //the default message

    if (lastUserMessage === 'hi' || lastUserMessage == 'hello') {
        const hi = ['hi', 'howdy', 'hello']
        botMessage = hi[Math.floor(Math.random() * (hi.length))];;
    }

    if (lastUserMessage === 'name') {
        botMessage = 'My name is ' + botName;
    }
    chat();
}
//this runs each time enter is pressed.
//It controls the overall input and output
function newEntry(botMessage, botName, flag = 0, speak = 1) {
    debugger
    lastUserMessage = document.getElementById("chatbox").value;
    document.getElementById("chatbox").value = "";
    if (flag == 0) {
        messages.push("<b>" + 'Query:' + "</b> " +lastUserMessage);
    }
    //add the chatbot's name and message to the array messages
    messages.push("<b>" + botName + "</b> " + botMessage);
    // says the message using the text to speech function written below
    if (speak == 1) {
        Speech(botMessage);
    };
    //outputs the last few array elements of messages to html
    for (var i = 1; i < 8; i++) {
        if (messages[messages.length - i])
            document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
}

//text to Speech
//https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-//Synthesis-API
function Speech(say) {
    if ('speechSynthesis' in window && talking) {
        var utterance = new SpeechSynthesisUtterance(say);
        //msg.voice = voices[10]; // Note: some voices don't support altering params
        //msg.voiceURI = 'native';
        //utterance.volume = 1; // 0 to 1
        //utterance.rate = 0.1; // 0.1 to 10
        //utterance.pitch = 1; //0 to 2
        //utterance.text = 'Hello World';
        //utterance.lang = 'en-US';
        window.speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    }
}

//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
    document.getElementById("chatbox").placeholder = "";
}

$(function () {


    $('textarea').each(function () {
        $(this).height($(this).prop('scrollHeight'));
    });


});



var context = `
Hey, please ask a question.
My name is Jaskirat. 
I am good.
I am interested in machine learning and data science.
I have 2 years of experience in data science and machine learning.
I work at Smart Energy Water.
I have knowledge of front-end as well as back-end technologies. 
The idea of machines replicating human intelligence is fascinating to me.
Most of my college projects used concepts of machine learning and artificial intelligence. For my final college project, I built a “Hand-wash monitoring system”.
I am working as a data science engineer. 
My job is Data Science Engineer.
I work on various tasks ranging from data base management, data preprocessing, data augmentation, exploratory data analysis and visualization, feature extraction, model development, hyper-parameter tuning, model deployment, optimization, web application and API development etc. and have used various regression, classification, clustering, time-series and natural language processing algorithms to enhance the company products. 
I lead the NLP (natural language processing) and “Save Water” projects at my job. 
I assist around twenty team members with their coding and functional queries.
I want to do masters in data science and artificial intelligence as It would give me the confidence to deal with any kind of problem in this area.
my goal is to become an excellent data scientist. 
I am interested in domain-specific conversational artificial intelligence and want to research in this area. 
I studied/graduated in college with B. E. (COMPUTER ENGINEERING) from THAPAR INSTITUTE OF ENGINEERING AND TECHNOLOGY, PATIALA, INDIA with 8.04 CGPA(grades).
My College projects include Handwash monitoring system for medical workers using computer vision and image processing and CNN projects on image captioning and digit recognition. 
In HIGH SCHOOL I got 91.8% and and in SENIOR SECONDARY 88.6%. 
I am Experienced in extracting uses cases from data by utilizing exploratory data analysis, data cleaning, feature engineering, regression, classification, time-series, clustering or NLP algorithms. 
I am well versed in “ML Ops” components like data pipelines, model deployment and exposing data through APIs.
I have knowledge of programming languages Python, C# (ASP.NET), C++ ,HTML, CSS, JavaScript, jQuery.
I have knowledge of databases like SQL Server, PostgreSQL, MySQL 
I can use Machine Learning Studio, Data Factory, Data Lake, Azure Functions cloud services.


`

function chat() {
    debugger
    var param = {
        question: $("#chatbox").val().substring()
        //context: context
    };


    $.ajax({
        type: 'POST',
        url: '/SmartBot.aspx/Get_resp',
        dataType: 'json',
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (response) {
            console.log(response);
            debugger
            data = JSON.parse(response.d);
            botMessage = data.answer;
            if (['hi', 'hey', 'hello'].includes(param.question.split(' ')[0].toLowerCase())) {
                arr = ['Hi, ', 'Hello, ', 'Hey, ']
                botMessage = arr[Math.floor(Math.random() * arr.length)] + botMessage;
            }
        },
        error: function (e) {
            botMessage = "Sorry, the server is down. Please try some other time."
            console.log(e);
        }
    });
}

function workflow() {
    if ($("#chatbox").val().trim() == "") {
        debugger
        $("#chatbox").css({ 'border': '1.5px solid red' });
        return false;
    }
    $("#chatbox").css({ 'border': '' })
    chat()
    newEntry(botMessage, 'JaskiratBot:', 0, 1);
}





