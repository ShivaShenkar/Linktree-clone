import LinkItem from "./LinkItem";
import { Grow } from "@mui/material";
import { useState,useEffect} from "react";

function Links(){
    const [linksArr,setLinksArr] = useState([]);
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_SERVER_HOST}/api/links`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        .then(res=>{return res.json()})
        .then(data => setLinksArr(data.links))
        .catch(err=> console.error('Error fetching links: '+err));
    },[]);
    
    let linkElements = linksArr.map((linkObj,ind) => <Grow in timeout={(ind+4)*500} key={ind}><div><LinkItem props={{social:linkObj.social,username:linkObj.username,link:linkObj.link}}/></div></Grow> );
    return (
        <div className="links" style={{width:"100%"}}>{linkElements}</div>
    );

}

export default Links;