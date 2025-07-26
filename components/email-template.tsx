import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
    email: string,
    message: string
}

export function EmailTemplate({ firstName, email, message }: EmailTemplateProps) {
    return (
        <div>
            <h2>Nuovo contatto da {firstName}</h2>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Messaggio:</strong></p>
            <p>{message}</p>
        </div>
    );
}