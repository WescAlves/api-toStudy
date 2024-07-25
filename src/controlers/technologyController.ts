import { Request, Response } from "express";
import { v4 } from "uuid";
import users from "../db";
import userController from "./userController";

function addTechnology(req:Request, res:Response){
    const {title, deadline, user}: {title:string, deadline:string, user:User} = req.body as {title:string, deadline:string, user:User}
    const newTechnology : Tecnology= {
        id:v4(),
        title,
        studied : false,
        deadline: new Date(deadline),
        created_at: new Date()
    }
    const userIndex = users.findIndex((value) => user.username == value.username);
    users[userIndex].technologies.push(newTechnology);
    res.status(200).json(newTechnology);
}

function getUserTechnologies(req:Request, res:Response){
    const {user} : {user:User} = req.body as {user:User};
    const userIndex = users.findIndex((value) => user.username == value.username);
    res.status(200).json(users[userIndex].technologies);
}

function deleteUserTechnology(req:Request, res:Response){
    const { id } : {id:string} = req.params as {id:string};
    const {user} : {user:User} = req.body as {user:User};
    const userIndex = users.findIndex((value) => user.username == value.username);
    const technologyIndex = users[userIndex].technologies.findIndex((value) => id == value.id);
    users[userIndex].technologies.splice(technologyIndex, 1);
    res.status(203).json("Tecnologia excluída com sucesso.");
}

function updateTechnology(req:Request, res:Response){
    const {id} : {id:string} = req.params as {id:string};
    const {title, deadline, user}: {title:string, deadline:string, user:User} = req.body as {title:string, deadline:string, user:User}
    const userIndex = users.findIndex((value) => user.username == value.username);
    const technologyIndex = users[userIndex].technologies.findIndex((value) => id == value.id);
    users[userIndex].technologies[technologyIndex].title = title;
    users[userIndex].technologies[technologyIndex].deadline = new Date(deadline);
    res.status(202).json('Tecnologia alterada com sucesso')
}

function updateStudiedTechnology(req:Request, res:Response){
    const {id} : {id:string} = req.params as {id:string};
    const {user} : {user:User} = req.body as {user:User};
    const userIndex = users.findIndex((value) => user.username == value.username);
    const technologyIndex = users[userIndex].technologies.findIndex((value) => id == value.id);
    users[userIndex].technologies[technologyIndex].studied = true;
    res.status(202).json("Tecnolgia estudada com sucesso.")
}

export default { addTechnology, getUserTechnologies,  deleteUserTechnology, updateTechnology, updateStudiedTechnology}