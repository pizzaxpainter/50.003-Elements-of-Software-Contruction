const fs = require('node:fs').promises;

async function capcat(file) {
    const content = await fs.readFile(file, 'utf8');
    const result = content.toUpperCase();
    return result;
}

module.exports = capcat;