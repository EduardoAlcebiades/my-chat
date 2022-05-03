import bcrypt from 'bcrypt';

const hash = (text: string) => {
  const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));

  return bcrypt.hashSync(text, salt);
};

const compare = (candidade: string, encrypted: string) => {
  return bcrypt.compareSync(candidade, encrypted);
};

export { compare, hash };
