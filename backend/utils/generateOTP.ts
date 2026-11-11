
import crypto from "crypto";

export const generateOTP = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

export const hashOTP = (otp: string): string => {
  const secret = process.env.OTP_SECRET;
  
  if (!secret) {
    throw new Error("OTP_SECRET environment variable is missing.");
  }

  return crypto
    .createHmac("sha256", secret)
    .update(otp)
    .digest("hex");
};

export const compareOTP = (enteredOTP:string, storedHash:string) => {
  const enteredHash = Buffer.from(hashOTP(enteredOTP), "hex");
  const savedHash = Buffer.from(storedHash, "hex");

  return (
    enteredHash.length === savedHash.length &&
    crypto.timingSafeEqual(enteredHash, savedHash)
  );
};
