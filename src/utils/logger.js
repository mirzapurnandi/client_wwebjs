import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, colorize, json } = format;
import moment from "moment-timezone";
import DailyRotateFile from "winston-daily-rotate-file";

const logFormat = printf(({ level, message }) => {
    const timeNow = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
    return `${timeNow} [${level}]: ${message}`;
});
// Configure the logger
const logger = createLogger({
    level: "info",
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }), json()),
    transports: [
        new transports.Console({
            format: combine(colorize(), logFormat),
        }),

        new DailyRotateFile({
            filename: "logs/combined-%DATE%.log", // File name pattern
            datePattern: "YYYY-MM-DD", // Rotate logs daily
            zippedArchive: true, // Compress old logs
            maxSize: "20m", // Rotate if file size exceeds 20MB
            // maxFiles: "14d", // Keep logs for 14 days
        }),
    ],
});

export default logger;
