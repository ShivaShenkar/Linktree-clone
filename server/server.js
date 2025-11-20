import http from "http";

const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'})
});
const PORT = 3000
server.listen(PORT,()=>{
    console.log(`Server is now listening on http:\\localhost:${PORT}`);
});