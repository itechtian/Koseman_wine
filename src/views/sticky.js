function stickyHeader(){
    console.log(window.scrollY)
    // if(window.scrollY > 100){document.getElementById('header').classList.add('sticky')}
    // else{document.getElementById('header').classList.remove('sticky')}
}
export default {
    sticky:stickyHeader
}