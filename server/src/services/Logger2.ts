import { createLogger } from '@lvksh/logger';
import chalk from 'chalk';

const log = createLogger(
    {
        DB: {
            label: chalk.green`[DB]`,
            paddingChar: '-',
            divider: '|',
            newLine: chalk.green`-`,
            newLineEnd: chalk.green`⮡`,
        },
        debug: {
            label: chalk.magenta`[DEBUG]`,
            paddingChar: chalk.magenta`-`,
            divider: chalk.magenta`|`,
            newLine: chalk.magenta`⮡`,
            newLineEnd: chalk.magenta`⮡`,
        },
        info: {
            label: chalk.cyan`[INFO]`,
            paddingChar: '-',
            divider: '|',
            newLine: chalk.cyan`-`,
            newLineEnd: chalk.cyan`⮡`,
        },
        error: {
            label: chalk.red`[ERROR]`,
            paddingChar: '-',
            divider: '|',
            newLine: chalk.red`⮡`,
            newLineEnd: chalk.red`⮡`,
        },
    },
    { padding: 'APPEND' },
    console.log
);

const log2 = createLogger(
    {
        http: chalk.gray`[HTTP]`,
        data: {
            label: chalk.yellowBright`[DB]`,
            paddingChar: '-',
            newLine: chalk.yellowBright.bold`┣━`,
            newLineEnd: chalk.yellow.bold`┗━`,
        },
        error: {
            label: chalk.bgRed.white`[ERROR]`,
            paddingChar: '-',
            divider: chalk.red.bold`|`,
            newLine: chalk.red.bold`┣━`,
            newLineEnd: chalk.red.bold`┗━`,
        },
        debug: {
            label: chalk.magenta.white`[DEBUG]`,
            paddingChar: '-',
            divider: chalk.magenta.bold`|`,
            newLine: chalk.magenta.bold`┣━`,
            newLineEnd: chalk.magenta.bold`┗━`,
        },
        info: {
            label: '[' + chalk.blue`INFO` + ']',
            paddingChar: '-',
            divider: chalk.blue.bold`|`,
            newLine: chalk.blue.bold`┣━`,
            newLineEnd: chalk.blue.bold`┗━`,
        },
        test: {
            label: chalk.white`[TEST]`,
            paddingChar: '-',
            divider: chalk.white.bold`|`,
            newLine: chalk.white.bold`┣━`,
            newLineEnd: chalk.white.bold`┗━`,
        },
    },
    { padding: 'PREPEND', divider: chalk.greenBright` -> ` }
);

log2.http('Serving /hello');
log2.data('Fetching user 01', 'with extra info', 'hello');
log2.info('Succesful connection', 'Continuing cycle', 'Cycle complete');
log2.test('Test log', 'Testing Now...', 'Testing succesful');
log2.debug('This log is here', 'Here', 'And here...');
log2.error('BIG ERROR OOF ASTLEY WAS HERE', 'hello', 'world');
