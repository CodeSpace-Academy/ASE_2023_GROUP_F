/**
 * This script controls the behavior of a burger menu.
 *
 * It toggles the visibility of the menu when the burger icon is clicked.
 * The script selects the burger icon and menu elements, adds a click event
 * listener to the burger icon, and toggles the 'hidden' class of the menu.
 */

const burger = document.querySelector('#burger')
const menu = document.querySelector('#menu')

burger.addEventListener('click',() => {
    if(menu.classList.contains('hidden')){
        menu.classList.remove('hidden')
    }else{
        menu.classList.add('hidden')
    }
})