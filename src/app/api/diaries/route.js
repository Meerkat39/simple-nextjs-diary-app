import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://localhost:3001/diaries", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error:" ${res.status}`);
    }

    const diaries = await res.json();
    return NextResponse.json(diaries);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch diaries", error: error.message },
      { status: 500 }
    );
  }
}
