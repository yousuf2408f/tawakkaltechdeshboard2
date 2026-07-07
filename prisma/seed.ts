import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  await prisma.sale.deleteMany()
  await prisma.expenseCategoryConfig.deleteMany()
  await prisma.expense.deleteMany()
  await prisma.machine.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.partner.deleteMany()
  await prisma.partnership.deleteMany()
  await prisma.transaction.deleteMany()
  await prisma.bankAccount.deleteMany()
  await prisma.payable.deleteMany()
  await prisma.receivable.deleteMany()
  await prisma.user.deleteMany()

  const passwordHash = await bcrypt.hash(
    process.env.DEMO_PASSWORD ?? 'tawakkaltech123',
    10,
  )

  await prisma.user.create({
    data: {
      username: process.env.DEMO_USERNAME ?? 'admintawakkaltech',
      email: 'admin@tawakkaltech.com',
      password: passwordHash,
      name: 'Admin',
      role: 'ADMIN',
    },
  })

  const categories = [
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
  ]
  await prisma.expenseCategoryConfig.createMany({ data: categories })

  console.log('Seed complete. Admin user and expense categories ready — no demo business records.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
