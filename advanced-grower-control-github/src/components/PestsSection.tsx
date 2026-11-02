import React, { useState } from 'react';
import { PestPois } from '../types';
import { Search, ExternalLink, Bug, Plus, Edit2, AlertOctagon, ChevronLeft, ChevronRight, Maximize2, X, Upload, ImagePlus, Trash2, Check, Link } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { formatImageUrl, FALLBACK_PEST_IMAGE } from '../utils/imageUtils';
import { useI18n, useTerm } from '../i18n';

const COPY = {
  pt: {
    title: '1.2 Identificação e Controle de Pragas Agrícolas',
    description: 'Manual de identificação, bioprotetores e defensivos orgânicos hospedado no Google Drive da associação.',
    pdf: 'Abrir PDF no Drive',
    search: 'Buscar praga, inseto, sintoma ou nome científico...',
    allCategories: 'Todas as Categorias',
    mites: 'Ácaros',
    suckers: 'Sugadores (Trips, Pulgões...)',
    soil: 'Pragas de Solo (Gnats...)',
    fungi: 'Fungos / Mofo (Botrytis, Oídio)',
    caterpillars: 'Lagartas e Brocas',
    nematodes: 'Nematoides',
    newPest: 'Nova Praga',
    severity: 'Gravidade:',
    mip: 'MIP e Protocolos',
    collapse: 'Recolher',
    photo: 'Foto',
    of: 'de',
    identification: 'Identificação Visual',
    damage: 'Sintomas de Dano na Planta',
    prevention: 'Prevenção & Manejo de Ambiente',
    biological: 'Controle Biológico (Predadores / Fungos)',
    organic: 'Receita Orgânica / JADAM JWA / Neem',
    zoom: 'Ampliar Imagem',
    imageUrl: 'Link URL',
    save: 'Salvar',
    uploadTitle: 'Adicionar Fotos de Pragas Agrícolas',
    target: '1. Selecione a Praga Alvo:',
    images: '2. Selecione a(s) Foto(s) de Campo (Arquivo Local ou Link URL Web):',
    chooseFiles: 'Escolher arquivo(s) local(is)',
    addUrl: 'Ou Cole o Link / URL da Imagem:',
    add: '+ Add',
    selected: 'Imagens selecionadas para inclusão',
    cancel: 'Cancelar',
    confirm: 'Confirmar e Salvar Fotos',
    urlPlaceholder: 'Cole o link (Google Drive / Imgur / Web)...',
    urlExamplePlaceholder: 'Google Drive, Imgur, Unsplash...',
    addPhotoUrl: 'Adicionar imagem via Link URL',
    removePhoto: 'Remover foto atual',
    previewAlt: 'Pré-visualização {index}',
    fullscreenAlt: 'Imagem ampliada',
    uploadSuccess: '🎉 {count} foto(s) comprimida(s) e salva(s) com sucesso em {name}!',
    urlSuccess: '🎉 Foto via Link/URL adicionada com sucesso em {name}!',
    removedPhoto: 'Foto removida de {name}.',
    sectionUploadSuccess: '🎉 {count} foto(s) adicionada(s) a {name}!',
    minPhotoAlert: 'Cada praga deve manter pelo menos uma foto principal.',
    selectPestAlert: 'Selecione uma praga na lista.',
    selectPhotoAlert: 'Selecione ou cole pelo menos uma imagem para adicionar.',
  },
  en: {
    title: '1.2 Identification and Control of Agricultural Pests',
    description: 'Identification manual, bioprotectants and organic products hosted in the Google Drive.',
    pdf: 'Open PDF in Drive',
    search: 'Search pest, insect, symptom or scientific name...',
    allCategories: 'All categories',
    mites: 'Mites',
    suckers: 'Sap-sucking insects (thrips, aphids...)',
    soil: 'Soil pests (gnats...)',
    fungi: 'Fungi / mould (Botrytis, powdery mildew)',
    caterpillars: 'Caterpillars and borers',
    nematodes: 'Nematodes',
    newPest: 'New pest',
    severity: 'Severity:',
    mip: 'IPM and protocols',
    collapse: 'Collapse',
    photo: 'Photo',
    of: 'of',
    identification: 'Visual identification',
    damage: 'Plant damage symptoms',
    prevention: 'Prevention & environment management',
    biological: 'Biological control (predators / fungi)',
    organic: 'Organic recipe / JADAM JWA / neem',
    zoom: 'Enlarge image',
    imageUrl: 'Image URL',
    save: 'Save',
    uploadTitle: 'Add agricultural pest photos',
    target: '1. Select the target pest:',
    images: '2. Select field photo(s) (local file or image URL):',
    chooseFiles: 'Choose local file(s)',
    addUrl: 'Or paste the image link / URL:',
    add: '+ Add',
    selected: 'Images selected for upload',
    cancel: 'Cancel',
    confirm: 'Confirm and save photos',
    urlPlaceholder: 'Paste the link (Google Drive / Imgur / Web)...',
    urlExamplePlaceholder: 'Google Drive, Imgur, Unsplash...',
    addPhotoUrl: 'Add image via URL link',
    removePhoto: 'Remove current photo',
    previewAlt: 'Preview {index}',
    fullscreenAlt: 'Enlarged image',
    uploadSuccess: '🎉 {count} compressed photo(s) saved successfully in {name}!',
    urlSuccess: '🎉 Photo added successfully via link/URL in {name}!',
    removedPhoto: 'Photo removed from {name}.',
    sectionUploadSuccess: '🎉 {count} photo(s) added to {name}!',
    minPhotoAlert: 'Each pest must keep at least one main photo.',
    selectPestAlert: 'Select a pest from the list.',
    selectPhotoAlert: 'Select or paste at least one image to add.',
  },
  es: {
    title: '1.2 Identificación y Control de Plagas Agrícolas',
    description: 'Manual de identificación, bioprotectores y productos orgánicos alojado en Google Drive de la asociación.',
    pdf: 'Abrir PDF en Drive',
    search: 'Buscar plaga, insecto, síntoma o nombre científico...',
    allCategories: 'Todas las categorías',
    mites: 'Ácaros',
    suckers: 'Insectos chupadores (trips, pulgones...)',
    soil: 'Plagas del suelo (gnats...)',
    fungi: 'Hongos / moho (Botrytis, oídio)',
    caterpillars: 'Orugas y barrenadores',
    nematodes: 'Nematodos',
    newPest: 'Nueva plaga',
    severity: 'Gravedad:',
    mip: 'MIP y protocolos',
    collapse: 'Contraer',
    photo: 'Foto',
    of: 'de',
    identification: 'Identificación visual',
    damage: 'Síntomas de daño en la planta',
    prevention: 'Prevención y manejo del ambiente',
    biological: 'Control biológico (depredadores / hongos)',
    organic: 'Receta orgánica / JADAM JWA / neem',
    zoom: 'Ampliar imagen',
    imageUrl: 'URL de imagen',
    save: 'Guardar',
    uploadTitle: 'Añadir fotos de plagas agrícolas',
    target: '1. Seleccione la plaga objetivo:',
    images: '2. Seleccione foto(s) de campo (archivo local o URL):',
    chooseFiles: 'Elegir archivo(s) local(es)',
    addUrl: 'O pegue el enlace / URL de la imagen:',
    add: '+ Añadir',
    selected: 'Imágenes seleccionadas para incluir',
    cancel: 'Cancelar',
    confirm: 'Confirmar y guardar fotos',
    urlPlaceholder: 'Pega el enlace (Google Drive / Imgur / Web)...',
    urlExamplePlaceholder: 'Google Drive, Imgur, Unsplash...',
    addPhotoUrl: 'Añadir imagen vía enlace URL',
    removePhoto: 'Eliminar foto actual',
    previewAlt: 'Vista previa {index}',
    fullscreenAlt: 'Imagen ampliada',
    uploadSuccess: '🎉 ¡{count} foto(s) comprimida(s) y guardada(s) con éxito en {name}!',
    urlSuccess: '🎉 ¡Foto añadida con éxito vía enlace/URL en {name}!',
    removedPhoto: 'Foto eliminada de {name}.',
    sectionUploadSuccess: '🎉 ¡{count} foto(s) añadida(s) a {name}!',
    minPhotoAlert: 'Cada plaga debe mantener al menos una foto principal.',
    selectPestAlert: 'Seleccione una plaga en la lista.',
    selectPhotoAlert: 'Seleccione o pegue al menos una imagen para añadir.',
  },
  de: {
    title: '1.2 Bestimmung und Bekämpfung von Agrarschädlingen',
    description: 'Bestimmungshandbuch, Bioprotektoren und organische Pflanzenschutzmittel im Google Drive.',
    pdf: 'PDF in Drive öffnen',
    search: 'Schädling, Insekt, Symptom oder wissenschaftlichen Namen suchen...',
    allCategories: 'Alle Kategorien',
    mites: 'Milben',
    suckers: 'Saugende Insekten (Thripse, Blattläuse...)',
    soil: 'Bodenschädlinge (Trauermücken...)',
    fungi: 'Pilze / Schimmel (Botrytis, Echter Mehltau)',
    caterpillars: 'Raupen und Bohrer',
    nematodes: 'Nematoden',
    newPest: 'Neuer Schädling',
    severity: 'Schweregrad:',
    mip: 'IPM und Protokolle',
    collapse: 'Einklappen',
    photo: 'Foto',
    of: 'von',
    identification: 'Visuelle Bestimmung',
    damage: 'Schadenssymptome an der Pflanze',
    prevention: 'Vorbeugung & Klimamanagement',
    biological: 'Biologische Bekämpfung (Nützlinge / Pilze)',
    organic: 'Organisches Rezept / JADAM JWA / Neem',
    zoom: 'Bild vergrößern',
    imageUrl: 'Bild-URL',
    save: 'Speichern',
    uploadTitle: 'Fotos von Agrarschädlingen hinzufügen',
    target: '1. Zielschädling auswählen:',
    images: '2. Feldaufnahme(n) auswählen (lokale Datei oder Bild-URL):',
    chooseFiles: 'Lokale Datei(en) auswählen',
    addUrl: 'Oder Bildlink / URL einfügen:',
    add: '+ Hinzufügen',
    selected: 'Ausgewählte Bilder',
    cancel: 'Abbrechen',
    confirm: 'Bestätigen und Fotos speichern',
    urlPlaceholder: 'Link einfügen (Google Drive / Imgur / Web)...',
    urlExamplePlaceholder: 'Google Drive, Imgur, Unsplash...',
    addPhotoUrl: 'Bild per URL-Link hinzufügen',
    removePhoto: 'Aktuelles Foto entfernen',
    previewAlt: 'Vorschau {index}',
    fullscreenAlt: 'Vergrößertes Bild',
    uploadSuccess: '🎉 {count} komprimierte(s) Foto(s) erfolgreich in {name} gespeichert!',
    urlSuccess: '🎉 Foto erfolgreich per Link/URL in {name} hinzugefügt!',
    removedPhoto: 'Foto von {name} entfernt.',
    sectionUploadSuccess: '🎉 {count} Foto(s) zu {name} hinzugefügt!',
    minPhotoAlert: 'Jeder Schädling muss mindestens ein Hauptfoto behalten.',
    selectPestAlert: 'Wählen Sie einen Schädling aus der Liste.',
    selectPhotoAlert: 'Wählen Sie mindestens ein Bild aus oder fügen Sie eines ein.',
  },
};


