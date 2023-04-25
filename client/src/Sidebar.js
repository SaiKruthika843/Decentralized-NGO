import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList,
    FaDonate
}from "react-icons/fa";
import {
SiBlockchaindotcom
}from "react-icons/si";
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./App.css"


const Sidebar = ({children}) => {
    // const[isOpen ,setIsOpen] = useState(false);
    // const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Donate",
            // icon:<FaDonate/>
        },
        
        {
            path:"/Requests",
            name:"NGO Withdraw Requests",
            // icon:<SiBlockchaindotcom/>
        },
        {
            path:"/contact",
            name:"View Transactions",
            // icon:<FaRegChartBar/>
        },
                
       
    ]
    return (
        <div className="container">
           <div style={{width: "350px" ,color:"black"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: "block" , color:"white"}} className="logo">HOPE foundation</h1>
                   <div style={{marginLeft: "50px"}} className="bars">
                       <FaBars/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                    <a key={index} >
                       <a href={item.path} key={index} class="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display:  "block"}} className="link_text">{item.name}</div>
                       </a>
                       </a>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;