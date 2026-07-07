import type {
  ChartDataPoint,
  DashboardStats,
  Expense,
  Machine,
  MachineCostBreakdown,
  MachineProfit,
  Notification,
  Partnership,
} from '@/types'

export const mockMachines: Machine[] = [
  {
    id: 'm1',
    name: 'CAT 320 Excavator',
    type: 'Excavator',
    brand: 'Caterpillar',
    model: '320 GC',
    serialNumber: 'CAT320-2021-001',
    registrationNumber: 'REG-EX-4521',
    purchaseDate: '2021-03-15',
    purchaseCost: 18500000,
    currentValue: 14200000,
    depreciationRate: 12,
    workingHours: 4820,
    status: 'ACTIVE',
    location: 'Site A - Islamabad',
  },
  {
    id: 'm2',
    name: 'Komatsu D85 Bulldozer',
    type: 'Bulldozer',
    brand: 'Komatsu',
    model: 'D85EX-18',
    serialNumber: 'KOM-D85-2019-002',
    registrationNumber: 'REG-BD-7832',
    purchaseDate: '2019-08-22',
    purchaseCost: 22000000,
    currentValue: 15800000,
    depreciationRate: 10,
    workingHours: 6100,
    status: 'ACTIVE',
    location: 'Site B - Lahore',
  },
  {
    id: 'm3',
    name: 'Volvo A40G Dumper',
    type: 'Dumper',
    brand: 'Volvo',
    model: 'A40G',
    serialNumber: 'VOL-A40-2020-003',
    registrationNumber: 'REG-DP-3344',
    purchaseDate: '2020-11-10',
    purchaseCost: 16800000,
    currentValue: 12100000,
    depreciationRate: 11,
    workingHours: 3950,
    status: 'MAINTENANCE',
    location: 'Main Yard',
  },
  {
    id: 'm4',
    name: 'JCB 3DX Loader',
    type: 'Loader',
    brand: 'JCB',
    model: '3DX Super',
    serialNumber: 'JCB-3DX-2022-004',
    purchaseDate: '2022-06-01',
    purchaseCost: 8500000,
    currentValue: 7200000,
    depreciationRate: 15,
    workingHours: 2100,
    status: 'IDLE',
    location: 'Main Yard',
  },
  {
    id: 'm5',
    name: 'Hitachi ZX470 Excavator',
    type: 'Excavator',
    brand: 'Hitachi',
    model: 'ZX470H-5G',
    serialNumber: 'HIT-ZX470-2018-005',
    registrationNumber: 'REG-EX-9012',
    purchaseDate: '2018-04-18',
    purchaseCost: 24500000,
    currentValue: 13200000,
    depreciationRate: 9,
    workingHours: 7800,
    status: 'PARTNERSHIP',
    location: 'Site C - Karachi',
  },
  {
    id: 'm6',
    name: 'SANY SY215 Excavator',
    type: 'Excavator',
    brand: 'SANY',
    model: 'SY215C',
    serialNumber: 'SAN-SY215-2023-006',
    purchaseDate: '2023-01-20',
    purchaseCost: 12000000,
    currentValue: 10500000,
    depreciationRate: 14,
    workingHours: 980,
    status: 'ACTIVE',
    location: 'Site A - Islamabad',
  },
]

export const mockDashboardStats: DashboardStats = {
  totalRevenue: 48500000,
  totalExpenses: 31200000,
  totalProfit: 17300000,
  totalMachineryValue: 73000000,
  activeMachines: 3,
  idleMachines: 1,
  maintenanceMachines: 1,
  partnershipMachines: 1,
  revenueChange: 12.4,
  expensesChange: 5.2,
  profitChange: 18.7,
}

