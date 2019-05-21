//inside read_test.js
const assert = require('assert')
const Teacher = require('../models/modelTeacher')
const Course = require('../models/modelCourse')
const Exam = require('../models/modelExam')
const User = require('../models/user')
const Room = require('../models/modelRoom')
const Student = require('../models/modelStudent')
let teacher;
let exam

describe('Reading teacher details', () => {
    beforeEach((done) => {
         teacher = new Teacher ({
            username :  'teacherFirst' ,
            password : 'password' ,
            uType : 'teacher' ,
            prefixName : 'นาย' ,
            firstName : "เดชภัทร" ,
            lastName : 'สร้อยทอง' ,
            faculty : 'IF' ,
            major : 'CS' ,
            course : [new Course()],
            position : "Test"
        })
        teacher.save()
          .then(() => done());
    });
    it('finds teacher with the name of teacher', (done) => {
        Teacher.findOne({ username: 'teacherFirst' })
            .then((teacher) => {
                assert(teacher.username === 'teacherFirst'); 
                done();
            });
    })
})


describe('Reading exam details', () => {
    beforeEach((done) => {
        exam = new Exam ({
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
       exam.save()
         .then(() => done());
   });
    it('finds exam with the name of exam', (done) => {
        Exam.findOne({ season: 'กลางภาค' })
            .then((exam) => {
                assert(exam.season === 'กลางภาค'); 
                done();
            });
    })
})