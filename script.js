
let startingXrotation = -35;
let startingYrotation = 25;
let startingZrotation = 0;

let cube = document.getElementsByClassName("cube")[0];

let left = document.getElementsByClassName("left")[0];
let back = document.getElementsByClassName("back")[0];
let right = document.getElementsByClassName("right")[0];
let front = document.getElementsByClassName("front")[0];

let faces = [];
faces.push(left);
faces.push(back);
faces.push(right);
faces.push(front);
          
let currButtons = document.getElementsByClassName("right90")
for(let i = 0; i < currButtons.length; i++){
    currButtons[i].addEventListener("click", (e)=>{
        let origin = e.target.classList[2];
        let left = document.getElementsByClassName(getLeftFace(origin))[0];
        let front = document.getElementsByClassName(origin)[0];

        front.classList.replace("active","inactive");

        left.style.backgroundColor = "var(--color-front)";
        front.style.backgroundColor = "var(--color-shadow)";

        front.style.animationName = `light-dark`;
        left.style.animationName = `dark-light`;
        
        front.addEventListener("animationend", ()=>{
            front.style.animationName = "";
        },{once:true});
        left.addEventListener("animationend", ()=>{
            left.style.animationName = "";
            left.classList.replace("inactive","active");
        },{once:true}); 
    });
}

currButtons = document.getElementsByClassName("right180")
for(let i = 0; i < currButtons.length; i++){
    currButtons[i].addEventListener("click", (e)=>{
        let origin = e.target.classList[2];
        let left = document.getElementsByClassName(getLeftFace(origin))[0];
        let back = document.getElementsByClassName(getLeftFace(getLeftFace(origin)))[0];
        let front = document.getElementsByClassName(origin)[0];
        front.classList.replace("active","inactive");
        console.log(back);

        front.style.animationName = `light-dark-dark`;
        left.style.animationName = `dark-light-dark`;
        back.style.animationName = `dark-dark-light`;

        back.style.backgroundColor = "var(--color-front)";
        front.style.backgroundColor = "var(--color-shadow)";
        front.addEventListener("animationend", ()=>{
            front.style.animationName = "";
        },{once:true});
        left.addEventListener("animationend", ()=>{
            left.style.animationName = "";
        },{once:true});
        back.addEventListener("animationend", ()=>{
            back.style.animationName = "";
            back.classList.replace("inactive","active");
        },{once:true});
    });
}
currButtons = document.getElementsByClassName("left90")
for(let i = 0; i < currButtons.length; i++){
    currButtons[i].addEventListener("click", (e)=>{
        let origin = e.target.classList[2];
        let right = document.getElementsByClassName(getRightFace(origin))[0];
        let front = document.getElementsByClassName(origin)[0];
        front.classList.replace("active","inactive");
        front.style.animationName = `light-dark`;
        right.style.animationName = `dark-light`;

        front.style.backgroundColor = "var(--color-shadow)";
        right.style.backgroundColor = "var(--color-front)";
        front.addEventListener("animationend", ()=>{
            front.style.animationName = "";
        },{once:true});
        right.addEventListener("animationend", ()=>{
            right.style.animationName = "";
            
            right.classList.replace("inactive","active");
            console.log(right);
        },{once:true});
    });
}
currButtons = document.getElementsByClassName("left180")
for(let i = 0; i < currButtons.length; i++){
    currButtons[i].addEventListener("click", (e)=>{
        let origin = e.target.classList[2];
        let right = document.getElementsByClassName(getRightFace(origin))[0];
        let back = document.getElementsByClassName(getRightFace(getRightFace(origin)))[0];
        let front = document.getElementsByClassName(origin)[0];
        front.classList.replace("active","inactive");
        back.style.backgroundColor = "var(--color-front)";
        console.log(back);

        front.style.animationName = `light-dark-dark`;
        right.style.animationName = `dark-light-dark`;
        back.style.animationName = `dark-dark-light`;

        back.style.backgroundColor = "var(--color-front)";
        front.style.backgroundColor = "var(--color-shadow)";
        front.addEventListener("animationend", ()=>{
            front.style.animationName = "";
        },{once:true});
        back.addEventListener("animationend", ()=>{
            back.style.animationName = "";
             back.classList.replace("inactive","active");
        },{once:true});
        right.addEventListener("animationend", ()=>{
            right.style.animationName = "";
        },{once:true});
    });
}

currButtons = document.getElementsByClassName("to-right");
for(let i = 0; i < currButtons.length; i++){
    currButtons[i].addEventListener("click", (e)=>{
        rotateCube(startingXrotation,startingYrotation-90,startingZrotation);
    });
}
currButtons = document.getElementsByClassName("to-front");
for(let i = 0; i < currButtons.length; i++){
    currButtons[i].addEventListener("click", (e)=>{
        rotateCube(startingXrotation,startingYrotation,startingZrotation);
    });
}
currButtons = document.getElementsByClassName("to-back");
for(let i = 0; i < currButtons.length; i++){
    currButtons[i].addEventListener("click", (e)=>{
        rotateCube(startingXrotation,startingYrotation-180,startingZrotation);
    });
}
currButtons = document.getElementsByClassName("to-left");
for(let i = 0; i < currButtons.length; i++){
    currButtons[i].addEventListener("click", (e)=>{
        rotateCube(startingXrotation,startingYrotation+90,startingZrotation);
    });
}
function rotateCube(x,y,z){   
    cube.style.transform = `translateZ(var(--cube-negative-half-width)) rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg) `;
}


function getLeftFace(face){
    switch(face){
        case "front":
            return "left";
        case "left":
            return "back";
        case "back":
            return "right";
        case "right":
            return "front";
        default:
            console.log(face);
            return;
    }
}
function getRightFace(face){
    switch(face){
        case "front":
            return "right";
        case "left":
            return "front";
        case "back":
            return "left";
        case "right":
            return "back";
        default:
            console.log(face);
            return;
    }
}

rotateCube(startingXrotation,startingYrotation,startingZrotation);
