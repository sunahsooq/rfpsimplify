// Sample data for rfpSimplify GovCon platform

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  role: 'capture_manager' | 'bd_director' | 'executive';
  avatar: string;
  companyId: string;
}

export interface Certification {
  name: string;
  level?: string;
  status: 'verified' | 'inferred' | 'self_reported' | 'unverified';
  expirationDate?: string;
}

export interface SetAside {
  type: '8a' | 'wosb' | 'sdvosb' | 'hubzone' | 'small_business';
  verified: boolean;
  expirationDate?: string;
}

export interface NAICSCode {
  code: string;
  description: string;
  isPrimary: boolean;
  sizeStandard: string;
}

export interface PastPerformance {
  id: string;
  contractName: string;
  agency: string;
  contractNumber: string;
  value: number;
  startDate: string;
  endDate: string;
  role: 'prime' | 'subcontractor';
  rating?: 'excellent' | 'very_good' | 'satisfactory';
}

export interface Personnel {
  id: string;
  name: string;
  title: string;
  certifications: string[];
  clearanceLevel: string;
  yearsExperience: number;
}

export interface ContractVehicle {
  name: string;
  status: 'have' | 'dont_have' | 'pending';
  pool?: string;
}

export interface SecurityClearance {
  facilityLevel: 'secret' | 'top_secret' | 'none';
  personnelCounts: {
    secret: number;
    tsSci: number;
    publicTrust: number;
  };
}

export interface Company {
  id: string;
  legalName: string;
  dba: string;
  uei: string;
  cageCode: string;
  address: string;
  startDate: string;
  employeeCount: number;
  annualRevenue: number;
  certifications: Certification[];
  setAsides: SetAside[];
  naicsCodes: NAICSCode[];
  pastPerformance: PastPerformance[];
  keyPersonnel: Personnel[];
  contractVehicles: ContractVehicle[];
  securityClearances: SecurityClearance;
}

export interface Requirement {
  id: string;
  reference: string;
  description: string;
  criticality: 'mandatory' | 'conditional' | 'informational';
  status: 'met' | 'gap' | 'partial';
  weight: number;
}

export interface QAItem {
  id: string;
  questionNumber: string;
  question: string;
  answer: string;
  impact: 'new_gap' | 'no_impact' | 'clarification';
  datePosted: string;
}

export interface StaffingRequirement {
  role: string;
  required: number;
  youHave: number;
}

export interface Opportunity {
  id: string;
  title: string;
  agency: string;
  solicitationId: string;
  dueDate: string;
  postedDate: string;
  value: { min: number; max: number };
  contractType: 'FFP' | 'T&M' | 'CPFF' | 'IDIQ';
  setAside: string;
  naicsCode: string;
  placeOfPerformance: string;
  description: string;
  status: 'new' | 'reviewing' | 'pursuing' | 'preparing' | 'submitted' | 'won' | 'lost' | 'no_bid';
  matchScore: number;
  pwin?: number;
  readinessScore: number;
  requirements: Requirement[];
  certificationsRequired: string[];
  levelOfEffort: 'Small' | 'Medium' | 'Large';
  vehicleRequired?: string;
  incumbent?: { name: string; yearsIncumbent: number; rewinRate: number };
  captureOwner?: string;
  lastUpdated: string;
  staffingRequirements?: StaffingRequirement[];
}

export interface Partner {
  id: string;
  companyName: string;
  location: string;
  employeeCount: number;
  capabilityMatchScore: number;
  certifications: Certification[];
  setAsides: string[];
  naicsCodes: string[];
  capabilities: string[];
  fillsGaps: string[];
  pastWinsTogether: number;
  relationshipStatus: 'none' | 'preferred' | 'nda_active' | 'pending_ta';
  contactName?: string;
  contactEmail?: string;
}

export interface PipelineItem {
  opportunityId: string;
  opportunity: string;
  agency: string;
  stage: 'reviewing' | 'pursuing' | 'preparing' | 'submitted' | 'won' | 'lost' | 'no_bid';
  value: string;
  dueDate: string;
  pwin: number;
  matchScore: number;
  teamSize: number;
}

