export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        // Em desenvolvimento local (Vite), precisamos garantir que a chamada vá para o servidor Express se estiverem rodando em portas diferentes.
        // Mas em produção (Render), o mesmo servidor serve ambos, então '/api/send-email' funciona.
        // Para dev local, recomenda-se configurar o proxy no vite.config.ts ou rodar o server.js.

        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to, subject, html }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Falha ao enviar email');
        }

        return await response.json();
    } catch (error: any) {
        console.error('Erro no serviço de email:', error);
        throw error;
    }
};
