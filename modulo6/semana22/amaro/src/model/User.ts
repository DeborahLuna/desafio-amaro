export default class User {
    
    constructor (
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: UserRole
    ){}
    
    getUserId() {
        return this.id
    }

    getUserName(){
        return this.name
    }

    getUserEmail(){
        return this.email
    }

    getUserPassword(){
        return this.password
    }

    getUserRole(){
        return this.role
    }

    static stringToUserRole(input: string): UserRole{
        switch (input) {
            case 'admin':
              return UserRole.ADMIN;
            case 'normal':
              return UserRole.NORMAL;
            default:
              throw new Error("Invalid user role");
          }
    }


}

export enum UserRole{
    ADMIN = 'admin',
    NORMAL = 'normal'
}