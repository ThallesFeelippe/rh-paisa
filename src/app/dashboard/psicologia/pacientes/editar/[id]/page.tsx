import React from 'react';
import { getPatientProfile, getEmployeesForPatient } from '../../actions';
import PatientForm from '@/components/psicologia/PatientForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function EditarPacientePage({ params }: { params: { id: string } }) {
  const [profile, employees] = await Promise.all([
    getPatientProfile(params.id),
    getEmployeesForPatient()
  ]);

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h2 className="text-2xl font-bold text-[#0E2F22]">Paciente não encontrado.</h2>
        <Link href="/dashboard/psicologia/pacientes" className="text-[#006C48] font-bold hover:underline flex items-center gap-2">
          <ChevronLeft size={16} />
          Voltar para a lista
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <PatientForm employees={employees} initialData={profile} />
    </div>
  );
}
