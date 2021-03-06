const Students = require("../../model/users.model").model;
const Roles = require("../../model/roles.model");

//[GET] /staff/viewStudent/create
const create = (req, res, next) => {
  res.render("staff/students/createStudent",{
    rolePage: req.rolePage,
    link: `/${req.role}`,
    avatar: req.avatar,
    email: req.email,
  });
};

//[POST] /staff/viewStudent/store
const store = async (req, res, next) => {
  try{
    await new Students({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      phone: req.body.phone,
      address: req.body.address,
      role: "trainee",
    }).save();
    return res.redirect('/staff/viewStudent')
  }catch(err){
    return res.render("staff/students/createStudent",{
      rolePage: req.rolePage,
      link: `/${req.role}`,
      avatar: req.avatar,
      email: req.email,
      addFailed : true,
    });
  }
};

//[GET] /staff/viewStudent
const show = async (req, res, next) => {
  try {
    let students = await Students.find({ role: "trainee" })
    res.render("staff/students/viewStudent", {
      students: students,
      rolePage: req.rolePage,
      link: `/${req.role}`,
      avatar: req.avatar,
      email: req.email,
    });
  }
  catch(err) {
    next(err);
  }
};

//[GET] /staff/viewStudent/:id/edit
const edit = (req, res, next) => {
  try {
    let student = Students.findOne({ _id: req.params.id })
    res.render("staff/students/editStudent", {
      student: student,
      rolePage: req.rolePage,
      link: `/${req.role}`,
      avatar: req.avatar,
      email: req.email,
    });
  }
  catch(err){
    next(err);
  }
};

//[PUT] /staff/viewStudent/:id
const update = async (req, res, next) => {
  try{
    await Students.updateOne({ _id: req.params.id }, req.body)
    return res.redirect('/staff/viewStudent');
  }catch(err){
    let student = await Students.findOne({ _id: req.params.id })
    res.render("staff/students/editStudent", {
      student: student,
      rolePage: req.rolePage,
      link: `/${req.role}`,
      avatar: req.avatar,
      email: req.email,
      addFailed : true,
    });
  }
    
};

//[DELETE] /staff/viewStudent/:id
const deleteS = async (req, res, next) => {
  try {
    let student = await Students.deleteOne({ _id: req.params.id })
    res.redirect("/staff/viewStudent")
  }
  catch(err) {
    next(err);
  }
};

//[GET] /staff/viewStudent/search
const search = async (req, res, next) => {
  try {
    let student = await Students.findOne({
      $and: [{ name: req.query.search }, { role: "trainee" }],
    })
    if (student) {
      return res.render("staff/students/viewStudent", {
        student: student,
        rolePage: req.rolePage,
        link: `/${req.role}`,
        avatar: req.avatar,
        email: req.email,
      });
    }
    const searchStudent = new RegExp(req.query.search, "i");
    let students = await Students.find({ $and: [{ name: searchStudent }, { role: "trainee" }] })
    res.render("staff/students/viewStudent", {
      students: students,
      rolePage: req.rolePage,
      link: `/${req.role}`,
      avatar: req.avatar,
      email: req.email,
    });
  }
  catch (err) {
    next(err);
  }
};

const student = {
  create,
  store,
  show,
  edit,
  update,
  deleteS,
  search,
};

module.exports = student;
