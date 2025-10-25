import { Request } from "express";
import { fileUploader } from "../../helpers/fileUploadByMulter";
import { prisma } from "../../shared/pirsmaConfig";
import { Specialties } from "@prisma/client";
import { IJWTPayload } from "../../types/common";
import { v4 as uuidv4 } from "uuid";

const createAppointment = async (
  user: IJWTPayload,
  payload: { doctorId: string; scheduleId: string }
) => {
  const existingPatient = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });
  const existingDoctor = await prisma.doctor.findUniqueOrThrow({
    where: {
      id: payload.doctorId,
      isDeleted: false,
    },
  });
  const isBooked = await prisma.doctorSchedules.findFirstOrThrow({
    where: {
      doctorId: payload.doctorId,
      scheduleId: payload.scheduleId,
      isBooked: false,
    },
  });

  const videoCallingId = uuidv4();
  return await prisma.$transaction(async (trans) => {
    const appointment = await trans.appointment.create({
      data: {
        patientId: existingPatient.id,
        doctorId: payload.doctorId,
        scheduleId: payload.scheduleId,
        videoCallingId: videoCallingId,
      },
    });
    await trans.doctorSchedules.update({
      where: {
        doctorId_scheduleId: {
          doctorId: payload.doctorId,
          scheduleId: payload.scheduleId,
        },
      },
      data: {
        isBooked: true,
      },
    });
      const transactionId = uuidv4();

      await trans.payment.create({
        data:{
          appoinmentId:appointment.id,
          transactionId:transactionId,
          amount:existingDoctor.appointmentFee,
        }
      })

    //  http://localhost:5000/api/v1/appointments
    //     {
    //     "doctorId":"be7e556d-cf09-4ec0-b31a-7763660267d2",
    //     "scheduleId":"911255bf-7165-4c4d-9845-b67708455fce"
    // }
    return appointment;
  });
};

const getAllAppointment = async () => {
  return await prisma.appointment.findMany();
};

const deleteAppointment = async (id: string) => {
  const result = await prisma.appointment.delete({
    where: {
      id,
    },
  });
  return result;
};

export const appointmentService = {
  createAppointment,
  getAllAppointment,
  deleteAppointment,
};
