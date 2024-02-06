const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic

    try {
    const username =  req.body.username;
    const password = req.body.password;

    await User.create({
        username,
        password
    })

    res.json({
        message: 'User created successfully'
    })
        
    } catch (error) {
        console.error('Error creating user: ', error);
        res.status(500).json({
            message: 'Error creating user'
        })
        
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({})
    res.json({
        courses: response
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    try {
        await User.updateOne({
        username: username
    },{
        $push: {
            purchasedCourses: courseId
        }
    })  
    res.json({
        message: 'Course purchased successfully'
    })
    } catch (error) {
        console.error('Error purchasing course: ', error);
        res.status(500).json({
            message: 'Error purchasing course'
        })
        
    } 
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    const user = await User.findOne({ username: username})

    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    })

    res.json({
        courses: courses
    })
});

module.exports = router