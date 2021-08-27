const { Manager } = require("../lib/manager");



describe("Manager", () => {
   
      it("should check is Manager of `Manager`", () => {
        const john = new Manager("john", 1, "a@a")
        expect(john).toBeInstanceOf(Manager);

        
        
      });

       it("should check Manager returns correct name", () => {
        const john = new Manager("john", 1, "a@a")
        expect(john.getName()).toBe("john");
        
        
        
      });

      
      it("should check Manager returns correct id", () => {
        const john = new Manager("john", 1, "a@a")
        expect(john.getId()).toBe(1);
        
        
        
      });

      it("should check Manager returns correct email", () => {
        const john = new Manager("john", 1, "a@a")
        expect(john.getEmail()).toBe("a@a");
        
        
        
      });

      it("should check Manager returns correct office number", () => {
        const john = new Manager("john", 1, "a@a",1)
        expect(john.getOfficenumber()).toBe(1);
        
        
        
      });
    
    
  });