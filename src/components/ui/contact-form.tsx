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

export function ContactForm() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg sm:shadow-lg sm:p-8">
      <h2 className="text-2xl font-bold text-center text-primary mb-2">
        ¿Tienes dudas o necesitas más información?
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Déjanos tus datos y un asesor de SALU se pondrá en contacto contigo lo
        antes posible.
      </p>

      <form className="space-y-6">
        <div className="space-y-4">
          <div>
            <Input placeholder="Nombre completo" className="w-full" />
          </div>

          <div>
            <Input
              type="email"
              placeholder="Correo electrónico"
              className="w-full"
            />
          </div>

          <div>
            <Input
              type="tel"
              placeholder="Teléfono (Opcional)"
              className="w-full"
            />
          </div>

          <div>
            <Select>
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
            />
          </div>

          <div>
            <Select>
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
            <Checkbox id="terms" />
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
          Enviar mensaje
        </Button>
      </form>
    </div>
  );
}
