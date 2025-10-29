import { Gender } from "@prisma/client";

export type IDoctorUpdateInput ={
    name?: string;
    email?: string;
    contactNumber?: string;
    address?: string;
    registrationNumber?: string;
    experience?: number;
    gender?: Gender;
    appointmentFee?: number;
    qualification?: string;
    currentWorkingPlace?: string;
    designation?: string;
    isDeleted?: boolean;
    specialties?:{
        specialitiesId?:string;
        isDeleted?:boolean
    }[]
}
