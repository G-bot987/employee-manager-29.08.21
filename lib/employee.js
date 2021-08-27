

class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
      }
    getName(){
        return this.name 
    }
    
    getId(){
        return this.id
    }
    getEmail(){
        return this.email
    }
    
    
    getRole(){
        return "Employee"
    }
    
}

module.exports={
    Employee
}



// class Engine {
//     constructor(cylinders) {
//       this.cylinders = cylinders;
//     }
  
//     getCyliders() {
//       return this.cylinders;
//     }
  
//   }
  
//   class Car extends Engine {
//     constructor(cylinders, colour) {
//       super(cylinders);
//       this.colour = colour;
//     }
  
//     getColour() {
//       return this.colour;
//     }
//   }
  
//   const audi = new Car();
  
//   audi.getCyliders();