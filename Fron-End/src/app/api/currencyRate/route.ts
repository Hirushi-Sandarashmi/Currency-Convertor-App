import { NextRequest, NextResponse } from "next/server";

const GET = async (request: NextRequest) => {
  const type = request.nextUrl.searchParams.get("currencyType");
  if (!type)
    return new NextResponse(
      JSON.stringify({ msg: "ERROR!: no currency type provided!" }),
      { status: 404 }
    );
  try {
    const apikey = process.env.CURRENCY_API_KEY;

    const res = await fetch(
      "https://v6.exchangerate-api.com/v6/" + apikey + "/latest/" + type,
      {
        method: "GET",
      }
    );
    const results = await res.json();

    return new NextResponse(JSON.stringify(results), { status: 200 });
  } catch (e: any) {
    return new NextResponse(JSON.stringify({ msg: e.messgae }), {
      status: 500,
    });
  }
};

export { GET };
