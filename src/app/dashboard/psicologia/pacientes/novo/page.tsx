import React from 'react';
import { getEmployeesForPatient } from '../actions';
import PatientForm from '@/components/psicologia/PatientForm';

export default async function NovoPacientePage() {
  const employees = await getEmployeesForPatient();

  return (
    <div className="animate-fade-in">
      <PatientForm employees={employees} />
    </div>
  );
}
