import User from "../models/user";
import jwt from "jsonwebtoken";

class AuthService {
  async login(email: string) {
    // try to find a user

    const user = await User.findOne({ email });
    let userId = user?._id;
    // if not present create one
    if (!user) {
      const newUser = new User({ email });
      await newUser.save();
      userId = newUser._id;
    }
    // return token

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    return token;
  }
}

export default new AuthService();
