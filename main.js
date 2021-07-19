prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 325,
    height: 275,
    image_format: "tiff",
    tiff_quality: 100
});

Webcam.attach("#camera");

function takeSnap() {
    Webcam.snap(
        function (data_uri) {
            document.getElementById("result").innerHTML = '<img id = "imgTaken" src ="' + data_uri + '">'
        }
    );
}

console.log("ml5 Version is " + ml5.version);
Classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/eEqs6hQUU/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!!");
}

function speak() {
    synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction1;
    speak_data_2 = "And the second prediction is " + prediction2;
    utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function checkSnap(){
    img = document.getElementById("imgTaken");
    Classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("E_name1").innerHTML = results[0].label;
        document.getElementById("E_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();

        if(results[0].label == "Happy"){
            document.getElementById("update_emoji1").innerHTML = "&#128522;";
        }
        if(results[0].label == "Sad"){
            document.getElementById("update_emoji1").innerHTML = "&#128532;";
        }
        if(results[0].label == "Angry"){
            document.getElementById("update_emoji1").innerHTML = "&#128548;";
        }

        if(results[1].label == "Happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }
        if(results[1].label == "Sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        if(results[1].label == "Angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }
    }
}