const express = require('express');
const app = express();

const rateLimiter = new Map();
function rateLimit({windowMs, maxRequests}){
    return (req,res,next)=>{
        const ip=req.ip;
        const currTime= Date.now();
        const windowStart = currTime - windowMs;
        if(!rateLimiter.has(ip)){
            rateLimiter.set(ip,[]);
        }
        console.log('window ms',windowMs);
        console.log('window start',windowStart);
        const timeStamp = rateLimiter.get(ip);
        console.log('timestamp',timeStamp);
        
        const recentRequests = timeStamp.filter((ts) => {
            return ts >windowStart;
        })
        console.log("recent request",recentRequests);
        
        recentRequests.push(currTime);
        rateLimiter.set(ip,recentRequests);
        console.log("recent request after push ",recentRequests);
        if(recentRequests.length > maxRequests){
            return res.status(429).json({
                error:'too many requests'
            });
        }
        next();
    }
}
app.use(rateLimit({windowMs:10*1000,maxRequests:5}));

app.get('/',(req,res)=>{
    res.send('hello you are under rate limit');
})

app.listen(3000,()=>{
    console.log('server start');
})