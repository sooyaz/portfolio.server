import * as dotenv from 'dotenv';
import * as path from 'path';

const env = process.env.NODE_ENV || 'localhost'; // 기본값은 local
const envPath = path.resolve(process.cwd(), `.env.${env}`);

dotenv.config({ path: envPath });

console.log(`✅ Loaded env: .env.${env}`);