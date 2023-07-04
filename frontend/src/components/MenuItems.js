
let name = localStorage.getItem('uname')

export const MenuItemsforAcademy = [
    {
        title : "Home",
        url : "/",
        cName : "nav-links",
        icon : "fa-solid fa-house-user "
    },
    // {
    //     title : "About",
    //     url : "#",
    //     cName : "nav-links",
    //     icon : "fa-sharp fa-solid fa-circle-info"
    // },
    {
        title : "Feed",
        url : "#",
        cName : "nav-links",
        icon : "fa-solid fa-rss"   
    },
    {
        title : "Job",
        url : "/jobs",
        cName : "nav-links",
        icon : "fa-solid fa-suitcase"
    },
    {
        title : "Notices",
        url : "#",
        cName : "nav-links",
        icon : "fa-sharp fa-regular fa-bell"
    },
    {
        title:"search",
        url:"search",
        cName: "nav-links",
        icon:"fas fa-search"
    },
    {
        title:"username",
        url:"profile",
        cName:" nav-links",
        icon:"fa-solid fa-circle-user"
    },
   
    {
        title : "Logout",
        url : "/",
        cName : "nav-links-mobile logout-btn",
        
    },

]

export const MenuItemsforIndustry = [
    {
        title : "Home",
        url : "/industry",
        cName : "nav-links",
        icon : "fa-solid fa-house-user "
    },
    // {
    //     title : "About",
    //     url : "#",
    //     cName : "nav-links",
    //     icon : "fa-sharp fa-solid fa-circle-info"
    // },
    {
        title : "Feed",
        url : "#",
        cName : "nav-links",
        icon : "fa-solid fa-rss"   
    },
    {
        title : "Job",
        url : "/industrypost",
        cName : "nav-links",
        icon : "fa-solid fa-suitcase"
    },
    {
        title : "Notices",
        url : "#",
        cName : "nav-links",
        icon : "fa-sharp fa-regular fa-bell"
    },
    {
        title:"search",
        url:"search",
        cName: "nav-links",
        icon:"fas fa-search"
    },
    {
        title:"username",
        url:"profile",
        cName:" nav-links",
        icon:"fa-solid fa-circle-user"
    },
    {
        title : "Logout",
        url : "/",
        cName : "nav-links-mobile logout-btn",
        
    },

]




export const MenuItemsBeforeLogin =[
    // {
    //     title : "Home",
    //     url : "#",
    //     cName : "nav-links",
    //     icon : "fa-solid fa-house-user"
    // },
    {
        title : "Login",
        url : "samplelogin",
        cName : "nav-links-mobile login-btn",
        
    },
    {
        title : "Signup",
        url : "register",
        cName : "nav-links-mobile signup-btn",
        
    },
    

]