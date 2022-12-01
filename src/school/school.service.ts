import { Injectable } from "@nestjs/common";
import { Parent } from "./collections/parents/parents.model";
import { Student, StudentMongoModel } from "./collections/student/student.model";
import { ParentRepository } from "./collections/parents/parents.repository";
import { StudentRepository } from "./collections/student/student.repository";
import axios from 'axios';
import { HoldOrders } from "./collections/holdOrders/holdOrders.model";
import { HoldOrdersRepository } from "./collections/holdOrders/holdOrders.repository";

@Injectable()
export class SchoolService {
  constructor(
    private readonly parentRepository: ParentRepository,
    private readonly studentRepository: StudentRepository,
    private readonly holdOrdersRepository: HoldOrdersRepository
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

  private Headers() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'application/json',
      },
    }
  }
}