import z from "zod";

const createDoctorSchedulesSchema = z.object({
    body:z.object({
        schedulesIds:z.array(z.string())
    })
})

export const DoctorSchedulesSchema ={
createDoctorSchedulesSchema
}