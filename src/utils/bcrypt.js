import { hash, compare } from "bcrypt";
import config from "config";

const salt = config.get('SALT');

export const hashPayload = (payload) => hash(payload, salt);
export const comparePayload = (payload, encryptedPayload) => compare(payload, encryptedPayload);
