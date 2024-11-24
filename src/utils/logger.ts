// logger.ts
import * as log from "https://deno.land/std/log/mod.ts";
import { format } from "https://deno.land/std@0.224.0/datetime/mod.ts";
import { ensureDir } from "https://deno.land/std@0.224.0/fs/mod.ts";

// Vérifier et créer le répertoire 'logs' si nécessaire
await ensureDir("./logs");

function customFormatter(logRecord: log.LogRecord): string {
  const timestamp = format(logRecord.datetime, "[ dd-MM-yyyy HH:mm:ss ]");
  return `${timestamp} ${logRecord.levelName} ${logRecord.msg}`;
}

await log.setup({
  handlers: {
    console: new log.ConsoleHandler("DEBUG", {
      formatter: (logRecord) => {
        let msgColor;
        switch (logRecord.level) {
          case log.LogLevels.DEBUG:
            msgColor = "\x1b[34m"; // Bleu
            break;
          case log.LogLevels.INFO:
            msgColor = "\x1b[32m"; // Vert
            break;
          case log.LogLevels.WARN:
            msgColor = "\x1b[33m"; // Jaune
            break;
          case log.LogLevels.ERROR:
            msgColor = "\x1b[31m"; // Rouge
            break;
          default:
            msgColor = "\x1b[37m"; // Blanc
        }
        return `${msgColor}${logRecord.levelName} ${logRecord.msg}\x1b[0m`;
      },
    }),
    file: new log.FileHandler("INFO", {
      filename: "./logs/api.log",
      formatter: customFormatter,
    }),
  },
  loggers: {
    default: {
      level: "DEBUG",
      handlers: ["console", "file"],
    },
  },
});

export const logger = log.getLogger();
