

class Employee {
    constructor(name, surname, role, manager) {
        this.name = name;
        this.surname = surname;
        this.role = role;
        this.manager = manager;
      }
    getName(){
        return this.name 
    }
    
    getSurname(){
        return this.surname
    }
    getRole(){
        return this.role
    }
    getManager(){
        return this.manager
    }
   
}

module.exports={
    Employee
}

