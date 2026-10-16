// File: frontend/src/data/dailyWorkFeedData.ts

export type WorkCategory =
  | 'Milking'
  | 'Feeding'
  | 'Sanitation'
  | 'Veterinary'
  | 'Pond & Water'
  | 'Biogas & Waste'
  | 'Maintenance';

export type WorkStatus = 'Completed' | 'In Progress' | 'Needs Review';

export interface WorkPost {
  id: string;
  workerName: string;
  workerRole: string;
  avatarUrl: string;
  timeAgo: string;
  timestamp: string;
  category: WorkCategory;
  zone: string;
  title: string;
  description: string;
  status: WorkStatus;
  photoUrl?: string;
  metrics?: { label: string; value: string }[];
  verifiedByManager: boolean;
  likesCount: number;
  commentsCount: number;
}

export interface ShiftChoreItem {
  id: string;
  timeSlot: string;
  taskTitle: string;
  zone: string;
  isDone: boolean;
  assignedWorker: string;
}

export const INITIAL_DAILY_WORK_POSTS: WorkPost[] = [
  {
    id: 'post-1',
    workerName: 'Sohan Lal Patel',
    workerRole: 'Senior Dairy Operations Lead',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    timeAgo: '15 mins ago',
    timestamp: '06:15 AM • 17 Oct 2026',
    category: 'Milking',
    zone: 'Zone A (Cattle Dairy Barn)',
    title: 'Morning Session Milking Complete — 142.5 Liters Logged',
    description:
      'Completed automated herringbone vacuum milking for 10 Gir & HF dairy cows. Teats dipped in 0.5% chlorhexidine antiseptic dip immediately post-milking. Milk chilled in Bulk Milk Cooler at 4°C. Bulk density and fat testing completed with digital analyzer.',
    status: 'Completed',
    photoUrl: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80',
    metrics: [
      { label: 'Total Volume', value: '142.5 Liters' },
      { label: 'Avg Fat', value: '4.2%' },
      { label: 'Avg SNF', value: '8.6%' },
      { label: 'Chilling Temp', value: '3.8°C' },
    ],
    verifiedByManager: true,
    likesCount: 6,
    commentsCount: 2,
  },
  {
    id: 'post-2',
    workerName: 'Ram Singh Meena',
    workerRole: 'Aquaculture Pond Technician',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    timeAgo: '45 mins ago',
    timestamp: '05:45 AM • 17 Oct 2026',
    category: 'Pond & Water',
    zone: 'Zone C (Freshwater Fish Pond)',
    title: 'Pre-Dawn Paddlewheel Aeration & Dissolved Oxygen Test',
    description:
      'Turned on central 2-HP solar floating paddlewheel aerator at 3:30 AM to avert morning asphyxiation. Digital probe test at 5:30 AM showed Dissolved Oxygen at optimal 6.4 mg/L. Surface carps active and swimming vigorously. Water pH is 7.6.',
    status: 'Completed',
    photoUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    metrics: [
      { label: 'Dissolved Oxygen', value: '6.4 mg/L' },
      { label: 'Water Temp', value: '27.8°C' },
      { label: 'Water pH', value: '7.6' },
      { label: 'Aerator Runtime', value: '2.5 Hours' },
    ],
    verifiedByManager: true,
    likesCount: 8,
    commentsCount: 1,
  },
  {
    id: 'post-3',
    workerName: 'Kavita Devi',
    workerRole: 'Goat & Poultry Herd Handler',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    timeAgo: '1 hour ago',
    timestamp: '05:15 AM • 17 Oct 2026',
    category: 'Sanitation',
    zone: 'Zone B (Elevated Goat Machan)',
    title: 'Slatted Machan Floor Sweeping & Manure Tray Clearance',
    description:
      'Swept slotted composite timber floors of goat machan pens. Droppings collected from angled collection trays beneath stilts — 85 kg clean goat manure pellets bagged for vermicompost pit. Loppings racks re-stocked with fresh Subabul leaves.',
    status: 'Completed',
    photoUrl: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80',
    metrics: [
      { label: 'Manure Harvested', value: '85 kg' },
      { label: 'Floor Condition', value: '100% Dry' },
      { label: 'Kids Inspected', value: '28 Healthy' },
    ],
    verifiedByManager: false,
    likesCount: 4,
    commentsCount: 0,
  },
  {
    id: 'post-4',
    workerName: 'Babulal Yadav',
    workerRole: 'Biogas & Waste Energy Operator',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    timeAgo: '2 hours ago',
    timestamp: '04:30 AM • 17 Oct 2026',
    category: 'Biogas & Waste',
    zone: 'Zone E (Piggery & Biogas Digester)',
    title: 'Swine Alley High-Pressure Flush Directly into 25 m³ Biogas Inlet',
    description:
      'Completed daily 6:00 AM dung flush along the 1:30 sloped concrete piggery floor using brass pressure jet. All manure slurried directly into 25 m³ anaerobic digester inlet tank. Biogas pressure gauge registered 22 millibar. Slurry overflow directed to Super Napier grass root canal.',
    status: 'Completed',
    photoUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    metrics: [
      { label: 'Slurry Flushed', value: '210 Liters' },
      { label: 'Biogas Pressure', value: '22 mbar' },
      { label: 'Odor Level', value: 'Zero (Sealed)' },
    ],
    verifiedByManager: true,
    likesCount: 7,
    commentsCount: 3,
  },
  {
    id: 'post-5',
    workerName: 'Dr. Ramesh Chandra',
    workerRole: 'Visiting Livestock Veterinary Officer',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    timeAgo: '3 hours ago',
    timestamp: '03:30 AM • 17 Oct 2026',
    category: 'Veterinary',
    zone: 'Zone D (Free-Range Country Poultry)',
    title: 'Routine Flock Inspection & Deworming Dosing in Waterers',
    description:
      'Administered Piperazine liquid dewormer in 4 automatic bell drinkers for 145 country Kadaknath & Sonali layers. Inspected deep-litter rice husk bedding — dry and free of dampness. Checked nest boxes: 112 fresh brown eggs collected with zero shell cracks.',
    status: 'Completed',
    photoUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    metrics: [
      { label: 'Birds Dosed', value: '145 Layers' },
      { label: 'Eggs Collected', value: '112 Desi Eggs' },
      { label: 'Morbidity', value: '0 Birds' },
    ],
    verifiedByManager: true,
    likesCount: 11,
    commentsCount: 4,
  },
];

