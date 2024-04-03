

function generateRandomTimeSlotISO(startDaate, durationInDays) {
    const startHour = 8;
    const endHour = 17;

    const holidayStart = new Date(startDaate);
    const holidayEnd = new Date(holidayStart);
    holidayEnd.setDate(holidayStart.getDate() + durationInDays);

    const randomTime = new Date(
      holidayStart.getTime() +
        Math.random() * (holidayEnd.getTime() - holidayStart.getTime())
    );

    randomTime.setHours(
      Math.floor(Math.random() * (endHour - startHour)) + startHour,
      Math.floor(Math.random() * 60),
      Math.floor(Math.random() * 60),
      Math.floor(Math.random() * 1000)
    );

    const endTime = new Date(randomTime.getTime());
    endTime.setHours(endTime.getHours() + 1);

    const startTimeISO = randomTime.toISOString();
    const endTimeISO = endTime.toISOString();

    return { start: startTimeISO, end: endTimeISO };
  }

  export {generateRandomTimeSlotISO};