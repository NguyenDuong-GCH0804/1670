const category = require('./category.controller')
const course = require('./course.controller')
const student = require('./student.controller')
//[GET] /staff
const index = (req, res, next) => {
    // console.log(req.email)
    res.render('staff/index',{
        rolePage: req.rolePage,
        link: `/${req.role}`,
        avatar: req.avatar,
        email: req.email
    });
}




const staff = {
    index,
    category,
    course,
    student
}
module.exports = staff;