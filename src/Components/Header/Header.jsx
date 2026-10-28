import React from 'react'
import "./header.css"
import NetflixLogo from "../../assets/images/NetflixLogo.png"
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
const Header = () => {
  return (
    <div className="header_outer_container">
      <div className="header_container">
        <div className="header_left">
            <ul>
                <li><img src={NetflixLogo} alt="Netflix Logo" width="100"/></li>
                
                <li>Home</li>
                <li>TVShows</li>
                <li>Movies</li>
                <li>Latest</li>
                <li>MyLists</li>
                <li>Browse by Language</li>
            </ul>
        </div>
        <div className="header_right">
            <ul>
                <li><SearchIcon/></li>
                <li><NotificationsNoneIcon/></li>
                <li>< AccountBoxSharpIcon /></li>
                <li><ArrowDropDownCircleIcon/></li>
            </ul>

        </div>
      </div>
    </div>
  )
}

export default Header
