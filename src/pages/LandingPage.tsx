"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/ui/contact-form";
import { FeatureCard } from "@/components/ui/feature-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  Heart,
  Clock,
  CreditCard,
  Users,
  Stethoscope,
  ArrowRight,
  Shield,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/utils/scroolTo";
import section1 from "@/assets/img/section1.jpeg"
import section2 from "@/assets/img/section2.jpeg"
import section3 from "@/assets/img/section3.jpeg"
import section4 from "@/assets/img/section4.jpeg"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState({
    hero: true,
    about: true,
    services: true,
    doctors: true,
    mission: true,
    contact: true,
    promo: true,
  });

  console.log(isVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">
      {/* Hero Section */}
      <section
        id="hero"
        className="pt-[10rem] pb-16 sm:pt-24 md:pt-32 lg:pt-40 md:pb-24 lg:pb-32 relative overflow-hidden bg-primary"
      >
        <div className="absolute inset-0 bg-hero-pattern opacity-30"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-secondary/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-accent/30 to-transparent"></div>

        <div className="container px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <Badge
                  variant="secondary"
                  className="px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium uppercase tracking-wider"
                >
                  Bienvenidos
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Consulta ahora, <br />
                  <span className="text-secondary">Paga después.</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white/90">
                  En <span className="font-bold text-white">SALU</span> puedes
                  acceder a consultas médicas con los mejores especialistas de
                  tu ciudad de manera rápida y sin afectar tu economía. 💙
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 space-y-3">
                <h3 className="text-base sm:text-lg font-semibold text-primary flex items-center gap-2">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  Beneficios exclusivos
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-center gap-2 sm:gap-3">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700">
                      Sin intereses en los primeros 3 meses
                    </span>
                  </li>
                  <li className="flex items-center gap-2 sm:gap-3">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700">
                      Especialistas de confianza
                    </span>
                  </li>
                  <li className="flex items-center gap-2 sm:gap-3">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700">
                      Acceso rápido y sin trámites complicados
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  className="w-full sm:w-auto rounded-full shadow-glow-accent border hover:bg-[#ffffff17] bg-transparent group text-sm sm:text-base"
                  onClick={() => scrollToSection("contacto")}
                >
                  Agenda tu cita ahora
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            <div className="relative flex justify-center mt-8 md:mt-0">
              <div className="absolute -top-10 -left-10 h-28 sm:h-40 w-28 sm:w-40 rounded-full bg-secondary/50 animate-pulse-slow"></div>
              <div className="absolute -bottom-10 -right-10 h-40 sm:h-60 w-40 sm:w-60 rounded-full bg-accent/30 animate-pulse-slow"></div>
              <div className="relative z-10 animate-float mx-auto max-w-sm md:max-w-none">
                <Image
                  src={section1}
                  alt="SALU - Consulta ahora, paga después"
                  width={600}
                  height={600}
                  className="hidden sm:block rounded-full w-[30rem] h-[30rem] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quienes Somos Section */}
      <section
        id="quienes-somos"
        className="py-12 sm:py-16 md:py-24 lg:py-32 relative bg-white"
      >
        <div className="absolute inset-0 bg-dots-pattern opacity-30"></div>
        <div className="container px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative order-2 md:order-1 mx-auto md:mx-0 w-full max-w-md">
              <div className="absolute -top-10 -right-10 h-28 sm:h-40 w-28 sm:w-40 rounded-full bg-accent/30 animate-pulse-slow"></div>
              <div className="absolute -bottom-10 -left-10 h-40 sm:h-60 w-40 sm:w-60 rounded-full bg-secondary/50 animate-pulse-slow"></div>
              <div className="relative z-10 animate-float">
                <Image
                  src={section2}
                  alt="Quiénes somos"
                  width={450}
                  height={450}
                  className="w-[25rem] h-[25rem] rounded-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8 order-1 md:order-2">
              <SectionHeading
                badge="¿Quiénes somos?"
                title="Hacemos que la salud sea accesible para todos"
                description="En SALU, creemos que la salud debe ser accesible para todos. Nuestra misión es garantizar que cada persona reciba atención médica de alta calidad sin comprometer su bienestar financiero."
              />

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-accent" />
                        ¿Cómo lo hacemos?
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        Ofrecemos microcréditos que te permiten pagar tus citas
                        médicas en cuotas flexibles y{" "}
                        <span className="font-bold">sin intereses</span> durante
                        los primeros 3 meses.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 flex items-center gap-2">
                        <Users className="h-5 w-5 text-accent" />
                        Nuestros especialistas
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        Trabajamos con los mejores especialistas para
                        garantizarte una atención médica excepcional. 🩺
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="py-20 md:py-32 bg-gray-50 relative">
        <div className="absolute inset-0 bg-hero-pattern opacity-30"></div>
        <div className="container relative space-y-16">
          <SectionHeading
            badge="Nuestros Servicios"
            title="Microcréditos para tu salud"
            description="Ofrecemos financiamiento desde $100.000 hasta $1.000.000 redimibles exclusivamente en citas médicas. ¡Accede a la atención que necesitas sin preocuparte por el pago inmediato!"
            centered={true}
          />

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Clock}
              title="Sin intereses por 3 meses"
              description="Paga tus consultas médicas en cuotas y sin intereses durante los primeros 3 meses. Flexibilidad total para tu economía."
            />
            <FeatureCard
              icon={Users}
              title="Elige tu especialista"
              description="Accede a una amplia red de especialistas de confianza. Tú eliges al profesional que mejor se adapte a tus necesidades."
            />
            <FeatureCard
              icon={Heart}
              title="Aprobación rápida"
              description="Proceso sencillo y aprobación inmediata. Sin trámites complicados ni largas esperas para acceder a tu crédito."
            />
          </div>

          <div className="flex justify-center">
            <Button
              variant="accent"
              size="xl"
              className="rounded-full shadow-glow-accent group"
              onClick={() => scrollToSection("contacto")}
            >
              Solicita tu crédito
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Para Médicos Section */}
      <section
        id="para-medicos"
        className="py-12 sm:py-16 md:py-24 lg:py-32 relative bg-white"
      >
        <div className="absolute inset-0 bg-dots-pattern opacity-30"></div>
        <div className="container px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <SectionHeading
                badge="Para Médicos y Especialistas"
                title="Únete a nuestra red de especialistas"
                description="¿Eres médico, psicólogo, dentista u otro profesional de la salud? Únete a nuestra red y recibe pacientes con un sistema de pago seguro y garantizado."
              />

              <Card className="border-0 shadow-none bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <ul className="space-y-4">
                    <li className="flex items-start sm:items-center gap-3 sm:gap-4">
                      <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-accent/10 text-accent shrink-0">
                        <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary text-sm sm:text-base">
                          Aumenta tu cartera de pacientes
                        </h4>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          Accede a más pacientes que buscan especialistas de
                          calidad
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start sm:items-center gap-3 sm:gap-4">
                      <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-accent/10 text-accent shrink-0">
                        <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary text-sm sm:text-base">
                          Pagos seguros y garantizados
                        </h4>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          Recibe tus honorarios de forma puntual y sin
                          complicaciones
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start sm:items-center gap-3 sm:gap-4">
                      <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-accent/10 text-accent shrink-0">
                        <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary text-sm sm:text-base">
                          Comunidad médica innovadora
                        </h4>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          Forma parte de un ecosistema de salud en crecimiento
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Button
                variant="accent"
                className="w-full sm:w-auto rounded-full shadow-glow-accent group"
                onClick={() => scrollToSection("contacto")}
              >
                Contáctanos!
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="relative order-first md:order-last">
              <div className="absolute -top-10 -left-10 h-28 sm:h-40 w-28 sm:w-40 rounded-full bg-secondary/50 animate-pulse-slow"></div>
              <div className="absolute -bottom-10 -right-10 h-40 sm:h-60 w-40 sm:w-60 rounded-full bg-accent/30 animate-pulse-slow"></div>
              <div className="relative z-10 animate-float mx-auto max-w-sm md:max-w-none">
                <Image
                  src={section3}
                  alt="Para médicos y especialistas"
                  width={500}
                  height={500}
                  className="rounded-sm w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión Section */}
      <section
        id="mision-vision"
        className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gray-50 relative"
      >
        <div className="absolute inset-0 bg-hero-pattern opacity-30"></div>
        <div className="container px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative order-2 md:order-1 mx-auto md:mx-0 w-full max-w-md">
              <div className="absolute -top-10 -right-10 h-28 sm:h-40 w-28 sm:w-40 rounded-full bg-accent/30 animate-pulse-slow"></div>
              <div className="absolute -bottom-10 -left-10 h-40 sm:h-60 w-40 sm:w-60 rounded-full bg-secondary/50 animate-pulse-slow"></div>
              <div className="relative z-10 animate-float">
                <Image
                  src={section4}
                  alt="Misión y Visión"
                  width={500}
                  height={400}
                  className="sm:max-w-[30rem] h-[30rem] rounded-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8 order-1 md:order-2">
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <Badge
                    variant="secondary"
                    className="px-4 py-1 text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4"
                  >
                    Misión
                  </Badge>
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-4 sm:p-6">
                      <p className="text-sm sm:text-base text-gray-600">
                        Llevar salud de calidad al alcance de todos los
                        colombianos, ofreciendo acceso rápido a especialistas
                        sin afectar la economía de las familias. Queremos
                        mejorar la experiencia en el sistema de salud,
                        garantizando atención eficiente, accesible y confiable.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Badge
                    variant="secondary"
                    className="px-4 py-1 text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4"
                  >
                    Visión
                  </Badge>
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-4 sm:p-6">
                      <p className="text-sm sm:text-base text-gray-600">
                        Convertirnos en la plataforma líder en{" "}
                        <span className="font-bold text-primary">
                          Latinoamérica
                        </span>{" "}
                        para el acceso a salud de calidad a través de soluciones
                        financieras innovadoras. Queremos expandirnos para
                        incluir financiamiento en{" "}
                        <span className="font-bold text-primary">
                          cirugías, procedimientos y medicamentos
                        </span>
                        , brindando tranquilidad y bienestar a nuestros
                        clientes.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-20 md:py-32 relative bg-white">
        <div className="absolute inset-0 bg-dots-pattern opacity-30"></div>
        <div className="container relative space-y-12">
          <SectionHeading
            badge="Contacto"
            title="¿Tienes dudas o necesitas más información?"
            description="Déjanos tus datos y un asesor de SALU se pondrá en contacto contigo lo antes posible."
            centered={true}
          />

          <ContactForm />
        </div>
      </section>

      {/* Promoción Section */}
      <section
        id="promo"
        className="py-20 md:py-32 bg-accent relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-white/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-white/20 to-transparent"></div>

        <div className="container relative text-center space-y-8">
          <Badge
            variant="secondary"
            className="px-4 py-1 text-sm font-medium uppercase tracking-wider"
          >
            Promoción especial
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            ¡Agenda tu primera cita gratis!
          </h2>

          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Regístrate ahora y recibe un{" "}
            <span className="font-bold text-secondary">bono de bienvenida</span>{" "}
            para tu primera consulta médica.
          </p>

          <div className="pt-4">
            <Button
              variant="secondary"
              size="xl"
              className="rounded-full shadow-lg group"
            >
              Redime tu cita gratis aquí
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary">
                  <span className="text-xl font-bold">S</span>
                  <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-accent shadow-glow-accent"></div>
                </div>
                <span className="text-2xl font-bold">SALU</span>
              </div>
              <p className="text-gray-300">
                Tu salud, sin límites ni preocupaciones.
              </p>
              <div className="flex space-x-4 pt-2">
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-white">
                Enlaces rápidos
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#quienes-somos"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    ¿Quiénes somos?
                  </a>
                </li>
                <li>
                  <a
                    href="#servicios"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Servicios
                  </a>
                </li>
                <li>
                  <a
                    href="#para-medicos"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Para Médicos
                  </a>
                </li>
                <li>
                  <a
                    href="#mision-vision"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Misión y Visión
                  </a>
                </li>
                <li>
                  <a
                    href="#contacto"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Contacto</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-300">
                  <svg
                    className="h-5 w-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  finansalu@gmail.com
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <svg
                    className="h-5 w-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +57 3213335244 
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <svg
                    className="h-5 w-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Barranquilla, Colombia
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-white">
                Boletín informativo
              </h4>
              <p className="text-gray-300 mb-4">
                Suscríbete para recibir noticias y promociones especiales.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="rounded-md px-3 py-2 text-sm bg-primary-800 border border-primary-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent flex-1"
                />
                <Button variant="accent" size="sm" className="rounded-md">
                  Enviar
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-primary-800 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} SALU. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
