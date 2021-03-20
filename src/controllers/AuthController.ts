import User from '@models/User';
import { Request, Response } from 'express'
import { getRepository } from "typeorm";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

class AuthController {
  async authenticate(req: Request, res: Response) {
    const repository =  getRepository(User)

    const {  email, password} = req.body;

    const user = await   repository.findOne({ where: { email }})

    if(!user){
      return res.status(401).json({
        error: "User not found it!"
      })
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword){
      return res.status(401).json({
        error: "Password Incorrect, try again!"
      })
    }

    delete user.password

    const token = jwt.sign({
      id: user.id
    },
     'secret',
     {expiresIn: '1d'} 
    )

    return res.json({
      user,
      token
    })
  }
}

export default new AuthController();