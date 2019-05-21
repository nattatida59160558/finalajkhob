//inside read_test.js
const assert = require('assert')
const Teacher = require('../models/modelTeacher')
const Course = require('../models/modelCourse')
const Exam = require('../models/modelExam')
const User = require('../models/user')
const Room = require('../models/modelRoom')
const Student = require('../models/modelStudent')
let exam
let teacher;

describe('Delete teacher details', () => {
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
            course : [new Course()] ,
            position : "Test"
        })
        teacher.save()
          .then(() => done());
    });
    it('removes a teacher using its instance', (done) => {
        Teacher.remove()
        .then(() => Teacher.findOne({ username: 'teacherFirst' }))
        .then((teacher) => {
          assert(teacher === null);
          done();
        });
    });
    it('removes multiple teacher', (done) => {
        Teacher.remove({ username: 'teacherFirst' })
        .then(() => Teacher.findOne({ username: 'teacherFirst' }))
        .then((teacher) => {
          assert(teacher === null);
          done();
        });
    });
  
    it('removes a teacher', (done) => {
        Teacher.findOneAndRemove({ username: 'teacherFirst' })
        .then(() => Teacher.findOne({ username: 'teacherFirst' }))
        .then((teacher) => {
          assert(teacher === null);
          done();
        });
    });
  
    it('removes a teacher using id', (done) => {
        Teacher.findByIdAndRemove(teacher._id)
      // the following code block is repeated again and again
        .then(() => Teacher.findOne({ username: 'teacherFirst' }))
        .then((teacher) => {
          assert(teacher === null);
          done();
        });
      })
})


describe('Delete exam details', () => {

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
     examiner: [new User],
     course: new Course
   })
   exam.save()
     .then(() => done());
});


 /* it('removes a exam using its instance', (done) => {
      Exam.remove()
      .then(() => Exam.findOne({season:'กลางภาค'}))
      .then((exam) => {
        assert(exam === null);
        done();
      });
  });
  
  it('removes multiple exam', (done) => {
    Exam.remove({season:'กลางภาค'})
      .then(() => Exam.findOne({season:'กลางภาค'}))
      .then((exam) => {
        assert(exam === null);
        done();
      });
  });*/

  it('removes a exam', (done) => {
    Exam.findOneAndRemove({ season:'กลางภาค' })
      .then(() => Exam.findOne({ season:'กลางภาค' }))
      .then((exam) => {
        assert(exam === null);
        done();
      });
  });

  it('removes a exam using id', (done) => {
    Exam.findByIdAndRemove(exam._id)
    // the following code block is repeated again and again
      .then(() => Exam.findOne({ season: 'กลางภาค' }))
      .then((exam) => {
        assert(exam === null);
        done();
      });
    })
})