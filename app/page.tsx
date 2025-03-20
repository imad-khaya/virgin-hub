import LoginPage from "@/components/login-page"

export default function Home() {
  // If this were a real app, we'd check for authentication server-side
  // For this demo, we'll redirect to login page
  return <LoginPage />
}

