
//the starting rotation of the cube
let startingXrotation = -35;
let startingYrotation = 25;
let startingZrotation = 0;

//cube element for use in later functions
let cube = document.getElementsByClassName("cube")[0];

//face elements for use in later functions
let left = document.getElementsByClassName("left")[0];
let back = document.getElementsByClassName("back")[0];
let right = document.getElementsByClassName("right")[0];
let front = document.getElementsByClassName("front")[0];

//add faces to an array
let faces = [];
faces.push(left);
faces.push(back);
faces.push(right);
faces.push(front);

//links all buttons that rotate the cube right 90 degrees to a function that rotates the colors apropriatly
let currButtons = document.getElementsByClassName("right90");
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

//links all buttons that rotate the cube right 180 degrees to a function that rotates the colors apropriatly
currButtons = document.getElementsByClassName("right180")
for(let i = 0; i < currButtons.length; i++){
    currButtons[i].addEventListener("click", (e)=>{
        let origin = e.target.classList[2];
        let left = document.getElementsByClassName(getLeftFace(origin))[0];
        let back = document.getElementsByClassName(getLeftFace(getLeftFace(origin)))[0];
        let front = document.getElementsByClassName(origin)[0];
        front.classList.replace("active","inactive");

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

//links all buttons that rotate the cube left 90 degrees to a function that rotates the colors apropriatly
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
            //console.log(right);
        },{once:true});
    });
}

//links all buttons that rotate the cube left 180 degrees to a function that rotates the colors apropriatly
currButtons = document.getElementsByClassName("left180")
for(let i = 0; i < currButtons.length; i++){
    currButtons[i].addEventListener("click", (e)=>{
        let origin = e.target.classList[2];
        let right = document.getElementsByClassName(getRightFace(origin))[0];
        let back = document.getElementsByClassName(getRightFace(getRightFace(origin)))[0];
        let front = document.getElementsByClassName(origin)[0];
        front.classList.replace("active","inactive");
        back.style.backgroundColor = "var(--color-front)";
        //console.log(back);

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

//removes the active class from all elements with the classname
function removeActive(className){
    let elements = document.getElementsByClassName(className);
    for(let i = 0; i < elements.length; i++){
        if(elements[i].classList.contains('active')){
            elements[i].style.animationName = 'slide-away';
            elements[i].addEventListener('animationend',()=>{
                elements[i].style.animationName = '';
                elements[i].classList.remove('active');
            }, {once: true});
            return true;
        }
        
        
    }
    return false;
}

//gives active class to element with specified id. also gives that element a slideshow if it isnt already
function setActive(id) {
    let element = document.getElementById(id);
    if(!element){
        console.error(`info page[${id}] has not beed set up yet!`);
        return;
    }
    element.classList.add("active");
    let c = element.getElementsByClassName('carousel')[0];
    if(c){
        getCarousel(c.id);
    }
}

//gives the x buttons functions
currButtons = document.getElementsByClassName("x-button");
for(let i = 0; i < currButtons.length; i++){
    currButtons[i].addEventListener("click",(e)=>{
        removeActive("extra-info");
    })
}
//connects all buttons of a class to the page with id of the second class the button has.
function connectButtons(buttonClass){
    let buttons = document.getElementsByClassName(buttonClass);
    for(let i = 0; i < buttons.length; i++){
        let id = buttons[i].classList[1];
        if(id === undefined || id === null){
            console.log("buttons configured incorrectly");
            return;
        }
        document.getElementsByClassName(id)[0].addEventListener("click",(e)=>{
            if(document.getElementById(id).classList.contains('active')){
                return;
            }
            if(removeActive("extra-info")){
                document.addEventListener('animationend',(e)=>{
                    setActive(id);
                },{once:true});
            }
            else{
                setActive(id);
            }
            
        });
    }
}
connectButtons("info-button");

//set up about button
{
    let abt = document.getElementsByClassName("to-back");
    for(let i = 0; i < abt.length; ++i){
        abt[i].addEventListener("click",(e)=>{
            window.addEventListener("animationend",(e)=>{
                setActive("about");
            },{once: true})
        });
    }
    
}



//onfigures portfolio buttons
currButtons = document.getElementsByClassName("to-right");
for(let i = 0; i < currButtons.length; i++){
    currButtons[i].addEventListener("click", (e)=>{
        rotateCube(startingXrotation,startingYrotation-90,startingZrotation);
        removeActive("extra-info");
    });
}
//configures toc buttons
currButtons = document.getElementsByClassName("to-front");
for(let i = 0; i < currButtons.length; i++){
    currButtons[i].addEventListener("click", (e)=>{
        rotateCube(startingXrotation,startingYrotation,startingZrotation);
        removeActive("extra-info");
    });
}
//configures about buttons
currButtons = document.getElementsByClassName("to-back");
for(let i = 0; i < currButtons.length; i++){
    currButtons[i].addEventListener("click", (e)=>{
        rotateCube(startingXrotation,startingYrotation-180,startingZrotation);
        removeActive("extra-info");
        
    });
}
//configures contact buttons
currButtons = document.getElementsByClassName("to-left");
for(let i = 0; i < currButtons.length; i++){
    currButtons[i].addEventListener("click", (e)=>{
        rotateCube(startingXrotation,startingYrotation+90,startingZrotation);
        removeActive("extra-info");
    });
}
//rotates the cube x,y,z deg
function rotateCube(x,y,z){   
    cube.style.transform = `translateZ(var(--cube-negative-half-width)) rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg) `;
}

//returns the id of the face to the left
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

//returns the id of the face to the right
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
//sets cube to starting x,y,z values
rotateCube(startingXrotation,startingYrotation,startingZrotation);

