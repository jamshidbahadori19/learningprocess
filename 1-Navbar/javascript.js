const toggleButton = document.getElementsByClassName("navbar-toggle")[0]
const navItems = document.getElementsByClassName("navbar-items")[0]
const navbarSearch = document.getElementsByClassName("navbar-search")[0]

toggleButton.addEventListener("click",()=>{
    navItems.classList.toggle("active")
    navbarSearch.classList.toggle("active")
})