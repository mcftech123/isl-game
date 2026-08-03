let faceMesh;
let selfieSegmentation;

let faceReady=false;
let segmentationReady=false;


function initializeAI(){

if(!faceMesh){

faceMesh=new FaceMesh({

locateFile:(file)=>{
return "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/"+file;
}

});


faceMesh.setOptions({

maxNumFaces:1,
refineLandmarks:true,
minDetectionConfidence:0.5,
minTrackingConfidence:0.5

});


faceMesh.onResults((results)=>{

if(results.multiFaceLandmarks &&
results.multiFaceLandmarks.length>0){

faceReady=true;

}

});


}



if(!selfieSegmentation){


selfieSegmentation=new SelfieSegmentation({

locateFile:(file)=>{
return "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/"+file;
}

});


selfieSegmentation.setOptions({

modelSelection:1

});


selfieSegmentation.onResults((results)=>{

segmentationReady=true;

});


}


}



async function startFaceAnalysis(image){


try{


initializeAI();


await faceMesh.send({

image:image

});


await selfieSegmentation.send({

image:image

});



await new Promise(resolve=>setTimeout(resolve,500));



if(faceReady){

console.log("Face detected");

}
else{

console.log("Face not detected");

}




// Run skin analysis

if(typeof analyzeSkinColor==="function"){

analyzeSkinColor(image);

}




// Generate colors

if(typeof generateRecommendations==="function"){

generateRecommendations();

}



showStatus("Analysis Complete ✓","success");



}

catch(error){


console.log(error);


showStatus("AI Analysis Failed","error");


}


}