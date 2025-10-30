import { PaymentStatus, UserRole } from "@prisma/client";
import { IJWTPayload } from "../../types/common";
import apiError from "../../errors/apiError";
import httpStatus from "http-status";
import { prisma } from "../../shared/pirsmaConfig";

const fetchDashboardMetaData = async (user: IJWTPayload) => {
  let metadata;

  switch (user.role) {
    case UserRole.ADMIN:
      metadata = await getAdminMetaData();
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
    _sum: {
      amount: true,
    },
    where: {
      status: PaymentStatus.PAID,
    },
  });

  const barChartData = await getBarChartData();
  const pieChartData = await getPieChartData();

  return {
    adminCount,
    patientCount,
    doctorCount,
    appoinmentCount,
    paymentCount,
    totalRevenue,
    pieChartData,
    barChartData,
  };
};

const getBarChartData = async () => {
  const appoinmentCountPerMont = await prisma.$queryRaw`
    SELECT DATE_TRUNC("month", "createdAt") AS month
    CAST(count(*) AS INTEGER) as count
    FROM "appointments"
    GROUP BY month
    ORDER BY month ASC
  `;
  return appoinmentCountPerMont;
};

const getPieChartData = async () => {
  const appoinmentDistributionData = await prisma.appointment.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  });

  const formatedData = appoinmentDistributionData.map(({ status, _count }) => ({
    status,
    count: _count.id,
  }));
  return formatedData;
};

export const metaServices = {
  fetchDashboardMetaData,
};
