import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const recipient = 'contact@eryon.com'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = String(body.name ?? '').trim()
    const organization = String(body.organization ?? '').trim()
    const email = String(body.email ?? '').trim()
    const requirements = String(body.requirements ?? '').trim()

    if (!name || !organization || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid name, organization, and work email.' }, { status: 400 })
    }

    if (requirements.length > 4000) {
      return NextResponse.json({ error: 'Requirements must be 4000 characters or fewer.' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: 'ERYON Website <onboarding@resend.dev>',
      to: [recipient],
      replyTo: email,
      subject: `ERYON demo request — ${organization}`,
      text: [`Name: ${name}`, `Organization: ${organization}`, `Work email: ${email}`, '', 'Project / requirements:', requirements || 'Not provided'].join('\n'),
    })

    if (error) return NextResponse.json({ error: 'Unable to send your request right now.' }, { status: 502 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Unable to send your request right now.' }, { status: 500 })
  }
}
