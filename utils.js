function hexToRGB(hex){

hex=hex.replace("#","");

return{

r:parseInt(hex.substring(0,2),16),

g:parseInt(hex.substring(2,4),16),

b:parseInt(hex.substring(4,6),16)

};

}





function rgbToHex(r,g,b){

return "#"+

((1<<24)+(r<<16)+(g<<8)+b)

.toString(16)

.slice(1);

}





function calculateBrightness(r,g,b){


return Math.round(

((r*299)+(g*587)+(b*114))/1000

);


}





function getAverageColor(image,area){


let canvas=document.createElement("canvas");

let ctx=canvas.getContext("2d");


canvas.width=image.width;

canvas.height=image.height;


ctx.drawImage(

image,

0,

0,

canvas.width,

canvas.height

);



let data=ctx.getImageData(

area.x,

area.y,

area.width,

area.height

).data;



let r=0;

let g=0;

let b=0;

let count=0;



for(let i=0;i<data.length;i+=4){


if(data[i+3]>0){


r+=data[i];

g+=data[i+1];

b+=data[i+2];

count++;


}


}



return{


r:Math.round(r/count),

g:Math.round(g/count),

b:Math.round(b/count)


};


}





function getColorDistance(c1,c2){


return Math.sqrt(

Math.pow(c1.r-c2.r,2)+

Math.pow(c1.g-c2.g,2)+

Math.pow(c1.b-c2.b,2)

);


}





function showStatus(message,type="success"){


let status=document.getElementById("status");


if(!status)return;



status.innerText=message;



if(type==="loading"){


status.style.background=

"rgba(59,130,246,.2)";


status.style.color="#93c5fd";


}


else if(type==="error"){


status.style.background=

"rgba(239,68,68,.2)";


status.style.color="#fca5a5";


}


else{


status.style.background=

"rgba(34,197,94,.2)";


status.style.color="#86efac";


}


}





function animateNumber(element,target){


let current=0;


let interval=setInterval(()=>{


current++;


element.innerText=current+"%";



if(current>=target){


clearInterval(interval);


}


},15);


}





function createCanvas(width,height){


let canvas=document.createElement("canvas");


canvas.width=width;

canvas.height=height;


return canvas;


}





function downloadCanvas(canvas,name){


let link=document.createElement("a");


link.download=name;


link.href=canvas.toDataURL("image/png");


link.click();


}





function clamp(value,min,max){


return Math.min(

Math.max(value,min),

max

);


}





function getRating(score){


if(score>=90)

return"Excellent Match";


if(score>=75)

return"Good Match";


if(score>=55)

return"Average";


return"Avoid";

}





function delay(time){


return new Promise(resolve=>{


setTimeout(resolve,time);


});


}