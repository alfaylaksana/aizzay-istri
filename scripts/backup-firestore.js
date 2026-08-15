// Script backup otomatis: menarik SEMUA koleksi dari Firestore,
// lalu menyimpannya sebagai file JSON di folder backup-json/.
// Dijalankan oleh GitHub Actions terjadwal — lihat
// .github/workflows/backup-firestore.yml

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function backup() {
  const outDir = path.join(__dirname, '..', 'backup-json');
  fs.mkdirSync(outDir, { recursive: true });

  const collections = await db.listCollections();

  for (const col of collections) {
    const snap = await col.get();
    const semuaDoc = [];
    snap.forEach(doc => {
      semuaDoc.push({ id: doc.id, ...doc.data() });
    });
    fs.writeFileSync(
      path.join(outDir, `${col.id}.json`),
      JSON.stringify(semuaDoc, null, 2),
      'utf8'
    );
    console.log(`✅ Backup ${semuaDoc.length} dokumen dari koleksi '${col.id}'.`);
  }

  fs.writeFileSync(
    path.join(outDir, 'last-backup.txt'),
    `Backup terakhir: ${new Date().toISOString()} (UTC)\n`,
    'utf8'
  );
}

backup().catch(err => {
  console.error('❌ Backup gagal:', err);
  process.exit(1);
});
