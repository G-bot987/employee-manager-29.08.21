const { Employee } = require("../lib/employee");


describe("employee", () => {
   
      it("should check is instance of `employee`", () => {
        const john = new Employee("john", 1, "a@a")
        expect(john).toBeInstanceOf(Employee);

        
        
      });

       it("should check employee returns correct name", () => {
        const john = new Employee("john", 1, "a@a")
        expect(john.getName()).toBe("john");
        
        
        
      });

      
      it("should check employee returns correct id", () => {
        const john = new Employee("john", 1, "a@a")
        expect(john.getId()).toBe(1);
        
        
        
      });

      it("should check employee returns correct email", () => {
        const john = new Employee("john", 1, "a@a")
        expect(john.getEmail()).toBe("a@a");
        
        
        
      });
    
    
  });