let faceColorData={
skinTone:"",
undertone:"",
brightness:0,
contrast:0
};


function analyzeSkinColor(image){

let canvas=document.createElement("canvas");
let ctx=canvas.getContext("2d");

canvas.width=image.width;
canvas.height=image.height;

ctx.drawImage(image,0,0);

let data=ctx.getImageData(
canvas.width*0.35,
canvas.height*0.25,
canvas.width*0.3,
canvas.height*0.35
).data;


let r=0;
let g=0;
let b=0;
let count=0;


for(let i=0;i<data.length;i+=4){

let red=data[i];
let green=data[i+1];
let blue=data[i+2];


if(red>50&&green>40&&blue>30){

r+=red;
g+=green;
b+=blue;

count++;

}

}


r=Math.round(r/count);
g=Math.round(g/count);
b=Math.round(b/count);


let brightness=Math.round(
(r+g+b)/3
);


let skinTone=getSkinTone(
r,
g,
b,
brightness
);


let undertone=getUndertone(
r,
g,
b
);


faceColorData={

skinTone:skinTone,

undertone:undertone,

brightness:brightness,

contrast:getContrast(r,g,b)

};


displaySkinResult();


return faceColorData;

}





function getSkinTone(r,g,b,brightness){


if(brightness>210){

return "Fair Skin Tone";

}


if(brightness>170){

return "Light / Wheatish Skin Tone";

}


if(brightness>130){

return "Medium Skin Tone";

}


if(brightness>100){

return "Tan / Brown Skin Tone";

}


return "Deep / Dark Skin Tone";

}





function getUndertone(r,g,b){


let warm=r+g-b;


let cool=b-r;


if(warm>80){

return "Warm";

}


if(cool>40){

return "Cool";

}


return "Neutral";

}





function getContrast(r,g,b){


let max=Math.max(r,g,b);

let min=Math.min(r,g,b);


return Math.round(
((max-min)/255)*100
);

}





function displaySkinResult(){


let skin=document.getElementById("skinTone");
let under=document.getElementById("undertone");
let bright=document.getElementById("brightness");
let contrast=document.getElementById("contrast");


if(skin){

skin.innerText=
faceColorData.skinTone;

}


if(under){

under.innerText=
faceColorData.undertone;

}


if(bright){

bright.innerText=
faceColorData.brightness+"%";

}


if(contrast){

contrast.innerText=
faceColorData.contrast+"%";

}


}




function calculateColorMatch(color){


let score=70;


let tone=faceColorData.skinTone;
let under=faceColorData.undertone;



const bestColors={


"Fair Skin Tone":[

"#1D3557",
"#4169E1",
"#006400",
"#800020",
"#000000",
"#6A0DAD"

],


"Light / Wheatish Skin Tone":[

"#008080",
"#808000",
"#FF8C00",
"#1D3557",
"#800020",
"#C19A6B"

],


"Medium Skin Tone":[

"#4169E1",
"#006400",
"#800020",
"#000000",
"#FFFFFF",
"#FF8C00"

],


"Tan / Brown Skin Tone":[

"#FFFFFF",
"#000000",
"#4169E1",
"#006400",
"#FF0000",
"#FFD700"

],


"Deep / Dark Skin Tone":[

"#FFFFFF",
"#4169E1",
"#FF0000",
"#006400",
"#FFD700",
"#800080"

]


};



if(bestColors[tone].includes(color)){

score+=20;

}



if(under==="Warm"&&
(color=="#FF8C00"||
color=="#FFD700"||
color=="#800020")){

score+=5;

}



if(under==="Cool"&&
(color=="#4169E1"||
color=="#1D3557"||
color=="#6A0DAD")){

score+=5;

}



if(score>100){

score=100;

}


return score;

}