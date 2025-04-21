
export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  batch: string;
  academicYear: string;
  enrollmentDate: string;
}

export type StudentsByBatchAndYear = {
  [batchName: string]: {
    [academicYear: string]: Student[];
  };
};
