

// function generateRandomTimeSlotISO(startDaate, durationInDays) {
//     const startHour = 9;
//     const endHour = 22;

//     const holidayStart = new Date(startDaate);
//     const holidayEnd = new Date(holidayStart);
//     holidayEnd.setDate(holidayStart.getDate() + durationInDays);

//     const randomTime = new Date(
//       holidayStart.getTime() +
//         Math.random() * (holidayEnd.getTime() - holidayStart.getTime())
//     );

//     randomTime.setHours(
//       Math.floor(Math.random() * (endHour - startHour)) + startHour,
//       Math.floor(Math.random() * 60),
//       Math.floor(Math.random() * 60),
//       Math.floor(Math.random() * 1000)
//     );

//     const endTime = new Date(randomTime.getTime());
//     endTime.setHours(endTime.getHours() + 1);

//     const startTimeISO = randomTime.toISOString();
//     const endTimeISO = endTime.toISOString();

//     return { start: startTimeISO, end: endTimeISO };
//   }

//   export {generateRandomTimeSlotISO};

function generateRandomTimeSlotISO(startDaate, durationInDays, existingTimeSlots = []) {
  const startHour = 9;
  const endHour = 22;

  const holidayStart = new Date(startDaate);
  const holidayEnd = new Date(holidayStart);
  holidayEnd.setDate(holidayStart.getDate() + durationInDays);

  let randomTime;
  let attempts = 0;
  do {
      randomTime = new Date(
          holidayStart.getTime() +
          Math.random() * (holidayEnd.getTime() - holidayStart.getTime())
      );

      randomTime.setHours(
          Math.floor(Math.random() * (endHour - startHour)) + startHour,
          Math.floor(Math.random() * 60),
          Math.floor(Math.random() * 60),
          Math.floor(Math.random() * 1000)
      );

      attempts++;
      if (attempts > 100) {
          throw new Error("Exceeded maximum attempts to generate non-overlapping time slot");
      }
  } while (existingTimeSlots.some(slot => isOverlap(randomTime, new Date(slot.start), new Date(slot.end))));

  const endTime = new Date(randomTime.getTime());
  endTime.setHours(endTime.getHours() + 1);

  const startTimeISO = randomTime.toISOString();
  const endTimeISO = endTime.toISOString();

  return { start: startTimeISO, end: endTimeISO };
}

function isOverlap(newStartTime, existingStartTime, existingEndTime) {
  return newStartTime < existingEndTime && existingStartTime < newStartTime;
}

export { generateRandomTimeSlotISO };
