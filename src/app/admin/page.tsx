"use client";

import { useContacts } from "@/hooks/useContacts";
import { useWaitlistUsers } from "@/hooks/useWaitlistUsers";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminPage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showDialog, setShowDialog] = useState(true);
  const { contacts, loading: contactsLoading } = useContacts();
  const { users: waitlistUsers, loading: waitlistLoading } = useWaitlistUsers();

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "finsalu.25") {
      setIsAuthenticated(true);
      setShowDialog(false);
      toast.success("Acceso concedido");
    } else {
      toast.error("Contraseña incorrecta");
      router.push("/");
    }
  };

  useEffect(() => {
    if (!isAuthenticated && !showDialog) {
      router.push("/");
    }
  }, [isAuthenticated, showDialog, router]);

  if (!isAuthenticated) {
    return (
      <Dialog open={showDialog} onOpenChange={(open) => !open && router.push("/")}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Acceso al Panel de Administración</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Ingrese la contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <Button type="submit" className="w-full">
              Acceder
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  if (contactsLoading || waitlistLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
      
      <Tabs defaultValue="contacts" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="contacts">Contactos</TabsTrigger>
          <TabsTrigger value="waitlist">Lista de Espera</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts">
          <div className="rounded-md border">
            <Table>
              <TableCaption>Lista de contactos recibidos</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Tipo Usuario</TableHead>
                  <TableHead>Fuente</TableHead>
                  <TableHead>Mensaje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      {contact.fechaCreacion.toLocaleDateString()}
                    </TableCell>
                    <TableCell>{contact.nombreCompleto}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.telefono || "N/A"}</TableCell>
                    <TableCell>{contact.tipoUsuario || "N/A"}</TableCell>
                    <TableCell>{contact.comoNosEncontraste || "N/A"}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {contact.mensaje}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="waitlist">
          <div className="rounded-md border">
            <Table>
              <TableCaption>Lista de usuarios en espera</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha de Registro</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {waitlistUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      {user.fechaRegistro.toLocaleDateString()}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;