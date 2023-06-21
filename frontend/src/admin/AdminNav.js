import {AdminMenus} from './AdminMenuItem';
import {useState} from 'react';
import "../components/navbar1.css"
function AdminNav(){
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(!clicked);
    }
    return(
        <nav className="NavbarItems">
            <h1 className="logo">Logo</h1>
            <div className="menu-icons" onClick={handleClick}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <ul className={clicked ? "nav-menu active" : "nav-menu"}>
                {AdminMenus.map((item,index) => {
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
            </ul>
        </nav>
    )
}

export default AdminNav