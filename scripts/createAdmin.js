import { hashedPassword } from "../utils/hashedPassword.js";

const run = async () => {
  const hash = await hashedPassword("Admin@8055");
  console.log("Hashed password:");
  console.log(hash);
};

run();
