import { NextResponse } from 'next/server';

/**
 * Health check endpoint for Docker/Kubernetes
 * GET /api/health
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    },
    { status: 200 }
  );
}
