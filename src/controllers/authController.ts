import { prisma } from '../helpers/utils';
import { Request, RequestHandler } from 'express';
import { SignupReqBody } from '../types/auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const APP_SECRET = process.env.APP_SECRET || 'quist';

const signup: RequestHandler = async (req: Request<{}, {}, SignupReqBody>, res) => {
 console.log("yay")
  const { email, password, name }: any = req.body;

const isEmailExist:any = await prisma.user.findUnique({
  where:{
    email:email
  }
}) 
console.log(isEmailExist)
if(!isEmailExist.id){
  const hash: string = await bcrypt.hash(password, 10);
try{
   const result = await prisma.user.create({
    data: {
      email,
      password: hash,
      name,
    },
  });
     res.send(result);

} catch {
      return res.status(404).send({ message: 'Cant create user.' });

}
} else {
    return res.status(404).send({message:"Email exists."})

  
}
  


 
};
const login: RequestHandler = async (req: Request<{}, {}, SignupReqBody>, res) => {
  const { email, password }: any = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(404).send({ message: 'User not found.' });
  }
  const isValid = bcrypt.compareSync(password, user.password);

  if (!isValid) {
    return res.status(401).send({
      message: 'Invalid Password!',
    });
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: 86400 * 30 });
  return res.status(200).send({ user, token });
};
export default {
  signup,
  login,
};
