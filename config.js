const DATABASE_FILE = "dev_db.db";

const PORT = 80;

// Settings for password hashing.
const PHASH_SALT_SIZE = 128;
const PHASH_ITERATIONS = 2048;
const PHASH_KEYLEN = 64;
const PHASH_DIGEST = "sha512";

module.exports = {
    DATABASE_FILE: DATABASE_FILE,
    PORT: PORT,
    PHASH_SALT_SIZE: PHASH_SALT_SIZE,
    PHASH_ITERATIONS: PHASH_ITERATIONS,
    PHASH_KEYLEN: PHASH_KEYLEN,
    PHASH_DIGEST: PHASH_DIGEST
};