//inside create_test.js
const assert = require('assert')
const Teacher = require('../models/modelTeacher')
const Course = require('../models/modelCourse')
const Exam = require('../models/modelExam')
const User = require('../models/user')
const Room = require('../models/modelRoom')
const Student = require('../models/modelStudent')


describe('Creating teacher', () => {
    it('creates a teacher', (done) => {
        //assertion is not included in mocha so 
        //require assert which was installed along with mocha
        //const poke = new Pokemon({ name: 'Pickachu' });
        const teacher = new Teacher({
            username: 'teacherFirst',
            password: 'password',
            uType: 'teacher',
            prefixName: 'นาย',
            firstName: "เดชภัทร",
            lastName: 'สร้อยทอง',
            faculty: 'IF',
            major: 'CS',
            course: [new Course()],
            position: "Test"
        })
        teacher.save() //takes some time and returns a promise
            .then(() => {
                assert(!teacher.isNew); //if poke is saved to db it is not new
                done();
            });
    });


});

describe('Creating documents', () => {
    it('creates a exam', (done) => {
        //assertion is not included in mocha so 
        //require assert which was installed along with mocha
        //const poke = new Pokemon({ name: 'Pickachu' });
        const exam = new Exam({
            season: "กลางภาค",
            date: "2019-5-31",
            timeStart: "10.00",
            timeFinish: "11.00",
            room: [new Room],
            score: [{
                point: '0',
                studentId: new Student,
                seatStatus: 'null'
            }],
            examiner: [],
            course: new Course
        })
        exam.save() //takes some time and returns a promise
            .then(() => {
                assert(!exam.isNew); //if poke is saved to db it is not new
                done();
            });
    });
})