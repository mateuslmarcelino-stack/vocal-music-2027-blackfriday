import { Lead } from '../types';

export const GOOGLE_APPS_SCRIPT_TEMPLATE = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Cria cabeçalho se a planilha estiver vazia
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Data / Horário",
        "Nome da Noiva/Noivo",
        "WhatsApp",
        "Previsão Casamento 2027",
        "Cidade / Região",
        "Origem (UTM Source)",
        "Campanha (UTM Campaign)",
        "Termo / Anúncio (UTM Content)"
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#c5a059").setFontColor("#0c0d10");
    }

    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.data_hora || new Date().toLocaleString("pt-BR"),
      data.nome || "",
      data.whatsapp || "",
      data.data_casamento_2027 || "",
      data.cidade || "",
      data.utm_source || "Tráfego Direto",
      data.utm_campaign || "",
      data.utm_content || ""
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Lead salvo com sucesso!" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

export async function sendLeadToGoogleSheets(
  lead: Lead,
  webhookUrl: string
): Promise<{ success: boolean; message: string }> {
  if (!webhookUrl || !webhookUrl.trim().startsWith('http')) {
    return { success: false, message: 'URL do webhook do Google Sheets não configurada.' };
  }

  const payload = {
    data_hora: new Date(lead.createdAt).toLocaleString('pt-BR'),
    nome: lead.name,
    whatsapp: lead.phone,
    data_casamento_2027: lead.weddingDate,
    cidade: lead.city,
    utm_source: lead.utmSource || 'Orgânico / Direto',
    utm_medium: lead.utmMedium || '',
    utm_campaign: lead.utmCampaign || 'Black Friday 2027',
    utm_content: lead.utmContent || ''
  };

  try {
    // Note: Google Apps Script Web App redirects 302 to googleusercontent.
    // In browser client-side, standard 'no-cors' mode is required so CORS doesn't abort the request.
    await fetch(webhookUrl.trim(), {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    return {
      success: true,
      message: 'Lead enviado com sucesso para a planilha!'
    };
  } catch (err: unknown) {
    console.error('Erro ao enviar lead para Google Sheets:', err);
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Falha ao conectar com o webhook.'
    };
  }
}
