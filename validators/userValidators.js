const { z } = require("zod");

const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{7,15}$/, { message: "Phone number must be valid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

const loginSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password required" }),
});

const sendMessageSchema = z.object({
  name: z.string().min(2, { message: "Name required" }),
  email: z.email({ message: "Invalid email" }),
  message: z.string().min(5, { message: "Message too short" }),
});

const forgetPasswordSchema = z.object({
  email: z.email({ message: "Invalid email" }),
});

const verifyOtpSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  otp: z.string().length(4, { message: "OTP must be 4 digits" }),
});

const resetPasswordSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 chars" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 chars" }),
});

module.exports = {
  registerSchema,
  loginSchema,
  sendMessageSchema,
  forgetPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema,
};
