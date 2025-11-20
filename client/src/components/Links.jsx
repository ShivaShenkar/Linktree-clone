import LinkItem from "./LinkItem";
import { Grow } from "@mui/material";

function Links(props){
    let linkElements = props.linksArr.map((linkObj,ind) => <Grow in timeout={(ind+1+props.delay)*500} key={ind}><div><LinkItem social={linkObj.social} username={linkObj.username} link={linkObj.link} /></div></Grow> );
    return (<div className="links" style={{width:"100%"}}>{linkElements}</div>)

}

export default Links;