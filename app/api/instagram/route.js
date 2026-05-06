export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${token}`;
  //   console.log(url);

  try {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    const reels = (data.data || []).filter(
      (item) => item.media_type === "VIDEO"
    );
    // console.log(reels);
    return Response.json(reels);
    // return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
