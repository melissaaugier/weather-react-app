export const convertUnixToReadableTime = (unixTimestamp, timezoneOffset) => {
    const date = new Date((unixTimestamp + timezoneOffset) * 1000); // Adjust for timezone offset and convert to milliseconds
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
};

export const convertUnixToReadableDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
    // const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
    const day = ('0' + date.getDate()).slice(-2);
    // Format the date and time
    const formattedDate = `${day}/${month}`;
    
    return formattedDate;
};