export interface TeamingRequest {
  id: string;
  type: 'seeking' | 'offering';
  title: string;
  description: string;
  agency: string;
  value: string;
  dueDate: string;
  companyName: string;
  postedDate: string;
  capabilities: string[];
}

export interface Notification {
  id: string;
  type: 'amendment' | 'deadline' | 'partner_activity' | 'qa_update' | 'new_match';
  urgency: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  opportunityId?: string;
  actionUrl?: string;
}

// Sample Opportunities
export const sampleOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Cloud Infrastructure Modernization Services',
    agency: 'Department of Energy',
    solicitationId: 'DE-SOL-0012847',
    dueDate: '2025-03-15',
    postedDate: '2025-01-15',
    value: { min: 5000000, max: 10000000 },
    contractType: 'FFP',
    setAside: 'Small Business',
    naicsCode: '541512',
    placeOfPerformance: 'Washington, DC',
    description: 'Enterprise cloud migration and modernization services for legacy applications.',
    status: 'reviewing',
    matchScore: 87,
    readinessScore: 45,
    levelOfEffort: 'Large',
    certificationsRequired: ['FedRAMP High', 'CMMC L2', 'Secret Clearance'],
    vehicleRequired: 'GSA IT Schedule 70',
    incumbent: { name: 'Booz Allen Hamilton', yearsIncumbent: 5, rewinRate: 85 },
    captureOwner: 'Sarah Chen',
    lastUpdated: '2025-01-20',
    requirements: [],
    staffingRequirements: [
      { role: 'Program Manager', required: 1, youHave: 1 },
      { role: 'Cloud Architect', required: 3, youHave: 2 },
      { role: 'DevSecOps Engineer', required: 5, youHave: 3 },
    ],
  },
  {
    id: '2',
    title: 'VA Enterprise Cybersecurity Assessment',
    agency: 'Department of Veterans Affairs',
    solicitationId: 'VA-RFP-2025-0034',
    dueDate: '2025-03-02',
    postedDate: '2025-01-10',
    value: { min: 2000000, max: 5000000 },
    contractType: 'T&M',
    setAside: '8(a)',
    naicsCode: '541512',
    placeOfPerformance: 'Remote',
    description: 'Comprehensive cybersecurity assessment and remediation services.',
    status: 'pursuing',
    matchScore: 82,
    readinessScore: 72,
    levelOfEffort: 'Medium',
    certificationsRequired: ['FedRAMP Moderate', 'FISMA'],
    lastUpdated: '2025-01-18',
    requirements: [],
  },
  {
    id: '3',
    title: 'DHS Border Security Analytics Platform',
    agency: 'Department of Homeland Security',
    solicitationId: 'DHS-CBP-2025-001',
    dueDate: '2025-04-01',
    postedDate: '2025-01-05',
    value: { min: 10000000, max: 25000000 },
    contractType: 'IDIQ',
    setAside: 'SDVOSB',
    naicsCode: '541511',
    placeOfPerformance: 'El Paso, TX',
    description: 'Advanced analytics platform for border security operations.',
    status: 'new',
    matchScore: 79,
    readinessScore: 58,
    levelOfEffort: 'Small',
    certificationsRequired: ['CMMC L2', 'ISO 27001'],
    lastUpdated: '2025-01-15',
    requirements: [],
  },
];

