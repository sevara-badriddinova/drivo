import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";
// async - func takes time to do sth (talk to db...)
// lets to use await 
export const checkUser = async () =>{
    // waits for clerk to get the user 
    const user = await currentUser();
    // terminate if not signed in 
    if(!user){
        return null;
    }
    try{
        // waits until clerk checks if the user exists in User table 
        const loggedInUser = await db.user.findUnique({
            where:{
                clerkUserId: user.id,
            },
        });
        if(loggedInUser){
            return loggedInUser;
        }
        const name = `${user.firstName} ${user.lastName}`;
        // waiting while the db creates a new user
        const newUser = await db.user.create({
            data:{
                clerkUserId: user.id,
                name, 
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
            },
        });
        return newUser;
    }catch(error){
        console.log(error.message);
        return null;
    }
}
