import { NextResponse } from 'next/server';
import { supabase } from '@/lib/content';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { page_url, is_helpful, feedback_text, metadata } = body;

    if (typeof is_helpful !== 'boolean' || !page_url) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabase.from('content_feedback').insert({
      page_url,
      is_helpful,
      feedback_text,
      metadata
    });

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Feedback submission failed:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}
