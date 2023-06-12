export async function POST(request) {
  const payload = await request.json();
  console.log('payload:', payload);
  return new Response(null, { status: 204 });
}