// Sample Partners
export const samplePartners: Partner[] = [
  {
    id: '1',
    companyName: 'CyberShield Solutions',
    location: 'Reston, VA',
    employeeCount: 85,
    capabilityMatchScore: 92,
    certifications: [
      { name: 'FedRAMP High', status: 'verified' },
      { name: 'GSA Schedule', status: 'verified' },
      { name: 'CMMC L2', status: 'verified' },
    ],
    setAsides: ['8(a)', 'Small Business'],
    naicsCodes: ['541512', '541519'],
    capabilities: ['Cybersecurity', 'Cloud Security', 'SOC Operations'],
    fillsGaps: ['FedRAMP High (30%)', 'GSA Schedule (Required Vehicle)'],
    relationshipStatus: 'preferred',
    pastWinsTogether: 2,
    contactName: 'John Smith',
    contactEmail: 'j.smith@cybershield.com',
  },
  {
    id: '2',
    companyName: 'DataTech Federal',
    location: 'Arlington, VA',
    employeeCount: 120,
    capabilityMatchScore: 88,
    certifications: [
      { name: '8(a)', status: 'verified' },
      { name: 'HUBZone', status: 'verified' },
    ],
    setAsides: ['8(a)', 'HUBZone'],
    naicsCodes: ['541511', '541512'],
    capabilities: ['Data Analytics', 'AI/ML', 'Business Intelligence'],
    fillsGaps: ['Data Analytics', 'AI/ML Expertise'],
    relationshipStatus: 'preferred',
    pastWinsTogether: 1,
  },
  {
    id: '3',
    companyName: 'FedSecure Analytics',
    location: 'McLean, VA',
    employeeCount: 45,
    capabilityMatchScore: 85,
    certifications: [
      { name: 'GSA Schedule', status: 'verified' },
      { name: 'Top Secret', status: 'verified' },
    ],
    setAsides: ['Small Business'],
    naicsCodes: ['541512'],
    capabilities: ['Security Consulting', 'Risk Assessment', 'Compliance'],
    fillsGaps: ['Security Clearances', 'Risk Management'],
    relationshipStatus: 'nda_active',
    pastWinsTogether: 0,
  },
  {
    id: '4',
    companyName: 'GovCloud Partners',
    location: 'Herndon, VA',
    employeeCount: 65,
    capabilityMatchScore: 78,
    certifications: [
      { name: 'AWS GovCloud', status: 'verified' },
      { name: 'Azure Gov', status: 'verified' },
    ],
    setAsides: ['Small Business', 'WOSB'],
    naicsCodes: ['541512', '518210'],
    capabilities: ['Cloud Migration', 'DevSecOps', 'Infrastructure'],
    fillsGaps: ['Cloud Infrastructure', 'DevSecOps'],
    relationshipStatus: 'pending_ta',
    pastWinsTogether: 0,
  },
  {
    id: '5',
    companyName: 'CloudFirst Federal',
    location: 'Washington, DC',
    employeeCount: 150,
    capabilityMatchScore: 85,
    certifications: [
      { name: 'FedRAMP High', status: 'verified' },
    ],
    setAsides: ['Small Business'],
    naicsCodes: ['541512', '518210'],
    capabilities: ['Cloud Migration', 'AWS', 'Azure'],
    fillsGaps: ['FedRAMP High'],
    relationshipStatus: 'none',
    pastWinsTogether: 0,
  },
  {
    id: '6',
    companyName: 'AgileGov Solutions',
    location: 'McLean, VA',
    employeeCount: 95,
    capabilityMatchScore: 81,
    certifications: [
      { name: 'ISO 27001', status: 'verified' },
    ],
    setAsides: ['8(a)', 'Small Business'],
    naicsCodes: ['541511', '541512'],
    capabilities: ['Agile Development', 'DevSecOps', 'Scrum'],
    fillsGaps: ['Agile Methodology'],
    relationshipStatus: 'none',
    pastWinsTogether: 0,
  },
];

