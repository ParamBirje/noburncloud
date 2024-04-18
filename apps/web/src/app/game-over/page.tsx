export default function Page() {
  return (
    <main className="flex flex-col justify-center items-center gap-5 mx-auto h-screen w-full text-center">
      <h1 className="text-3xl font-light">
        Game Over<span className="text-accent">!</span>
      </h1>

      <p className="w-1/3 text-muted-foreground">
        Due to no updates, constant app crashes, service interruptions and data
        corruptions; users stopped using and abandoned the app.
      </p>
    </main>
  );
}
