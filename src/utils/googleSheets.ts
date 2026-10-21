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

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }
    
    sheet.appendRow([
      data.data_hora || new Date().toLocaleString("pt-BR"),
      data.nome || "",
      data.whatsapp || "",
      data.data_casamento_2027 || "",
      data.cidade || "",
      data.utm_source || "Tráfego Pago / Instagram",
      data.utm_campaign || "Black Friday 2027",
      data.utm_content || ""
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Lead salvo com sucesso!" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Permite testar pelo navegador também
function doGet(e) {
  return ContentService.createTextOutput("Webhook do Google Sheets está ativo e funcionando!")
    .setMimeType(ContentService.MimeType.TEXT);
}`;

export const DEFAULT_GOOGLE_SHEETS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbxAPSxRcuPqAKmdEkFhSOSfZ86_HLT3qssD2SaBzY4a4uIU4cxeZggigqQozIxntRLN3Q/exec';

export async function sendLeadToGoogleSheets(
  lead: Lead,
  webhookUrl?: string
): Promise<{ success: boolean; message: string }> {
  const targetUrl = (webhookUrl && webhookUrl.trim().startsWith('http')) 
    ? webhookUrl.trim() 
    : DEFAULT_GOOGLE_SHEETS_WEBHOOK;

  const payload = {
    data_hora: new Date(lead.createdAt).toLocaleString('pt-BR'),
    nome: lead.name,
    whatsapp: lead.phone,
    data_casamento_2027: lead.weddingDate,
    cidade: lead.city,
    utm_source: lead.utmSource || 'Instagram Ads / Meta',
    utm_medium: lead.utmMedium || '',
    utm_campaign: lead.utmCampaign || 'Black Friday 2027',
    utm_content: lead.utmContent || ''
  };

  const cleanUrl = targetUrl;

  try {
    // text/plain prevents browser preflight blocks with Google Apps Script Web App
    await fetch(cleanUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    return {
      success: true,
      message: 'Lead enviado com sucesso para a planilha!'
    };
  } catch (err: unknown) {
    console.error('Erro ao enviar lead para Google Sheets via fetch:', err);

    // Secondary fallback: image / beacon or form fallback
    try {
      const params = new URLSearchParams({
        data_hora: payload.data_hora,
        nome: payload.nome,
        whatsapp: payload.whatsapp,
        data_casamento_2027: payload.data_casamento_2027,
        cidade: payload.cidade,
        utm_source: payload.utm_source,
        utm_campaign: payload.utm_campaign
      });
      navigator.sendBeacon?.(`${cleanUrl}?${params.toString()}`);
      return { success: true, message: 'Lead enviado via fallback de segundo plano.' };
    } catch {
      return {
        success: false,
        message: err instanceof Error ? err.message : 'Falha ao conectar com o webhook.'
      };
    }
  }
}
