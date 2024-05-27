import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: {
    params: {
      id: string;
    };
  }
) {
  const { id } = context.params;

  const idSchema = z.string().cuid();
  const zod = idSchema.safeParse(id);

  if (!zod.success) {
    return NextResponse.json(zod.error, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { user_id, username, name, description, location, url, avatar } =
    (await request.json()) as {
      user_id: string;
      username: string;
      name: string;
      description: string;
      location: string;
      url: string;
      avatar: string;
    };

  const userSchema = z
    .object({
      user_id: z.string().cuid(),
      username: z.string().min(1).max(30),
      name: z.string().min(1).max(50),
      description: z.string().max(160),
      avatar: z.string(),
    })
    .strict();

  const zod = userSchema.safeParse({
    user_id,
    username,
    name,
    description,
    avatar,
  });

  if (!zod.success) {
    return NextResponse.json(zod.error, { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        name,
        username,
        avatar,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
