export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
}

export const PAYMENT_METHOD = {
  CARD: 'card',
  TRANSFER: 'transfer',
  CASH: 'cash',
  SEPA: 'sepa',
}

export const ENROLLMENT_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

export const ENROLLMENT_PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  REFUNDED: 'refunded',
}

export const STUDENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
}

export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
  NOT_SPECIFIED: 'not_specified',
}

export const DOCUMENT_TYPE = {
  ID_CARD: 'id_card',
  PASSPORT: 'passport',
  VISA: 'visa',
  CERTIFICATE: 'certificate',
}

export const BILLING_DOCUMENT_TYPE = {
  INVOICE: 'invoice',
  RECEIPT: 'receipt',
  INVOICE_RECEIPT: 'invoice_receipt',
}

export const ORGANIZATION_TYPE = {
  CLINIC: 'clinic',
  SCHOOL: 'school',
  BOTH: 'both',
}

export const APPOINTMENT_STATUS_LABELS = {
  [APPOINTMENT_STATUS.PENDING]: 'Pendente',
  [APPOINTMENT_STATUS.CONFIRMED]: 'Confirmado',
  [APPOINTMENT_STATUS.COMPLETED]: 'Concluido',
  [APPOINTMENT_STATUS.CANCELLED]: 'Cancelado',
}

export const PAYMENT_STATUS_LABELS = {
  [PAYMENT_STATUS.PENDING]: 'Pendente',
  [PAYMENT_STATUS.COMPLETED]: 'Concluido',
  [PAYMENT_STATUS.FAILED]: 'Falhado',
  [PAYMENT_STATUS.REFUNDED]: 'Reembolsado',
}

export const STUDENT_STATUS_LABELS = {
  [STUDENT_STATUS.ACTIVE]: 'Ativo',
  [STUDENT_STATUS.INACTIVE]: 'Inativo',
}
