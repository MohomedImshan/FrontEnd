import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../index/header'
import { Link } from 'react-router-dom'

function Notification(){

    //Table data state to store fetched requests
    const [requests,setRequests] = useState([]);

    //Fetch all requets from backend
    const fetchRequests = async () => {
        try{
            const res = await axios.get('http://localhost:8800/api/requests');
            setRequests(res.data.requests || [])
        }catch(err){
            console.log(err)
        }
        
    };

    //Load data on component mount
    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div>
          <h1 className='text-center'>Requet Notifications</h1>
          
        </div> 
    );
}

export default Notification;