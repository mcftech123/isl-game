let selectedShirtColor="#4169E1";


function changeShirtColor(color){

selectedShirtColor=color;


let shirt=document.getElementById("shirtPreview");


if(!shirt)return;


shirt.style.background=color;

shirt.style.opacity="0.65";


let result=calculateColorMatch(color);


updateTryOnResult(color,result);


}



function updateTryOnResult(color,score){


let box=document.getElementById("selectedColorBox");

let scoreText=document.getElementById("selectedScore");

let name=document.getElementById("selectedColorName");

let rating=document.getElementById("ratingText");



if(box){

box.style.background=color;

}



let colorName=getColorName(color);



if(name){

name.innerText=colorName;

}



if(scoreText){

scoreText.innerText=score+"% Match";

}



if(rating){


if(score>=85){

rating.innerText="Excellent Match";

rating.className="positive";

}


else if(score>=65){

rating.innerText="Good Match";

rating.className="neutral";

}


else{

rating.innerText="Avoid";

rating.className="negative";

}


}



updateFaceReflection(score);


}




function updateFaceReflection(score){


let brightness=document.getElementById("faceBrightnessEffect");

let contrast=document.getElementById("contrastEffect");

let effect=document.getElementById("skinEffect");



if(score>=85){


brightness.innerText="+14%";

contrast.innerText="+18%";

effect.innerText="🟢 Brightens Face";

effect.className="positive";


}



else if(score>=65){


brightness.innerText="+5%";

contrast.innerText="+7%";

effect.innerText="🟡 Neutral";

effect.className="neutral";


}



else{


brightness.innerText="-10%";

contrast.innerText="-8%";

effect.innerText="🔴 Makes Face Dull";

effect.className="negative";


}


}





function getColorName(hex){


const names={

"#4169E1":"Royal Blue",

"#1D3557":"Navy Blue",

"#006400":"Emerald Green",

"#228B22":"Forest Green",

"#800020":"Burgundy",

"#800000":"Maroon",

"#000000":"Black",

"#FFFFFF":"White",

"#6A0DAD":"Purple",

"#E6E6FA":"Lavender",

"#008080":"Teal",

"#808000":"Olive",

"#FFDB58":"Mustard",

"#FF8C00":"Rust Orange",

"#7B3F00":"Chocolate Brown",

"#808080":"Grey",

"#36454F":"Charcoal Grey",

"#FFFDD0":"Cream",

"#F5F5DC":"Beige",

"#FFD700":"Yellow",

"#FFA500":"Orange",

"#FF0000":"Red",

"#87CEEB":"Sky Blue",

"#FFC0CB":"Pink"

};


return names[hex]||"Custom Color";


}





// connect color buttons

document.querySelectorAll(".colorBtn").forEach(btn=>{


btn.addEventListener("click",()=>{


let color=btn.dataset.color;


document.querySelectorAll(".colorBtn")

.forEach(b=>b.classList.remove("active"));


btn.classList.add("active");


changeShirtColor(color);


if(typeof getSelectedColorReport==="function"){

getSelectedColorReport(color);

}


});


});





// default color

window.addEventListener("load",()=>{


setTimeout(()=>{


changeShirtColor("#4169E1");


},1200);


});