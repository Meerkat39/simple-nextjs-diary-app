import { NextResponse } from "next/server";

export async function DELETE(_, { params }) {
  try {
    const { id } = params;

    const res = await fetch(`http://localhost:3001/diaries/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    return NextResponse.json(
      { message: `Diary with id ${id} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete diary:", error);
    return NextResponse.json(
      { message: "Failed to delete diary", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const updatedDiaryData = await request.json();

    const res = await fetch(`http://localhost:3001/diaries/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDiaryData),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const updatedDiary = await res.json();
    return NextResponse.json(updatedDiary, { status: 200 });
  } catch (error) {
    console.error("Failed to update diary:", error);
    return NextResponse.json(
      {
        message: "Failed to update diary",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
