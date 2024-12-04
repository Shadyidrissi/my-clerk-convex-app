import connectToDB from "../../../../lib/connectToDB";
import Post from "../../../../../models/Post";

export async function GET(req, { params }) {
    const authHeader = req.headers.authorization;
    if (authHeader !== process.env.YOUR_SECRET_KEY) {
      return res.status(403).json({ message: "غير مصرح بالوصول" });
    }
    try {
        const { id } = params; // Assume 'id' here is the user ID passed in params
        await connectToDB(); // Establish a database connection

        // Fetch posts with the matching userId
        const posts = await Post.find({ userId: params.id });
        if(!posts){
            return new Response(JSON.stringify({ error: "Fack User Id" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Respond with the posts in JSON format
        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        // Handle errors
        return new Response(JSON.stringify({ error: "Failed to fetch posts" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
