export default function formatDate(date: string | Date) {
    const formatted = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
    }).format(new Date(date))

    return formatted
}
