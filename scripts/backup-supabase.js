import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_SERVER_SUPABASE_ROLE_KEY 
)

async function backupTable(tableName) {
  console.log(`📦 Backing up table: ${tableName}`)
  
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
  
  if (error) {
    console.error(`❌ Error backing up ${tableName}:`, error.message)
    return null
  }

  console.log(`✅ Backed up ${data.length} rows from ${tableName}`)
  return data
}

async function backupStorage(bucketName) {
  console.log(`📦 Backing up storage bucket: ${bucketName}`)
  
  const { data: files, error } = await supabase
    .storage
    .from(bucketName)
    .list()
  
  if (error) {
    console.error(`❌ Error listing bucket ${bucketName}:`, error.message)
    return null
  }

  console.log(`✅ Found ${files.length} files in bucket ${bucketName}`)
  return files
}

async function main() {
  const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0]
  const backupDir = `./backups/backup-${timestamp}`

  // Crea directory di backup
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true })
  }

  console.log(`\n🚀 Starting backup at ${timestamp}\n`)

  // Lista delle tue tabelle - MODIFICA QUI
  const tables = [
    'profiles',
    'appuntamenti',
    'reviews',
    'services',
    'staffnotes'
    // Aggiungi tutte le tue tabelle
  ]

  // Backup delle tabelle
  const backupData = {}
  for (const table of tables) {
    const data = await backupTable(table)
    if (data) {
      backupData[table] = data
    }
  }

  // Salva il backup combinato
  const backupFile = path.join(backupDir, 'database-backup.json')
  fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2))
  console.log(`\n💾 Database backup saved to: ${backupFile}`)

  // Backup Storage (opzionale)
//   const storageBuckets = ['avatars', 'documents'] 
//   const storageData = {}
  
//   for (const bucket of storageBuckets) {
//     const files = await backupStorage(bucket)
//     if (files) {
//       storageData[bucket] = files
//     }
//   }

//   if (Object.keys(storageData).length > 0) {
//     const storageFile = path.join(backupDir, 'storage-manifest.json')
//     fs.writeFileSync(storageFile, JSON.stringify(storageData, null, 2))
//     console.log(`💾 Storage manifest saved to: ${storageFile}`)
//   }

  // Crea un file di metadata
  const metadata = {
    timestamp,
    date: new Date().toISOString(),
    tables: Object.keys(backupData),
    rowCounts: Object.entries(backupData).reduce((acc, [table, data]) => {
      acc[table] = data.length
      return acc
    }, {}),
    // storageBuckets: Object.keys(storageData)
  }

  const metadataFile = path.join(backupDir, 'metadata.json')
  fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2))
  console.log(`📋 Metadata saved to: ${metadataFile}`)

  console.log('\n✅ Backup completed successfully!\n')
}

main().catch(error => {
  console.error('❌ Backup failed:', error)
  process.exit(1)
})