export const mockMonthlyCashFlow: ChartDataPoint[] = [
  { name: 'Jan', revenue: 3800000, expenses: 2400000, profit: 1400000 },
  { name: 'Feb', revenue: 4200000, expenses: 2600000, profit: 1600000 },
  { name: 'Mar', revenue: 3900000, expenses: 2500000, profit: 1400000 },
  { name: 'Apr', revenue: 4500000, expenses: 2800000, profit: 1700000 },
  { name: 'May', revenue: 4800000, expenses: 2700000, profit: 2100000 },
  { name: 'Jun', revenue: 5100000, expenses: 2900000, profit: 2200000 },
  { name: 'Jul', revenue: 4600000, expenses: 2650000, profit: 1950000 },
  { name: 'Aug', revenue: 5200000, expenses: 3000000, profit: 2200000 },
  { name: 'Sep', revenue: 4900000, expenses: 2850000, profit: 2050000 },
  { name: 'Oct', revenue: 5300000, expenses: 2950000, profit: 2350000 },
  { name: 'Nov', revenue: 4700000, expenses: 2750000, profit: 1950000 },
  { name: 'Dec', revenue: 5500000, expenses: 3100000, profit: 2400000 },
]

export const mockExpenseBreakdown: ChartDataPoint[] = [
  { name: 'Inventory Restock', value: 8500000 },
  { name: 'Maintenance', value: 5200000 },
  { name: 'Salaries', value: 6800000 },
  { name: 'Spare Parts', value: 3100000 },
  { name: 'Transport', value: 2400000 },
  { name: 'Utilities', value: 1200000 },
  { name: 'Other', value: 4000000 },
]

export const mockMachineUtilization: ChartDataPoint[] = [
  { name: 'CAT 320', value: 82 },
  { name: 'Komatsu D85', value: 91 },
  { name: 'Volvo A40G', value: 45 },
  { name: 'JCB 3DX', value: 28 },
  { name: 'Hitachi ZX470', value: 88 },
  { name: 'SANY SY215', value: 76 },
]

export const mockMachineProfits: MachineProfit[] = [
  { machineId: 'm1', machineName: 'CAT 320 Excavator', rentalIncome: 4200000, projectIncome: 2800000, monthlyRevenue: 700000, totalRevenue: 9800000, totalExpenses: 5200000, netProfit: 4600000, profitMargin: 46.9, roi: 24.9 },
  { machineId: 'm2', machineName: 'Komatsu D85 Bulldozer', rentalIncome: 5100000, projectIncome: 3200000, monthlyRevenue: 850000, totalRevenue: 11500000, totalExpenses: 6800000, netProfit: 4700000, profitMargin: 40.9, roi: 21.4 },
  { machineId: 'm3', machineName: 'Volvo A40G Dumper', rentalIncome: 2800000, projectIncome: 1500000, monthlyRevenue: 450000, totalRevenue: 5800000, totalExpenses: 4900000, netProfit: 900000, profitMargin: 15.5, roi: 5.4 },
  { machineId: 'm5', machineName: 'Hitachi ZX470 Excavator', rentalIncome: 6200000, projectIncome: 4100000, monthlyRevenue: 920000, totalRevenue: 14200000, totalExpenses: 8100000, netProfit: 6100000, profitMargin: 43.0, roi: 24.9 },
  { machineId: 'm6', machineName: 'SANY SY215 Excavator', rentalIncome: 3200000, projectIncome: 1800000, monthlyRevenue: 520000, totalRevenue: 6200000, totalExpenses: 3800000, netProfit: 2400000, profitMargin: 38.7, roi: 20.0 },
]

export const mockExpenses: Expense[] = [
  { id: 'e1', category: 'FUEL', amount: 185000, date: '2026-03-01', description: 'Phone inventory restock batch', machineId: 'm1' },
  { id: 'e2', category: 'MAINTENANCE', amount: 420000, date: '2026-03-02', description: 'Hydraulic pump replacement', machineId: 'm3' },
  { id: 'e3', category: 'STAFF_SALARIES', amount: 850000, date: '2026-03-01', description: 'March operator salaries' },
  { id: 'e4', category: 'SPARE_PARTS', amount: 95000, date: '2026-02-28', description: 'Track pads and filters', machineId: 'm2' },
  { id: 'e5', category: 'TRANSPORTATION', amount: 65000, date: '2026-02-27', description: 'Delivery shipment to city outlet', machineId: 'm6' },
  { id: 'e6', category: 'YARD', amount: 45000, date: '2026-02-26', description: 'Warehouse shelf repairs' },
  { id: 'e7', category: 'UTILITIES', amount: 28000, date: '2026-02-25', description: 'Electricity bill - main store' },
  { id: 'e8', category: 'FUEL', amount: 142000, date: '2026-02-24', description: 'Mobile accessories procurement', machineId: 'm2' },
]

