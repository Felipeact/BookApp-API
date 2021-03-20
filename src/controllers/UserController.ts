import User from '@models/User';
import { Request, Response } from 'express'
import { getRepository } from "typeorm";



class UserController {
  
  async index(req:Request, res: Response){
    const userRepository =  getRepository(User)
    
    const users = await userRepository.find()

    return res.json({userID: req.userId, users})
  }
  
  async create(req: Request, res: Response) {
    const userRepository =  getRepository(User)
    

    const { name, email, password, role} = req.body;

    const userExist = await   userRepository.findOne({ where: {email }})

    if(userExist){
      return res.status(409).json({
        error: 'User exists already'
      });
    }

    const user = userRepository.create({ name, email, password, role})
    await userRepository.save(user)

    return res.json(user);
    
  }

  async show(req: Request, res: Response) {
    const userRepository =  getRepository(User)

    const id  = req.userId

    const user = await userRepository.findOneOrFail( {where: {id}})

    return res.json(user) 
  }

  async update(req: Request, res:Response){
    const userRepository =  getRepository(User)

    const keys = Object.keys(req.body)

    for(let key of keys){
      if(req.body[key] == ""){
        return res.status(409).json({
          error: "Fill all fields please"
        })
      }
    }
    const id = req.params
    const user = await userRepository.findOne(id);

    userRepository.merge(user, req.body)

    const userUpdate = await userRepository.save(user);

    return res.status(201).json(userUpdate)
   
  }

  async delete(req: Request, res: Response){
    const userRepository =  getRepository(User)

    const id = req.userId

    const user = await userRepository.findOne(id)

    await userRepository.remove(user)

    return res.json({
      success: "User deleted"
    })
  }
}

export default new UserController();