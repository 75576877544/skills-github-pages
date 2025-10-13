"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <main className="max-w-sm mx-auto px-6 sm:px-10 py-10">
      <h1 className="brand-title text-3xl mb-6">تسجيل الدخول</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await signIn("credentials", { redirect: false, email, password });
          if (!res || res.error) {
            alert("بيانات الدخول غير صحيحة");
            return;
          }
          router.push("/");
        }}
        className="space-y-4"
      >
        <div>
          <label className="block mb-1">البريد الإلكتروني</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full rounded-md border border-white/20 bg-transparent p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">كلمة المرور</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full rounded-md border border-white/20 bg-transparent p-2"
            required
          />
        </div>
        <button className="rounded-md bg-[var(--accent)] text-black px-5 py-2 font-medium">تسجيل الدخول</button>
      </form>
    </main>
  );
}
