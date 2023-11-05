
const styles = {
    info: '\x1b[1m\x1b[37m',   // White bold
    warning: '\x1b[33m',        // Yellow
    success: '\x1b[32m'          // Green
};

const resetStyle = '\x1b[0m'; // Reset color/style


function infoLog(details) {
    console.log(`${styles['info']}[I] ${details}${resetStyle}`);
}

function successLog(details) {
    console.log(`${styles['success']}[✓] ${details}${resetStyle}`);
}

function warningLog(details) {
    console.log(`${styles['warning']}[I] ${details}${resetStyle}`);
}

module.exports = {
    infoLog: infoLog,
    warningLog: warningLog,
    successLog: successLog
};