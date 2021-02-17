const Category = require('../models/Category');
const Course = require('../models/Course');
const { mapObject, mapArray } = require('../../util/mongoose');

class MyController {

    // GET /me/stored/courses
    myCourses(req, res, next) {
        Promise.all([Course.find().populate('category'), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => {
                res.render('me/myCourses', {
                    courses: mapArray(courses),
                    deletedCount
                })
            })
            .catch(next)
    }

    // GET /me/trash/courses
    myTrashCourses(req, res, next) {
        Course.findDeleted().populate('category')
            .then((courses) => {
                res.render('me/my-trash', {
                    courses: mapArray(courses),
                })
            })
            .catch(next)
    }
}

module.exports = new MyController