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
