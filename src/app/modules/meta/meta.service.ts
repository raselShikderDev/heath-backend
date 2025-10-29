import { PaymentStatus, UserRole } from "@prisma/client";
import { IJWTPayload } from "../../types/common";
import apiError from "../../errors/apiError";
import httpStatus from "http-status";
import { prisma } from "../../shared/pirsmaConfig";

const fetchDashboardMetaData = async (user: IJWTPayload) => {
  let metadata;

  switch (user.role) {
    case UserRole.ADMIN:
      metadata = "Admin metadata";
      break;
    case UserRole.PATIENT:
      metadata = "Patient metadata";
      break;
    case UserRole.DOCTOR:
      metadata = "Doctor metaData";
      break;
    default:
      throw new apiError(httpStatus.BAD_REQUEST, "Invalid user role");
  }
  return metadata;
};

const getAdminMetaData = async () => {
  const adminCount = await prisma.admin.count();
  const patientCount = await prisma.patient.count();
  const doctorCount = await prisma.doctor.count();
  const appoinmentCount = await prisma.appointment.count();
  const paymentCount = await prisma.payment.count();

  const totalRevenue = await prisma.payment.aggregate({
    _sum:{
        amount:true
    },
    where:{
        status:PaymentStatus.PAID
    }
  });

};

export const metaServices = {
  fetchDashboardMetaData,
};
