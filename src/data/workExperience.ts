export interface Achievement {
  title: string;
  description: string;
}

export interface Position {
  id: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: Achievement[];
  technologies: string[];
  type: 'full-time' | 'part-time' | 'internship' | 'contract' | 'freelance';
}

export interface CompanyExperience {
  id: string;
  company: string;
  description: string;
  location: string;
  positions: Position[];
  isGrouped: boolean;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: Achievement[];
  technologies: string[];
  type: 'full-time' | 'part-time' | 'internship' | 'contract' | 'freelance';
}

export const groupedExperiences: CompanyExperience[] = [
  {
    id: 'rbc-borealis',
    company: 'RBC Borealis.',
    location: 'Calgary, AB',
    description: "At RBC's AI & Data Management group, I delivered high-impact solutions combining machine learning, data engineering, and robust CI/CD practices.",
    isGrouped: true,
    positions: [
      {
        id: 'rbc-coop-2',
        position: 'Data Engineering Co-op - 2nd Term',
        startDate: 'May 2025',
        endDate: 'December 2025',
        current: false,
        description: "Led end-to-end ML platform development and enterprise data engineering projects for RBC's AI & Data Management team.",
        achievements: [
          {
            title: 'Full-Stack ML Platform',
            description: 'Delivered an end-to-end stock forecasting platform (Python/React) designed for scalable time-series ingestion and real-time inference. The model achieved 70% directional accuracy on test data.'
          },
          {
            title: 'Large-Scale Data Engineering', 
            description: 'Engineered fault-tolerant Spark pipelines to process over 1 million records daily. Led a critical service migration from SQL Server to MongoDB, building new batch pipelines to ensure data integrity and continuous uptime.'
          },
          {
            title: 'DevOps & Security',
            description: 'Significantly improved deployment and security. Rebuilt API authentication using Microsoft JWTs, migrated a new metadata service to DataHub using Github Actions CI/CD (Docker, OpenShift), and reduced deployment time by 40% and QA overhead by 35% through new testing workflows.'
          }
        ],
        technologies: ['Python', 'React', 'Apache Spark', 'OCP4', 'Docker', 'MongoDB', 'Azure', 'TensorFlow', 'Helios'],
        type: 'internship'
      },
      {
        id: 'rbc-coop-1',
        position: 'Data Engineering Co-op - 1st Term',
        startDate: 'January 2024',
        endDate: 'August 2024',
        current: false,
        description: "Developed a high-impact GenAI service on the metadata capture team to automate enterprise data management.",
        achievements: [
          {
            title: 'GenAI Service Development',
            description: 'Designed and built a GenAI backend (Python/Spark) that processed over 2 million enterprise records, generating metadata summaries with 85% precision.'
          },
          {
            title: '$2.1M Projected Savings',
            description: 'Automated key metadata workflows, cutting manual data tagging errors by 30% and delivering $2.1M in projected operational savings.'
          },
          {
            title: 'Scalable & Robust Engineering',
            description: 'Implemented asynchronous ingestion queues and robust validation layers to ensure enterprise-scale reliability. Actively contributed to code reviews and production-issue resolution.'
          }
        ],
        technologies: ['Python', 'SQL', 'Docker', 'LangChain', 'OpenAI', 'TensorFlow', 'FastAPI', 'PostgreSQL', 'Git'],
        type: 'internship'
      }
    ]
  }
];

export const workExperiences: WorkExperience[] = [
  {
    id: '2',
    company: '48Hour Discovery (Startup)',
    position: 'Full-Stack Engineer, Intern',
    location: 'Edmonton, AB',
    startDate: 'October 2023',
    endDate: 'November 2024',
    current: false,
    description: 'Full-stack role focused on building a new client-facing application and modernizing legacy services using Java, React, and cloud-native tools.',
    achievements: [
      {
        title: 'Client-Facing Application',
        description: 'Engineered a new web application using Java Spring Boot and React.js, directly resulting in a 30% increase in active user engagement.'
      },
      {
        title: 'Cloud Modernization',
        description: 'Refactored legacy code into modular, scalable microservices using AWS S3 and Docker, significantly improving system performance.'
      },
      {
        title: 'API & System Reliability',
        description: 'Collaborated in Agile sprints with DevOps and UX teams to implement scalable API endpoints, improving system fault tolerance by 25%'
      }
    ],
    technologies: ['JavaScript', 'Java', 'Spring Boot', 'React', 'TypeScript', 'Docker', 'AWS', 'Figma', 'Git'],
    type: 'part-time'
  },
  {
    id: '3',
    company: '[Re] Waste',
    position: 'Software Engineer, Intern',
    location: 'Edmonton, AB',
    startDate: 'May 2023',
    endDate: 'August 2023',
    current: false,
    description: "Led the end-to-end development of the company's client-facing platform, integrating e-commerce, user authentication, and data analytics.",
    achievements: [
      {
        title: 'Full-Stack Platform Development',
        description: "Designed and built the company's primary client platform from scratch, featuring sustainability analytics dashboards (React, Flask) for clients to visualize and forecast environmental impact."
      },
      {
        title: 'E-commerce & Payments Integration',
        description: 'Engineered a secure e-commerce system by integrating the Shopify API for seamless transaction processing. Implemented payment services (Stripe) for handling client purchases.'
      },
      {
        title: 'Secure Backend & AWS Deployment',
        description: 'Built secure user authentication and account management services. Developed RESTful APIs (SQLAlchemy, MySQL) for all data/CRUD operations and deployed the full application on AWS.'
      }
    ],
    technologies: ["Python", "Flask", "React.js", "MySQL", "SQLAlchemy", "Shopify API", "Stripe", "AWS", "Git"],
    type: 'internship'
  },
  {
    id: '4',
    company: 'M&Z Design Consulting LTD.',
    position: 'Software Engineer, Intern',
    location: 'Edmonton, AB',
    startDate: 'May 2022',
    endDate: 'August 2022',
    current: false,
    description: 'Developed a full-stack mobile application for real-time oil site image classification, integrating a Java backend with a Python ML service.',
    achievements: [
      {
        title: 'Real-Time ML Service',
        description: 'Reduced manual analysis time by 40% by fine-tuning XGBoost models on 500K+ samples and serving them via a high-availability Python FastAPI endpoint.'
      },
      {
        title: 'Full-Stack Application',
        description: 'Engineered a mobile app to capture and classify images, connecting it to a core Java Spring Boot backend that managed the Python ML service.'
      },
      {
        title: 'Backend Reliability',
        description: 'Authored robust unit, integration, and end-to-end test suites (JUnit) to validate the Java backend, ensuring high reliability under variable load.'
      }
    ],
    technologies: ["Java", "Spring Boot", "Python", "FastAPI", "XGBoost", "JUnit", "Git"],
    type: 'internship'
  }
];

export const getAllExperiences = (): (WorkExperience | CompanyExperience)[] => {
  return [...groupedExperiences, ...workExperiences];
};

export const getExperienceTypes = (): string[] => {
  const individualTypes = workExperiences.map(exp => exp.type);
  const groupedTypes = groupedExperiences.flatMap(company => 
    company.positions.map(pos => pos.type)
  );
  return Array.from(new Set([...individualTypes, ...groupedTypes]));
};

export const getExperienceTechnologies = (): string[] => {
  const individualTechs = workExperiences.flatMap(exp => exp.technologies);
  const groupedTechs = groupedExperiences.flatMap(company =>
    company.positions.flatMap(pos => pos.technologies)
  );
  return Array.from(new Set([...individualTechs, ...groupedTechs]));
};
