import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { JWT_EXPIRY_TIME } from "@/constants";

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!findUser) {
      return NextResponse.json(
        { errorMessage: "Invalid credentials!" },
        { status: 404 }
      );
    }

    const comparePassword = await bcrypt.compare(password, findUser.password);

    if (!comparePassword) {
      return NextResponse.json(
        { errorMessage: "Invalid credentials!" },
        { status: 401 }
      );
    }

    // Jika password cocok, buat JWT TOKEN
    const payload = {
      id: findUser.id,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      username: findUser.username,
      email: findUser.email,
    };

    const token = sign(payload, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRY_TIME,
    });
    const res = NextResponse.json(
      { data: payload, message: "Login succesfully" },
      { status: 200 }
    );
    res.cookies.set("token", token);

    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
