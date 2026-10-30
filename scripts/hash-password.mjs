// Gera o hash da senha do painel administrativo.
// Uso: npm run hash-password -- "sua-senha-forte"
import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password || password.length < 10) {
  console.error('Informe uma senha com pelo menos 10 caracteres: npm run hash-password -- "sua-senha"');
  process.exit(1);
}
const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");
console.log(`\nADMIN_PASSWORD_HASH=scrypt:${salt}:${hash}\n`);
