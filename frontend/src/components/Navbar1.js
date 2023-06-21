import {MenuItems, MenuItemsforAcademy, MenuItemsforIndustry} from './MenuItems';
import {useState} from 'react';
import SearchBar from './Searchbar';
import { MenuItemsBeforeLogin } from './MenuItems';
import "./navbar1.css"
import Data from './Data.json'
function Navbar1(){
    const name = localStorage.getItem('userName')
    const [clicked, setClicked] = useState(false);
    const temp= localStorage.getItem('is logged in');
    const aff = localStorage.getItem("affiliation")
    // const [login,setLogin]=useState(false) 
    const login = (temp=='true'?true:false)
    console.log(temp)
    const handleClick = () => {
        setClicked(!clicked);   
    }
    const handleLogout = (title) => {
        
        console.log(title)
        if(title == "Logout"){
            localStorage.setItem("is logged in","false")
        }
    }

    return(
        <nav className="NavbarItems">
            <h1 className="navbar-logo">Logo</h1>
            
            <div className="menu-icons" onClick={handleClick}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            {/* <div className='search-bar'>
                <SearchBar placeholder="Search here..." data={Data}></SearchBar> 
            </div> */}
            {/* <div className='grid-container'> */}
           {login? <ul className={clicked ? "nav-menu active" : "nav-menu-login"}>
                {login && aff=="academy" && MenuItemsforAcademy.map((item,index) => {

                    return(
                            <li key={index} >
                                <a href={item.url} 
                                className={item.cName}
                                >
                                    <i className={item.icon}>
                                    </i><span className='menu-title' onClick={()=>{
                                        handleLogout(item.title)
                                    }}> {item.title=='username'?name:item.title}</span>
                                </a>
                                
                            </li>
                            
                    )
                })}

                    {login && aff=="industry" && MenuItemsforIndustry.map((item,index) => {

                    return(
                            <li key={index} >
                                <a href={item.url} 
                                className={item.cName}
                                >
                                    <i className={item.icon}>
                                    </i><span className='menu-title'  onClick={()=>{
                                        handleLogout(item.title)
                                        }}>{item.title=='username'?name:item.title}</span>
                                </a>
                            </li>
                    )
                    })}


            </ul>:''}
            {!login ?<ul className={clicked ? "nav-menu active" : "nav-menu"}>
                {!login && MenuItemsBeforeLogin.map((item,index) => {
                    return(
                            <li key={index}>
                                <a href={item.url} 
                                className={item.cName}>
                                    <i className={item.icon}>
                                    </i><span className='menu-title'>{item.title}</span>
                                </a>
                            </li>
                
                    )
                })}
            </ul>:''}
        </nav>
    )
}

export default Navbar1