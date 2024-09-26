import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '../lib/dbConnect';
import User from '../models/User';

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});


export async function signUpAction(data) {
  const parsedData = signUpSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.errors.map((err) => err.message).join(", "));
  }

  const { name, email, password } = parsedData.data;

  await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return {
    message: 'User signed up successfully',
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  };
}
