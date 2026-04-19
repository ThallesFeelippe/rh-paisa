'use client';

import React, { useState, useEffect } from 'react';
import { 
  Save, 
  X, 
  BadgeInfo, 
  Stethoscope, 
  BrainCircuit, 
  Factory, 
  Activity,
  User,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { savePatientProfile } from '@/app/dashboard/psicologia/pacientes/actions';
import { useRouter } from 'next/navigation';
import QuickEmployeeModal from './QuickEmployeeModal';

interface PatientFormProps {
  employees: any[];
  initialData?: any;
}

export default function PatientForm({ employees, initialData }: PatientFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmployeeList, setShowEmployeeList] = useState(false);
  const [isQuickEmployeeModalOpen, setIsQuickEmployeeModalOpen] = useState(false);
  const [localEmployees, setLocalEmployees] = useState(employees);

  useEffect(() => {
    setLocalEmployees(employees);
  }, [employees]);

  const [formData, setFormData] = useState({
    employeeId: initialData?.employeeId || '',
    employeeName: initialData?.employee?.name || '',
    employeeRegistration: initialData?.employee?.registrationNumber || '',
    preExistingConditions: initialData?.preExistingConditions || '',
    allergies: initialData?.allergies || '',
    medications: initialData?.medications || '',
    mentalHealthHistory: initialData?.mentalHealthHistory || false,
    initialObservations: initialObservations(initialData),
    bfpTestStatus: initialData?.bfpTestStatus || 'NÃO REALIZADO',
    paloTestStatus: initialData?.paloTestStatus || 'NÃO REALIZADO',
    stressScaleStatus: initialData?.stressScaleStatus || 'NÃO REALIZADO',
    expectedStressLevel: initialData?.expectedStressLevel || 1,
    psychologicalRequirements: initialData?.psychologicalRequirements || '',
    status: initialData?.status || 'AWAITING'
  });

  function initialObservations(data: any) {
    return data?.initialObservations || '';
  }

  const filteredEmployees = localEmployees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.registrationNumber?.includes(searchTerm) ||
    emp.cpf.includes(searchTerm)
  );

  const handleSelectEmployee = (emp: any) => {
    setFormData({
      ...formData,
      employeeId: emp.id,
      employeeName: emp.name,
      employeeRegistration: emp.registrationNumber || ''
    });
    setSearchTerm(emp.name);
    setShowEmployeeList(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.employeeId) {
      setError('Por favor, selecione um funcionário.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await savePatientProfile(formData);

    if (result.success) {
      router.push('/dashboard/psicologia/pacientes');
      router.refresh();
    } else {
      setError(result.error || 'Erro ao salvar perfil.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-outline-variant/10 pb-8">
        <div className="space-y-2">
          <span className="text-xs font-bold tracking-[0.2em] text-[#006C48] uppercase">Módulo de Gestão Psicológica</span>
          <h2 className="text-4xl font-headline font-bold text-[#0E2F22] tracking-tighter">
            {initialData ? 'Editar Registro' : 'Novo Cadastro de Paciente'}
          </h2>
          <p className="text-[#414844] max-w-md font-body">Monitoramento detalhado de bem-estar e prontuário psicológico.</p>
        </div>
        <div className="flex gap-3">
          <button 
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-[#C1C8C2] text-[#0E2F22] font-bold text-sm rounded-lg hover:bg-[#eceeed] transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-[#0E2F22] text-white font-bold text-sm rounded-lg shadow-lg hover:bg-[#006C48] transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Save size={18} />
            )}
            Salvar Registro
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-center gap-3 animate-shake">
          <AlertCircle className="text-red-500" />
          <p className="text-sm text-red-700 font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Column */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Employee Selection & Basic Info */}
          <section className="bg-white p-8 rounded-xl shadow-sm border border-[#C1C8C2]/20">
            <div className="flex items-center gap-3 mb-8">
              <User className="text-[#006C48]" size={24} />
              <h3 className="text-xl font-headline font-bold text-[#0E2F22]">Seleção do Funcionário</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-[10px] font-bold text-[#006C48] uppercase tracking-widest mb-2">Buscar Funcionário</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727974]" size={16} />
                  <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowEmployeeList(true);
                    }}
                    onFocus={() => setShowEmployeeList(true)}
                    placeholder="Nome, Matrícula ou CPF..."
                    disabled={!!initialData}
                    className="w-full pl-10 pr-4 py-3 bg-[#f2f4f3] border-none border-b-2 border-[#c1c8c2] focus:border-[#006C48] focus:ring-0 transition-all font-medium rounded-t-lg"
                  />
                  {showEmployeeList && !initialData && searchTerm && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-[#C1C8C2]/30 rounded-b-lg shadow-xl max-h-60 overflow-y-auto">
                      {filteredEmployees.length > 0 ? (
                        filteredEmployees.map(emp => (
                          <button
                            key={emp.id}
                            type="button"
                            onClick={() => handleSelectEmployee(emp)}
                            className="w-full text-left px-4 py-3 hover:bg-[#f2f4f3] border-b border-[#C1C8C2]/10 last:border-0 transition-colors"
                          >
                            <p className="font-bold text-[#0E2F22] text-sm">{emp.name}</p>
                            <p className="text-[10px] text-[#727974] uppercase tracking-wider">Matrícula: {emp.registrationNumber || 'N/A'} • CPF: {emp.cpf}</p>
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-4 text-center">
                          <p className="text-sm text-[#727974] mb-3">Nenhum funcionário encontrado.</p>
                          <button
                            type="button"
                            onClick={() => setIsQuickEmployeeModalOpen(true)}
                            className="text-[10px] font-bold text-[#006C48] uppercase tracking-widest bg-[#92f7c3]/20 px-3 py-2 rounded-lg hover:bg-[#92f7c3]/40 transition-all"
                          >
                            + Cadastrar Novo
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#006C48] uppercase tracking-widest mb-2">Matrícula Selecionada</label>
                <input 
                  type="text" 
                  readOnly
                  value={formData.employeeRegistration}
                  className="w-full py-3 px-4 bg-[#eceeed] border-none rounded-lg text-[#0E2F22] font-bold outline-none"
                />
              </div>
            </div>
          </section>

          {/* Health History */}
          <section className="bg-white p-8 rounded-xl shadow-sm border border-[#C1C8C2]/20">
            <div className="flex items-center gap-3 mb-8">
              <Stethoscope className="text-[#006C48]" size={24} />
              <h3 className="text-xl font-headline font-bold text-[#0E2F22]">Histórico de Saúde</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-[#006C48] uppercase tracking-widest mb-2">Doenças Pré-existentes</label>
                <textarea 
                  rows={2}
                  value={formData.preExistingConditions}
                  onChange={(e) => setFormData({...formData, preExistingConditions: e.target.value})}
                  className="w-full bg-[#f2f4f3] border-none border-b-2 border-[#c1c8c2] focus:border-[#006C48] focus:ring-0 py-3 px-4 text-[#0E2F22] font-medium text-sm rounded-t-lg"
                  placeholder="Liste diagnósticos crônicos ou condições prévias..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-[#006C48] uppercase tracking-widest mb-2">Alergias</label>
                  <textarea 
                    rows={2}
                    value={formData.allergies}
                    onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                    className="w-full bg-[#f2f4f3] border-none border-b-2 border-[#c1c8c2] focus:border-[#006C48] focus:ring-0 py-3 px-4 text-[#0E2F22] font-medium text-sm rounded-t-lg"
                    placeholder="Medicamentosas, alimentares..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#006C48] uppercase tracking-widest mb-2">Medicamentos em Uso</label>
                  <textarea 
                    rows={2}
                    value={formData.medications}
                    onChange={(e) => setFormData({...formData, medications: e.target.value})}
                    className="w-full bg-[#f2f4f3] border-none border-b-2 border-[#c1c8c2] focus:border-[#006C48] focus:ring-0 py-3 px-4 text-[#0E2F22] font-medium text-sm rounded-t-lg"
                    placeholder="Nome, dosagem e frequência..."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Psychological Baseline */}
          <section className="bg-white p-8 rounded-xl shadow-sm border border-[#C1C8C2]/20">
            <div className="flex items-center gap-3 mb-8">
              <BrainCircuit className="text-[#006C48]" size={24} />
              <h3 className="text-xl font-headline font-bold text-[#0E2F22]">Baseline Psicológico</h3>
            </div>
            
            <div className="space-y-6">
              <label className="flex items-start gap-4 p-4 rounded-xl bg-[#f2f4f3] border-l-4 border-[#cdf139] cursor-pointer group hover:bg-[#eceeed] transition-all">
                <input 
                  type="checkbox" 
                  checked={formData.mentalHealthHistory}
                  onChange={(e) => setFormData({...formData, mentalHealthHistory: e.target.checked})}
                  className="mt-1 rounded text-[#006C48] focus:ring-[#006C48] border-[#c1c8c2]"
                />
                <div>
                  <p className="font-bold text-[#0E2F22] text-sm">Histórico Prévio de Saúde Mental</p>
                  <p className="text-xs text-[#727974] mt-1">O funcionário relatou tratamentos anteriores, diagnósticos ou uso de medicação controlada?</p>
                </div>
              </label>

              <div>
                <label className="block text-[10px] font-bold text-[#006C48] uppercase tracking-widest mb-2">Observações Comportamentais Iniciais</label>
                <textarea 
                  rows={4}
                  value={formData.initialObservations}
                  onChange={(e) => setFormData({...formData, initialObservations: e.target.value})}
                  className="w-full bg-[#f2f4f3] border-none border-b-2 border-[#c1c8c2] focus:border-[#006C48] focus:ring-0 py-3 px-4 text-[#0E2F22] font-medium text-sm rounded-t-lg"
                  placeholder="Descreva postura, dicção, engajamento e sinais observados..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#006C48] uppercase tracking-widest mb-4">Status de Testes Psicométricos</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'BFP (PERSONALIDADE)', key: 'bfpTestStatus' },
                    { label: 'PALOGRÁFICO', key: 'paloTestStatus' },
                    { label: 'ESCALA DE STRESS', key: 'stressScaleStatus' }
                  ].map((test) => (
                    <div key={test.key} className="bg-[#f2f4f3] p-4 rounded-lg border border-[#C1C8C2]/20">
                      <span className="text-[9px] font-bold text-[#727974] block mb-2">{test.label}</span>
                      <select 
                        value={(formData as any)[test.key]}
                        onChange={(e) => setFormData({...formData, [test.key]: e.target.value})}
                        className="w-full bg-transparent border-none p-0 text-xs font-headline font-bold text-[#0E2F22] focus:ring-0 cursor-pointer"
                      >
                        <option value="NÃO REALIZADO">NÃO REALIZADO</option>
                        <option value="AGENDADO">AGENDADO</option>
                        <option value="REALIZADO">REALIZADO</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="md:col-span-4 space-y-6">
          
          {/* Status Selection */}
          <section className="bg-white p-8 rounded-xl shadow-sm border border-[#C1C8C2]/20">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="text-[#0E2F22]" size={24} />
              <h3 className="text-xl font-headline font-bold text-[#0E2F22]">Status do Paciente</h3>
            </div>
            
            <div className="space-y-3">
              {[
                { id: 'AWAITING', label: 'Awaiting Assessment', desc: 'Cadastro inicial, aguardando análise.', icon: Clock, color: 'text-amber-500' },
                { id: 'REGULAR', label: 'Regular', desc: 'Sem contra-indicações identificadas.', icon: CheckCircle2, color: 'text-green-500' },
                { id: 'FOLLOW_UP', label: 'Follow-up Needed', desc: 'Sinais de alerta identificados.', icon: AlertCircle, color: 'text-red-500' }
              ].map((status) => (
                <label 
                  key={status.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                    formData.status === status.id 
                      ? 'bg-[#0E2F22] border-[#0E2F22] text-white shadow-lg' 
                      : 'bg-[#f2f4f3] border-[#C1C8C2]/10 hover:bg-[#eceeed] text-[#0E2F22]'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="status"
                    checked={formData.status === status.id}
                    onChange={() => setFormData({...formData, status: status.id})}
                    className="hidden"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{status.label}</p>
                    <p className={`text-[10px] ${formData.status === status.id ? 'text-white/60' : 'text-[#727974]'}`}>{status.desc}</p>
                  </div>
                  <status.icon size={20} className={formData.status === status.id ? 'text-white' : status.color} />
                </label>
              ))}
            </div>
          </section>

          {/* Occupational Context */}
          <section className="bg-[#0E2F22] p-8 rounded-xl shadow-xl text-white">
            <div className="flex items-center gap-3 mb-6">
              <Factory className="text-[#cdf139]" size={24} />
              <h3 className="text-xl font-headline font-bold">Contexto Ocupacional</h3>
            </div>
            
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-bold text-[#ABCFBB] uppercase tracking-widest mb-4">Nível de Stress Esperado</label>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  step="1"
                  value={formData.expectedStressLevel}
                  onChange={(e) => setFormData({...formData, expectedStressLevel: parseInt(e.target.value)})}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#cdf139]"
                />
                <div className="flex justify-between mt-2 text-[10px] font-bold text-[#ABCFBB]">
                  <span>BAIXO (1)</span>
                  <span>CRÍTICO (5)</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#ABCFBB] uppercase tracking-widest mb-2">Requisitos Psicológicos</label>
                <textarea 
                  rows={3}
                  value={formData.psychologicalRequirements}
                  onChange={(e) => setFormData({...formData, psychologicalRequirements: e.target.value})}
                  className="w-full bg-white/5 border-none border-b border-white/20 focus:border-[#cdf139] focus:ring-0 py-2 px-0 text-white font-medium text-sm placeholder:text-white/20"
                  placeholder="Ex: Foco prolongado, Resiliência, Trabalho sob pressão..."
                />
              </div>
            </div>
          </section>

        </div>
      </div>

      <QuickEmployeeModal 
        isOpen={isQuickEmployeeModalOpen}
        onClose={() => setIsQuickEmployeeModalOpen(false)}
        onSuccess={(newEmp) => {
          if (newEmp && newEmp.id) {
            // Force add to local list immediately
            setLocalEmployees(prev => [newEmp, ...prev]);
            
            // Show confirmation to user
            alert(`Sucesso! ${newEmp.name} foi cadastrado e selecionado.`);
            
            // Auto-select
            setTimeout(() => {
              handleSelectEmployee(newEmp);
            }, 100);
          }
        }}
      />
    </form>
  );
}
