const symbol = ['@','#','$','*','%','/',';',',','.','&nbsp;'];
const newImage = document.querySelector('.div');

var img = document.getElementById('my-image');
var canvas = document.createElement('canvas');
canvas.width = img.width;
canvas.height = img.height;
canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);


for(let h = 0; h < img.height; h ++){
    let newLine = document.createElement('span');
    newLine.innerHTML = '';
    
    for(let w = 0; w < img.width; w ++){
        let data = canvas.getContext('2d').getImageData(w, h, 1, 1).data;

        let d = getSymbol(data[0], data[1], data[2]);

        newLine.innerHTML += d;
    }

    document.querySelector('#new-image').appendChild(newLine);
    document.querySelector('#new-image').appendChild(document.createElement('br'));
}

function getSymbol(r,g,b){
    let number = Math.floor((r+g+b)/3);
    let baseValue = 255 / symbol.length;
    let currentValue = baseValue;
    let toReturn;

    for(let x = 0; x < symbol.length; x ++){
        if(number <= currentValue){
            toReturn = symbol[x];
            break;
        }else{
            currentValue += baseValue;
        }
    }

    return toReturn;
}

// function openCam(){
//     let All_mediaDevices=navigator.mediaDevices
//     if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
//        console.log("getUserMedia() not supported.");
//        return;
//     }
//     All_mediaDevices.getUserMedia({
//        video: true
//     })
//     .then(function(vidStream) {
//        var video = document.getElementById('videoCam');
//        if ("srcObject" in video) {
//           video.srcObject = vidStream;
//        } else {
//           video.src = window.URL.createObjectURL(vidStream);
//           draw();
//        }
//        video.onloadedmetadata = function(e) {
//           video.play();

//           draw();
//        };
//     })
//     .catch(function(e) {
//        console.log(e.name + ": " + e.message);
//     });
//  }


img.addEventListener('change', (event) =>{
    var pixelData = canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;

    console.log(pixelData);
});

