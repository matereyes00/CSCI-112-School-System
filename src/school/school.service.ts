import { Injectable } from "@nestjs/common";
import { Parent } from "./collections/parents/parents.model";
import { Student, StudentMongoModel } from "./collections/student/student.model";
import { ParentRepository } from "./collections/parents/parents.repository";
import { StudentRepository } from "./collections/student/student.repository";
import axios from 'axios';
import { HoldOrders } from "./collections/holdOrders/holdOrders.model";
import { HoldOrdersRepository } from "./collections/holdOrders/holdOrders.repository";
import { Teacher } from "./collections/teachers/teacher.model";
import { TeacherRepository } from "./collections/teachers/teacher.repository";
import { Course } from "./collections/courses/course.model";
import { CourseRepository } from "./collections/courses/course.repository";
import { QPI } from "./collections/qpi/qpi.model";
import { QPIRepository } from "./collections/qpi/qpi.repository";

@Injectable()
export class SchoolService {
  constructor(
    private readonly parentRepository: ParentRepository,
    private readonly studentRepository: StudentRepository,
    private readonly holdOrdersRepository: HoldOrdersRepository,
    private readonly teachersRepository: TeacherRepository,
    private readonly courseRepository: CourseRepository,
    private readonly qpiRepository: QPIRepository
  ) {}

  public async InsertStudents() {
    const getRandom = (item: Array<string | boolean | number>) => {
      return item[Math.floor(Math.random()*item.length)]
    }

    const randomNumber = (length: number) => {
      return `${getRandom(randomPrefixes)}${Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1))}`;
    }

    const studentyear = ['Freshman', 'Sophomore', 'Junior', 'Senior']
    const courses = ['Computer Science', 'Mathematics', 'Engineering', 'Physics', 'Accounting', 'Business Management', 'Architecture', 'Multimedia Arts', 'Communication Arts', 'Fashion Design', 'Chemical Engineering']
    const departments = ['SOSE', 'SOSS', 'SOM'];
    const randomPrefixes = ['0917', '0916', '0927', '0905', '0906', '0915', '0926'];
    const booleans = [true, false];
    const unitsTaken = ['3', '6', '9', '12', '15', '18', '21', '23', '24'];
    const birthdayYears = [1998, 1999, 2000, 2001, 2002]
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const days = [1, 10, 15, 13, 20, 31, 20, 16, 25, 4, 7];

    const femUrl = 'https://www.randomlists.com/data/names-female.json';
    const maleUrl = 'https://www.randomlists.com/data/names-male.json';
    const lastNameUrl = 'https://www.randomlists.com/data/names-surnames.json';
    const headers = this.Headers();
    const femNames = <Array<string>> (await axios.get(femUrl, headers)).data.data;
    const maleNames = <Array<string>> (await axios.get(maleUrl, headers)).data.data;
    const lastNames = <Array<string>> (await axios.get(lastNameUrl, headers)).data.data;
    const femAndMaleNames = femNames.concat(maleNames)

    const length = 10001;
    let i = 1;

    const arrayOfStudents: Student[] = [];

    while (i < length) {
      const randomFirstName = getRandom(femAndMaleNames);
      const randomLastName = getRandom(lastNames);

      const studentName = `${randomFirstName} ${randomLastName}`;
      const email = `${randomFirstName}_${randomLastName}`

      const student: Student = {
        studentID: i,
        studentName: studentName,
        studentYear: <string> getRandom(studentyear),
        courseName: <string> getRandom(courses),
        department: <string> getRandom(departments),
        primaryEmail: `${email}@gmail.com`,
        secondaryEmail: `${email}@yahoo.com`,
        hasHoldOrder: <boolean> getRandom(booleans),
        hasAnsweredAISISEvals: <boolean> getRandom(booleans),
        contactNo: randomNumber(7),
        unitsTaken: <string> getRandom(unitsTaken),
        birthday: `${getRandom(months)}/${getRandom(days)}/${getRandom(birthdayYears)}`
      }
      arrayOfStudents.push(student)
      i ++;
    }
    await this.studentRepository.createMany(arrayOfStudents);
  }

