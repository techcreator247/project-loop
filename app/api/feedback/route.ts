import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
try {
const feedback = await prisma.feedback.findMany({
orderBy: {
createdAt: "desc",
},
});

return NextResponse.json(feedback);

} catch (error) {
console.error("GET feedback error:", error);

return NextResponse.json(
  { error: "Database connection failed" },
  { status: 500 }
);

}
}

export async function POST(request: Request) {
try {
const body = await request.json();


const organization = await prisma.organization.findFirst();

if (!organization) {
  return NextResponse.json(
    { error: "No organization found" },
    { status: 400 }
  );
}

const feedback = await prisma.feedback.create({
  data: {
    message: body.message,
    source: body.source || "website",
    customerName: body.customerName || null,
    category: body.category || null,
    sentiment: body.sentiment || "NEUTRAL",
    organizationId: organization.id,
  },
});

return NextResponse.json(feedback, { status: 201 });


} catch (error) {
console.error("POST feedback error:", error);


return NextResponse.json(
  { error: "Failed to create feedback" },
  { status: 500 }
);


}
}
