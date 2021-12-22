import { join } from 'path';
import { createLogger } from '@lvksh/logger';
import { FileLogger, FileLoggerConfig } from '@lvksh/logger/lib/FileLog';
import chalk from 'chalk';

const fileConfig: FileLoggerConfig = {
    mode: 'NEW_FILE',
    path: join(__dirname, '../logs'),
    namePattern: 'test.txt'
}
const methodConfig = {
    OK: chalk.blue('OK'),
    INFO: 'INFO'
}

const log = createLogger(
    methodConfig,
    { divider: ' | ' },
    [FileLogger(fileConfig), console.log]
);

export default log;