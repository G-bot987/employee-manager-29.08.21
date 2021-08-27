const { Intern } = require("../lib/intern");



describe("Intern", () => {
   
      it("should check is instance of `intern`", () => {
        const john = new Intern("john", 1, "a@a")
        expect(john).toBeInstanceOf(Intern);

        
        
      });

       it("should check intern returns correct name", () => {
        const john = new Intern("john", 1, "a@a")
        expect(john.getName()).toBe("john");
        
        
        
      });

      
      it("should check intern returns correct id", () => {
        const john = new Intern("john", 1, "a@a")
        expect(john.getId()).toBe(1);
        
        
        
      });

      it("should check Intern returns correct email", () => {
        const john = new Intern("john", 1, "a@a")
        expect(john.getEmail()).toBe("a@a");
        
        
        
      });

      it("should check intern returns correct school", () => {
        const john = new Intern("john", 1, "a@a","school")
        expect(john.getSchool()).toBe("school");
        
        
        
      });
    
    
  });