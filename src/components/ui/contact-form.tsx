import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "./LoadingSpinner";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    email: "",
    telefono: "",
    tipoUsuario: "",
    mensaje: "",
    comoNosEncontraste: "",
    aceptaTerminos: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "contactos_clientes"), {
        ...formData,
        fechaCreacion: new Date(),
      });

      await axios.post("/api/email", {
        fullName: formData.nombreCompleto,
        email: formData.email,
        phone: formData.telefono,
        message: formData.mensaje,
        userType: formData.tipoUsuario,
        source: formData.comoNosEncontraste,
      });

      setFormData({
        nombreCompleto: "",
        email: "",
        telefono: "",
        tipoUsuario: "",
        mensaje: "",
        comoNosEncontraste: "",
        aceptaTerminos: false,
      });

      toast.success("¡Mensaje enviado con éxito!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al enviar el mensaje. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg sm:shadow-lg sm:p-8">
      <h2 className="text-2xl font-bold text-center text-primary mb-2">
        ¿Tienes dudas o necesitas más información?
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Déjanos tus datos y un asesor de SALU se pondrá en contacto contigo lo
        antes posible.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Nombre completo"
              name="name"
              className="w-full"
              value={formData.nombreCompleto}
              onChange={(e) =>
                setFormData({ ...formData, nombreCompleto: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="w-full"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Input
              type="tel"
              placeholder="Teléfono (Opcional)"
              name="phone"
              className="w-full"
              value={formData.telefono}
              onChange={(e) =>
                setFormData({ ...formData, telefono: e.target.value })
              }
            />
          </div>

          <div>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, tipoUsuario: value })
              }
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Tipo de usuario" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="paciente">Paciente</SelectItem>
                <SelectItem value="medico">Médico</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Textarea
              placeholder="Mensaje o consulta"
              className="min-h-[120px]"
              name="message"
              value={formData.mensaje}
              onChange={(e) =>
                setFormData({ ...formData, mensaje: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, comoNosEncontraste: value })
              }
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="¿Cómo nos encontraste?" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="redes">Redes sociales</SelectItem>
                <SelectItem value="recomendacion">Recomendación</SelectItem>
                <SelectItem value="google">Google</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.aceptaTerminos}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, aceptaTerminos: checked as boolean })
              }
              required
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none text-gray-700"
            >
              Acepto los{" "}
              <a href="#" className="text-accent hover:underline">
                términos y condiciones
              </a>
            </label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-accent hover:bg-accent/90 text-white"
        >
          {loading ? <LoadingSpinner /> : "Enviar mensaje"}
        </Button>
      </form>
    </div>
  );
}