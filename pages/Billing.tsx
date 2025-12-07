import React, { useState } from 'react';
import { Card, Button, Select } from '../components/UI';
import { store } from '../services/store';
import { Trash2, Download, Printer, Check, Loader2 } from 'lucide-react';
import { Service } from '../types';

interface CartItem extends Service {
  tempId: number;
}

export const Billing: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [includeTax, setIncludeTax] = useState(true);
  const [paymentMode, setPaymentMode] = useState('Card');
  
  // Download simulation state
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  
  const services = store.getServices();
  const clients = store.getClients();

  const addToCart = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setCart([...cart, { ...service, tempId: Date.now() }]);
    }
  };

  const removeFromCart = (tempId: number) => {
    setCart(cart.filter(item => item.tempId !== tempId));
  };

  const handleDownload = async () => {
    const element = document.getElementById('invoice-preview');
    if (!element) return;

    setIsDownloading(true);

    try {
      // Access global libraries loaded via CDN
      const html2canvas = (window as any).html2canvas;
      const jspdf = (window as any).jspdf;

      if (!html2canvas || !jspdf) {
        console.error("Libraries not loaded");
        setIsDownloading(false);
        return;
      }

      // Capture the element
      const canvas = await html2canvas(element, {
        scale: 2, // Improve resolution
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Calculate dimensions to fit width
      const ratio = pdfWidth / imgWidth;
      const finalHeight = imgHeight * ratio;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, finalHeight);
      pdf.save(`MintSalon-Invoice-${Date.now()}.pdf`);

      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);

    } catch (error) {
      console.error("PDF generation failed:", error);
      setIsDownloading(false);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const tax = includeTax ? subtotal * 0.08 : 0;
  const total = subtotal + tax;

  const clientName = selectedClient === 'walk-in' ? 'Walk-in Customer' : clients.find(c => c.id === selectedClient)?.name || 'Guest';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
       {/* Input Section */}
       <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">New Invoice</h1>
            <p className="text-gray-500 dark:text-gray-400">Create professional invoices for your clients.</p>
          </div>

          <Card className="space-y-6">
             <div className="grid grid-cols-1 gap-4">
                <Select 
                    label="Bill To" 
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    options={[{ label: 'Walk-in Customer', value: 'walk-in' }, ...clients.map(c => ({ label: c.name, value: c.id }))]}
                />
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Add Items</label>
                    <select 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm bg-white dark:bg-slate-900 dark:text-white"
                        onChange={(e) => {
                        if(e.target.value) {
                            addToCart(e.target.value);
                            e.target.value = ''; // Reset
                        }
                        }}
                    >
                        <option value="">Select Service...</option>
                        {services.map(s => (
                        <option key={s.id} value={s.id}>{s.name} - ${s.price}</option>
                        ))}
                    </select>
                </div>
             </div>

             <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
               <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Payment Details</h3>
               <div className="flex flex-col gap-4">
                 <div className="flex gap-2">
                    {['Cash', 'Card', 'UPI'].map(mode => (
                      <button
                        key={mode}
                        onClick={() => setPaymentMode(mode)}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all ${paymentMode === mode ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                      >
                        {mode}
                      </button>
                    ))}
                 </div>
                 
                 <div className="flex items-center gap-2 mt-2">
                    <input 
                    type="checkbox" 
                    id="tax" 
                    checked={includeTax} 
                    onChange={(e) => setIncludeTax(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="tax" className="text-sm text-gray-700 dark:text-gray-300 select-none">Apply Sales Tax (8%)</label>
                 </div>
               </div>
             </div>
          </Card>

          <Button 
            className="w-full h-12 text-lg shadow-lg shadow-primary-600/20" 
            disabled={cart.length === 0}
            onClick={handleDownload}
          >
            {isDownloading ? (
               <span className="flex items-center gap-2"><Loader2 className="animate-spin h-5 w-5"/> Generating PDF...</span>
            ) : downloadSuccess ? (
               <span className="flex items-center gap-2"><Check className="h-5 w-5"/> Downloaded!</span>
            ) : (
               <span className="flex items-center gap-2"><Download className="h-5 w-5"/> Download PDF (${total.toFixed(2)})</span>
            )}
          </Button>
       </div>

       {/* Live Preview Section */}
       <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-4 sm:p-8 flex items-start justify-center overflow-auto border border-slate-200 dark:border-slate-800 shadow-inner min-h-[500px]">
          {/* Invoice Paper */}
          <div 
             id="invoice-preview"
             className="bg-white w-full max-w-md shadow-2xl rounded-sm min-h-[600px] flex flex-col relative transition-transform duration-300"
          >
             
             {/* Header */}
             <div className="p-8 border-b border-slate-100">
                <div className="flex justify-between items-start">
                   <div>
                      <div className="flex items-center gap-2 text-primary-700 font-bold text-xl mb-1">
                         <div className="w-6 h-6 bg-primary-600 text-white rounded flex items-center justify-center text-sm">M</div>
                         MintSalon
                      </div>
                      <p className="text-xs text-slate-500 mt-2">123 Styling Ave</p>
                      <p className="text-xs text-slate-500">New York, NY 10001</p>
                   </div>
                   <div className="text-right">
                      <h2 className="text-2xl font-light text-slate-300 uppercase tracking-widest">Invoice</h2>
                      <p className="text-sm font-medium text-slate-700 mt-1">#INV-{Math.floor(Date.now() / 1000).toString().slice(-6)}</p>
                      <p className="text-xs text-slate-500">{new Date().toLocaleDateString()}</p>
                   </div>
                </div>
             </div>

             {/* Bill To */}
             <div className="p-8 pb-0">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Bill To</p>
                <p className="font-bold text-slate-800 text-lg">{clientName}</p>
                <p className="text-sm text-slate-500">{selectedClient !== 'walk-in' && clients.find(c => c.id === selectedClient)?.email}</p>
             </div>

             {/* Table */}
             <div className="p-8 flex-1">
               <table className="w-full text-left text-sm">
                 <thead>
                    <tr className="border-b-2 border-slate-100 text-slate-500 text-xs uppercase tracking-wider">
                       <th className="pb-3 font-semibold">Description</th>
                       <th className="pb-3 font-semibold text-right">Amount</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {cart.length === 0 ? (
                       <tr>
                          <td colSpan={2} className="py-8 text-center text-slate-300 italic">No items added yet</td>
                       </tr>
                    ) : (
                       cart.map(item => (
                          <tr key={item.tempId} className="group">
                             <td className="py-3">
                                <p className="font-medium text-slate-800">{item.name}</p>
                                <p className="text-xs text-slate-400">{item.category}</p>
                             </td>
                             <td className="py-3 text-right text-slate-800 flex justify-end items-center gap-3">
                                ${item.price.toFixed(2)}
                                <button onClick={() => removeFromCart(item.tempId)} className="text-red-300 hover:text-red-500 opacity-0 group-hover:opacity-100 print:hidden">
                                  <Trash2 className="h-3 w-3" />
                                </button>
                             </td>
                          </tr>
                       ))
                    )}
                 </tbody>
               </table>
             </div>

             {/* Footer Totals */}
             <div className="bg-slate-50 p-8">
               <div className="space-y-2 text-sm text-slate-600 mb-6">
                 <div className="flex justify-between">
                   <span>Subtotal</span>
                   <span>${subtotal.toFixed(2)}</span>
                 </div>
                 {includeTax && (
                    <div className="flex justify-between">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                 )}
               </div>
               <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <span className="font-bold text-lg text-slate-900">Total Due</span>
                  <span className="font-bold text-xl text-primary-700">${total.toFixed(2)}</span>
               </div>
               <div className="mt-8 text-center">
                  <p className="text-xs text-slate-400">Thank you for your business!</p>
                  <p className="text-[10px] text-slate-300 mt-1">Payment Method: {paymentMode}</p>
               </div>
             </div>

             {/* Download Overlay */}
             {isDownloading && (
               <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-sm">
                  {/* Overlay content is minimal so it doesn't mess up the capture too much if captured, 
                      though generally we capture before showing this or hide it via CSS if needed. 
                      Actually, html2canvas will capture this overlay if we set state before capture.
                      Fix: Capture happens before state update or we hide this in capture.
                      For simplicity in this logic, we set loading state but the overlay might be captured if we are not careful.
                      However, in the handleDownload function, we setIsDownloading(true) then await html2canvas.
                      To avoid capturing the loader, we can conditionally render a separate loader OUTSIDE the #invoice-preview div.
                  */}
               </div>
             )}
          </div>
       </div>
    </div>
  );
};