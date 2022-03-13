
import {Users,user} from '../../models/users';

const usrs:Users = new Users();


describe('Checking of users model & connection to database',()=>{
    it('"create" method exists ',()=>{
        expect(usrs.create).toBeDefined();
    })
    it('"show" method exists',()=>{
        expect(usrs.show).toBeDefined();
    })
    it('"index" method exists ',()=>{
        expect(usrs.index).toBeDefined();
    })
    it('"create" method should add a user', async () => {
        const result:user[] = await usrs.create(
            {
                first_name:"Ibrahim",
                last_name: "Almadawy",
                password:"1234"
            });
        expect(result[0].first_name).toEqual("Ibrahim");
        expect(result[0].last_name).toEqual("Almadawy");
        expect(result[0].password).not.toEqual("1234");
         })
    it('"index" method should return users added', async () => {
        const result:user[] = await usrs.index();
        expect(result[0].first_name).toEqual("Ibrahim");
        expect(result[0].last_name).toEqual("Almadawy");
        expect(result[0].password).not.toEqual("1234")
        })
    it('"show" method should return specific user', async () => {
        const result:user[] = await usrs.show('2');
        expect(result.length).toBe(1);
        expect(result[0].first_name).toEqual("Ibrahim");
        expect(result[0].last_name).toEqual("Almadawy");
        expect(result[0].password).not.toEqual("1234")
        })
})
