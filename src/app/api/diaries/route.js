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
    console.error("Failed to fetch diaries:", error);
    return NextResponse.json(
      { message: "Failed to fetch diaries", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const newDiary = await request.json();
    const res = await fetch("http://localhost:3001/diaries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDiary),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const addedDiary = await res.json();

    return NextResponse.json(addedDiary, { status: 201 });
  } catch (error) {
    console.error("Failed to create diary: ", error);
    return NextResponse.json(
      { message: "Failed to create diary", error: error.message },
      { status: 500 }
    );
  }
}
