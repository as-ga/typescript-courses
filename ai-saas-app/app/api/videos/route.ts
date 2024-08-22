import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // const video = await prisma.video.findMany({
    //   orderBy: { createdAt: "desc" },
    // });
    // console.log(video);

    return NextResponse.json({ gaurav: "ashu" });
  } catch (error) {
    return NextResponse.json(
      { error: "error fetching videos" },
      { status: 500 }
    );
  } finally {
    // await prisma.$disconnect();
    console.log("prisma disconnected");
  }
}

// export async function GET(req: NextRequest, res: NextResponse) {
//   return NextResponse.json({ gaurav: "ashu" });
// }
