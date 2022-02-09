function centerSlideStuff(wrapper){
    let r = wrapper.getElementsByClassName('img')[0].getBoundingClientRect();
    let buttons = wrapper.getElementsByClassName("button");
    for(let buttonElement of buttons){
        buttonElement.style.left =  `${
            Math.floor((r.right - r.left)/2)
        }px`;
    }
    let captions = wrapper.getElementsByClassName("caption");
    for(let caption of captions){
        caption.style.maxWidth = `${r.width}px`;
    }
    
}

for (let e of document.getElementsByClassName('carousel-bg')){
    window.addEventListener("resize", ()=>{
        centerSlideStuff(e);
    });
}



let carousels = {};

function clickTitleHandler(carouselName, titleNumber){
    let c = getCarousel(carouselName);
    while(c.itemNumber > titleNumber){
        prev(carouselName);
    }
    while(c.itemNumber < titleNumber){
        next(carouselName);
    }

}

function getCarousel(carouselName){
    let is_mobile = getComputedStyle(document.querySelector(":root"))
        .getPropertyValue("--is-mobile") === 'true';
    let c = carousels[carouselName];
    if(!c){
        let carousel = document.getElementById(carouselName);
        if(!carousel) return null;
        let titles = carousel.parentElement.getElementsByClassName('title');
        titles[0].classList.add('bold');
        for(let i = 0; i < titles.length; ++i){
            titles[i].addEventListener('click', clickTitleHandler.bind(clickTitleHandler, carouselName, i));
        }
        let obj =  {
            carousel: carousel,
            titles: titles,
            itemNumber: 0, 
            backlog: 0,
            length: carousel.getElementsByClassName('slide').length,
        };
        obj.carousel.addEventListener("transitionend", ()=>{
            obj.carousel.style.transitionDuration = '0s';
            obj.carousel.style.transform = `translate${is_mobile ? 'X' : 'Y'}(0)`;
            obj.carousel.style.bottom = '0';
            obj.carousel.style.right = '0';
        });
        obj.titles[0].classList.add('bold');
        //console.log(obj);
        carousels[carouselName] = obj;
        centerSlideStuff(carousel.parentElement.parentElement);
        return obj;
        
    }
    return c;
}
function mod(a,b){
    if(a < 0){
        a = -a;
        a = a % b;
        a = a - b;
        return Math.abs(a);
    }
    else{
        return a % b;
    }
}
function next(carouselName){
    let is_mobile = getComputedStyle(document.querySelector(":root"))
        .getPropertyValue("--is-mobile") == "true";
    console.log(is_mobile, "true",getComputedStyle(document.querySelector(":root"))
    .getPropertyValue("--is-mobile") );
    let c = getCarousel(carouselName);
    if(!c){
        console.error(`${carouselName} is not the id of any carousel wrapper :(`);
        return;
    }
    let slides = c.carousel.getElementsByClassName('slide');
    let parent = slides[0].parentElement;
    let s = slides[mod(c.backlog,slides.length)];
    parent.append(s.cloneNode(true));
    c.itemNumber = mod(c.itemNumber + 1, c.length);
    c.carousel.style.transition = 'transform 0.3s';
    c.backlog += 1;
    c.carousel.style.transform = `translate${is_mobile ? 'X' : 'Y'}(calc(${-c.backlog * 100}% + ${-c.backlog * 30}px)`;
    c.carousel.addEventListener("transitionend", ()=>{
        s.remove();
        c.backlog -= 1;
        
    }, {once:true});
    
    let titles = c.titles;
    for(let i = 0; i < titles.length; ++i){
        titles[i].classList.remove('bold');
    }
    titles[c.itemNumber].classList.add('bold');
    
}

function prev(carouselName){
    let is_mobile = getComputedStyle(document.querySelector(":root"))
        .getPropertyValue("--is-mobile") === "true";
    let c = getCarousel(carouselName);
    if(!c){
        console.error(`${carouselName} is not the id of any carousel wrapper :(`);
        return;
    }
    let slides = c.carousel.getElementsByClassName('slide');
    let parent = slides[0].parentElement;
    let s = slides[mod(c.backlog - 1, slides.length)];
    let clone = s.cloneNode(true);
    clone.style.zIndex = '1';
    parent.prepend(clone);
    c.itemNumber = mod(c.itemNumber - 1, c.length);
    c.carousel.style.transition = 'transform 0.3s';
    c.backlog -= 1;
    c.carousel.style.transform = `translate${is_mobile ? 'X' : 'Y'}(${-c.backlog * 100}%`;
    if (!is_mobile){
        c.carousel.style.bottom = `${-c.backlog * 100}%`;
    }
    else{
        c.carousel.style.right = `${-c.backlog * 100}%`;
    }
    c.carousel.addEventListener("transitionend", ()=>{
        s.remove();
        c.backlog += 1;
        
    }, {once:true});
    let titles = c.titles;
    for(let i = 0; i < titles.length; ++i){
        titles[i].classList.remove('bold');
    }
    titles[c.itemNumber].classList.add('bold');
}