import { getCollection } from "./mongo.collection.js";

const col = await getCollection('employees');


// ---------------  CREATE SECTION

export const createSystemAdmin = async (name, DOB, phone, email) => {
    const insertedResults = await col.insertOne({
        timeCreated: new Date(),
        loggedUserId: null,
        name,
        DOB,
        phone,
        email,
        comRate: null,            
        admin: true, // System Admin just interact with the system, not with the business    
        user: false, // not part of the business
        deleted: false, 
        changed: false, 
        oloEmployeeId: null,
    });
    return insertedResults.insertedId;
};

export const createAdmin = async (loggedUserId, name, DOB, phone, email, comRate) => {
    const insertedResults = await col.insertOne({
        timeCreated: new Date(),
        loggedUserId,
        name,
        DOB,
        phone,
        email,
        comRate,          
        admin: true,      //admin is the only one able to use all functions
        user: true,       //user is part of the payroll and use some functions.
        deleted: false, 
        changed: false, 
        oloEmployeeId: null,
    });
    return insertedResults.insertedId;
};

export const createEmployee = async (loggedUserId, name, DOB, phone, email, comRate) => {
    const insertedResults = await col.insertOne({
        timeCreated: new Date(),
        loggedUserId,
        name,
        DOB,
        phone,
        email,
        comRate,              
        admin: false,     
        user: true,       //user is part of the payroll and use some functions.
        deleted: false, 
        changed: false, 
        oloEmployeeId: null,
    });
    return insertedResults.insertedId;
};



// ---------------  READ SECTION

// on the web page we will show only { name, DOB, comRate } for the logged user when admin:false 


export const getEmployee = async () => {
    const ret = col.find({})
    return ret.toArray()
}

export const getLoggedUserRole = async (_id) => {
    const ret = col.find({ _id, deleted: false })
    return ret.toArray()
}

// to be used when user admin:true
// _id is from the logged user
export const getEmployeeByIdAdmin = async (_id) => {
    const ret = col.find({ _id })
    return ret.toArray()
}

// to be used when user admin:true
export const getEmployeeByNameAdmin = async (name) => {
    const ret = col.find({ 
        name: {
            $regex: `.*${name}.*`,
        },
    })
    return ret.toArray()
}

// to be used after selecting the user on the web page and the user admin:false
// _id is from the logged user
export const getEmployeeById = async (_id) => {
    const ret = col.find({ _id })
    const data = ret.toArray()
    return [data[0].name, data[0].phone, data[0].email, data[0].DOB, data[0].comRate]
}

// available to any user
// returns contact information from valid users
export const getActiveEmployeeByName = async (name) => {
    const ret = col.find({ 
        name: {
            $regex: `.*${name}.*`,
        },
        deleted: false,
    })
    const data = ret.toArray()
    let res = []
    for(let i=0;i<eList.length;i++){
        res.push([data[i].name, data[i].phone, data[i].email])
    }
    return res
}

// available to any user
// returns contact information from deleted users
export const getFormerEmployeeByName = async (name) => {
    const ret = col.find({ 
        name: {
            $regex: `.*${name}.*`,
        },
        deleted: true,
    })
    const data = ret.toArray()
    let res = []
    for(let i=0;i<eList.length;i++){
        res.push([data[i].name, data[i].phone, data[i].email])
    }
    return res
}

// ---------------  UPDATE SECTION

// system admin cannot have access admin:true && user:true
export const updEmployeeName = async (loggedUserId, _id, newName) => {
    const delEmployeeData = await getEmployeeById(_id)
    const result = col.updateOne(
        { _id },              
        { $set: { deleted: true } },
    )
    const ret = await col.insertOne({
        timeCreated: new Date(),
        loggedUserId,
        name:           newName,
        DOB:            delEmployeeData[0].DOB,
        admin:          delEmployeeData[0].role.admin,     
        user:           delEmployeeData[0].role.user, 
        comRate:        delEmployeeData[0].comRate,
        deleted: false, 
        changed: true, 
        oloEmployeeId: _id,
    });

}

// system admin cannot have access admin:true && user:true
export const updEmployeeComRate = async (loggedUserId, _id, newComRate) => {
    const delEmployeeData = await getEmployeeById(_id)
    const result = col.updateOne(
        { _id },              
        { $set: { deleted: true } },
    )
    const ret = await col.insertOne({
        timeCreated: new Date(),
        loggedUserId,
        name:           delEmployeeData[0].name,
        DOB:            delEmployeeData[0].DOB,
        admin:          delEmployeeData[0].role.admin,     
        user:           delEmployeeData[0].role.user, 
        comRate:        newComRate,
        deleted: false, 
        changed: true, 
        oloEmployeeId: _id,
    });

}

// system admin cannot have access admin:true && user:true
export const updEmployeeDOB = async (loggedUserId, _id, newDOB) => {
    const delEmployeeData = await getEmployeeById(_id)
    const result = col.updateOne(
        { _id },              
        { $set: { deleted: true } },
    )
    const ret = await col.insertOne({
        timeCreated: new Date(),
        loggedUserId,
        name:           delEmployeeData[0].name,
        DOB:            newDOB,
        admin:          delEmployeeData[0].role.admin,     
        user:           delEmployeeData[0].role.user, 
        comRate:        delEmployeeData[0].comRate,
        deleted: false, 
        changed: true, 
        oloEmployeeId: _id,
    });

}

// system admin only !! admin:true && user:false
export const updEmployeeRole = async (loggedUserId, _id, boolAdmin, boolUser) => {
    const delEmployeeData = await getEmployeeById(_id)
    const result = col.updateOne(
        { _id },              
        { $set: { deleted: true } },
    )
    const ret = await col.insertOne({
        timeCreated: new Date(),
        loggedUserId,
        name:           delEmployeeData[0].name,
        DOB:            delEmployeeData[0].DOB,
        admin:          boolAdmin,     
        user:           boolUser,       
        comRate:        delEmployeeData[0].comRate,
        deleted: false, 
        changed: true, 
        oloEmployeeId: _id,
    });

}


// ---------------  DELETE SECTION

// system admin cannot have access admin:true && user:true
export const delEmployee = async (loggedUserId, _id) => {
    const delEmployeeData = await getEmployeeById(_id)
    const result = col.updateOne(
        { _id },              
        { $set: { deleted: true } },
    )
    const ret = await col.insertOne({
        timeCreated: new Date(),
        loggedUserId,
        name:           delEmployeeData[0].name,
        DOB:            delEmployeeData[0].DOB,
        admin:          delEmployeeData[0].role.admin,     
        user:           delEmployeeData[0].role.user,  
        comRate:        delEmployeeData[0].comRate,
        deleted: true, 
        changed: false, 
        oloEmployeeId: _id,
    });

}

