const { Employee } = require("./employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
        
      }
  


    getGithub(){
        return this.github 
    }

    // over written to return engineer
    getRole(){
        return "Engineer"
    }
}


module.exports={
    Engineer
}
