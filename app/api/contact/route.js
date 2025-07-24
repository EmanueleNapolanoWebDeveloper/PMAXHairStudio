import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })


export async function POST(request) {

    try {

        const body = await request.json()

        const { name, email, message } = body;

        if (!name || !email || !message) {
            return (
                new Response(JSON.stringify({ error: 'Tutti i campi sono obbligatori' }),
                    { status: 400, })
            )
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
            logger: true,
            debug: true
        });

        const contentMail = {
            from: `"Form Contatti" `,
            to: process.env.MAIL_USER,
            subject: "Nuovo messaggio dal WebSite",
            text: `
            Hai ricevuto un nuovo messaggio dal tuo sito.

            🧑‍💻 Nome: ${name}
            📧 Email: ${email}
            
            💬 Messaggio:
            ${message}

            -- 
            Questo messaggio è stato inviato tramite il form contatti del tuo sito portfolio.
            `
        }

        await transport.sendMail(contentMail)


        return new Response(JSON.stringify({ message: 'Messaggio inviato con successo' }), {
            status: 200
        })

    } catch (error) {
        console.error('Errore nella richiesta: ', error)
        return new Response(JSON.stringify({ error: 'Errore nel server' }), {
            status: 500
        })
    }
}

