import { User } from "src/entities/user.entity";

export class GetUserDto {
    id: number;
    email: string;
    password: string
    constructor( user:User){
        this.id = user.id
        this.email = user.email
        this.password= user.password
    }
  }