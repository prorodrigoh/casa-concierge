import { Router } from "express"
import {
    createSystemAdmin,
    createAdmin,
    createEmployee,
    getAllEmployees,
    getLoggedUserRole,
    getEmployeeByIdAdmin,
    getEmployeeByNameAdmin,
    getEmployeeById,
    getActiveEmployeeByName,
    getFormerEmployeeByName,
    updEmployeeName,
    updEmployeeComRate,
    updEmployeeDOB,
    updEmployeeRole,
    delEmployee
} from "../services/employee.services.js";

export const employeeRoutes = Router();

employeeRoutes.post('/admin/createsystemadmin/:token', createSystemAdmin);
employeeRoutes.post('/admin/createadmin/:token', createAdmin);
employeeRoutes.post('/admin', createEmployee);

employeeRoutes.get('/', getAllEmployees);
employeeRoutes.get('/:EmployeeId', getEmployeeById);
employeeRoutes.get('/:name', getActiveEmployeeByName);
employeeRoutes.get('/:name', getFormerEmployeeByName);

employeeRoutes.get('/admin/:name', getEmployeeByNameAdmin);
employeeRoutes.get('/admin/:EmployeeDocId', getLoggedUserRole);
employeeRoutes.get('/admin/:EmployeeDocId', getEmployeeByIdAdmin);


employeeRoutes.patch('/:EmployeeDocId', updEmployeeName);
employeeRoutes.patch('/:EmployeeDocId', updEmployeeComRate);
employeeRoutes.patch('/:EmployeeDocId', updEmployeeDOB);
employeeRoutes.patch('/:EmployeeDocId', updEmployeeRole);

employeeRoutes.delete('/:EmployeeDocId', delEmployee);
