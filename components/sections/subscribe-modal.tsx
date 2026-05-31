"use client";

import { useState, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function SubscribeModal({ open, onClose, onSuccess }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const name = fullName.trim();
    const addr = email.trim();
    if (!name || !addr) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: name, email: addr }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're subscribed! Check your inbox.");
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 2000);
      } else {
        setStatus("error");
        setMessage(data.errors?.email || data.errors?.fullName || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Subscribe for Executive Insights</DialogTitle>
          <DialogDescription>
            Monthly analysis on M&A, markets, and strategic finance for MENA executives.
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <p className="py-6 text-center text-sm text-teal-400">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="sub-name" className="mb-1.5 block text-sm font-medium text-foreground">
                Full Name
              </label>
              <input
                id="sub-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                required
                disabled={status === "loading"}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-400 focus:ring-1 focus:ring-brand-400/30 disabled:opacity-50"
              />
            </div>
            <div>
              <label htmlFor="sub-email" className="mb-1.5 block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="sub-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                disabled={status === "loading"}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-400 focus:ring-1 focus:ring-brand-400/30 disabled:opacity-50"
              />
            </div>
            {status === "error" && (
              <p className="text-xs text-red-400">{message}</p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