// Sample Pipeline Items
export const samplePipelineItems: PipelineItem[] = [
  { opportunityId: '1', opportunity: 'Cloud Migration Services', agency: 'DOE', stage: 'pursuing', value: '$8.5M', dueDate: 'Feb 15, 2026', pwin: 65, matchScore: 82, teamSize: 3 },
  { opportunityId: '2', opportunity: 'Cybersecurity Operations', agency: 'DHS', stage: 'preparing', value: '$12.2M', dueDate: 'Mar 1, 2026', pwin: 55, matchScore: 78, teamSize: 2 },
  { opportunityId: '3', opportunity: 'IT Modernization', agency: 'VA', stage: 'reviewing', value: '$5.1M', dueDate: 'Feb 28, 2026', pwin: 70, matchScore: 85, teamSize: 1 },
  { opportunityId: '4', opportunity: 'Data Analytics Platform', agency: 'HHS', stage: 'submitted', value: '$15.8M', dueDate: 'Jan 30, 2026', pwin: 45, matchScore: 71, teamSize: 4 },
  { opportunityId: '5', opportunity: 'Network Infrastructure', agency: 'DoD', stage: 'won', value: '$22.5M', dueDate: 'Completed', pwin: 100, matchScore: 88, teamSize: 3 },
  { opportunityId: '6', opportunity: 'Help Desk Support', agency: 'GSA', stage: 'lost', value: '$3.2M', dueDate: 'Closed', pwin: 0, matchScore: 65, teamSize: 2 },
  { opportunityId: '7', opportunity: 'Software Development', agency: 'NASA', stage: 'pursuing', value: '$9.7M', dueDate: 'Mar 15, 2026', pwin: 60, matchScore: 79, teamSize: 2 },
  { opportunityId: '8', opportunity: 'Cloud Hosting Services', agency: 'Treasury', stage: 'reviewing', value: '$6.3M', dueDate: 'Apr 1, 2026', pwin: 50, matchScore: 74, teamSize: 1 },
  { opportunityId: '9', opportunity: 'AI/ML Development', agency: 'DOE', stage: 'preparing', value: '$18.9M', dueDate: 'Mar 20, 2026', pwin: 75, matchScore: 91, teamSize: 3 },
  { opportunityId: '10', opportunity: 'Managed Services', agency: 'EPA', stage: 'pursuing', value: '$4.8M', dueDate: 'Feb 20, 2026', pwin: 55, matchScore: 76, teamSize: 2 },
];

// Sample Company Profile
export const sampleCompany: Company = {
  id: '1',
  legalName: 'TechGov Solutions LLC',
  dba: 'TechGov',
  uei: 'ABC123DEF456',
  cageCode: '7XYZ9',
  address: '1234 Innovation Way, Reston, VA 20190',
  startDate: '2018-03-15',
  employeeCount: 45,
  annualRevenue: 8500000,
  certifications: [
    { name: 'ISO 27001', status: 'inferred' },
    { name: 'SOC 2 Type II', status: 'verified', expirationDate: '2025-06-30' },
  ],
  setAsides: [
    { type: 'small_business', verified: true },
    { type: '8a', verified: true, expirationDate: '2027-03-15' },
  ],
  naicsCodes: [
    { code: '541512', description: 'Computer Systems Design Services', isPrimary: true, sizeStandard: '$34M' },
    { code: '541519', description: 'Other Computer Services', isPrimary: false, sizeStandard: '$30M' },
    { code: '541330', description: 'Engineering Services', isPrimary: false, sizeStandard: '$22.5M' },
    { code: '518210', description: 'Cloud Hosting', isPrimary: false, sizeStandard: '$35M' },
  ],
  pastPerformance: [
    {
      id: '1',
      contractName: 'DOE National Lab Cloud Migration',
      agency: 'Department of Energy',
      contractNumber: 'DE-AC02-06CH11357',
      value: 4200000,
      startDate: '2021-01-01',
      endDate: '2024-12-31',
      role: 'prime',
      rating: 'excellent',
    },
    {
      id: '2',
      contractName: 'VA Enterprise IT Support',
      agency: 'Department of Veterans Affairs',
      contractNumber: 'VA118-16-D-1234',
      value: 2800000,
      startDate: '2020-06-01',
      endDate: '2023-05-31',
      role: 'subcontractor',
      rating: 'very_good',
    },
  ],
  keyPersonnel: [
    {
      id: '1',
      name: 'Sameer Khan',
      title: 'Program Manager',
      certifications: ['PMP'],
      clearanceLevel: 'Secret',
      yearsExperience: 15,
    },
    {
      id: '2',
      name: 'Jennifer Davis',
      title: 'Technical Lead',
      certifications: ['AWS SA Pro', 'Azure Expert'],
      clearanceLevel: 'TS/SCI',
      yearsExperience: 12,
    },
  ],
  contractVehicles: [
    { name: 'OASIS+ SB', status: 'have', pool: 'Pool 1: Management' },
    { name: 'GSA IT Schedule 70', status: 'dont_have' },
    { name: 'CIO-SP3 SB', status: 'pending' },
    { name: '8(a) STARS III', status: 'have' },
  ],
  securityClearances: {
    facilityLevel: 'secret',
    personnelCounts: { secret: 8, tsSci: 2, publicTrust: 35 },
  },
};

