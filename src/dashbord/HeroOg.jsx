import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-center text-primary">
              Sarthi Safety Companion
            </h1>
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-muted-foreground">Personal Safety</p>
                <p className="text-muted-foreground">24/7 Monitoring</p>
              </div>
              <p className="text-xl font-semibold text-primary">Always Active</p>
            </div>
            {/* Image Section */}
            <div className="aspect-[16/9] mb-8">
              <img
                src="/safety-image.jpg" // Replace with actual image path
                alt="Sarthi Safety Companion"
                className="object-cover w-full h-auto"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
