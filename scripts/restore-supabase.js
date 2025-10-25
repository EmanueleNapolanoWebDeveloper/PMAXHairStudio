// scripts/restore-supabase.js
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_SERVER_SUPABASE_ROLE_KEY
)

async function restoreTable(tableName, data) {
  console.log(`🔄 Restoring table: ${tableName} (${data.length} rows)`)

  // Attenzione: questo INSERISCE i dati, non li sostituisce
  // Per sostituire, devi prima fare DELETE
  const { error } = await supabase
    .from(tableName)
    .upsert(data)

  if (error) {
    console.error(`❌ Error restoring ${tableName}:`, error.message)
    return false
  }

  console.log(`✅ Restored ${tableName}`)
  return true
}

async function main() {
  const backupPath = process.argv[2]

  if (!backupPath) {
    console.error('❌ Usage: node restore-supabase.js <backup-directory>')
    process.exit(1)
  }

  const backupFile = path.join(backupPath, 'database-backup.json')

  if (!fs.existsSync(backupFile)) {
    console.error(`❌ Backup file not found: ${backupFile}`)
    process.exit(1)
  }

  console.log(`\n🚀 Starting restore from ${backupFile}\n`)

  const backupData = JSON.parse(fs.readFileSync(backupFile, 'utf8'))

  for (const [table, data] of Object.entries(backupData)) {
    await restoreTable(table, data)
  }

  console.log('\n✅ Restore completed!\n')
}

main().catch(error => {
  console.error('❌ Restore failed:', error)
  process.exit(1)
})