"use client";

interface PageStateProps {
  type: "loading" | "error";
  message: string;
}

export const PageState = ({ type, message }: PageStateProps) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <p
        className={`text-2xl ${
          type === "loading" ? "animate-pulse" : "text-red-500"
        }`}
      >
        {message}
      </p>
    </div>
  );
};
