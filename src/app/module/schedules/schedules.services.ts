import { addHours, addMinutes, format } from "date-fns";

const inserIntoDB = async (payload: any) => {
  const { startTime, endTime, startDate, endDate } = payload;
  const interalTime = 30; // in minutes

  const currDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currDate >= lastDate) {
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currDate, "yyyy-mm-dd")}`,
          Number(startTime.split(":")[0]) // 10:00
        ),
        Number(startTime.split(":")[1])
      )
    );
    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currDate, "yyyy-mm-dd")}`,
          Number(endTime.split(":")[0]) // 10:00
        ),
        Number(endTime.split(":")[1])
      )
    );
  }

  const schedule = [];
  return payload;
};

export const schedculeServices = {
  inserIntoDB,
};
