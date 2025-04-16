"use client";

import { useContacts } from "@/hooks/useContacts";
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

const AdminPage = () => {
  const { contacts, loading } = useContacts();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
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
    </div>
  );
};

export default AdminPage;