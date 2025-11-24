import { NextRequest, NextResponse } from 'next/server'

// This endpoint is not currently used
// We use Firebase's built-in sendEmailVerification() instead
// Kept for reference/future use

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'This endpoint is deprecated. Use Firebase sendEmailVerification() instead.' },
    { status: 410 }
  )
}