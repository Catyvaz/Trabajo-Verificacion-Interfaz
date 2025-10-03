import { MensajeExito } from "../mensajes";

export async function EnvioMailMet(
  destino: string,
  mensaje: string
): Promise<void> {
  try {
    await fetch("http://localhost:3001/api/send-email",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ destino, mensaje }),
    })
    MensajeExito("Correo enviado con éxito a: " + destino + "📧");
  } catch (error) {
    console.error("❌ Error enviando correo:", error);
    throw error;
  }
}
