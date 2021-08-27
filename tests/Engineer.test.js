const { Engineer } = require("../lib/engineer");



describe("Engineer", () => {
   
      it("should check is instance of `Engineer`", () => {
        const john = new Engineer("john", 1, "a@a")
        expect(john).toBeInstanceOf(Engineer);

        
        
      });

       it("should check Engineer returns correct name", () => {
        const john = new Engineer("john", 1, "a@a")
        expect(john.getName()).toBe("john");
        
        
        
      });

      
      it("should check engineer returns correct id", () => {
        const john = new Engineer("john", 1, "a@a")
        expect(john.getId()).toBe(1);
        
        
        
      });

      it("should check Engineer returns correct email", () => {
        const john = new Engineer("john", 1, "a@a")
        expect(john.getEmail()).toBe("a@a");
        
        
        
      });

      it("should check Engineer returns correct github", () => {
        const john = new Engineer("john", 1, "a@a","github")
        expect(john.getGithub()).toBe("github");
        
        
        
      });
    
    
  });