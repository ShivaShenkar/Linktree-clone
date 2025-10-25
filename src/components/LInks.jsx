import LinkItem from "./LinkItem";
import { Grow } from "@mui/material";

function Links({linksArr,delay}){
    let linkElements = linksArr.map((linkObj,ind) => <Grow in timeout={(ind+1+delay)*500} key={linkObj.id} style={{padding:"0"}}><div><LinkItem social={linkObj.social} username={linkObj.username} /></div></Grow> );
    
    return (<div className="links" style={{width:"100%"}}>{linkElements}</div>)

}

export default Links;