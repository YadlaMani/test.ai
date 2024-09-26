import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../lib/dbConnect";
import User from "@/model/user.model";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function signInAction(data) {
  const parsedData = signInSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(
      parsedData.error.errors.map((err) => err.message).join(", ")
    );
  }

  const { email, password } = parsedData.data;

  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    message: "User signed in successfully",
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  };
}
