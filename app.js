const express = require('express');
const app = express();

const cookieParser = require("cookie-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


const authenticate = (req, res, next) => {
    if (req.cookies && req.cookies.myCookie) {
        // Proceed to next middleware or route handler
        
        next();
    }
    else
        res.status(401).send('Unauthorized');
};

app.get('/login', (req, res) => {
    // Check user credentials (replace 1 with your authentication logic)
    if(1) 
    {
        res.cookie('myCookie', {usename:'vivek', login:'true'}, { maxAge: 900000, httpOnly: true });
        res.send('Login successful');
    }
    else
        res.status(401).send('Invalid username or password');
});

app.get('/logout', (req, res) => {
    res.clearCookie('myCookie');
    res.send('Logged out successfully');
});

app.get('/', (req, res) => {   
    res.send("Hello home");
});

app.get('/protected', authenticate, (req, res) => {
    console.log(req.cookies.myCookie);
    res.send('This is a protected route');
});



app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
