export interface TelegramAlertOptions {
  botToken?: string;
  chatId?: string;
  mentorName: string;
  mentorRole: string;
  username: string;
  device?: string;
}

export async function sendTelegramAdminLoginAlert(options: TelegramAlertOptions): Promise<boolean> {
  const token = options.botToken?.trim() || '8876748642:AAHpCIg5q2kquP-n6Qq60k-A2VcRkMPY5uI';
  const chatId = options.chatId?.trim() || '6124204757';

  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const deviceStr = options.device || 'Desktop Browser';

  const message = `🚨 *LearnSetu Admin Security Alert* 🚨

👤 *Admin Mentor:* ${options.mentorName} (@${options.username})
💼 *Role:* ${options.mentorRole}
📱 *Device:* ${deviceStr}
⏰ *Timestamp:* ${timestamp} (IST)

🔒 *Security Notice:* An active admin session has started. If this wasn't you, log into the admin portal immediately to revoke credentials.`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const result = await response.json();
    return result.ok;
  } catch (error) {
    console.warn('Error sending Telegram alert:', error);
    return false;
  }
}
