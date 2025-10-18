import envVars from "../../../config/envVars";
import { prisma } from "../../shared/pirsmaConfig";
import { createPaitentInput } from "./user.interface";


const createPaitent = async (payload: createPaitentInput) => {
    // const hasedPassword = bcrypt.hash(payload.passowrd, Number(envVars.bcrypt_salt as string))
    const result = await prisma.$transaction(async(trans)=>{
        await trans.user.create({
            data:{
                email:payload.email,
                password:payload.passowrd
            }
        });
        return await prisma.patient.create({
            data:{
                email:payload.email,
                name:payload.name
            }
        })
    })
  return payload;
};

export const userServices = {
  createPaitent,
};
