import { Request } from "express";
import { fileUploader } from "../../helpers/fileUploadByMulter";
import { prisma } from "../../shared/pirsmaConfig";
import { Specialties } from "@prisma/client";
import { IJWTPayload } from "../../types/common";
import { v4 as uuidv4 } from "uuid";
import { stripe } from "../../helpers/stripeConfigratation";

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
    const appointmentData = await trans.appointment.create({
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

      const paymentData = await trans.payment.create({
        data:{
          appoinmentId:appointmentData.id,
          transactionId:transactionId,
          amount:existingDoctor.appointmentFee,
        }
      })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: user.email,
            line_items: [
                {
                    price_data: {
                        currency: "bdt",
                        product_data: {
                            name: `Appointment with ${existingDoctor.name}`,
                        },
                        unit_amount: existingDoctor.appointmentFee * 100,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                appointmentId: appointmentData.id,
                paymentId: paymentData.id
            },
            success_url: `https://www.programming-hero.com/`,
            cancel_url: `https://next.programming-hero.com/`,
        });
console.log(session);

    //  http://localhost:5000/api/v1/appointments
    //     {
    //     "doctorId":"be7e556d-cf09-4ec0-b31a-7763660267d2",
    //     "scheduleId":"911255bf-7165-4c4d-9845-b67708455fce"
    // }
    return appointmentData;
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
