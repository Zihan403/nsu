import { db } from '@/lib/firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { uid, verifiedVia, phoneVerified, emailVerified } = await request.json()

    if (!uid) {
      return NextResponse.json({ error: 'UID is required' }, { status: 400 })
    }

    // Update user verification status
    const updateData: any = {
      verifiedAt: new Date(),
      emailVerified: emailVerified ?? null,
      phoneVerified: phoneVerified ?? null
    }

    if (verifiedVia) {
      updateData.verifiedVia = verifiedVia
    }

    await updateDoc(doc(db, 'users', uid), updateData)

    return NextResponse.json({
      success: true,
      message: 'User verification status updated'
    })
  } catch (error: any) {
    console.error('Error updating verification:', error)
    return NextResponse.json(
      { error: 'Failed to update verification status' },
      { status: 500 }
    )
  }
}
