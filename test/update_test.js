// update_test.js
const assert = require('assert')
const Teacher = require('../models/modelTeacher')
const Course = require('../models/modelCourse')
const Exam = require('../models/modelExam')
const User = require('../models/user')
const Room = require('../models/modelRoom')
const Student = require('../models/modelStudent')

describe('Deleting a teacher', () => {

  let teacher;

  beforeEach((done) => {
    teacher = new Teacher({
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
    teacher.save()
      .then(() => done());
  });

  function assertHelper(statement, done) {
    statement
      .then(() => Teacher.find({}))
      .then((teachers) => {
        assert(teachers.length === 1);
        //console.log(teachers[0].password)
        assert(teachers[0].password == 'pordwass');
        done();
      });
  }

  it('sets and saves teacher using an instance', (done) => {
    teacher.set('password', 'pordwass'); //not updated in mongodb yet
    assertHelper(teacher.save(), done);
  });

  it('update teacher using instance', (done) => {
    //useful to update multiple fields of the object
    assertHelper(teacher.update({ password: 'pordwass' }), done);
  });

  it('update all matching teacher using model', (done) => {
    assertHelper(teacher.update({ password: 'pordwass' }, { password: 'pordwass' }), done);
  });

  it('update one teacher using model', (done) => {
    assertHelper(Teacher.findOneAndUpdate({ username: 'teacherFirst' }, { password: 'pordwass' }), done);
  });

  it('update one teacher with id using model', (done) => {
    assertHelper(Teacher.findByIdAndUpdate(teacher._id, { password: 'pordwass' }), done);
  });
});


describe('Deleting a exam', () => {

  var exam;

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
/*
afterEach((done) => {
  exam.remove().then(()=>done())
})*/


  function assertHelper(statement, done) {
    statement
      .then(() => Exam.find({}))
      .then((exams) => {
        assert(exams.length === 1);
        assert(exams[0].season == 'ปลายภาค');
        done();
      });
  }

  it('sets and saves exam using an instance', (done) => {
    exam.set('season', 'ปลายภาค'); //not updated in mongodb yet
    assertHelper(exam.save(), done);
  });
/*
  it('update exam using instance', (done) => {
    //useful to update multiple fields of the object
    assertHelper(exam.update({ season: "ปลายภาค" }), done);
    
  });

  it('update all matching exam using model', (done) => { 
    assertHelper(exam.update({ season: 'กลางภาค' }, { season: 'ปลายภาค' }), done); 
    
  });*/

  it('update one exam using model', (done) => {
    assertHelper(Exam.findOneAndUpdate({ season: 'กลางภาค' }, { season: 'ปลายภาค' }), done);
  });

  it('update one exam with id using model', (done) => {
    assertHelper(Exam.findByIdAndUpdate(exam._id, { season: 'ปลายภาค' }), done);
  });
});