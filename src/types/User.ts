import { Dayjs } from "dayjs";

export interface SpecializationArea {
  id: number;
  title: string;
}

export const specializationAreas: SpecializationArea[] = [
  { id: 1, title: "Desarrollo web" },
  { id: 2, title: "Ciberseguridad" },
  { id: 3, title: "Inteligencia Artificial" },
  { id: 4, title: "Desarrollo mobile" },
  { id: 5, title: "Inglés" },
  { id: 6, title: "Redes y telecomunicaciones" },
];

export interface User {
  uuid: string;
  first_name: string;
  last_name: string;
  birth_date: Dayjs;
  specialization_area: SpecializationArea;
  email: string;
  role: number | null;
}
