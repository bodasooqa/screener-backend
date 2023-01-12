import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import {
  FirebaseErrors,
  FirebaseExchangeKeys,
  IFirebaseExchange,
} from './firebase-admin.model';
import CollectionReference = admin.firestore.CollectionReference;

@Injectable()
export class FirebaseAdminService {
  private db: admin.firestore.Firestore;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        projectId: process.env.FIREBASE_PROJECT_ID,
      }),
    });

    this.db = admin.firestore();
  }

  private getExchangeSymbolsRef<T>(id: FirebaseExchangeKeys) {
    const exchangesCollection = this.db.collection(
      'exchanges'
    ) as CollectionReference<T>;

    return exchangesCollection.doc(id);
  }

  async getBinanceSpot(): Promise<IFirebaseExchange> {
    const exchangeSymbolsRef = this.getExchangeSymbolsRef<IFirebaseExchange>(
      FirebaseExchangeKeys.BINANCE_SPOT
    );

    return new Promise(async (resolve, reject) => {
      try {
        const doc = await exchangeSymbolsRef.get();
        if (doc.exists) {
          resolve(doc.data());
        } else {
          reject(new Error(FirebaseErrors.NO_DATA));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async setBinanceSpot(
    symbols: string[]
  ): Promise<admin.firestore.WriteResult> {
    const exchangeSymbolsRef = this.getExchangeSymbolsRef<IFirebaseExchange>(
      FirebaseExchangeKeys.BINANCE_SPOT
    );

    return await exchangeSymbolsRef.set({
      symbols,
    });
  }
}
