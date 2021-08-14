require('dotenv').config();
import env from 'env-var';

export const BROKER_URL = env.get('BROKER_URL').required().asUrlString();
export const SERVER_PORT = env.get('SERVER_PORT').required().asPortNumber();

export const STORAGE_TYPE = env.get('STORAGE_TYPE').asEnum(['git']);
export const GIT_STORAGE_REPO = env.get('GIT_STORAGE_REPO').asString();
