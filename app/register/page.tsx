import { RegisterForm } from "@/components/auth/register-form"
import { GraduationCap } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="p-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="font-semibold text-foreground">AI Learning System</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <RegisterForm />
      </main>
    </div>
  )
}
