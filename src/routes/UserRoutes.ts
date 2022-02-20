import {Request, Response, Router} from 'express'

import User from '../models/User'

class UserRoutes {
    router:Router
    constructor() {
        this.router = Router()
        this.routes()
    }

    public async getUsers(req : Request,res: Response): Promise<void> {
        const user = await User.find()
        res.json(user)
        
    }

    public async getUser(req: Request,res: Response): Promise<void> {
        const user = await User.findOne({username:req.params.username}).populate('posts')
        res.json(user)
    }

    public async createUser(req: Request,res: Response): Promise<void> {
        const newUser = await new User(req.body)
        await newUser.save()
        
        res.json({data:newUser})
    }

    public async updateUser(req: Request,res: Response): Promise<void> {
        const {username}=req.params;
        const updatedUser = await User.findOneAndUpdate({username},req.body,{new:true})
        
        res.json(updatedUser)

    }

    public async deleteUser(req: Request,res: Response): Promise<void> {
        const {username} = req.params
        await User.findOneAndDelete({username})
        res.json({response: 'User deleted'})
    }

    routes() {
        this.router.get('/', this.getUsers)
        this.router.get('/:username', this.getUser)
        this.router.post('/', this.createUser)
        this.router.put('/:username', this.updateUser)
        this.router.delete('/:username', this.deleteUser)
    }


}

const userRoutes = new UserRoutes()

export default userRoutes.router