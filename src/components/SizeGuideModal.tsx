import React from 'react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-md">
      <div className="bg-surface-container-lowest w-full max-w-2xl p-6 md:p-8 border border-outline-variant shadow-none relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center pb-4 border-b border-outline-variant/60">
          <div>
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant block mb-1">
              Atelier Measurement Chart
            </span>
            <h3 className="font-headline-sm text-headline-sm uppercase text-primary">
              CEYO Signature Fit Metric
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            aria-label="Close size guide"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="py-6 space-y-4">
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Measurements are documented in inches laid flat. The silhouette is drafted with dropped shoulders and relaxed chest dimensions. If you prefer a tailored traditional fit, consider sizing down one interval.
          </p>

          {/* Sizing Table */}
          <div className="overflow-x-auto border border-outline-variant/60">
            <table className="w-full text-left font-caption text-caption border-collapse">
              <thead>
                <tr className="border-b border-primary bg-surface-container-low text-primary font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Chest Width (in)</th>
                  <th className="py-3 px-4">Body Length (in)</th>
                  <th className="py-3 px-4">Shoulder Span (in)</th>
                  <th className="py-3 px-4">Sleeve Length (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/40 font-mono text-on-surface">
                <tr className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-2.5 px-4 font-bold font-sans">S</td>
                  <td className="py-2.5 px-4">23.5</td>
                  <td className="py-2.5 px-4">26.5</td>
                  <td className="py-2.5 px-4">22.0</td>
                  <td className="py-2.5 px-4">24.5</td>
                </tr>
                <tr className="bg-surface-container-low font-bold">
                  <td className="py-2.5 px-4 font-sans text-primary">M (Core)</td>
                  <td className="py-2.5 px-4">24.5</td>
                  <td className="py-2.5 px-4">27.5</td>
                  <td className="py-2.5 px-4">23.0</td>
                  <td className="py-2.5 px-4">25.0</td>
                </tr>
                <tr className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-2.5 px-4 font-bold font-sans">L</td>
                  <td className="py-2.5 px-4">25.5</td>
                  <td className="py-2.5 px-4">28.5</td>
                  <td className="py-2.5 px-4">24.0</td>
                  <td className="py-2.5 px-4">25.5</td>
                </tr>
                <tr className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-2.5 px-4 font-bold font-sans">XL</td>
                  <td className="py-2.5 px-4">26.5</td>
                  <td className="py-2.5 px-4">29.5</td>
                  <td className="py-2.5 px-4">25.0</td>
                  <td className="py-2.5 px-4">26.0</td>
                </tr>
                <tr className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-2.5 px-4 font-bold font-sans">XXL</td>
                  <td className="py-2.5 px-4">27.5</td>
                  <td className="py-2.5 px-4">30.5</td>
                  <td className="py-2.5 px-4">26.0</td>
                  <td className="py-2.5 px-4">26.5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-4 border-t border-outline-variant/60 flex justify-between items-center">
          <span className="font-caption text-caption text-secondary">
            Need custom fitting advice? Contact client concierge.
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-widest font-bold hover:bg-[#262627] transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
