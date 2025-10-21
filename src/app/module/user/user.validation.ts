import { Gender } from "@prisma/client";
import z from "zod";
const createPatientValidationSchema = z.object({
  password: z.string(),
  patient: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required"),
    address: z.string().optional(),
  }),
});
// const createDoctoreValidationSchema = z.object({
//   password: z.string(),
//   doctor: z.object({
//     name: z.string().nonempty("Name is required"),
//     email: z.string().nonempty("Email is required"),
//     address: z.string().optional(),
//     designation: z.string().optional(),
//     registrationNumber: z.string().optional(),
//     gender: z.string().optional(),
//     appointmentFee: z.number().optional(),
//     currentWorkingPlace: z.string().optional(),    
//   }),
// });

const createAdminValidationSchema = z.object({
    password: z.string({
        error: "Password is required"
    }),
    admin: z.object({
        name: z.string({
            error: "Name is required!"
        }),
        email: z.string({
            error: "Email is required!"
        }),
        contactNumber: z.string({
            error: "Contact Number is required!"
        })
    })
});

const createDoctorValidationSchema = z.object({
    password: z.string({
        error: "Password is required"
    }),
    doctor: z.object({
        name: z.string({
            error: "Name is required!"
        }),
        email: z.string({
            error: "Email is required!"
        }),
        contactNumber: z.string({
            error: "Contact Number is required!"
        }),
        address: z.string().optional(),
        registrationNumber: z.string({
            error: "Reg number is required"
        }),
        experience: z.number().optional(),
        gender: z.enum([Gender.MALE, Gender.FEMALE]),
        appointmentFee: z.number({
            error: "appointment fee is required"
        }),
        qualification: z.string({
            error: "quilification is required"
        }),
        currentWorkingPlace: z.string({
            error: "Current working place is required!"
        }),
        designation: z.string({
            error: "Designation is required!"
        })
    })
});


export const userValidation = {
  createPatientValidationSchema,
  createAdminValidationSchema,
  createDoctorValidationSchema
};
