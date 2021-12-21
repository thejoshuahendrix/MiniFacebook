import { createLogger } from '@lvksh/logger';
import chalk from 'chalk';

const log = createLogger(
    {
        http: chalk.gray`[HTTP]`,
        data: {
            label: "\{" + chalk.yellow`\{` + chalk.yellowBright`DB` + chalk.yellow`\}` + "\}",
            newLine: chalk.yellowBright.bold`┣━`,
            paddingChar: chalk.yellowBright`━`,
            newLineEnd: chalk.yellow.bold`┗━`,
        },
        error: {
            label: "[" + chalk.bgRed.white`ERROR` + "]",
            paddingChar: chalk.red.bold`━`,
            divider: chalk.red.bold`|`,
            newLine: chalk.red.bold`┣━`,
            newLineEnd: chalk.red.bold`┗━`,
        },
        debug: {
            label: chalk.magenta.bold`(DEBUG)`,
            paddingChar: chalk.magenta.bold`~`,
            divider: chalk.magenta.bold`?`,
            newLine: chalk.magenta.bold`|`,
            newLineEnd: chalk.magenta.bold`\\`,
        },
        info: {
            label: "[" + chalk.blue`INFO` + "]",
            paddingChar: chalk.blue`:`,
            divider: chalk.blue.bold`>`,
            newLine: chalk.blue.bold`┣━`,
            newLineEnd: chalk.blue.bold`┗━`,
        },
        test: {
            label: chalk.white`<TEST>:` + new Date().toLocaleTimeString().replace(/(AM|PM)/, "",).trim(),
            paddingChar: "-",
            divider: chalk.white.bold`|`,
            newLine: chalk.white.bold`┣━`,
            newLineEnd: chalk.white.bold`┗━`,
        },
    },
    { padding: "APPEND", divider: chalk.greenBright`>`, paddingChar: ":" },
);


export default log;