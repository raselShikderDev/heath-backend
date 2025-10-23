import { addHours, addMinutes, format } from "date-fns";
import { prisma } from "../../shared/pirsmaConfig";

const inserIntoDB = async (payload: any) => {
  const { startTime, endTime, startDate, endDate } = payload;
  const interalTime = 30; // in minutes
  console.log({ startTime, endTime, startDate, endDate });

  const schedules = []

  const currDate = new Date(startDate);
  const lastDate = new Date(endDate);
console.log("currDate <= lastDate:", currDate <= lastDate);

  while (currDate <= lastDate) {
    // creating actual start date time 
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0]) // 10:00
        ),
        Number(startTime.split(":")[1])
      )
    );
    // creating actual end date time 
    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0]) // 11:00
        ),
        Number(endTime.split(":")[1])
      )
    );
    console.log({ startDateTime, endDateTime });

    // creating slot if not bookoed yet after adding interval
    while (startDateTime < endDateTime) {
      const slotStartDateTime = startDateTime // 10:00
      const slotEndDateTime = addMinutes(endDateTime, interalTime) // 10:30

      const scheduleData = {
        startDateTime: slotStartDateTime,
        endDateTime: slotEndDateTime
      }
      const existingShedule = await prisma.schedule.findFirst({
        where: scheduleData
      })
      if (!existingShedule) {
        const newSchedule = await prisma.schedule.create({
          data: scheduleData
        })
        schedules.push(newSchedule)
      }
      slotStartDateTime.setMinutes(slotStartDateTime.getMinutes() + interalTime)
    }
    currDate.setDate(currDate.getDate() + 1)
  }
  // http://localhost:5000/api/v1/schedules
// {
// "startDate":"2026-10-18",
// "endDate":"2026-10-19",
// "startTime":"10:00",
// "endTime":"17:00"
// }

  return schedules;
};

export const schedculeServices = {
  inserIntoDB,
};
