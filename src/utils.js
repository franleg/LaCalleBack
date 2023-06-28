import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createHash = async (password) => {
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salts);
}
const isValidPassword = (user, data) => bcrypt.compare(data, user.password);

export { __dirname, createHash, isValidPassword };