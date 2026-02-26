import { BarChart3, Leaf, MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HenobelFooter } from "@/components/ui/henobel-footer";
import { HenobelHeader } from "@/components/ui/henobel-header";
import { Cart, subscribeToCart } from "@/lib/cart";
import { navigate } from "@/lib/router";

export default function AboutPage() {
  const [cartCount, setCartCount] = useState<number>(() => Cart.getTotalItems());

  useEffect(() => subscribeToCart(() => setCartCount(Cart.getTotalItems())), []);

  const stats = [
    { label: "Farmers Supported", value: "12,500+", icon: Users },
    { label: "Tons of Produce", value: "8,200+", icon: BarChart3 },
    { label: "Communities Impacted", value: "217", icon: MapPin },
    { label: "CO2 Reduced", value: "14,300t", icon: Leaf },
  ];

  return (
    <div className="min-h-screen bg-surface-container-highest text-onSurface motion-safe:animate-page-enter">
      <HenobelHeader cartCount={cartCount} />

      <section className="relative overflow-hidden bg-gradient-to-r from-[#225609]/10 via-[#7ac803]/10 to-[#ffc600]/12 px-4 py-20 text-[#040c01]">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-3 inline-flex rounded-full border border-[#225609]/10 bg-surface-container-high px-4 py-1 text-sm text-[#225609] shadow-md3-1">
            Your Partner in Sustainable Agriculture
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            Building a Sustainable Future, Farm by Farm
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-onSurfaceVariant">
            Henobel partners with smallholder farmers across Nigeria to bring ethically sourced, high-quality produce to market while regenerating land and livelihoods.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-5 text-center">
              <stat.icon className="mx-auto mb-3 h-7 w-7 text-[#225609]" />
              <div className="text-2xl font-bold text-[#225609]">{stat.value}</div>
              <div className="text-sm leading-relaxed text-onSurfaceVariant">{stat.label}</div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-6 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="mb-4 text-3xl font-bold">Our Journey</h2>
          <p className="mb-4 text-gray-700">
            Founded in 2018, Henobel Agro Tech started by connecting a small group of farmers in Ogun State to urban buyers. Today, our network spans multiple states with better pricing, reduced waste, and stronger visibility into agricultural supply chains.
          </p>
          <p className="mb-6 text-gray-700">
            We believe food should carry a story of stewardship. From crop planning to logistics, we invest in methods that improve soil health, farmer income, and long-term supply resilience.
          </p>
          <Button variant="outline" className="border-[#225609] text-[#225609] hover:bg-[#f0f7f0]" onClick={() => navigate("/contact")}>
            Partner With Henobel
          </Button>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-md3-2">
            <img
              src="https://picsum.photos/seed/henobel-about/900/600"
              alt="Farm workers harvesting produce"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <Card className="absolute -bottom-5 right-4 max-w-xs p-4">
            <p className="font-medium text-[#040c01]">
              “Henobel helped me reach stable buyers while keeping our soil healthier every season.”
            </p>
            <p className="mt-2 text-sm text-gray-600">Amina, Cassava Farmer, Kwara State</p>
          </Card>
        </div>
      </section>

      <section className="bg-gradient-to-b from-surface-container-high to-[#f7fbf2] px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold">How We Operate</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Farmer First",
                desc: "Fair pricing, agronomy support, and crop planning with local communities.",
                icon: "🤝",
              },
              {
                title: "Low-Waste Logistics",
                desc: "Route planning and handling standards designed to reduce spoilage and emissions.",
                icon: "🚚",
              },
              {
                title: "Traceability",
                desc: "Category and origin signals that improve buyer trust and sourcing decisions.",
                icon: "🔍",
              },
            ].map((item) => (
              <Card key={item.title} className="p-6">
                <div className="mb-3 text-3xl">{item.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <HenobelFooter />
    </div>
  );
}