  public async InsertParents() {
    const randomPrefixes = ['0917', '0916', '0927', '0905', '0906', '0915', '0926'];

    const getRandom = (item: Array<string | boolean>) => {
      return item[Math.floor(Math.random()*item.length)]
    }

    const randomNumber = (length: number) => {
      return `${getRandom(randomPrefixes)}${Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1))}`;
    }

    const headers = this.Headers();
    const femUrl = 'https://www.randomlists.com/data/names-female.json';
    const maleUrl = 'https://www.randomlists.com/data/names-male.json';
    const femNames = <Array<string>> (await axios.get(femUrl, headers)).data.data;
    const maleNames = <Array<string>> (await axios.get(maleUrl, headers)).data.data;

    const students = <StudentMongoModel[]> await this.studentRepository.findAll();
    const lastNameMap: Map<string, StudentMongoModel> = new Map();
    const parents: Parent[] = [];

    students.forEach(f => {
      const split = f.studentName.split(' ');
      lastNameMap.set(split[1], f);
    })
    lastNameMap.forEach((v,k) => {
      const filteredIDs = students.filter(f => f.studentName.includes(k)).map(f => f.studentID);
      const momName = getRandom(femNames);
      const dadName = getRandom(maleNames);
      const mom: Parent = {
        parentName: `${momName} ${k}`,
        relationship: 'Mother',
        studentID: filteredIDs,
        contactNumber: randomNumber(7),
        email: `${momName}_${k}@gmail.com`
      }
      const dad: Parent = {
        parentName: `${dadName} ${k}`,
        relationship: 'Father',
        studentID: filteredIDs,
        contactNumber: randomNumber(7),
        email: `${dadName}_${k}@gmail.com`
      }
      parents.push(mom)
      parents.push(dad)
    })
    await this.parentRepository.createMany(parents);
  }

  public async InsertHoldOrders() {
    const holdOrders: HoldOrders[] = [];
    const getRandom = (item: Array<string | boolean>) => {
      return item[Math.floor(Math.random()*item.length)]
    }
    const orderTypes = ['Overdue Library Rental', 'AISIS Evaluations Unsubmitted', 'Guidance', 'Unpaid Tuition', 'Unsubmitted Final Requirements'];
    const months = ['01', '02', '03', '04', '05']
    const studentsWithHoldOrders = <StudentMongoModel[]> await this.studentRepository.find({
      $and: [
        { hasHoldOrder: true }
      ]
    });
    studentsWithHoldOrders.forEach(f => {
      const holdOrderDoc: HoldOrders = {
        studentID: f.studentID,
        orderType: <string> getRandom(orderTypes),
        dateDue: new Date(`2023-${getRandom(months)}-01T14:31:18.067Z`)
      }
      holdOrders.push(holdOrderDoc)
    })
    await this.holdOrdersRepository.createMany(holdOrders);
  }

  public async InsertTeachers() {
    const getRandom = (item: Array<string | boolean | number>) => {
      return item[Math.floor(Math.random()*item.length)]
    }

    const randomNumber = (length: number) => {
      return `${getRandom(randomPrefixes)}${Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1))}`;
    }

    const randomCourses = () : string[] => {
      const coursesTaught: string[] = []
      const numberOfCourse = Math.floor(Math.random() * (10 - 1) + 1);
      
      for (let j = 0; j < numberOfCourse; j++) {
        coursesTaught.push(<string> getRandom(courses));
      }
      return coursesTaught
    }

    const randomMonthsEmployed = () : number => {
      return Math.floor(Math.random() * (60 - 1) + 1);
    }

    const femUrl = 'https://www.randomlists.com/data/names-female.json';
    const maleUrl = 'https://www.randomlists.com/data/names-male.json';
    const lastNameUrl = 'https://www.randomlists.com/data/names-surnames.json';
    const departments = ['SOSE', 'SOSS', 'SOM'];
    const randomPrefixes = ['0917', '0916', '0927', '0905', '0906', '0915', '0926'];
    const courses = ['Computer Science', 'Mathematics', 'Engineering', 'Physics', 'Accounting', 'Business Management', 'Architecture', 'Multimedia Arts', 'Communication Arts', 'Fashion Design', 'Chemical Engineering']
    const headers = this.Headers();
    const femNames = <Array<string>> (await axios.get(femUrl, headers)).data.data;
    const maleNames = <Array<string>> (await axios.get(maleUrl, headers)).data.data;
    const lastNames = <Array<string>> (await axios.get(lastNameUrl, headers)).data.data;
    const femAndMaleNames = femNames.concat(maleNames)

    const length = 200;
    let i = 1;

    const arrayOfTeachers: Teacher[] = [];

    while (i < length) {
      const randomFirstName = getRandom(femAndMaleNames);
      const randomLastName = getRandom(lastNames);

      const teacherName = `${randomFirstName} ${randomLastName}`;
      const teacherEmail = `${randomFirstName}_${randomLastName}`

      const teacher: Teacher = {
        teacherID: i.toString(),
        teacherName: teacherName,
        schoolEmail: `${teacherEmail}@ateneo.edu`,
        department: <string> getRandom(departments),
        contactNumber: randomNumber(7),
        coursesTaught: randomCourses(),
        monthsEmployed: randomMonthsEmployed()
      }
      arrayOfTeachers.push(teacher);
      i++;
    }
    await this.teachersRepository.createMany(arrayOfTeachers);
  }

