export default function timeNow() {
    const now = new Date()

    const time = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    })

    return time
}
