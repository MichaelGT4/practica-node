import express, { Request, Response } from "express";

// import  from 'express';
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json

type  User = {id: number, username: string; fullname: string };

let idSecuence = 0
const users :User[] = []

app.get('/users', (req: Request, res: Response) => {
    res.send(users);
})

app.get('/users/:username', (req: Request, res: Response) => {
    const { username } = req.params;
    const user = users.find((user) => user.username === username)
    if (!user) return res.status(404).json({statusCode:404, statusValue:'User not found', message: `The user ${username} was not found` })
    res.json(user);

})

// metodo para crear usuarios
app.post('/users', (req: Request, res:Response)=>{
    const {username, fullname} = req.body

    idSecuence += 1
    
    const newUser = {
        id: idSecuence,
        username,
        fullname
    }

    users.push(newUser)
    res.json(newUser)
});

// actualizar un usuario en especifico
// app.put("/users/:id", (req:Request,res:Response)=> {
//     const user = users.find((user) => user.id == req.params.id);
//     if(!user) return res.status(400).send("The user is not in the database");

//     for(let key in req.body){
//         user[key] = req.body[key];
//     }
//     res.send(user);
// });

app.listen(port, () => console.log('Server is running on port ' + port))
