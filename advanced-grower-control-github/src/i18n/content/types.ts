import type {
  BioInput,
  CalendarEvent,
  DriveDocument,
  KnfJadamRecipe,
  MipLogEntry,
  MotherGenetics,
  NutritionalDeficiency,
  OutdoorCropPlot,
  PestPois,
} from '../../types';

/**
 * Localized overrides for the technical library. Every field is optional so an
 * untranslated source value can safely fall back to the Portuguese original.
 */
export interface LocalizedContent {
  deficiencies: Record<string, Partial<NutritionalDeficiency>>;
  pests: Record<string, Partial<PestPois>>;
  recipes: Record<string, Partial<KnfJadamRecipe>>;
  bioinputs: Record<string, Partial<BioInput>>;
  documents: Record<string, Partial<DriveDocument>>;
  madres: Record<string, Partial<MotherGenetics>>;
  outdoor: Record<string, Partial<OutdoorCropPlot>>;
  events: Record<string, Partial<CalendarEvent>>;
  mipLogs: Record<string, Partial<MipLogEntry>>;
}
