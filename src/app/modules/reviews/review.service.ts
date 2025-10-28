import { prisma } from "../../shared/pirsmaConfig";
import { IJWTPayload } from "../../types/common";
import { IOptions } from "../../helpers/pagginationHelper";
import apiError from "../../errors/apiError";
import httpsStatus from "http-status";

const createReview = async (user: IJWTPayload, payload: any) => {
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  const apponmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: payload.appointmentId,
    },
  });

  if (patientData.id !== apponmentData.patientId) {
    throw new apiError(httpsStatus.BAD_REQUEST, "This is not your appoinment");
  }

  return await prisma.$transaction(async (trans) => {
    const review = await trans.review.create({
      data: {
        appointmentId: apponmentData.id,
        patientId: apponmentData.patientId,
        doctorId: apponmentData.doctorId,
        rating: payload.rating,
        comment: payload.comment,
      },
    });
    const avgRating = await trans.review.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        doctorId: apponmentData.doctorId,
      },
    });

    await trans.doctor.update({
      where: {
        id: apponmentData.doctorId,
      },
      data: {
        avarageRating: avgRating._avg.rating as number,
      },
    });

    return review;
  });
};

const getAllReview = async (
  user: IJWTPayload,
  filters: any,
  options: IOptions
) => {};

const deleteReview = async (id: string) => {
  const result = await prisma.review.delete({
    where: {
      id,
    },
  });
  return result;
};

const getMyReview = async (
  user: IJWTPayload,
  options: IOptions,
  filter: any
) => {};

export const reviewService = {
  createReview,
  getAllReview,
  deleteReview,
  getMyReview,
};
