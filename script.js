const symbol = ['@','#','$','*','%','{','}','[',']','/','!',';',',','.','&nbsp;'];
const newImage = document.getElementById('new-image');

var detailLevel = 5;
var img = document.getElementById('my-image');
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

canvas.width = img.width;
canvas.height = img.height;
ctx.drawImage(img, 0, 0);

function draw(){
    document.getElementById('new-image').innerHTML = '';

    for(let h = 0; h < img.height; h += detailLevel){
        let newLine = document.createElement('span');
        newLine.innerHTML = '';
        
        for(let w = 0; w < img.width; w += detailLevel){
            let data = ctx.getImageData(w, h, img.width, img.height).data;

            newLine.innerHTML += getSymbol(data[0], data[1], data[2]);
        }

        document.getElementById('new-image').appendChild(newLine);
        document.getElementById('new-image').appendChild(document.createElement('br'));
    }
}

function getSymbol(r, g, b){
    let number = Math.floor(( r + g + b ) / 3);
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

draw();

document.getElementById('button-add').addEventListener('click', (event) =>{
    detailLevel --;
    
    draw();
});

document.getElementById('button-remove').addEventListener('click', (event) =>{
    detailLevel ++;

    draw();
});