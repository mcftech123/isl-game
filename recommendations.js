const allDressColors={

"Royal Blue":"#4169E1",
"Navy Blue":"#1D3557",
"Emerald Green":"#006400",
"Forest Green":"#228B22",
"Burgundy":"#800020",
"Maroon":"#800000",
"Black":"#000000",
"White":"#FFFFFF",
"Purple":"#6A0DAD",
"Lavender":"#E6E6FA",
"Teal":"#008080",
"Olive":"#808000",
"Mustard":"#FFDB58",
"Rust Orange":"#FF8C00",
"Chocolate Brown":"#7B3F00",
"Grey":"#808080",
"Charcoal Grey":"#36454F",
"Cream":"#FFFDD0",
"Beige":"#F5F5DC",
"Yellow":"#FFD700",
"Orange":"#FFA500",
"Red":"#FF0000",
"Sky Blue":"#87CEEB",
"Pink":"#FFC0CB"

};



let colorRanking=[];



function generateRecommendations(){


colorRanking=[];


Object.keys(allDressColors).forEach(color=>{


let hex=allDressColors[color];


let score=calculateColorMatch(hex);


let effect=getFaceEffect(score);


colorRanking.push({

name:color,

color:hex,

score:score,

effect:effect

});


});



colorRanking.sort((a,b)=>b.score-a.score);



displayRecommendations();


return colorRanking;

}





function getFaceEffect(score){


if(score>=85){

return{

text:"🟢 Brightens Face",

type:"positive"

};

}


if(score>=65){

return{

text:"🟡 Neutral Effect",

type:"neutral"

};

}


return{

text:"🔴 Makes Face Dull",

type:"negative"

};


}





function displayRecommendations(){


let container=document.getElementById("colorRanking");


if(!container)return;


container.innerHTML="";



colorRanking.forEach((item,index)=>{


let div=document.createElement("div");


let status="";


if(item.score>=85){

status="best";

}

else if(item.score>=65){

status="good";

}

else if(item.score>=50){

status="average";

}

else{

status="bad";

}



div.className="rankItem "+status;



div.innerHTML=`

<span>
${getMedal(index)} ${item.name}
</span>

<strong>
${item.score}%
</strong>

`;



container.appendChild(div);



});



updateBestStyle();

}





function getMedal(index){


if(index===0)return"🥇";

if(index===1)return"🥈";

if(index===2)return"🥉";

return"";

}





function updateBestStyle(){


if(colorRanking.length===0)return;


let best=colorRanking[0];


let premium=document.getElementById("premiumStyle");

let look=document.getElementById("bestLook");

let avoid=document.getElementById("avoidColors");



if(premium){

premium.innerText=

best.name+
" with your skin tone gives a premium appearance.";

}



if(look){

look.innerText=

best.name+
" improves face brightness and contrast.";

}



let avoidList=colorRanking

.filter(c=>c.score<55)

.slice(0,3)

.map(c=>c.name)

.join(", ");



if(avoid){

avoid.innerText=

avoidList||"None";

}


}





function getSelectedColorReport(color){


let result=colorRanking.find(

item=>item.color===color

);



if(!result)return;



document.getElementById("selectedColorName").innerText=

result.name;



document.getElementById("selectedScore").innerText=

result.score+"% Match";



document.getElementById("ratingText").innerText=

result.effect.text;



let effect=document.getElementById("skinEffect");


if(effect){

effect.innerText=result.effect.text;

effect.className=result.effect.type;

}


}




window.addEventListener("load",()=>{


setTimeout(()=>{


if(typeof generateRecommendations==="function"){

generateRecommendations();

}


},1000);


});