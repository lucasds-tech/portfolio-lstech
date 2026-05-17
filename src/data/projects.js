import p1_1 from '../assets/1/1.png';
import p1_2 from '../assets/1/2.png';
import p1_3 from '../assets/1/3.png';
import p1_4 from '../assets/1/4.png';
import p1_5 from '../assets/1/5.png';
import p1_6 from '../assets/1/6.png';

import p2_1 from '../assets/2/1.png';
import p2_2 from '../assets/2/2.png';
import p2_3 from '../assets/2/3.png';

import p3_1 from '../assets/3/1.png';
import p3_2 from '../assets/3/2.png';
import p3_3 from '../assets/3/3.png';
import p3_4 from '../assets/3/4.png';

import p4_1 from '../assets/4/1.png';


export const projects = [
  {
    id: 1,
    title: 'PARMA RISTORANTE',
    description: 'Sistema de reservas para restaurante, permitindo gestão de clientes e horários, com foco em organização operacional e controle de atendimentos.',
    tags: ['REACT', 'VITE', 'C#', 'ASP.NET'],
    demo: 'https://fd-parma-ristorante-frontend.vercel.app',
    github: 'https://github.com/nemo256/DashRecours',
    images: [
      p1_1,
      p1_2,
      p1_3,
      p1_4,
      p1_5,
      p1_6
    ],
  },
    {
    id: 2,
    title: 'WORKSHOP',
    description: 'API REST desenvolvida com Spring Boot, utilizando JPA/Hibernate e banco H2, com implementação de CRUD, modelagem de domínio e tratamento global de exceções.',
    tags: ['JAVA', 'SPRING BOOT', 'H2', 'POSTGRESQL', 'JPA/HIBERNATE'],
    github: 'https://github.com/lucasds-tech/workshop-springboot3-jpa',
    images: [
      p2_1,
      p2_2,
      p2_3
    ],
  },
  {
    id: 3,
    title: 'WORKSHOP',
    description: 'Projeto focado na aplicação prática de banco de dados NoSQL com MongoDB, explorando CRUD, consultas com Spring Data, uso de DTOs e modelagem de dados com documentos aninhados e referências.',
    tags: ['JAVA', 'SPRING BOOT', 'MONGODB'],
    github: 'https://github.com/lucasds-tech/workshop-mongodb',
    images: [
      p3_1,
      p3_2,
      p3_3,
      p3_4
    ],
  },
  {
    id: 4,
    title: 'IN PROGRESS',
    description: '',
    tags: ['JAVA'],
    demo: '',
    github: '',
    images: [
      p4_1
    ],
  },
];
