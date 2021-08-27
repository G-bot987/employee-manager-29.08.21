const { Employee } = require("./employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
        
      }
  


      getOfficenumber(){
        return this.officeNumber
    }

    // over written to return engineer
    getRole(){
        return "Manager"
    }
}


module.exports={
    Manager
}