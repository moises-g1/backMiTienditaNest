import { Controller, Get, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Controller('firebase')
export class FirebaseController {
  constructor(@Inject('FIRESTORE') private readonly db: admin.firestore.Firestore) {}

  @Get('health')
  async health() {
    // simple ping by writing/reading a doc in a transient collection
    const col = this.db.collection('_health');
    const ref = col.doc('ping');
    await ref.set({ ts: new Date() }, { merge: true });
    const snap = await ref.get();
    return { ok: snap.exists, ts: snap.data()?.ts ?? null };
  }
}