export const mockPartnerships: Partnership[] = [
  {
    id: 'p1',
    name: 'Hitachi ZX470 Partnership',
    machineName: 'Hitachi ZX470 Excavator',
    totalInvestment: 24500000,
    totalRevenue: 14200000,
    totalExpenses: 8100000,
    netProfit: 6100000,
    partners: [
      { id: 'pt1', name: 'Ahmed Khan', ownershipPercentage: 60, investmentAmount: 14700000, expenseShare: 4860000, revenueShare: 8520000, netProfit: 3660000, outstandingPayment: 0 },
      { id: 'pt2', name: 'TawakkalTech', ownershipPercentage: 40, investmentAmount: 9800000, expenseShare: 3240000, revenueShare: 5680000, netProfit: 2440000, outstandingPayment: 150000 },
    ],
  },
]

export const mockNotifications: Notification[] = [
  { id: 'n1', type: 'MAINTENANCE_DUE', title: 'Maintenance Due', message: 'Volvo A40G Dumper - 500 hour service overdue', read: false, createdAt: '2026-03-04T08:00:00Z' },
  { id: 'n2', type: 'INSURANCE_EXPIRY', title: 'Insurance Expiring', message: 'CAT 320 Excavator insurance expires in 15 days', read: false, createdAt: '2026-03-03T10:30:00Z' },
  { id: 'n3', type: 'PARTNERSHIP_PAYMENT', title: 'Partnership Payment Due', message: 'Outstanding payment of PKR 150,000 from partnership settlement', read: true, createdAt: '2026-03-02T14:00:00Z' },
  { id: 'n4', type: 'HIGH_EXPENSE', title: 'High Expense Alert', message: 'Fuel expenses exceeded monthly budget by 18%', read: false, createdAt: '2026-03-01T09:15:00Z' },
  { id: 'n5', type: 'REGISTRATION_EXPIRY', title: 'Registration Expiry', message: 'Komatsu D85 registration renewal due next month', read: true, createdAt: '2026-02-28T11:00:00Z' },
]

export function getMachineCostBreakdown(machineId: string): MachineCostBreakdown {
  const machine = mockMachines.find((m) => m.id === machineId)
  const base = machine?.purchaseCost ?? 0
  const fuelCost = base * 0.12
  const maintenanceCost = base * 0.08
  const repairCost = base * 0.04
  const operatorSalary = base * 0.15
  const transportationCost = base * 0.03
  const spareParts = base * 0.05
  const insurance = base * 0.02
  const registration = base * 0.01
  const otherCosts = base * 0.02
  const totalCost = base + fuelCost + maintenanceCost + repairCost + operatorSalary + transportationCost + spareParts + insurance + registration + otherCosts
  const monthsOwned = machine ? Math.max(1, Math.floor((Date.now() - new Date(machine.purchaseDate).getTime()) / (30 * 24 * 60 * 60 * 1000))) : 12
  const workingHours = machine?.workingHours ?? 1

  return {
    purchaseCost: base,
    fuelCost,
    maintenanceCost,
    repairCost,
    operatorSalary,
    transportationCost,
    spareParts,
    insurance,
    registration,
    otherCosts,
    totalCost,
    costPerMonth: totalCost / monthsOwned,
    costPerWorkingHour: totalCost / workingHours,
  }
}

export const EXPENSE_CATEGORIES = [
  { key: 'GENERAL', label: 'General Expenses' },
  { key: 'YARD', label: 'Warehouse Expenses' },
  { key: 'MACHINERY', label: 'Product Equipment Expenses' },
  { key: 'FUEL', label: 'Inventory Restock Expenses' },
  { key: 'MAINTENANCE', label: 'Maintenance Expenses' },
  { key: 'STAFF_SALARIES', label: 'Staff Salaries' },
  { key: 'TRANSPORTATION', label: 'Transportation' },
  { key: 'SPARE_PARTS', label: 'Spare Parts' },
  { key: 'UTILITIES', label: 'Utilities' },
  { key: 'OTHER', label: 'Other Expenses' },
] as const

export const REPORT_PERIODS = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'] as const

export const REPORT_TYPES = [
  'Machine Profit Report',
  'Expense Report',
  'Partnership Report',
  'Maintenance Report',
] as const
