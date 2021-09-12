

class Role {
    constructor(name, salary, department) {
        this.name = name;
        this.salary = salary;
        this.department = department;
      }
    getRoleName(){
        return this.name 
    }
    
    getSalary(){
        return this.salary
    }
    getRoleDepartment(){
        return this.department
    }
   
}

module.exports={
    Role 
}