// Sample Notifications
export const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'amendment',
    urgency: 'critical',
    title: 'Amendment 003 Posted',
    description: 'DE-SOL-0012847: FedRAMP requirement changed from Moderate to High',
    timestamp: new Date().toISOString(),
    read: false,
    opportunityId: '1',
  },
  {
    id: '2',
    type: 'deadline',
    urgency: 'high',
    title: 'Proposal Due in 3 Days',
    description: 'VA-RFP-2025-0034: Enterprise Cybersecurity Assessment',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false,
    opportunityId: '2',
  },
  {
    id: '3',
    type: 'partner_activity',
    urgency: 'medium',
    title: 'CyberShield Accepted Your Request',
    description: "They're interested in teaming for the DOE opportunity",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: true,
  },
  {
    id: '4',
    type: 'new_match',
    urgency: 'low',
    title: 'New 92% Match Found',
    description: 'DHS Analytics Platform matches your capabilities',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    read: true,
    opportunityId: '3',
  },
  {
    id: '5',
    type: 'qa_update',
    urgency: 'high',
    title: 'New Q&A Posted',
    description: '5 new questions answered for Cloud Migration RFP',
    timestamp: new Date(Date.now() - 43200000).toISOString(),
    read: false,
    opportunityId: '1',
  },
];

// Sample Teaming Requests
export const sampleTeamingRequests: TeamingRequest[] = [
  {
    id: '1',
    type: 'seeking',
    title: 'Need FedRAMP High Partner for DOE Cloud RFP',
    description: 'Looking for partner with FedRAMP High ATO to support cloud migration opportunity. Must have DOE past performance.',
    agency: 'DOE',
    value: '$5-10M',
    dueDate: '45 days',
    companyName: 'CloudFirst Federal',
    postedDate: '2 days ago',
    capabilities: ['FedRAMP High', 'Cloud Migration', 'DOE Experience'],
  },
  {
    id: '2',
    type: 'offering',
    title: 'GSA Schedule Holder Seeking Prime',
    description: 'We hold GSA IT Schedule 70 and looking to sub on VA or DHS opportunities. Strong cybersecurity capabilities.',
    agency: 'VA/DHS',
    value: '$2-5M',
    dueDate: 'Ongoing',
    companyName: 'SecureGov LLC',
    postedDate: '5 days ago',
    capabilities: ['GSA Schedule 70', 'Cybersecurity', 'FISMA'],
  },
  {
    id: '3',
    type: 'seeking',
    title: 'SDVOSB Prime Needs Data Analytics Sub',
    description: 'Pursuing VA healthcare analytics contract. Need partner with Tableau/Power BI expertise and VA experience.',
    agency: 'VA',
    value: '$3M',
    dueDate: '30 days',
    companyName: 'VetTech Solutions',
    postedDate: '1 week ago',
    capabilities: ['Data Analytics', 'Tableau', 'Power BI', 'VA Experience'],
  },
];

// Sample User
export const sampleUser: User = {
  id: '1',
  name: 'Sarah Chen',
  email: 'sarah.chen@techgov.com',
  phone: '(202) 555-0147',
  jobTitle: 'Capture Manager',
  role: 'capture_manager',
  avatar: '',
  companyId: '1',
};
