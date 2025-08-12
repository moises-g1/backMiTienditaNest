import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseController } from './firebase.controller';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_APP',
      useFactory: () => {
        const projectId = process.env.FIREBASE_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        const rawKey = process.env.FIREBASE_PRIVATE_KEY || '';
        const privateKey = rawKey.replace(/\\n/g, '\n');

        if (!projectId || !clientEmail || !privateKey) {
          throw new Error(
            'Faltan variables de entorno de Firebase: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY',
          );
        }

        return admin.initializeApp({
          credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
        });
      },
    },
    {
      provide: 'FIRESTORE',
      useFactory: () => admin.firestore(),
    },
  ],
  controllers: [FirebaseController],
  exports: ['FIREBASE_APP', 'FIRESTORE'],
})
export class FirebaseModule {}
