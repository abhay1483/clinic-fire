export interface PatientRecord {
    id?: string;
    patientName: string;
    phone: string;
    gender: string;
    patientAge: string;
    diagnosis?: string;
    medicine?: string;
    createdDate?: string;
    modifiedDate?: string;
}

export interface PatientFilter { 
    patientName: string;
    phone: string 
};