export const DAILY_SHIFT_CHORES: ShiftChoreItem[] = [
  {
    id: 'chore-1',
    timeSlot: '05:00 AM – 06:00 AM',
    taskTitle: 'Shed Floor Washing & Cow Rubber Mat Pressure Clean',
    zone: 'Zone A',
    isDone: true,
    assignedWorker: 'Sohan Lal',
  },
  {
    id: 'chore-2',
    timeSlot: '05:30 AM – 06:45 AM',
    taskTitle: 'Morning Session Herd Milking & Bulk Milk Cooler Log',
    zone: 'Zone A',
    isDone: true,
    assignedWorker: 'Sohan Lal',
  },
  {
    id: 'chore-3',
    timeSlot: '06:00 AM – 07:00 AM',
    taskTitle: 'Freshwater Pond Aeration & Oxygen Testing',
    zone: 'Zone C',
    isDone: true,
    assignedWorker: 'Ram Singh',
  },
  {
    id: 'chore-4',
    timeSlot: '07:00 AM – 08:30 AM',
    taskTitle: 'Super Napier Chaffing & Green Fodder Distribution',
    zone: 'Zone A & B',
    isDone: true,
    assignedWorker: 'Kavita Devi',
  },
  {
    id: 'chore-5',
    timeSlot: '08:30 AM – 09:30 AM',
    taskTitle: 'Poultry Egg Collection & Nest Box Rice Husk Fluffing',
    zone: 'Zone D',
    isDone: true,
    assignedWorker: 'Dr. Ramesh',
  },
  {
    id: 'chore-6',
    timeSlot: '10:00 AM – 11:30 AM',
    taskTitle: 'Swine High-Pressure Slurry Washdown & Biogas Check',
    zone: 'Zone E',
    isDone: true,
    assignedWorker: 'Babulal Yadav',
  },
  {
    id: 'chore-7',
    timeSlot: '01:00 PM – 02:00 PM',
    taskTitle: 'Midday Water Sprinklers & Cooling Misters Activation',
    zone: 'All Zones',
    isDone: false,
    assignedWorker: 'Sohan Lal',
  },
  {
    id: 'chore-8',
    timeSlot: '04:30 PM – 06:00 PM',
    taskTitle: 'Evening Concentrates & 32% Floating Fish Pellet Broadcast',
    zone: 'Zone A, C & E',
    isDone: false,
    assignedWorker: 'Ram Singh',
  },
];
