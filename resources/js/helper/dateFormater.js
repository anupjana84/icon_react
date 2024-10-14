export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with 0 if necessary
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed, so add 1) and pad
    const year = date.getFullYear(); // Get full year

    return `${day}/${month}/${year}`;
};