  public async InsertCourses() {
    const courses = ['Computer Science', 'Mathematics', 'Engineering', 'Physics', 'Accounting', 'Business Management', 'Architecture', 'Multimedia Arts', 'Communication Arts', 'Fashion Design', 'Chemical Engineering']
    const booleans = [true, false];
    const getRandom = (item: Array<string | boolean | number>) => {
      return item[Math.floor(Math.random()*item.length)]
    }
    const randomNumber = (length: number) => {
      return `${Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1))}`;
    }
    const length = courses.length;
    let i = 0;

    const arrayOfCourses: Course[] = [];

    while (i < length) {
      const courseCode = this.ReturnCourseCode(courses[i]);
      const course: Course = {
        courseCode: courseCode,
        courseName: courses[i],
        courseFee: +(randomNumber(5)),
        unitsNeeded: Math.floor(Math.random() * (18 - 15) + 15),
        isQuotaCourse: <boolean> getRandom(booleans)
      }
      arrayOfCourses.push(course);
      i++;
    }
    await this.courseRepository.createMany(arrayOfCourses);
  }

  public async InsertQPI() {
    const studentsDB = await this.studentRepository.findAll();
    const students: {
      id: number;
      studentYear: string;
    }[] = [];
    studentsDB.forEach(f => {
      students.push(
        {
          id: f.studentID,
          studentYear: f.studentYear
        }
      )
    })
    const allQPIs: QPI[] = [];

    students.forEach(f => {
        const qpisForStudent = this.GetQPIsForStudent(f);
        allQPIs.push(...qpisForStudent);
      }
    )
    await this.qpiRepository.createMany(allQPIs);
  }

  private GetQPIsForStudent(student: {id: number, studentYear: string}) {
    const QPIsForStudent: QPI[] = [];
    let years = 0;
    switch (student.studentYear) {
      case 'Freshman':
        years = 1;
        break;
      case 'Sophomore':
        years = 2;
        break;
      case 'Junior':
        years = 3;
        break;
      case 'Senior':
        years = 4;
        break;
    }
    const semestersCompleted = years * 2;

    for (let k = 0; k < semestersCompleted; k++) {
      let studentYear = '';
      const semester = (n: number) => {
        return (n % 2) == 0 ? '1st Semester' : '2nd Semester';
      }
      if (k == 0) studentYear = 'Freshman';
      if (k == 1) studentYear = 'Freshman';
      if (k == 2) studentYear = 'Sophomore';
      if (k == 3) studentYear = 'Sophomore';
      if (k == 4) studentYear = 'Junior';
      if (k == 5) studentYear = 'Junior';
      if (k == 6) studentYear = 'Senior';
      if (k == 7) studentYear = 'Senior';
      const QPI: QPI = {
        studentID: (student.id).toString(),
        studentYear: studentYear,
        QPI: (Math.random() * (4 - 1) + 1),
        semester: semester(k)
      }
      QPIsForStudent.push(QPI)
    }
    return QPIsForStudent;
  }

  private ReturnCourseCode(course: string) : string {
    switch (course) {
      case 'Computer Science':
        return 'CSCI';
      case 'Mathematics':
        return 'MATH';
      case 'Engineering':
        return 'ENG';
      case 'Physics':
        return 'PHYS';
      case 'Accounting':
        return 'ACCNT';
      case 'Business Management':
        return 'BUSMAN';
      case 'Architecture':
        return 'ARCHI';
      case 'Multimedia Arts':
        return 'MULTIART';
      case 'Communication Arts':
        return 'COMMART';
      case 'Fashion Design':
        return 'FASHDES';
      case 'Chemical Engineering':
        return 'CHEMENG'
    }
  }

  private Headers() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'application/json',
      },
    }
  }
}