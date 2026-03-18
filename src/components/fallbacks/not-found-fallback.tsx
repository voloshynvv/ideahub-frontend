import { Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";

export const NotFoundFallback = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-5 py-10">
      <img src="/not-found.svg" alt="" width={314} height={155} />
      <div className="block text-center">
        <h1 className="mb-1.5 text-lg leading-8 font-medium md:text-xl">
          <span className="text-primary font-semibold">Oops!</span> It seems
          like you've taken a wrong turn
        </h1>
        <p className="text-muted-foreground mb-8 text-sm">
          Sorry, the page you are looking for does not exist or temporarily
          unavailable.
        </p>
        <Link to="/" className={buttonVariants()}>
          Go home
        </Link>
      </div>
    </section>
  );
};
