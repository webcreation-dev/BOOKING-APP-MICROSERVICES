import { RequestUser } from '../interfaces/request-user.interface'; // Assurez-vous de mettre le bon chemin vers votre interface RequestUser

declare module 'express-serve-static-core' {
  interface Request {
    user?: RequestUser;
  }
}
