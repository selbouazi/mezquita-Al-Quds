<?php

namespace App\Mail;

use App\Models\Comentario;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NuevoComentario extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public Comentario $comentario;

    public function __construct(Comentario $comentario)
    {
        $this->comentario = $comentario;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nuevo comentario en ' . ($this->comentario->noticia?->titulo ?? 'la web'),
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.nuevo-comentario',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
