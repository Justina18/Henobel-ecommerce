import type { ChangeEvent, FormEvent } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HenobelFooter } from "@/components/ui/henobel-footer";
import { HenobelHeader } from "@/components/ui/henobel-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Cart, subscribeToCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [cartCount, setCartCount] = useState<number>(() => Cart.getTotalItems());
  const [formData, setFormData] = useState<ContactForm>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => subscribeToCart(() => setCartCount(Cart.getTotalItems())), []);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = "Name is required";
    if (!formData.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) next.message = "Message is required";
    if (formData.subject.trim().length > 120) next.subject = "Subject must be 120 characters or less";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    window.setTimeout(() => {
      try {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        window.setTimeout(() => setStatus("idle"), 3000);
      } catch {
        setStatus("error");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-surface-container-highest text-onSurface motion-safe:animate-page-enter">
      <HenobelHeader cartCount={cartCount} />

      <section className="bg-gradient-to-r from-[#225609]/10 via-[#7ac803]/10 to-[#ffc600]/12 px-4 py-20 text-[#040c01]">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Get in Touch</h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-onSurfaceVariant">
            Have questions about products, partnerships, or sustainability initiatives? We would love to hear from you.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            {[
              {
                icon: MapPin,
                title: "Our Location",
                lines: ["15 Adeola Hopewell Street", "Victoria Island, Lagos", "Nigeria"],
              },
              {
                icon: Phone,
                title: "Call Us",
                lines: ["+234 800 000 0000", "Mon-Fri: 8am-6pm WAT"],
              },
              {
                icon: Mail,
                title: "Email Us",
                lines: ["hello@henobel.com", "partners@henobel.com", "press@henobel.com"],
              },
            ].map((item) => (
              <Card key={item.title} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#7ac803]/15 text-[#225609]">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="mb-2 text-lg font-bold">{item.title}</h2>
                    <p className="text-gray-600">
                      {item.lines.map((line) => (
                        <span key={line} className="block">{line}</span>
                      ))}
                    </p>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-6">
              <h2 className="mb-3 text-lg font-bold">Response Expectations</h2>
              <p className="text-sm text-gray-600">
                We respond to product and partnership inquiries within 2 business days. For bulk supply requests, include quantity, product category, and delivery location.
              </p>
            </Card>
          </div>

          <Card className="p-8">
            <h2 className="mb-2 text-2xl font-bold">Send us a message</h2>
            <p className="mb-6 text-sm text-gray-600">Required fields are marked by validation feedback if left empty.</p>

            {status === "success" && (
              <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700" role="status" aria-live="polite">
                Thank you. Your message has been sent and our team will reply soon.
              </div>
            )}
            {status === "error" && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                Something went wrong while sending your message. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={cn(errors.name && "border-red-500 focus-visible:ring-red-500")}
                  />
                  {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={cn(errors.email && "border-red-500 focus-visible:ring-red-500")}
                  />
                  {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1 block text-sm font-medium">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                    className={cn(errors.subject && "border-red-500 focus-visible:ring-red-500")}
                  />
                  {errors.subject && <p id="subject-error" className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="mb-1 block text-sm font-medium">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={cn(errors.message && "border-red-500 focus-visible:ring-red-500")}
                  />
                  {errors.message && <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-[#000] text-white shadow-md3-1 hover:bg-[#1a4207] hover:shadow-md3-2"
                >
                  <Send className={cn("mr-2 h-4 w-4", status === "submitting" && "animate-spin")} />
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>

      <HenobelFooter />
    </div>
  );
}

