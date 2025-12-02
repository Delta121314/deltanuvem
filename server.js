import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Configurar SendGrid
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
    console.warn('AVISO: SENDGRID_API_KEY não encontrada nas variáveis de ambiente.');
}

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do build do React (dist)
app.use(express.static(path.join(__dirname, 'dist')));

// Rota para envio de e-mail
app.post('/api/send-email', async (req, res) => {
    const { to, subject, html } = req.body;

    if (!process.env.SENDGRID_API_KEY) {
        return res.status(500).json({ error: 'Servidor não configurado com API Key do SendGrid.' });
    }

} catch (error) {
    console.error('Erro ao enviar email:', error);
    if (error.response) {
        console.error(error.response.body);
    }
    res.status(500).json({ error: 'Falha ao enviar email.', details: error.message });
}
});

// Qualquer outra rota retorna o index.html (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
