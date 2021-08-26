
let carousels = {};

let phantomSlides = {};

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
            obj.carousel.style.transform = 'translateY(0)';
            obj.carousel.style.bottom = '0'
        });
        obj.titles[0].classList.add('bold');
        console.log(obj);
        carousels[carouselName] = obj;
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
    c.carousel.style.transition = 'transform 0.3s, bottom 0s';
    c.backlog += 1;
    c.carousel.style.transform = `translateY(calc(${-c.backlog * 100}% + ${-c.backlog * 30}px)`;
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
    c.carousel.style.transition = 'transform 0.3s, bottom 0s';
    c.backlog -= 1;
    c.carousel.style.transform = `translateY(${-c.backlog * 100}%`;
    c.carousel.style.bottom = `${-c.backlog * 100}%`;
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

getCarousel('c1');