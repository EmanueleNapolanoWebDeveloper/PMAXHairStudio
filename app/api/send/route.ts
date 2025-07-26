import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {

    const body = await req.json();
    const { firstName, email, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'P-MAX <onboarding@resend.dev>',
      to: ['emanuelepolpo@gmail.com'],
      subject: 'Nuovo Messaggio da PMaxHairStudio.it',
      react: EmailTemplate({ 
        firstName, email, message }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
      console.log('Errore invio email:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}