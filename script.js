
      let slider = document.getElementById("rotateSlider");
let cube = document.getElementsByClassName("cube")[0];

slider.oninput = ()=>{rotateCube(slider.value);};

function rotateCube(value){
    value = value;
    
    cube.style.transform = `translateZ(-100px) rotateX(-15deg) rotateY(${value}deg) `;

    console.log(value);
}

     
