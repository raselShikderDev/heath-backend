import { AppointmentStatus, PaymentStatus, Prescriptin, UserRole } from "@prisma/client";
import { prisma } from "../../shared/pirsmaConfig";
import httpStatus from "http-status"
import { IJWTPayload } from "../../types/common";
import apiError from "../../errors/apiError";

const createPrescription = async (user: IJWTPayload, payload: Partial<Prescriptin>) => {
    const appoinmentData = await prisma.appointment.findUniqueOrThrow({
        where: {
            id: payload.appoinmentId,
            status: AppointmentStatus.COMPLETED,
            paymentStatus: PaymentStatus.PAID,
        },
        include: {
            doctor: true
        }
    })

    if (user.role === UserRole.DOCTOR) {
        if (!(user.email === appoinmentData.doctor.email)) {
            throw new apiError(httpStatus.BAD_REQUEST, "This is not yur appoinment")
        }
    }

    return await prisma.prescriptin.create({
        data: {
            appoinmentId: appoinmentData.id,
            doctorId: appoinmentData.doctorId,
            patientId: appoinmentData.patientId,
            instructions: payload.instructions as string,
            followUpDate: payload.followUpDate || "",
        },
        include: {
            patient: true
        }
    })

};

export const prescriptionsService = {
    createPrescription
}