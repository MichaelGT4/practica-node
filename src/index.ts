import express, { Request, Response } from "express";

const app = express()
const port = 3000

app.use(express.json())

app.use('/',  express.static('public'));

type  User = {id: number, username: string; fullname: string };

let idSecuence = 0
const users :User[] = []

// funcion para ver usuarios
app.get('/users', (req: Request, res: Response) => {
    res.send(users);
})

// funcion para ver usuarios por ID
app.get('/users/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const user = users.find((user) => user.id === Number(id) )
    if (isNaN(Number(id))) {
        return res.status(400).json({ 
            error: 'Invalid ID',
            statusCode:400, 
            statusValue:'ID is not a Number', 
            message: `El ID ingresado no es un numero` 
        })
    }else if (!user) {
        return res.status(404).json({
            statusCode:404, 
            statusValue:'User not found', 
            message: `El usuario con el ${id} no fue encontrado` 
        })
    }
    res.json(user);

})

// funcion para crear usuarios
app.post('/users', (req: Request, res:Response)=>{
    const {username, fullname} = req.body

    
    if(!username){
        return res.status(400).json({
            statusCode:400, 
            statusValue:'Bad Request', 
            message: 'El campo username no puede estar vacio.'
        })
    } else if(users.find((user) => user.username === username)){
        return res.status(400).json(
            {
                statusCode:400, 
                statusValue:'Bad Request', 
                message: 'El nombre de usuario ya existe.'
            }
        )
    }
    
    idSecuence += 1

    const newUser = {
        id: idSecuence,
        username,
        fullname
    }

    users.push(newUser)
    res.json(newUser)
});

// funcion para actualizar un usuario
app.put("/users/:id", (req:Request, res:Response)=> {
    const { id, username, fullname} = req.params;
    const user = users.find((user) => user.id == Number(id));
    if (!user) {
        return res.status(404).json(
            {
                statusCode:404, 
                statusValue:'User not found', 
                message: `El usuario con el ${id} no fue encontrado` 
            }
        )
    }
    console.log(user)
    console.log(username)
    const updatedUser = {
        username: user.username,
        fullname: user.fullname
    }
    console.log(updatedUser)
    res.json(updatedUser);
});

// funcion para eliminar un usuario
app.delete('/users/:id', (req:Request,res:Response)=>{
    const { id } = req.params
    const index = users.findIndex((user) => user.id === Number(id))

    if (index !== -1){
        users.splice(index,1)
        res.status(200).send(users)
    } else{
        res.status(404).json(
            {
                statusCode:404, 
                statusValue:'User not found', 
                message: `El usuario con el ${id} no fue encontrado` 
            }
        )
    }
})

app.listen(port, () => console.log('Server is running on port ' + port))
