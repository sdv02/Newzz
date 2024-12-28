import React, { useEffect, useState } from "react";

const DateDifference = ({ dateString }) => {
  const [difference, setDifference] = useState<any>(null);

  useEffect(() => {
    const currentDate: Date = new Date();
    const providedDate: Date = new Date(dateString);

    const differenceInMilliseconds: number = Math.abs(
      currentDate.getTime() - providedDate.getTime()
    );
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    const differenceInHours = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60)
    );

    if (differenceInDays === 1) {
      setDifference(`${differenceInDays} day ago`);
    } else if (differenceInDays > 1) {
      setDifference(`${differenceInDays} days  ago`);
    } else {
      setDifference(`${differenceInHours} hours ago`);
    }
  }, [dateString]);

  return <>{difference}</>;
};

export default DateDifference;
