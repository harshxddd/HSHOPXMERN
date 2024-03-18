import React, { useEffect, useState } from 'react'
import "./widgetSm.css";
import { Visibility } from '@mui/icons-material';
import axios from "axios";
import { userRequest } from '../../requestMethods';
export default function WidgetSm() {
    const[Users,setUsers] = useState([]);
    useEffect(()=>{
        const getUsers=async()=>{
            try{
            const res=await userRequest.get('users/?new=true')
            setUsers(res.data)
            console.log(res.data)
        }catch(err){

            }
        }
        
        getUsers();
    },[])
  return (
    <div className="widgetSm">
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
            {Users.map(user=>(
                <li className="widgetSmListItem">
                <img src={Users.img || "https://i.ibb.co/1nkPyfs/Netflix-avatar.png"} alt="Error" className="widgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUsername">{user.username}</span>
                </div>
                <button className="widgetSmButton">
                    <Visibility className='widgetSmIcon'/>
                    Display
                </button>
            </li>
            ))}
        </ul>
    </div>
  )
}
