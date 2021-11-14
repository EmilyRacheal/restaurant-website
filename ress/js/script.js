// util function
// alert("hello");
function addAndRemoveClasses(add, remove, elements){
    let argumentsArray = Array.prototype.slice.call(arguments);
    for (let i = 0; i < argumentsArray.length; i++) {
        let arg = argumentsArray[i];
        if(!arg) continue;
        if(!Array.isArray(arg) && typeof arg !== 'string' && !(arg instanceof Element)){
            throw 'Element is not an Array/string/HTMLElement';
        }
        if(!Array.isArray(arg)) argumentsArray[i] = [arg];
    }
    const [addArr, removeArr, elementsArr] = argumentsArray;
    elementsArr.forEach(element => {
        if(!(element instanceof Element)) throw 'Not using DOM elements';
        if(addArr){
            addArr.forEach(add => {
                element.classList.add(add);
            });
        }
        if(removeArr){
            removeArr.forEach(remove => {
                element.classList.remove(remove);
            });
        }
    })
}

const hamburger = document.getElementById('hamburger');
// individual slice 
const hs1 = document.getElementById('h-s-1');
const hs2 = document.getElementById('h-s-2');
const hs3 = document.getElementById('h-s-3');
// mobile side
const sidenav = document.getElementById('sidenav');
// mobile sidenav items 
const sidenavItems = document.querySelectorAll('.sidenavItems')
// Track state of hamburger
let hamburgerOpen = false;
// used for stagaring
let timeoutStore = [];

hamburger.onclick = () =>{
    hamburgerOpen =!hamburgerOpen;
    moveMobileSideNav();
};

function moveMobileSideNav(){
    // time store
    let currentDelay = 300;
    if(hamburgerOpen){
        addAndRemoveClasses(['rotate-45', 'translate-y-3'],null,hs1);
        addAndRemoveClasses(['opacity-0'],null,hs2);
        addAndRemoveClasses(['-rotate-45','translate-y-4'],null,hs3);
        // mobile sidenav
        addAndRemoveClasses(null, 'translate-x-full', sidenav); 
        sidenavItems.forEach(item => {
            let timeout = setTimeout(() =>{
                addAndRemoveClasses(null, ['opacity-0', 'translate-x-full'], item)
            }, currentDelay);
            timeoutStore.push(timeout)
            currentDelay += 200;
        });
        return;
    }
    addAndRemoveClasses(null,['opacity-0'],hs2);
    addAndRemoveClasses(null,['rotate-45','translate-y-3'],hs1);
    addAndRemoveClasses(null,['-rotate-45','translate-y-4'],hs3);
    // mobile
    addAndRemoveClasses( 'translate-y-4', null, sidenav);
    // reset mobile sidebnav 
    timeoutStore.forEach(timeout =>{
        clearTimeout(timeout);
    });
    timeoutStore = [];
    sidenav.addEventListener('transitioned',() =>{
        if(hamburgerOpen) return;
        sidenavItems.forEach(item =>{
            item.classList.add('opacity-0', 'translate-x-5');
        })
    } );

}
