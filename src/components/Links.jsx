import LinkItem from "./LinkItem";
import { Grow } from "@mui/material";
import { useState} from "react";
import db from "../data/db.js";

function Links(){
    const [linksArr,setLinksArr] = useState(db.links);
    let linkElements = linksArr.map((linkObj,ind) => <Grow in timeout={(ind+4)*500} key={ind}><div><LinkItem social={linkObj.social} username={linkObj.username} link={linkObj.link}/></div></Grow> );
    return (
        <div className="links" style={{width:"100%"}}>{linkElements}</div>
    );

}

export default Links;