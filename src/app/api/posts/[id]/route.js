import connectToDB from "../../../../lib/connectToDB";
import Post from "../../../../../models/Post";
import crypto from "crypto"; // مكتبة للتحقق من HMAC

const SHARED_SECRET = process.env.HMAC_KEY ; // نفس السر المستخدم في العميل

export async function GET(request, { params }) {
    try {
        

        const clientSignature = request.headers.get("x-signature");
        const clientTimestamp = request.headers.get("x-timestamp");
    

        console.log(clientSignature,clientTimestamp )
        
        if (!clientSignature || !clientTimestamp) {
            return NextResponse.json({ error: "Missing signature or timestamp" }, { status: 401 });
        }
        console.log("done")
        
        const currentTime = Date.now();
        const requestTime = parseInt(clientTimestamp, 10);
        if (Math.abs(currentTime - requestTime) > 10 * 60 * 1000) {
            return NextResponse.json({ error: "Timestamp expired" }, { status: 403 });
        }
        console.log("done2")
        
        const path = "/api/posts";
        const message = `${path}:${clientTimestamp}`;
        const serverSignature = crypto.createHmac("sha256", SHARED_SECRET).update(message).digest("hex");
        
        console.log("done3")
        if (clientSignature !== serverSignature) {
            return NextResponse.json({ error: "Invalid Signature" }, { status: 403 });
        }
        console.log("done4")


        const { id } = await params; // Assume 'id' here is the user ID passed in params
        await connectToDB(); // Establish a database connection

        // Fetch posts with the matching userId
        const posts = await Post.find({ userId: id });
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
