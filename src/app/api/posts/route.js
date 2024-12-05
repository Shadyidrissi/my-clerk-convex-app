import { NextResponse } from 'next/server';
import connectToDB from "../../../lib/connectToDB";
import Post from "../../../../models/Post";
import crypto from "crypto"; // مكتبة للتحقق من HMAC
import { currentUser } from '@clerk/nextjs/server';

const SHARED_SECRET = process.env.HMAC_KEY ; // نفس السر المستخدم في العميل
console.log( `${process.env.HMAC_KEY}`)

export async function POST(request) {
  try {
    // جلب توقيع العميل من الهيدر
    const clientSignature = request.headers.get("x-signature");
    if (!clientSignature) {
      return NextResponse.json({ error: "Signature is missing" }, { status: 401 });
    }

    // قراءة بيانات الطلب
    const body = await request.text(); // يجب استخدام request.text() لجلب النص الخام للطلب
    const payload = JSON.parse(body);

    // إنشاء توقيع HMAC للتحقق
    const serverSignature = crypto.createHmac("sha256", SHARED_SECRET).update(body).digest("hex");

    // مقارنة التوقيعات
    if (clientSignature !== serverSignature) {
      return NextResponse.json({ error: "Invalid Signature" }, { status: 403 });
    }

    // التحقق من المستخدم
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;

    // الاتصال بقاعدة البيانات
    await connectToDB();

    // إنشاء المنشور
    await Post.create({ ...payload, userId });

    return NextResponse.json({ message: "Created Done" }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const posts = await Post.find(); // جلب بيانات المستخدم مع المنشور
    // const posts = await Post.find().populate("userId");
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

