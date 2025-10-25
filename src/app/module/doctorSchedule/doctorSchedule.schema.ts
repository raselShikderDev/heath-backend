import z from "zod";

const createDoctorSchedulesSchema = z.object({
        schedulesIds:z.array(z.string())
})

export const DoctorSchedulesSchema ={
createDoctorSchedulesSchema
}