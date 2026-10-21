export interface Lead {
  id: string;
  name: string;
  phone: string;
  weddingDate: string;
  city: string;
  guestsCount?: string;
  createdAt: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
}

export interface SongSample {
  id: string;
  title: string;
  moment: string;
  instruments: string;
  duration: string;
  melodyType: 'canon' | 'march' | 'romantic' | 'celebration';
  description: string;
}

export interface MonthAvailability {
  month: string;
  monthIndex: number;
  season: string;
  demandStatus: 'Alta Procura' | 'Quase Esgotado' | 'Últimas Vagas';
  percentageFilled: number;
  availableDates: number;
  note: string;
}
