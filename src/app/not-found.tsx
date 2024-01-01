import { Container } from "@/lib/components";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center">
      <Container maxWidth="max-w-md">
        <div className="text-center">
          <h1>Page not found</h1>
        </div>
      </Container>
    </div>
  );
}
