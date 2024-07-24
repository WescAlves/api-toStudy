import { Request, Response } from "express";
import { v4 } from "uuid";
import users from "../db";




function getAll(req:Request, res:Response){
    res.status(200).json(users);
}

function getById(req:Request, res:Response){
    const {id} : {id:string} = req.params as {id:string}
    const userIndex = users.findIndex((value) => id == value.id);
    res.status(200).json(users[userIndex]);
}

function addUser(req:Request, res:Response){
    const {name, username} = req.body as {name:string, username:string};
    const newUser : User = {
        id:v4(),
        name,
        username,
        technologies: [] as Tecnology[]
    }
    users.push(newUser);
    res.status(201).json('Usuário cadastrado!')
}

function deleteUser(req:Request, res:Response){
    const {id} : {id:string} = req.params as {id:string}
    const userIndex = users.findIndex((value) => id == value.id);
    users.splice(userIndex,1);
    res.status(200).json("Excluído com sucesso");
}


export default {addUser, getAll, deleteUser, getById}