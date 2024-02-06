const { Admin } = require("../db")

// Middleware for handling auth
 async function adminMiddleware(req, res, next) {
    // Implement admin auth logic`
    // You need to check the heade`rs and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;

    const admin = await Admin.findOne({
        username: username,
        password: password
    })

    if (admin){
        next();
    }else{
        res.status(401).json({
            message: "Admin not found"
        });
    }

}

module.exports = adminMiddleware;