interface PestsSectionProps {
  pests: PestPois[];
  isAdmin: boolean;
  onEditItem: (item: PestPois) => void;
  onAddNew: () => void;
  pdfUrl: string;
  onSavePest?: (pest: PestPois) => void;
}

export const PestsSection: React.FC<PestsSectionProps> = ({
  pests,
  isAdmin,
  onEditItem,
  onAddNew,
  pdfUrl,
  onSavePest,
}) => {
  const { lang } = useI18n();
  const term = useTerm();
  const c = COPY[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(pests[0]?.id || null);

  // Carousel & Fullscreen Image Viewer State
  const [imageIndexes, setImageIndexes] = useState<{ [id: string]: number }>({});
  const [fullscreenImageUrl, setFullscreenImageUrl] = useState<string | null>(null);

  // Feedback Notification Banner State
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  // Section Batch Upload Modal State
  const [isSectionUploadModalOpen, setIsSectionUploadModalOpen] = useState(false);
  const [selectedPestForUpload, setSelectedPestForUpload] = useState<string>(pests[0]?.id || '');
  const [modalPendingImages, setModalPendingImages] = useState<string[]>([]);
  const [modalUrlInput, setModalUrlInput] = useState<string>('');

  // State for direct URL image inputs per pest card
  const [showUrlInputMap, setShowUrlInputMap] = useState<{ [id: string]: boolean }>({});
  const [urlInputValueMap, setUrlInputValueMap] = useState<{ [id: string]: string }>({});

  // Helper function to compress and resize images via HTML5 Canvas before adding to state
  const compressImage = (file: File, maxWidth = 500, quality = 0.65): Promise<string> => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onerror = () => resolve('');
      reader.onload = (event) => {
        const img = new Image();
        img.onerror = () => resolve('');
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(event.target?.result as string || '');
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  // Image Upload Handler for individual pest card
  const handleImageUpload = (pestId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const compressPromises = fileArray.map((file) => compressImage(file, 500, 0.65));

    Promise.all(compressPromises).then((newImageUrls) => {
      const validImageUrls = newImageUrls.filter(Boolean);
      if (validImageUrls.length === 0) return;

      const targetPest = pests.find((p) => p.id === pestId);
      if (!targetPest) return;

      const existingImages = targetPest.images && targetPest.images.length > 0
        ? targetPest.images
        : [targetPest.imageUrl || 'https://images.unsplash.com/photo-1599598425947-320f3299c853?auto=format&fit=crop&w=600&q=80'];

      const updatedImages = [...existingImages, ...validImageUrls];

      const updatedPest: PestPois = {
        ...targetPest,
        imageUrl: targetPest.imageUrl || validImageUrls[0],
        images: updatedImages,
      };

      if (onSavePest) {
        onSavePest(updatedPest);
      }

      setImageIndexes((prev) => ({
        ...prev,
        [pestId]: updatedImages.length - 1,
      }));

      setUploadSuccessMsg(`🎉 ${validImageUrls.length} foto(s) comprimida(s) e salva(s) com sucesso em ${targetPest.name}!`);
      setTimeout(() => setUploadSuccessMsg(null), 4000);
    });
  };

  // Handler for adding an image via direct Web URL / Google Drive link
  const handleAddDirectUrl = (pestId: string, rawUrl: string) => {
    const formatted = formatImageUrl(rawUrl);
    if (!formatted) return;

    const targetPest = pests.find((p) => p.id === pestId);
    if (!targetPest) return;

    const existingImages = targetPest.images && targetPest.images.length > 0
      ? targetPest.images
      : [targetPest.imageUrl || 'https://images.unsplash.com/photo-1599598425947-320f3299c853?auto=format&fit=crop&w=600&q=80'];

    const updatedImages = [...existingImages, formatted];

    const updatedPest: PestPois = {
      ...targetPest,
      imageUrl: targetPest.imageUrl || formatted,
      images: updatedImages,
    };

    if (onSavePest) {
      onSavePest(updatedPest);
    }

    setImageIndexes((prev) => ({
      ...prev,
      [pestId]: updatedImages.length - 1,
    }));

    setUrlInputValueMap((prev) => ({ ...prev, [pestId]: '' }));
    setShowUrlInputMap((prev) => ({ ...prev, [pestId]: false }));

    setUploadSuccessMsg(`🎉 Foto via Link/URL adicionada com sucesso em ${targetPest.name}!`);
    setTimeout(() => setUploadSuccessMsg(null), 4000);
  };

  // Remove uploaded photo handler
  const handleRemovePhoto = (pestId: string, photoIdx: number) => {
    const targetPest = pests.find((p) => p.id === pestId);
    if (!targetPest) return;

    const currentImages = targetPest.images && targetPest.images.length > 0
      ? targetPest.images
      : [targetPest.imageUrl];

    if (currentImages.length <= 1) {
      alert("Cada praga deve manter pelo menos uma foto principal.");
      return;
    }

    const updatedImages = currentImages.filter((_, idx) => idx !== photoIdx);
    const updatedPest: PestPois = {
      ...targetPest,
      imageUrl: updatedImages[0] || '',
      images: updatedImages,
    };

    if (onSavePest) {
      onSavePest(updatedPest);
    }

    setImageIndexes((prev) => ({
      ...prev,
      [pestId]: Math.max(0, photoIdx - 1),
    }));

    setUploadSuccessMsg(`Foto removida de ${targetPest.name}.`);
    setTimeout(() => setUploadSuccessMsg(null), 3000);
  };

  // Modal batch file selector
  const handleModalFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const compressPromises = fileArray.map((file) => compressImage(file, 500, 0.65));

    Promise.all(compressPromises).then((newImageUrls) => {
      const validImageUrls = newImageUrls.filter(Boolean);
      setModalPendingImages((prev) => [...prev, ...validImageUrls]);
    });
  };

  // Add URL to modal pending images
  const handleModalAddUrl = () => {
    if (!modalUrlInput.trim()) return;
    const formatted = formatImageUrl(modalUrlInput.trim());
    if (formatted) {
      setModalPendingImages((prev) => [...prev, formatted]);
      setModalUrlInput('');
    }
  };

  // Confirm section upload modal
  const handleConfirmSectionUpload = () => {
    if (!selectedPestForUpload) {
      alert('Selecione uma praga na lista.');
      return;
    }
    if (modalPendingImages.length === 0) {
      alert('Selecione ou cole pelo menos uma imagem para adicionar.');
      return;
    }

    const targetPest = pests.find((p) => p.id === selectedPestForUpload);
    if (!targetPest) return;

    const existingImages = targetPest.images && targetPest.images.length > 0
      ? targetPest.images
      : [targetPest.imageUrl || 'https://images.unsplash.com/photo-1599598425947-320f3299c853?auto=format&fit=crop&w=600&q=80'];

    const updatedImages = [...existingImages, ...modalPendingImages];

    const updatedPest: PestPois = {
      ...targetPest,
      imageUrl: targetPest.imageUrl || modalPendingImages[0],
      images: updatedImages,
    };

    if (onSavePest) {
      onSavePest(updatedPest);
    }

    setImageIndexes((prev) => ({
      ...prev,
      [selectedPestForUpload]: updatedImages.length - 1,
    }));

    setIsSectionUploadModalOpen(false);
    setModalPendingImages([]);

    setUploadSuccessMsg(`🎉 ${modalPendingImages.length} foto(s) adicionada(s) a ${targetPest.name}!`);
    setTimeout(() => setUploadSuccessMsg(null), 4000);
  };

  const filtered = pests.filter((pest) => {
    const matchesSearch =
      pest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pest.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pest.identification.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || pest.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Success Notification Toast Banner */}
      {uploadSuccessMsg && (
        <div className="bg-emerald-900/90 border border-emerald-500 text-emerald-100 p-3.5 rounded-xl shadow-xl flex items-center justify-between gap-3 text-xs font-semibold animate-bounce">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>{uploadSuccessMsg}</span>
          </div>
          <button
            onClick={() => setUploadSuccessMsg(null)}
            className="text-emerald-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top PDF Drive Banner & Batch Upload Button */}
      <div className="bg-gradient-to-r from-emerald-900 to-green-950 p-4 rounded-2xl border border-emerald-700/60 shadow-md text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-800/80 rounded-xl border border-emerald-600/40 text-emerald-300 shrink-0">
              <Bug className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-base text-emerald-100 flex items-center gap-2">
                {c.title}
              </h2>
              <p className="text-xs text-emerald-300/80 mt-0.5">
                {c.description}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-xl shadow-sm transition border border-emerald-400/30"
            >
              <span>{c.pdf}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder={c.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
          >
            <option value="all">{c.allCategories}</option>
            <option value="Ácaro">{c.mites}</option>
            <option value="Inseto Sugador">{c.suckers}</option>
            <option value="Praga do Solo">{c.soil}</option>
            <option value="Fungo/Bactéria">{c.fungi}</option>
            <option value="Lagarta/Broca">{c.caterpillars}</option>
            <option value="Nematoide">{c.nematodes}</option>
          </select>

          {isAdmin && (
            <button
              onClick={onAddNew}
              className="flex items-center gap-1 px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{c.newPest}</span>
            </button>
          )}
        </div>
      </div>

      {/* List of Pests */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((pest) => {
          const isExpanded = expandedId === pest.id;

          const severityColor =
            pest.severity === 'Alta'
              ? 'bg-rose-950/80 text-rose-300 border-rose-800'
              : pest.severity === 'Média'
              ? 'bg-amber-950/80 text-amber-300 border-amber-800'
              : 'bg-emerald-950/80 text-emerald-300 border-emerald-800';

          const imageList = pest.images && pest.images.length > 0 ? pest.images : [pest.imageUrl];
          const currentImgIdx = imageIndexes[pest.id] || 0;
          const activeImageUrl = imageList[currentImgIdx] || pest.imageUrl;

          return (
            <div
              key={pest.id}
              className={`bg-slate-900 border rounded-2xl overflow-hidden transition-all duration-200 shadow-sm ${
                isExpanded ? 'border-emerald-500 ring-1 ring-emerald-500/40' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : pest.id)}
                className="p-4 bg-slate-900 cursor-pointer flex items-center justify-between gap-3 select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-emerald-400 overflow-hidden">
                    <SafeImage
                      src={activeImageUrl}
                      fallbackSrc={FALLBACK_PEST_IMAGE}
                      alt={pest.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-sm text-slate-100">{pest.name}</h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${severityColor}`}>
                        {c.severity} {term(pest.severity)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 italic">
                      {pest.scientificName} • <span className="text-emerald-300 not-italic font-medium">{term(pest.category)}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditItem(pest);
                      }}
                      className="p-1.5 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 rounded-lg text-xs font-semibold transition"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <span className="text-xs text-emerald-400 font-semibold px-2 py-1 bg-emerald-950 rounded-lg border border-emerald-800">
                    {isExpanded ? c.collapse : c.mip}
                  </span>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="p-4 bg-slate-950/90 border-t border-slate-800 text-xs space-y-4">
                  {/* Photo & Identification */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="relative rounded-xl overflow-hidden border border-slate-800 h-52 bg-slate-900 group">
                        <SafeImage
                          src={activeImageUrl}
                          fallbackSrc={FALLBACK_PEST_IMAGE}
                          alt={pest.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Top Overlay Badge & Fullscreen Toggle */}
                        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1 pointer-events-none">
                          <span className="bg-slate-950/85 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-700">
                            {c.photo} {currentImgIdx + 1} {c.of} {imageList.length}
                          </span>
                          <button
                            onClick={() => setFullscreenImageUrl(activeImageUrl)}
                            className="pointer-events-auto p-1 bg-slate-950/80 hover:bg-emerald-600 text-slate-200 hover:text-white rounded-md border border-slate-700 transition"
                            title={c.zoom}
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Image Carousel Navigation Controls */}
                        {imageList.length > 1 && (
                          <>
                            <button
                              onClick={() =>
                                setImageIndexes((prev) => ({
                                  ...prev,
                                  [pest.id]: (currentImgIdx - 1 + imageList.length) % imageList.length,
                                }))
                              }
                              className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1 bg-slate-950/80 hover:bg-slate-800 text-white rounded-full border border-slate-700 transition"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                setImageIndexes((prev) => ({
                                  ...prev,
                                  [pest.id]: (currentImgIdx + 1) % imageList.length,
                                }))
                              }
                              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 bg-slate-950/80 hover:bg-slate-800 text-white rounded-full border border-slate-700 transition"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </>
                        )}

                        <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-sm p-1.5 rounded-lg text-[10px] text-emerald-200 border border-slate-700 truncate">
                          {pest.name}
                        </div>
                      </div>

                      {/* Independent Photo Controls Bar with Direct URL Link - ADMIN ONLY */}
                      {isAdmin && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setShowUrlInputMap((prev) => ({ ...prev, [pest.id]: !prev[pest.id] }))}
                              className="flex-1 py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-700/60 font-semibold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow"
                              title={c.addPhotoUrl}
                            >
                              <Link className="w-3.5 h-3.5" />
                              <span>{c.imageUrl}</span>
                            </button>

                            {imageList.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(pest.id, currentImgIdx)}
                                className="p-1.5 bg-red-950/80 hover:bg-red-900 text-red-300 rounded-xl border border-red-800/80 transition"
                                title={c.removePhoto}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          {showUrlInputMap[pest.id] && (
                            <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 border border-emerald-700/80 rounded-xl text-xs animate-fadeIn">
                              <input
                                type="url"
                                value={urlInputValueMap[pest.id] || ''}
                                onChange={(e) => setUrlInputValueMap((prev) => ({ ...prev, [pest.id]: e.target.value }))}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddDirectUrl(pest.id, urlInputValueMap[pest.id] || '');
                                  }
                                }}
                                placeholder={c.urlPlaceholder}
                                className="flex-1 bg-slate-950 text-slate-100 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500 placeholder-slate-500"
                              />
                              <button
                                type="button"
                                onClick={() => handleAddDirectUrl(pest.id, urlInputValueMap[pest.id] || '')}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition"
                              >
                                {c.save}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <div>
                        <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider mb-1">
                          {c.identification}
                        </h4>
                        <p className="text-slate-300 leading-relaxed">{pest.identification}</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-amber-400 text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                          <AlertOctagon className="w-3.5 h-3.5" />
                          {c.damage}
                        </h4>
                        <ul className="list-disc pl-4 space-y-1 text-slate-300">
                          {pest.damageSymptoms.map((ds, idx) => (
                            <li key={idx}>{ds}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Prevention & Biological Control */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                      <h4 className="font-bold text-emerald-300 text-xs mb-1.5 flex items-center gap-1">
                        🛡️ {c.prevention}
                      </h4>
                      <ul className="list-disc pl-4 space-y-1 text-slate-200">
                        {pest.prevention.map((p, idx) => (
                          <li key={idx}>{p}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-emerald-950/60 border border-emerald-800/80 p-3 rounded-xl">
                      <h4 className="font-bold text-emerald-400 text-xs mb-1.5 flex items-center gap-1">
                        🐞 {c.biological}
                      </h4>
                      <ul className="list-disc pl-4 space-y-1 text-slate-200">
                        {pest.biologicalControl.map((bc, idx) => (
                          <li key={idx}>{bc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Organic Recipes */}
                  <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                    <h4 className="font-bold text-amber-300 text-xs mb-1.5 flex items-center gap-1">
                      🌿 {c.organic}
                    </h4>
                    <ul className="list-disc pl-4 space-y-1 text-slate-200">
                      {pest.organicRecipes.map((or, idx) => (
                        <li key={idx}>{or}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Section-Level Batch Upload Modal */}
      {isSectionUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-800/80 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <Upload className="w-5 h-5" />
                <h3 className="font-bold text-sm text-slate-100">{c.uploadTitle}</h3>
              </div>
              <button
                onClick={() => {
                  setIsSectionUploadModalOpen(false);
                  setModalPendingImages([]);
                }}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target Pest Selector */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">
                {c.target}
              </label>
              <select
                value={selectedPestForUpload}
                onChange={(e) => setSelectedPestForUpload(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-emerald-300 font-medium focus:outline-none focus:border-emerald-500"
              >
                {pests.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.scientificName})
                  </option>
                ))}
              </select>
            </div>

            {/* File Dropzone / Selector / Direct URL */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                {c.images}
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* File Upload Box */}
                <label className="border border-dashed border-emerald-700/60 hover:border-emerald-500 bg-slate-950/80 rounded-xl p-3 flex flex-col items-center justify-center gap-1 text-center cursor-pointer transition group">
                  <ImagePlus className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition" />
                  <span className="text-xs font-semibold text-slate-200">{c.chooseFiles}</span>
                  <span className="text-[10px] text-slate-400">JPG, PNG, WEBP</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleModalFileSelect(e.target.files)}
                    className="hidden"
                  />
                </label>

                {/* Direct Link URL Box */}
                <div className="border border-slate-800 bg-slate-950/80 rounded-xl p-3 flex flex-col justify-between space-y-1">
                  <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                    <Link className="w-3.5 h-3.5" />
                    <span>{c.addUrl}</span>
                  </div>
                  <div className="flex gap-1.5 pt-1">
                    <input
                      type="url"
                      value={modalUrlInput}
                      onChange={(e) => setModalUrlInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleModalAddUrl();
                        }
                      }}
                      placeholder={c.urlExamplePlaceholder}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleModalAddUrl}
                      className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg transition"
                    >
                      {c.add}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Preview Grid */}
            {modalPendingImages.length > 0 && (
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-300">
                  Imagens selecionadas para inclusão ({modalPendingImages.length}):
                </span>
                <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto p-2 bg-slate-950 rounded-xl border border-slate-800">
                  {modalPendingImages.map((img, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden h-16 border border-slate-700 group">
                      <SafeImage src={img} fallbackSrc={FALLBACK_PEST_IMAGE} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => setModalPendingImages((prev) => prev.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 bg-red-950/90 text-red-300 p-0.5 rounded-full hover:bg-red-800 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setIsSectionUploadModalOpen(false);
                  setModalPendingImages([]);
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs rounded-xl transition"
              >
                {c.cancel}
              </button>
              <button
                onClick={handleConfirmSectionUpload}
                disabled={modalPendingImages.length === 0}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow transition"
              >
                {c.confirm}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Lightbox Modal */}
      {fullscreenImageUrl && (
        <div
          onClick={() => setFullscreenImageUrl(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <SafeImage
              src={fullscreenImageUrl}
              fallbackSrc={FALLBACK_PEST_IMAGE}
              alt="Ampliada"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-slate-700 shadow-2xl"
            />
            <button
              onClick={() => setFullscreenImageUrl(null)}
              className="absolute top-2 right-2 p-2 bg-slate-900/90 text-slate-200 hover:text-white rounded-full border border-slate-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
