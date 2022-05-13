import express from 'express';
import cors from 'cors';
import { employeeRoutes } from './routes/employee.routes.js';
import { transactionRoutes } from './routes/transaction.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(employeeRoutes);
app.use(transactionRoutes);

// const loggedUserId      = '100' // get value from session
// let eList, tList, id, eName, eDOB, ePhone, eEmail, eComRate, eAdmin, eUser, eRole

// ---------------------------------------------------------- CRUD EMPLOYEE - TESTED - APPROVED



// await e.createSystemAdmin ('System Administrator', '01/01/2000', '555-555-5555', 'sysadm@thiscompany.com')

// eName = 'Vanusa'
// eDOB = '06/06/2002'
// ePhone = '444-444-4444'
// eEmail = 'owner@thiscompany.com'
// eComRate = 1.00
// await e.createAdmin(loggedUserId, eName, eDOB, ePhone, eEmail, eComRate)

// eName = 'Rodrigo'
// eDOB = '12/21/2002'
// eComRate = 0.10
// await e.createEmployee(loggedUserId, eName, eDOB, eComRate)

// eName = 'Natalia'
// eDOB = '01/01/2002'
// eComRate = 0.10
// await e.createEmployee(loggedUserId, eName, eDOB, eComRate)

// eList = await e.getEmployee()
// console.log(eList) 


// eRole = await e.getLoggedUserRole(eList[1]._id)
// eAdmin = eRole[0].admin
// eUser = eRole[0].user

// // owner
// if(eAdmin && eUser){
//     e.getEmployeeByIdAdmin
//     e.getEmployeeByNameAdmin
//     e.getActiveEmployeeByName
//     e.updEmployeeName
//     e.updEmployeeComRate
// }

// // employee
// if(!eAdmin){
//     e.getEmployeeById
//     e.getActiveEmployeeByName
//     e.getFormerEmployeeByName

// }



// eList = await e.getEmployeeByName('Rod')
// for(let i=0;i<eList.length;i++){
//     console.log(eList[i]._id, eList[i].name, eList[i].deleted, eList[i].changed, eList[i].timeCreated, eList[i].oEmployeeId )
// }

// eList = await e.getEmployeeById(eList[0]._id)
// console.log(eList) 

// eList = await e.updEmployeeName (loggedUserId, eList[0]._id, 'Vanusa Vieira Pereira')
// eList = await e.updEmployeeComRate (loggedUserId, eList[1]._id, 0.3)
// console.log(eList)

// console.log(eList)

// eList = await e.getEmployee()
// console.log(eList) 

// ---------------------------------------------------------- CRUD TRANSACTION - TESTED - APPROVED



// create a transaction
// parameters coming from web: dateTransaction (dd/mm/yyyy), 
// clientUnit, clientPayment, 
// vendorName, vendorCost

// const loggedUserId      = '001' // get value from session

// const eName             = "Rodrigo"
// const eData             = await e.getEmployeeByName(eName)
// const serviceName       = 'Cleaning'
// const dateTransaction   = '12/20/2022'
// const clientUnit        = '70 S'
// const clientPayment     = 200.00
// const vendorName        = 'Marcia'
// const vendorCost        = 160.00

// await t.createTransaction(loggedUserId, eData[0]._id, eData[0].comRate, serviceName, dateTransaction, clientUnit, clientPayment, vendorName, vendorCost)

// tList = await t.getTransactionByDate('12/20/2022')
// console.log(tList)

// const loggedUserId      = '111'         // get value from session
// const transactionId     = tList[0]._id  // get value from the selection available on user screen 
// const eName             = "Rodrigo"
// const eData             = await e.getEmployeeByName(eName)
// const serviceName       = 'Cleaning'
// const dateTransaction   = '12/15/2022'
// const clientUnit        = '70 S'
// const clientPayment     = 220.00
// const vendorName        = 'Marcia'
// const vendorCost        = 160.00

// await t.updTransaction(loggedUserId, transactionId, eData[0]._id, eData[0].comRate, serviceName, dateTransaction, clientUnit, clientPayment, vendorName, vendorCost)

// tList = await t.getTransactionByDate('12/15/2022')
// console.log(tList)

// tList = await t.getTransaction()
// console.log(tList)


// ---------------------------------------------------------- REPORTS - NOT TESTED - NOT APPROVED



// const logOut = await disconnect()