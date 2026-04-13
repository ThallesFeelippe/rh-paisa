export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
export const ALLOWED_DOC_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function validateFile(file: File, allowedTypes: string[]) {
  if (!allowedTypes.includes(file.type)) {
    throw new Error(`Tipo de arquivo não permitido: ${file.type}`);
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`Arquivo muito grande: ${file.name}. Máximo 5MB.`);
  }

  return true;
}

export function sanitizeFilename(originalName: string) {
  const extension = originalName.split('.').pop();
  const baseName = originalName
    .replace(`.${extension}`, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-zA-Z0-9]/g, '_');
  
  return `${Date.now()}-${baseName}.${extension}`;
}
